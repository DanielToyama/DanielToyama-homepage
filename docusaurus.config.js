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
  title: 'Daniel兔兔の小家',
  tagline: '可爱就是正确！',
  favicon: 'img/favicon.ico',

  // 站点的正式地址。sitemap、canonical、og:url 全按它生成，
  // 所以必须是线上真正在用的域名（Cloudflare Pages 上的 danieluu.top）。
  // 之前这里留着 GitHub Pages 的地址，结果生成的 sitemap 里所有链接都指向 github.io。
  url: 'https://danieluu.top',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DanielToyama', // Usually your GitHub org/user name.
  projectName: 'DanielToyama/DanielToyama-homepage', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  // 3.8 起 onBrokenMarkdownLinks 从顶层挪到了 markdown.hooks 下面，顶层那个 v4 会删掉
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
          // blogTitle / blogDescription 只用在 /blog 这一页的 <title> 和 meta description 上，
          // 不会当成可见标题渲染出来（侧边栏标题是下面那个 blogSidebarTitle），所以可以写长一点。
          blogTitle: '兔兔的博客 —— 音游、bot开发与日常折腾',
          blogDescription:
            '兔兔的博客，记录音游打歌、QQ 机器人与群服开发、网页小工具折腾和日常随笔。从maimai、Orzmic 到 OneBot ',
          blogSidebarTitle: '最近有什么呢',
          blogSidebarCount: 10,
          showReadingTime: true,

        },
        // 自动生成 sitemap.xml。@docusaurus/plugin-sitemap 是随 preset-classic 一起装好的，
        // 不写这段也会生成，这里只是把参数显式写出来好调。
        // 地址前缀取上面的 url，改域名别忘了改那里。
        sitemap: {
          filename: 'sitemap.xml',
          // lastmod 取源文件最后一次 git 提交的时间；取不到就不写这一项，不会报错
          lastmod: 'date',
          // 这两个 Google 早就不看了（Docusaurus 自己注释说 v4 会删掉），留着不影响
          changefreq: 'weekly',
          priority: 0.5,
          // 不进 sitemap 的路由：标签页、归档页、翻页都是文章列表的重复内容。
          // 想让它们也进 sitemap，把对应那行删掉即可。
          ignorePatterns: ['/blog/tags/**', '/blog/archive', '/blog/page/**'],
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
      announcementBar: {
      id: 'domain_update', // 更换内容时，修改 id 可以让之前关闭的用户重新看到
      content:
        '🎉 我们更新了域名为<b>Danieluu.top</b>啦！',
      backgroundColor: '#f3cdf2',   // 你可以换成喜欢的颜色，这里用 Docusaurus 风格的绿色[citation:12]
      textColor: '#020000',        // 文字颜色
      isCloseable: true,           // 是否显示关闭按钮
    },
      giscus: {
        repo: 'DanielToyama/DanielToyama-homepage',
        repoId: 'R_kgDOLTDI9A',
        category: 'Announcements',
        categoryId: 'DIC_kwDOLTDI9M4ClRpU',
      },


      // Replace with your project's social card
      image: 'img/rabbit.jpg',
      navbar: {
        title: 'Daniel兔兔の小家',
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
                label: '猫雨音の小猫窝',
                href: 'http://rthmiho.top',
              },
              {
                label: '皮梦の茶馆',
                href: 'https://blog.07210700.xyz',
              },
              {
                label: 'KasumiBot(By Daniel兔兔）',
                href: 'https://ksmbot.top',
              },
              {
                label: 'YukieBot(By Daniel兔兔）',
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
              {
                label: '兔兔的Phira在线服务器',
                href: 'https://iphira.danieluu.top',
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
