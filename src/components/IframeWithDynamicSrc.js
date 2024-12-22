import React, { useState, useEffect } from 'react';

const IframeWithDynamicSrc = ({ lightModeSrc, darkModeSrc, width = '600', height = '400' }) => {
  const [iframeSrc, setIframeSrc] = useState('');

  // 更新 iframe 的 src
  const updateIframeSrc = () => {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    setIframeSrc(isDarkMode ? darkModeSrc : lightModeSrc);
  };

  useEffect(() => {
    // 初始化时检查一次
    updateIframeSrc();

    // 使用 MutationObserver 来监听 data-theme 的变化
    const observer = new MutationObserver(() => {
      updateIframeSrc();  // 监听到变化时更新 iframe
    });
    
    // 只监听 data-theme 属性变化
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // 清除 MutationObserver
    return () => {
      observer.disconnect();
    };
  }, [lightModeSrc, darkModeSrc]); // 仅依赖于 src 更新

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
