// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
const isProd = process.env.NODE_ENV === 'production';
const cloudflareToken = process.env.CLOUDFLARE_TOKEN;
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '户山兔兔の小家',
  tagline: '可爱就是正确！',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://DanielToyama.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DanielToyama', // Usually your GitHub org/user name.
  projectName: 'DanielToyama/DanielToyama-homepage', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.

        },
        blog: {
          blogSidebarTitle: '最近有什么呢',
          blogSidebarCount: 10,
          showReadingTime: true,

        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:

    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // giscus 评论功能
      giscus: {
        repo: 'DanielToyama/DanielToyama-homepage',
        repoId: 'R_kgDOLTDI9A',
        category: 'Announcements',
        categoryId: 'DIC_kwDOLTDI9M4ClRpU',
      },


      // Replace with your project's social card
      image: 'img/rabbit.jpg',
      navbar: {
        title: '户山兔兔の小家',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          { to: '/blog', label: '博客', position: 'left' },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '兔兔',
          },

          {
            href: 'https://github.com/DanielToyama',
            label: 'MyGitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: '关于我',
            items: [
              {
                label: '兔兔的自我介绍',
                to: '/docs/intro',
              },
              {
                label: '兔兔的QQ',
                to: 'https://qm.qq.com/cgi-bin/qm/qr?k=cUojLoZsBE0HvCHgOjuZOGNiJkZ06-z0&noverify=0&personal_qrcode_source=3',
              },
              {
                label: '兔兔的哔哩哔哩主页',
                href: 'https://space.bilibili.com/1333478733',
              },
            ],
          },
          {
            title: '友情链接',
            items: [
              {
                label: '乾狐之家，狐狸的小站',
                href: 'https://qhlg.flime.top/',
              },
              {
                label: 'KasumiBot(By 户山兔兔）',
                href: 'https://ksmbot.top',
              },
              {
                label: 'YukieBot(By 户山兔兔）',
                href: 'https://Yukiebot.top',
              }
            ],
          },
          {
            title: '还有什么东西呢（？',
            items: [
              {
                label: '兔兔的博客',
                to: '/blog',
              },
              {
                label: '兔兔的GitHub主页',
                href: 'https://github.com/DanielToyama',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 兔兔的个人小家. Built with Docusaurus.<br />本网站文章内容依据<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">CC BY-SA 4.0</a>许可证进行授权。转载请附上出处链接（如果能顺带通知我就更好了^_^）<br /><img style="width:30px;height:30px;margin-bottom:-10px"src = "https://moe.one/view/img/ico64.png"/><a href="https://icp.gov.moe/?keyword=20240512" target="_blank">萌ICP备20240512号</a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
  // Add the Cloudflare Web Analytics script
  scripts: [

    ...(isProd && cloudflareToken
      ? [
        {
          src: 'https://hm.baidu.com/hm.js?97d50cf41f61a149f929270878f687aa',
          async: true,
        },
        {
          src: '/baidu—analytics.js', // 添加自定义逻辑
          async: true,
        },
        {
          src: 'https://static.cloudflareinsights.com/beacon.min.js',
          async: true,
          'data-cf-beacon': `{"token": "${cloudflareToken}"}`,
        },
      ]
      : []),
  ],
};


export default config;
