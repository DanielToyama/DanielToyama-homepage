import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import './index.css'

export default function () {
    // Define an array of background image URLs
    const backgroundImages = [
        'https://patchwiki.biligame.com/images/bangdream/5/5b/9eyud0atxb21umz3oyh8j235me9h3wz.png',
        'https://patchwiki.biligame.com/images/bangdream/b/b8/hv5payemg0479latvd1zxisburrv0cj.png',
        'https://patchwiki.biligame.com/images/ba/3/30/k2pgz6uy5ypousdel9f0ggz7s24wa94.png',
        'https://cdnimg.gamekee.com/wiki2.0/images/w_3475/h_2583/829/43637/2022/7/25/428958.png',
        'https://cdnimg.gamekee.com/wiki2.0/images/w_3464/h_2569/829/43637/2023/3/26/845977.png',
        'https://webcnstatic.yostar.net/ba_cn_web/prod/upload/wallpaper/X0_6rTZl.jpeg',
        "https://prod-alicdn-community.kurobbs.com/forum/9698f7c745434923b62da339667f372520240517.png",
        "https://prod-alicdn-community.kurobbs.com/forum/fac40f7875194fe4a4422a2a0ded679920240627.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/543694508f66411997515c66e56e91f720240627.jpg",
        "https://prod-alicdn-community.kurobbs.com/forum/896b5a07b9684aa486079409e4e4b11720241114.png"
    ];

    // State to store the selected background image URL
    const [backgroundImage, setBackgroundImage] = useState('');

    // Function to randomly select a background image
    const selectRandomBackgroundImage = () => {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        setBackgroundImage(backgroundImages[randomIndex]);
    };

    // Effect to select a random background image on component mount
    useEffect(() => {
        selectRandomBackgroundImage();
    }, []);

    return (
        <Layout description='户山兔兔のBlog站，兔兔的小站，户山兔兔，兔兔，DanielToyama'>
            <div id='index-page-container'>
                {/* Set the background image dynamically */}
                <div id='index-page-bg' style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div id='index-page-bg-mask'></div>
                <div id='index-page-main'>
                    <div id='logo'>
                        <span>兔兔的小窝</span>
                    </div>

                    <div id='index-page-description'>
                        欢迎你的来访！！
                    </div>
                    <div id='index-page-button-container'>
                        <div id='index-page-button'>
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
