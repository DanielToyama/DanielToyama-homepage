import React, { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_MIN_HEIGHT = 320;
// 仅作兜底，防止内层按视口高度自适应的页面把 iframe 越撑越高；正常工具页不会被截断。
const DEFAULT_MAX_HEIGHT = 4000;

const isSameOrigin = (src) => {
  if (typeof window === 'undefined' || !src) return false;
  try {
    return new URL(src, window.location.href).origin === window.location.origin;
  } catch (error) {
    return false;
  }
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * 自适应内嵌页面，替代写死宽高的 <iframe width="1000px" height="1000px">。
 *
 * - 宽度跟随正文栏宽，手机 / 平板 / 桌面自动适配，不会撑破布局；
 * - 同源页面（如 /mytools/*.html）会测量内层内容高度，让 iframe 刚好装下内容，
 *   内容变化或栏宽变化时自动重算，避免出现嵌套滚动条；
 * - 跨源页面拿不到内部高度，退化为按宽度等比缩放（aspectRatio）。
 *
 * 用法：<ResponsiveIframe src="/mytools/xxx.html" title="xxx" />
 */
const ResponsiveIframe = ({
  src,
  title = 'Embedded page',
  aspectRatio = 4 / 3,
  minHeight = DEFAULT_MIN_HEIGHT,
  maxHeight = DEFAULT_MAX_HEIGHT,
  autoHeight = true,
  maxWidth = '100%',
  style,
  ...rest
}) => {
  const wrapperRef = useRef(null);
  const frameRef = useRef(null);
  const rafRef = useRef(null);
  const lastWidthRef = useRef(null);
  const [fitsContent, setFitsContent] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState(null);

  // 读取内层内容高度。测量期间强制显示纵向滚动条，按「最坏情况」量：
  // 滚动条要占掉十几像素宽度并让内容重排，所以「有滚动条」时的高度一定不小于「没滚动条」时的高度。
  // 反过来按「没滚动条」量就会偏小，定下来的高度会让内层又出现滚动条，而滚动条一旦出现，
  // 浏览器就按变窄后的布局算内容高度，内容更高、滚动条更不会消失，高度就卡在溢出状态里抖动。
  // 返回 false 表示读不到内层文档（还没开始加载，或者跨源）。
  const measure = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return false;
    let doc = null;
    try {
      doc = frame.contentDocument;
    } catch (error) {
      doc = null; // 跨源文档不允许访问
    }
    const root = doc && doc.documentElement;
    if (!root) return false;
    const body = doc.body;

    const rootOverflow = root.style.overflowY;
    const bodyOverflow = body ? body.style.overflowY : null;
    let contentHeight = 0;
    try {
      root.style.overflowY = 'scroll';
      if (body) body.style.overflowY = 'scroll';
      // 以 body 的高度为准：它由内容撑出来，不随 iframe 自身高度变化，内容变少时才能收回去
      // （documentElement.scrollHeight 会被视口高度托底，永远不小于当前 iframe 高度）。
      contentHeight = body ? body.scrollHeight : root.scrollHeight;
      // 内容溢出到 body 之外（比如 body 被固定成视口高度）时再参考 documentElement。
      if (root.scrollHeight > frame.clientHeight + 1) {
        contentHeight = Math.max(contentHeight, root.scrollHeight);
      }
    } finally {
      root.style.overflowY = rootOverflow;
      if (body) body.style.overflowY = bodyOverflow;
    }

    if (contentHeight > 0) {
      const next = clamp(Math.ceil(contentHeight), minHeight, maxHeight);
      // 差值在 1px 内不动高度，避免和观察者反复抖动
      setMeasuredHeight((prev) => (prev !== null && Math.abs(prev - next) <= 1 ? prev : next));
    }
    return true;
  }, [minHeight, maxHeight]);

  // 统一推迟到下一帧再改高度：在 ResizeObserver 回调里同步改尺寸，
  // 浏览器会报 "ResizeObserver loop completed with undelivered notifications"（开发模式下会弹全屏遮罩）。
  const scheduleMeasure = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      measure();
    });
  }, [measure]);

  useEffect(() => {
    setMeasuredHeight(null);
    setFitsContent(autoHeight && isSameOrigin(src));
  }, [src, autoHeight]);

  useEffect(() => {
    if (!fitsContent) return undefined;
    const frame = frameRef.current;
    const wrapper = wrapperRef.current;
    if (!frame) return undefined;

    let mutationObserver = null;
    let resizeObserver = null;

    const watchInner = () => {
      const doc = frame.contentDocument;
      // 还没开始加载时 contentDocument 为 null，这里不能当成跨源处理，等 load 事件再来一次
      if (!doc || !doc.documentElement) return;
      if (!measure()) {
        setFitsContent(false); // 同源却读不到内容，退回等比缩放
        return;
      }
      if (mutationObserver) mutationObserver.disconnect();
      if (typeof MutationObserver !== 'undefined') {
        // 用 DOM 变化（而不是尺寸变化）感知内容增减，这样和「改 iframe 高度」之间没有回环。
        // 测量时自己写的那两处 style 要排除掉，否则会自己触发自己。
        mutationObserver = new MutationObserver((records) => {
          const relevant = records.some(
            (record) =>
              !(
                record.type === 'attributes' &&
                record.attributeName === 'style' &&
                (record.target === doc.documentElement || record.target === doc.body)
              ),
          );
          if (relevant) scheduleMeasure();
        });
        mutationObserver.observe(doc.documentElement, {
          attributes: true,
          characterData: true,
          childList: true,
          subtree: true,
        });
      }
    };

    // 栏宽变化时内层会重排，需要重新测量。只看宽度：自身改高度引起的通知要忽略，
    // 否则会形成「改高度 → 通知 → 再测量 → 再改高度」的回环。
    if (wrapper && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        const width = entries[0].contentRect.width;
        if (lastWidthRef.current !== null && Math.abs(width - lastWidthRef.current) < 1) return;
        lastWidthRef.current = width;
        scheduleMeasure();
      });
      resizeObserver.observe(wrapper);
    }

    watchInner();
    frame.addEventListener('load', watchInner);

    return () => {
      frame.removeEventListener('load', watchInner);
      if (mutationObserver) mutationObserver.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [fitsContent, measure, scheduleMeasure, src]);

  const sizing = fitsContent
    ? { height: `${measuredHeight ?? minHeight}px` }
    : { aspectRatio: String(aspectRatio) };

  return (
    <div ref={wrapperRef} style={{ width: '100%', maxWidth, margin: '1rem 0' }}>
      <iframe
        {...rest}
        ref={frameRef}
        src={src}
        title={title}
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          minHeight,
          maxHeight,
          border: 0,
          ...sizing,
          ...style,
        }}
      />
    </div>
  );
};

export default ResponsiveIframe;
