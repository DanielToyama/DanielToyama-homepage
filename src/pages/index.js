import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import './index.css'; // 引入页面样式

export default function HomePage() {
    // 定义背景图片链接数组

    const desktopBackgroundImages = [
         'https://prod-alicdn-community.kurobbs.com/forum/c65e53d7195b48e99236a762c03ff7cc20250216.png',
        'https://patchwiki.biligame.com/images/bangdream/5/5b/9eyud0atxb21umz3oyh8j235me9h3wz.png',
        'https://prod-alicdn-community.kurobbs.com/forum/77004cf102f4407aab51a8ba576ec49720250524.jpg',
        'https://prod-alicdn-community.kurobbs.com/forum/1205b68b72af46ebb86161282326db2020250209.jpg',
        'https://prod-alicdn-community.kurobbs.com/forum/8687d6547b29411293f131784b195b9a20250209.jpg',
        'https://prod-alicdn-community.kurobbs.com/forum/05e4d5897b8b49f9b024029023bbfb3320241230.jpg',
        'https://prod-alicdn-community.kurobbs.com/forum/d69b5df0db0243c4b2bb742e6395caab20250216.png',
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
        "https://prod-alicdn-community.kurobbs.com/forum/de208e34155e4b58acef4c77aab941a820241114.png",
        "https://prod-alicdn-community.kurobbs.com/forum/0a2dd769fc2a4be79c23e512fd93b76020250730.png",
        "https://prod-alicdn-community.kurobbs.com/forum/57f477c584944e208d8723287eaf96b120250730.png",
        "https://prod-alicdn-community.kurobbs.com/forum/dd292bb336c84b18a339a9edf1269b7620250730.png",
        "https://prod-alicdn-community.kurobbs.com/forum/156ede295e6e4e8bae6dde623665789720250730.png" ,
        "https://prod-alicdn-community.kurobbs.com/forum/de672cc317364fb1940c3fc50497f81920250730.png",
        "https://prod-alicdn-community.kurobbs.com/forum/2ba9720cdad74eb19e128723554b6aca20250730.png",
        "https://prod-alicdn-community.kurobbs.com/forum/55aec6a9733d4396a86c23bd6a30098a20250730.png",
        "https://prod-alicdn-community.kurobbs.com/forum/0c97c16906b940908125f0f1c13b2c0620250730.png",
        "https://prod-alicdn-community.kurobbs.com/forum/f7f08504a4e146038249a128dbddceb720250728.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/68825f1c14f94d2ebcd3d783bd1f7f9c20250728.jpg" ,
        "https://prod-alicdn-community.kurobbs.com/forum/fa2e61d8aa68494b9fd3bb3c490d837720250728.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/d8e7b4d25d474c718bf9602344e73f1b20250727.jpg",
         "https://prod-alicdn-community.kurobbs.com/forum/a94ce154c33c43d1abc804e62cb6ccfb20250728.jpg",
         "https://prod-alicdn-community.kurobbs.com/forum/8641764bea06413eb961ec53192d535d20250728.jpg",
         "https://prod-alicdn-community.kurobbs.com/forum/640667968620420c9a7c2d97e8d8930320250720.png",
         "https://prod-alicdn-community.kurobbs.com/forum/746c405ec0164aa7a4d3679e65bd532420250727.jpg", 
         "https://prod-alicdn-community.kurobbs.com/forum/18f8e70f9ac74e46b05b370d612034d920260428.jpg" ,

        " https://prod-alicdn-community.kurobbs.com/forum/239e24a03ab247458a9f39046134c11420260428.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/3420e73a9e054677a6a789acdc2cfcb720260428.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/24e8df19ece1464fb30376e8c3be17f420260131.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/5c59d51bf40d44f3b749b9aac289e3e220251228.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/a3ce8dc826fa47f8ae894b8d7d59d48620251228.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/7d5514bfe8d84069bc2a8bbf3dbd11e420251229.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/add3177e88194ccd8baa7d63ed4913db20250607.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/ab2b062c3d29412a8a5d498db88e6ee220250720.png",
        "https://prod-alicdn-community.kurobbs.com/forum/4bee60deadcb41feb60365ca81c1531d20260630.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/263d6a888c494a208cce83c05b491a9b20260630.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/fb069e33546645eeb58792ad9ff3fcc520260630.jpg"

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
        "https://prod-alicdn-community.kurobbs.com/forum/de208e34155e4b58acef4c77aab941a820241114.png",
        'https://prod-alicdn-community.kurobbs.com/forum/e114f6ef7d3e46fbb816415d21ec384a20250209.jpg',
        'https://prod-alicdn-community.kurobbs.com/forum/9f5a31c67cb74e98ba992c96f348662820250209.jpg',
         "https://prod-alicdn-community.kurobbs.com/forum/68825f1c14f94d2ebcd3d783bd1f7f9c20250728.jpg" ,
         "https://prod-alicdn-community.kurobbs.com/forum/1bc388b5c8e54f418a7eb74ab0e3063520250728.jpg",
         "https://prod-alicdn-community.kurobbs.com/forum/a94ce154c33c43d1abc804e62cb6ccfb20250728.jpg",
         "https://prod-alicdn-community.kurobbs.com/forum/7664098c711a4d90863c6e4423d9432e20250727.jpg",
         "https://prod-alicdn-community.kurobbs.com/forum/b675d70ffa934ecbb7e746b9badd421d20250902.jpg",
         "https://prod-alicdn-community.kurobbs.com/forum/fe527f83971a40628d86c8dcb2f5853f20250902.jpg" ,
         "https://prod-alicdn-community.kurobbs.com/forum/31207bd9fbe74c279ae63f3cef50630c20260428.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/888ce69be3f64dc98711724ee2463c5220260428.jpg",
        
    ];

    // 判断屏幕比例是否接近手机（高宽比大于1）
    var isMobileRatioOld;
    const isMobileRatio = () => {
        const aspectRatio = window.innerHeight / window.innerWidth;
        return aspectRatio > 1;
    };

    // 可为特定图片定义裁剪配置：{ top, right, bottom, left }，单位 px
    // 意即「从对应边缘向中心裁掉多少像素」。key 用图片 URL（完整或不完整均可）。
    // 未配置的图片默认居中完整显示。示例：
    // const backgroundCrops = {
    //     'https://example.com/bg.png': { top: 20, right: 0, bottom: 0, left: 30 },
    //     '/forum/xxx.jpg': { bottom: 40 },
    // };
    const backgroundCrops = {
        'https://prod-alicdn-community.kurobbs.com/forum/18f8e70f9ac74e46b05b370d612034d920260428.jpg': { bottom:300 },
          " https://prod-alicdn-community.kurobbs.com/forum/239e24a03ab247458a9f39046134c11420260428.jpg": { bottom:300 },
          "https://prod-alicdn-community.kurobbs.com/forum/31207bd9fbe74c279ae63f3cef50630c20260428.jpg"    : { bottom:100 },
           "https://prod-alicdn-community.kurobbs.com/forum/888ce69be3f64dc98711724ee2463c5220260428.jpg": {top: 50,  bottom:150 },
           "https://prod-alicdn-community.kurobbs.com/forum/3420e73a9e054677a6a789acdc2cfcb720260428.jpg": {  bottom:170 },
           "https://prod-alicdn-community.kurobbs.com/forum/24e8df19ece1464fb30376e8c3be17f420260131.jpg": {  bottom:200 },
           "https://prod-alicdn-community.kurobbs.com/forum/add3177e88194ccd8baa7d63ed4913db20250607.jpg": {  bottom:300 },
           "https://prod-alicdn-community.kurobbs.com/forum/ab2b062c3d29412a8a5d498db88e6ee220250720.png": {  bottom:300 },
           "https://prod-alicdn-community.kurobbs.com/forum/4bee60deadcb41feb60365ca81c1531d20260630.jpg" : {  bottom:300 },
           "https://prod-alicdn-community.kurobbs.com/forum/263d6a888c494a208cce83c05b491a9b20260630.jpg" : {  bottom:300 },
           "https://prod-alicdn-community.kurobbs.com/forum/fb069e33546645eeb58792ad9ff3fcc520260630.jpg" : {  bottom:300 },
    };

    // 将裁剪配置换算为 CSS 内联样式。
    // 原理：让图片在对应方向上向外延伸 N px，同时用负的 left/top 把那条边缘
    // 推出容器外，再用容器的 overflow:hidden 把它裁掉 —— 从而真正地从某个方向切掉，图片不上移、不留白。
    const computeCropStyle = (crop) => {
        if (!crop) return null;

        const { top = 0, right = 0, bottom = 0, left = 0 } = crop;

        const style = {
            // 裁左侧 => left 取负，让左缘伸出容器左边被切；不裁则贴左缘
            left: `${left > 0 ? -left : 0}px`,
            // 裁上侧 => top 取负，让上缘伸出容器上方被切；不裁则贴上缘
            top: `${top > 0 ? -top : 0}px`,
            // 水平向外延伸 left+right，竖直向外延伸 top+bottom
            width: `calc(100% + ${right + left}px)`,
            height: `calc(100% + ${bottom + top}px)`,
        };

        return style;
    };

    // 定义状态存储背景图片及其裁剪样式
    const [backgroundImage, setBackgroundImage] = useState('');
    const [cropStyle, setCropStyle] = useState(null);

    // 随机选择背景图片
    const selectRandomBackgroundImage = () => {
        const images = isMobileRatio() ? mobileBackgroundImages : desktopBackgroundImages;
        const randomIndex = Math.floor(Math.random() * images.length);
        const url = images[randomIndex];

        setBackgroundImage(url);

        // 查找当前图片的裁剪配置（支持完整/部分 URL 匹配）
        let crop = null;
        const matchedKey = Object.keys(backgroundCrops).find(
            (key) => url.includes(key) || key.includes(url)
        );
        if (matchedKey) crop = backgroundCrops[matchedKey];

        setCropStyle(computeCropStyle(crop));
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

                {/* 背景图片（支持从边缘裁剪） */}
                <div id="index-page-bg">
                    <img
                        id="index-page-bg-img"
                        src={backgroundImage}
                        alt=""
                        style={cropStyle}
                    />
                </div>
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
