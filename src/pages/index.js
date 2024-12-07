import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import './index.css'; // 引入页面样式

export default function HomePage() {
    // 定义背景图片链接数组

    const desktopBackgroundImages = [
        'https://patchwiki.biligame.com/images/bangdream/5/5b/9eyud0atxb21umz3oyh8j235me9h3wz.png',
        'https://patchwiki.biligame.com/images/bangdream/b/b8/hv5payemg0479latvd1zxisburrv0cj.png',
        'https://patchwiki.biligame.com/images/ba/3/30/k2pgz6uy5ypousdel9f0ggz7s24wa94.png',
        'https://cdnimg.gamekee.com/wiki2.0/images/w_3475/h_2583/829/43637/2022/7/25/428958.png',
        'https://cdnimg.gamekee.com/wiki2.0/images/w_3464/h_2569/829/43637/2023/3/26/845977.png',
        'https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/X0_6rTZl.jpeg',
        "https://prod-alicdn-community.kurobbs.com/forum/9698f7c745434923b62da339667f372520240517.png",
        "https://prod-alicdn-community.kurobbs.com/forum/fac40f7875194fe4a4422a2a0ded679920240627.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/543694508f66411997515c66e56e91f720240627.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/56fefc26923f439caf930e0a5e35434620241027.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/369281f8eba4444990435aafe1be837a20240820.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/4404eb02378e4e319ba72bb7655f5f8520240517.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/e2c9ee2969d0426ca0a9a168d93d0c2320241113.png",
        "https://prod-alicdn-community.kurobbs.com/forum/de208e34155e4b58acef4c77aab941a820241114.png"

    ];

    const mobileBackgroundImages = [
        'https://patchwiki.biligame.com/images/bangdream/5/5b/9eyud0atxb21umz3oyh8j235me9h3wz.png',
        'https://patchwiki.biligame.com/images/bangdream/b/b8/hv5payemg0479latvd1zxisburrv0cj.png',
        'https://patchwiki.biligame.com/images/ba/3/30/k2pgz6uy5ypousdel9f0ggz7s24wa94.png',
        'https://cdnimg.gamekee.com/wiki2.0/images/w_3475/h_2583/829/43637/2022/7/25/428958.png',
        'https://cdnimg.gamekee.com/wiki2.0/images/w_3464/h_2569/829/43637/2023/3/26/845977.png',
        'https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/X0_6rTZl.jpeg',
        "https://prod-alicdn-community.kurobbs.com/forum/9698f7c745434923b62da339667f372520240517.png",
        "https://prod-alicdn-community.kurobbs.com/forum/fac40f7875194fe4a4422a2a0ded679920240627.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/543694508f66411997515c66e56e91f720240627.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/50797ec1b20e4d30b0b30296bb438d9b20240517.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/de208e34155e4b58acef4c77aab941a820241114.png"

    ];

    // 判断屏幕比例是否接近手机（高宽比大于1）
    var isMobileRatioOld;
    const isMobileRatio = () => {
        const aspectRatio = window.innerHeight / window.innerWidth;
        return aspectRatio > 1;
    };

    // 定义状态存储背景图片
    const [backgroundImage, setBackgroundImage] = useState('');

    // 随机选择背景图片
    const selectRandomBackgroundImage = () => {
        const images = isMobileRatio() ? mobileBackgroundImages : desktopBackgroundImages;
        const randomIndex = Math.floor(Math.random() * images.length);
        setBackgroundImage(images[randomIndex]);
    };

    // 在组件挂载时选择背景图片
    useEffect(() => {
        // 初始化时选择背景图片
        selectRandomBackgroundImage();
        isMobileRatioOld = isMobileRatio();

        // 监听窗口大小变化，动态调整背景图片
        const handleResize = () => {
            if (isMobileRatio() == isMobileRatioOld) return;
            isMobileRatioOld = isMobileRatio();
            selectRandomBackgroundImage();
        };

        // 添加resize事件监听器
        window.addEventListener('resize', handleResize);

        // 清理事件监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);





    return (
        <Layout description="户山兔兔のBlog站，兔兔的小站，户山兔兔，兔兔，DanielToyama">
            <head>
                <meta name="baidu-site-verification" content="codeva-diMaIqZTcx" />
            </head>
            <div id="index-page-container">

                {/* 背景图片 */}
                <div id="index-page-bg" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div id="index-page-bg-mask"></div>

                {/* 主体内容 */}
                <div id="index-page-main">
                    <div id="logo">
                        <span>兔兔的小窝</span>
                    </div>

                    <div id="index-page-description">
                        欢迎你的来访！！
                    </div>

                    <div id="index-page-button-container">
                        <div id="index-page-button">
                            <Link
                                className="button button--secondary button--lg"
                                to="./blog">
                                敲门
                            </Link>
                            <Link
                                className="button button--secondary button--lg"
                                to="./docs/intro">
                                看看兔兔
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
