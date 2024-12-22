import React, { useState, useEffect } from 'react';

const IframeWithDynamicSrc = ({ lightModeSrc, darkModeSrc, width = '600', height = '400', mobileWidth = '350', mobileHeight = '240' }) => {
  const [iframeWidth, setIframeWidth] = useState(width);
  const [iframeHeight, setIframeHeight] = useState(height);
  const [iframeSrc, setIframeSrc] = useState('');

  const updateIframeSrcAndSize = () => {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

    // 设置主题和设备类型
    setIframeSrc(isDarkMode ? darkModeSrc : lightModeSrc);

    // 根据屏幕宽度判断是否为移动端
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      setIframeWidth(mobileWidth); // 移动端宽度
      setIframeHeight(mobileHeight); // 移动端高度
    } else {
      setIframeWidth(width); // 桌面端宽度
      setIframeHeight(height); // 桌面端高度
    }
  };

  useEffect(() => {
    updateIframeSrcAndSize();  // 初始化时更新

    // 监听屏幕尺寸变化
    const resizeListener = () => {
      updateIframeSrcAndSize(); // 屏幕大小变化时更新
    };

    window.addEventListener('resize', resizeListener);

    // 监听 data-theme 的变化
    const observer = new MutationObserver(updateIframeSrcAndSize);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      window.removeEventListener('resize', resizeListener); // 清除监听
      observer.disconnect(); // 清除 MutationObserver
    };
  }, [lightModeSrc, darkModeSrc, width, height, mobileWidth, mobileHeight]);

  return (
    <iframe
      src={iframeSrc}
      width={iframeWidth}
      height={iframeHeight}
      frameBorder="0"
      title="Themed Iframe"
    />
  );
};

export default IframeWithDynamicSrc;
