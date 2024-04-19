import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import './index.css'

export default function () {
    return (

        <Layout description='户山兔兔のBlog站，兔兔的小站，户山兔兔，兔兔，DanielToyama'>
            <div id='index-page-container'>
                <div id='index-page-bg'></div>
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
    )
}