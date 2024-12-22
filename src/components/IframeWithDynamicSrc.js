import React, { useState, useEffect } from 'react';

const IframeWithDynamicSrc = ({ lightModeSrc, darkModeSrc, width = '600', height = '400' }) => {
  const [iframeSrc, setIframeSrc] = useState('');

  // 检查当前的主题状态
  const updateIframeSrc = () => {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    setIframeSrc(isDarkMode ? darkModeSrc : lightModeSrc);
  };

  useEffect(() => {
    // 初始化时调用一次
    updateIframeSrc();

    // 监听 theme 变化
    const observer = new MutationObserver(updateIframeSrc);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'], // 只监听 data-theme 属性变化
    });

    return () => {
      observer.disconnect();
    };
  }, [lightModeSrc, darkModeSrc]);

  return (
    <iframe
      src={iframeSrc}
      width={width}
      height={height}
      frameBorder="0"
      title="Themed Iframe"
    />
  );
};

export default IframeWithDynamicSrc;
