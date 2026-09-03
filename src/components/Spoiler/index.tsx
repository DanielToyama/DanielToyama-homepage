/**
 * SpoilerBlock / 剧透块（仿萌娘百科“黑块” + Windows 式悬停提示）
 *
 * 效果：
 * - 内容默认是黑底黑字，看起来是一块纯黑块（内容被遮住）；
 * - 鼠标悬停（或键盘聚焦）时，黑块内文字变白字 → 黑底白字显现；
 * - 触屏设备没有 hover：点击黑块会展开（显示白字 + 提示框），
 *   点击页面其它任意位置再收起；
 * - 传入 tooltip 时，展开/悬停会在黑块旁浮现 Windows 风格小提示框
 *   （锚定在黑块旁，不跟随鼠标）。
 *
 * 用法（在 MDX / Markdown 中 import 后使用）：
 *   1) 纯黑块：
 *      <Spoiler>被我藏起来的内容</Spoiler>
 *   2) 黑块 + 小提示框：
 *      <Spoiler tooltip="小心剧透！">隐藏内容</Spoiler>
 *   3) 自定义背景 / 圆角 / 文字色：
 *      <Spoiler background="#1b1b1b" color="#eee" radius={6} tooltip="提示">...</Spoiler>
 */
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Spoiler.module.css';

export interface SpoilerProps {
  children: React.ReactNode;
  /** 展开时在黑块旁显示的小提示框文字；不传则不显示。 */
  tooltip?: string;
  /** 黑块背景色（默认纯黑）。 */
  background?: string;
  /** 展开/悬停时文字颜色（默认白）。 */
  color?: string;
  /** 黑块圆角(px)。 */
  radius?: number;
  /** 额外的 className。 */
  className?: string;
}

const Spoiler: React.FC<SpoilerProps> = ({
  children,
  tooltip,
  background = '#000',
  color = '#fff',
  radius = 4,
  className,
}) => {
  // hovered：桌面鼠标悬停；tapped：触屏点按展开
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);

  // 触屏展开后，点击黑块以外任意位置则收起
  const wrapRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!tapped) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (wrapRef.current && !wrapRef.current.contains(target)) {
        setTapped(false);
      }
    };
    // 监听捕获阶段，保证能比气泡/其他元素更早看见点击
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [tapped]);

  const revealed = hovered || tapped;

  return (
    <span
      ref={wrapRef}
      className={styles.wrap}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => setTapped((v) => !v)}
    >
      <span
        className={clsx(styles.spoiler, revealed && styles.revealed, className)}
        style={{
          backgroundColor: background,
          borderRadius: radius,
          '--spoiler-text': color,
        } as React.CSSProperties}
        tabIndex={0}
      >
        {children}
      </span>

      {/* Windows 式小提示框：锚定在黑块下方 */}
      {tooltip && (
        <span
          className={clsx(styles.tooltip, revealed && styles.tooltipVisible)}
          role="tooltip"
        >
          {tooltip}
        </span>
      )}
    </span>
  );
};

export default Spoiler;