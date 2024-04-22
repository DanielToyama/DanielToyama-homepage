import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import './index.css'

export default function () {
    // Define an array of background image URLs
    const backgroundImages = [
        'https://patchwiki.biligame.com/images/bangdream/5/5b/9eyud0atxb21umz3oyh8j235me9h3wz.png',
        'https://patchwiki.biligame.com/images/bangdream/b/b8/hv5payemg0479latvd1zxisburrv0cj.png'
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
