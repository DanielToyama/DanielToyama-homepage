/* =====================================================================
 * 兔兔的板子 —— 配置文件
 * ---------------------------------------------------------------------
 * 页面本体在 tabletHome.html，改样式/换图标只动这个文件就够了。
 * 保存后刷新页面即可看到效果（开发服务器可能缓存，必要时 Ctrl+F5 强刷）。
 *
 * 图片放哪儿：
 *   图标  static/mytools/icons/xxx.webp
 *   壁纸  static/mytools/wallpapers/xxx.jpg
 *   写路径时用 /mytools/... 开头（static 目录就是站点根目录）
 *
 * 图标列表里每一项可以写的字段：
 *   name   显示的名字（也用于没写 color 时自动配色）
 *   url    点击后跳转的地址；站内写 /mytools/xxx.html
 *   img    图标图片路径。留空 '' 就用 emoji
 *   emoji  没有图片时显示的表情
 *   color  图标底色：
 *            数字 → 色相 0-360，例如 214 是蓝色（配 emoji 或透明小 logo 用）
 *            字符串 → 直接当 CSS 背景用，例如 '#43b581' 或整段渐变
 *            不写 → 按 name 自动配一个
 *   fill   图片是「不带透明通道的正方形整图」时写 true：铺满整格，不垫底色、不留白边
 *   tapId  TapTap 的 app id。写了它，**手机上**点这个图标会先试着用 URL Scheme 唤起
 *          TapTap App（taptap://taptap.com/app?app_id=<tapId>），2.5 秒内没唤起成功
 *          就退回 url 那个网页；桌面上不折腾，照常新开标签页。
 *          在 TapTap 上有条目的游戏才写，dock 里的应用和自己站点都不用写。
 *          想关掉某个图标的唤端，把 tapId 删掉即可。
 *
 * 关于图标文件（2026-10-12）：
 *   音游图标取自 TapTap 官方图标，dock 里的应用图标取自 App Store（iTunes Search API），
 *   统一用 ffmpeg 转成 180x180 webp 放在 static/mytools/icons/。
 *   两类原图都是整块铺满的方形图，所以都写了 fill: true（不垫 color 底色）：
 *     - TapTap 原图是 270x270 带透明圆角的 PNG，tapId 就是它的 app id
 *       （个别 app 在 TapTap 上只有 32px 的图，这种换 App Store 的，比如 hololive Dreams）
 *     - App Store 原图是不带透明通道的方图，抓法见 icons/README.md
 *   两边都搜不到的继续用 emoji：Phira，以及第二页那些自己的站点。
 * ===================================================================== */
window.TABLET_HOME = {

    /* ---------------- 桌面背景 ---------------- */
    wallpaper: {
        // 有图就用图（推荐 16:9 或 4:3 的横图），留空则用下面的渐变
        image: 'https://prod-alicdn-community.kurobbs.com/forum/7d5514bfe8d84069bc2a8bbf3dbd11e420251229.jpg',
        // 没图时的渐变，从下往上叠（写在后面的画在最下层）
        gradient: [
            'radial-gradient(58% 34% at 80% 14%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 72%)',
            'radial-gradient(120% 78% at 50% 104%, rgba(255,232,240,0.95) 0%, rgba(255,232,240,0) 62%)',
            'linear-gradient(180deg, #26325e 0%, #46589a 36%, #8ba5d6 60%, #e3c3d5 82%, #fdf0e4 100%)'
        ],
        // 压暗/染色一层，让白色的图标名在花哨壁纸上也看得清，例如 'rgba(0,0,0,0.25)'
        overlay: 'rgba(0, 0, 0, 0.02)',
        // 壁纸模糊（px），0 为不模糊。花哨壁纸配 6~12 比较耐看
        blur: 2
    },

    /* ---------------- 网格布局 ---------------- */
    grid: {
        columns: 6,          // 宽屏每行几个图标
        mobileColumns: 4,    // 窄屏（< 560px）每行几个
        rows: 5,             // 每页几行 → 每页容量 = 当前列数 × rows，装不下会自动翻页
        // 6×5=30：正好装下第一页 29 个游戏（第 30 格是「雪绘 Bot」）
        // 想回到 4 行的话，多出来的游戏会掉到第二页和自建站点混在一起
        gap: '12px',
        mobileGap: '10px'
    },

    /* ---------------- 图标样式（全局默认，单项可覆盖） ---------------- */
    icon: {
        size: '64px',            // 图标边长，写死 px：跟着宽度缩放会让外层量高度时抖
        mobileSize: '58px',
        radius: '24%',           // 圆角：'24%' 是圆角方形，'50%' 是圆
        fontSize: '34px',        // emoji 大小
        shadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 6px 14px rgba(20,26,51,0.32)',
        // 有透明通道的小 logo：缩进多少留白（'16%' 或 '6px'），底色就是该项的 color
        imageInset: '16%',
        imageFit: 'contain',
        // 图标名字
        label: {
            show: true,
            size: '12px',
            mobileSize: '11px',
            color: '#ffffff',
            shadow: '0 1px 3px rgba(16,22,45,0.75)'
        },
        // 没写 color 时按名字自动配色的参数
        autoColor: { saturation: 70, lightnessFrom: 64, lightnessTo: 44 }
    },

    /* ---------------- 底部 Dock ---------------- */
    dock: {
        show: true,
        position: 'bottom',              // bottom | top
        gap: '8px',
        mobileGap: '4px',
        minItem: '34px',                 // 每格最小宽度，一行塞不下就换行
        mobileMinItem: '22px',
        size: '34px',                    // dock 图标边长（固定 px，理由同上）
        mobileSize: '26px',
        background: 'rgba(255,255,255,0.18)',
        blur: '12px',                    // 毛玻璃
        radius: '26px',
        border: '1px solid rgba(255,255,255,0.28)',
        padding: '10px 12px',
        mobilePadding: '8px 6px',
        margin: '16px 0 0',
        label: { show: false, size: '11px' }   // dock 一般不显示名字
    },

    /* ---------------- 翻页指示 ---------------- */
    pager: {
        dots: true,      // 底部小圆点（做成 button 了，点一下直接跳那一页）
        arrows: true,    // 左右箭头（窄屏自动隐藏，靠左右滑动翻页）
        // 右边露出下一页的宽度（px）。0 = 不露，默认关掉。
        // 原理上它确实是最直白的「还能翻」暗示，但代价是当前页要让出这么多宽度：
        // 第一页会整体偏左（右边空出一条），而且每一行都会戳出下一页的半个图标，
        // 手机上看着像布局坏了。想试就填 10~16，填完手机上确认一眼。
        peek: 0
    },

    /* ---------------- 入场动画 ----------------
     * 滚到板子这儿的时候，图标依次进场（只播一次）。触发点由 IntersectionObserver
     * 判断「板子在顶层窗口里露出多少」，所以是跟着你的滚动走的，不是页面一加载就播。
     * 注意它只动 transform/opacity，改尺寸会让外层 iframe 量到的高度跟着变，别加。 */
    anim: {
        entrance: true,   // 总开关；false = 图标直接出现
        duration: 380,    // 单个图标的动画时长 ms
        stagger: 30,      // 相邻图标错开的间隔 ms（dock 接在网格后面一起排）
        distance: 14,     // 起始位置往下偏多少 px
        scale: 0.86,      // 起始缩放到多少
        threshold: 0.25,  // 板子露出多少比例开始播（0.25 = 露出四分之一）
        waitImages: 500   // 最多等图标图片加载多久 ms，超时也先播（不然会在空方块上播）
    },

    /* ---------------- 图标（按顺序排，满一页自动翻页） ---------------- */
    icons: [
        // ---- 第一页：板子上的音游 ----
        { name: 'Phigros', url: 'https://www.taptap.cn/app/165287', tapId: 165287, emoji: '🕊️', img: '/mytools/icons/phigros.webp', fill: true, color: 214 },
        { name: 'Rizline', url: 'https://www.taptap.cn/app/201173/', tapId: 201173, emoji: '🎶', img: '/mytools/icons/rizline.webp', fill: true, color: 140 },
        { name: 'Phira', url: 'https://phira.moe/', emoji: '🪶', img: '/mytools/icons/phira.webp', fill: true, color: 168 },
        { name: '旋转音律', url: 'https://rotaeno.com/', tapId: 166257, emoji: '🔄', img: '/mytools/icons/rotaeno.webp', fill: true, color: 200 },
        { name: '梦想协奏曲！', url: 'https://game.bilibili.com/bangdream/', tapId: 67848, emoji: '🎸', img: '/mytools/icons/band-dream.webp', fill: true, color: 340 },
        { name: 'プロセカ', url: 'https://pjsekai.sega.jp/', emoji: '🎤', img: '/mytools/icons/project-sekai.webp', fill: true, color: 190 },
        { name: 'Orzmic', url: 'https://www.taptap.cn/app/194778', tapId: 194778, emoji: '⬡', img: '/mytools/icons/orzmic.webp', fill: true, color: 258 },
        { name: '鸣潮', url: 'http://mc.kurogames.com/',  img: '/mytools/icons/wuthering-waves.webp', fill: true, color: 195 },
        { name: 'Malody', url: 'https://m.mugzone.net/', tapId: 10115, emoji: '🎲', img: '/mytools/icons/malody.webp', fill: true, color: 260 },
        { name: 'MuseDash', url: 'https://musedash.peropero.net/', tapId: 60809, emoji: '💘', img: '/mytools/icons/musedash.webp', fill: true, color: 330 },
        { name: '调律诗篇', url: 'https://www.taptap.cn/app/14118', tapId: 14118, emoji: '🔄', img: '/mytools/icons/lanota.webp', fill: true, color: 200 },
        { name: 'Cytus', url: 'https://www.rayark.com/g/cytus/', tapId: 6367, emoji: '🎭', img: '/mytools/icons/cytus.webp', fill: true, color: 0 },
        { name: 'Cytus II', url: 'https://www.rayark.com/g/cytus2/', tapId: 71067, emoji: '🔷', img: '/mytools/icons/cytus2.webp', fill: true, color: 205 },
        { name: '古树旋律', url: 'https://www.rayark.com/g/deemo/', tapId: 6759, emoji: '🌳', img: '/mytools/icons/deemo.webp', fill: true, color: 130 },
        { name: '花雨旋律', url: 'https://www.taptap.cn/app/180183', tapId: 180183, emoji: '🌧️', img: '/mytools/icons/huayu-xuanlv.webp', fill: true, color: 200 },
        { name: 'AstroDX', url: 'https://wiki.astrodx.com/cn', emoji: '🌟', img: '/mytools/icons/astrodx.webp', fill: true, color: 35 },
        { name: '节奏大师', url: 'https://da.qq.com/', tapId: 7057, emoji: '🎧', img: '/mytools/icons/jiezou-dashi.webp', fill: true, color: 210 },
        { name: '异环', url: 'https://yh.wanmei.com/index.html', img: '/mytools/icons/nte.webp', fill: true, color: 195 },
        { name: 'Milthm', url: 'https://milthm.com/', tapId: 301888, emoji: '🌙', img: '/mytools/icons/milthm.webp', fill: true, color: 285 },
        { name: 'Minecraft', url: 'https://www.minecraft.net/', tapId: 43639, emoji: '⛏️', img: '/mytools/icons/minecraft.webp', fill: true, color: 100 },
        { name: 'Arcaea', url: 'https://arcaea.lowiro.com/', emoji: '💠', img: '/mytools/icons/arcaea.webp', fill: true, color: 195 },
        { name: 'hololive Dreams', url: 'https://www.hololive-dreams.com/en', emoji: '💫', img: '/mytools/icons/hololive-dreams.webp', fill: true, color: 330 },
        { name: '同步音律', url: 'https://www.taptap.cn/app/6908', tapId: 6908, emoji: '🎼', img: '/mytools/icons/musynx.webp', fill: true, color: 260 },
        { name: 'TAKUMI³', url: 'https://www.taptap.cn/app/193975', tapId: 193975, emoji: '🛠️', img: '/mytools/icons/takumi3.webp', fill: true, color: 30 },
        { name: '跳舞的线', url: 'https://www.taptap.cn/app/31429', tapId: 31429, emoji: '💃', img: '/mytools/icons/dancing-line.webp', fill: true, color: 150 },
        { name: '节奏医生', url: 'https://rhythmdr.com/', img: '/mytools/icons/RhythmDoctor.webp', fill: true, color: 150 },
        { name: '冰与火之舞', url: 'https://7thbe.at/', img: '/mytools/icons/adofai.webp', fill: true, color: 150 },
        { name: 'DJMAX RESPECT V', url: 'https://www.djmaxrespect.com/', img: '/mytools/icons/djmax.webp', fill: true, color: 150 },
        { name: 'osu!', url: 'https://osu.ppy.sh/', img: '/mytools/icons/osu.webp', fill: true, color: 150 },
        { name: '范式：起源', url: 'https://paradigmchina.tunergames.com/', tapId: 203917, emoji: '🌀', img: '/mytools/icons/paradigm-reboot.webp', fill: true, color: 42 },
        { name: 'RYCEAM', url: 'https://www.taptap.cn/app/237034', tapId: 237034, emoji: '🎹', img: '/mytools/icons/ryceam.webp', fill: true, color: 45 },
        { name: 'Blue Archive', url: 'https://bluearchive.jp/', tapId: 316964, emoji: '🎀', img: '/mytools/icons/blue-archive.webp', fill: true, color: 220 },
        { name: 'ChainBeeT', url: 'https://www.taptap.cn/app/314277', emoji: '🐝', img: '/mytools/icons/chainbeet.webp', fill: true, color: 48 },
        { name: 'Dynamix', url: 'https://www.taptap.cn/app/7082', emoji: '🔺', img: '/mytools/icons/dynamix.webp', fill: true, color: 15 },

        // ---- 第二页：自己的东西 ----
        // 图标优先抓各自官网声明的 icon（apple-touch-icon / rel=icon）；官网没有或站点挂了的继续用 emoji。
        { name: '雪绘 Bot', url: 'http://yukiebot.top', emoji: '❄️', img: '/mytools/icons/yukiebot.webp', fill: true, color: 195 },
        { name: 'Ksmbot', url: 'http://ksmbot.top', emoji: '🎀', img: '/mytools/icons/ksmbot.webp', fill: true, color: 340 },
        // sparkbridge 的 logo 是圆形透明图（四角 22% 是透明的），所以不写 fill，
        // 让它按 imageInset 缩进后垫在 color 底色上，不然方形投影会露在一个圆外面
        { name: 'Sparkbridge', url: 'http://sparkbridge.cn', emoji: '🌉', img: '/mytools/icons/sparkbridge.webp', color: 225 },
        // 本地工具页没写任何 icon，只能用 emoji
        { name: 'PianoScribe', url: '/mytools/PianoScribe.html', emoji: '🎹', img: '', color: 315 },
        { name: 'Web 跳转器', url: '/mytools/webJumpAny.html', emoji: '🧭', img: '', color: 250 },
        // 回到首页用的是站内 static/img/rabbit.jpg
        { name: '回到首页', url: '/', emoji: '🏠', img: '/mytools/icons/home.webp', fill: true, color: 210 }
    ],

    /* ---------------- Dock 图标（一般不放名字） ----------------
     * 图标来自 App Store（iTunes Search API，见 icons/README.md），
     * 苹果给的是不带透明通道的正方形图，所以都写 fill: true。
     * Play 商店 苹果商店没有，保持 emoji。
     * 注意 bilibili / 淘宝 的官方图标会随活动变（现在是英雄联盟S16 / 天猫双11 那版），
     * 不想要这种带活动横幅的，自己换张图填 img 就行。 */
    dockItems: [

        { name: 'QQ', url: 'https://im.qq.com/', emoji: '🐧', img: '/mytools/icons/qq.webp', fill: true, color: 205 },
        { name: '微信', url: 'https://weixin.qq.com/', emoji: '💬', img: '/mytools/icons/wechat.webp', fill: true, color: 130 },
        { name: 'QQ音乐', url: 'https://y.qq.com/', emoji: '💬', img: '/mytools/icons/yqq.webp', fill: true, color: 130 },
        { name: 'Edge', url: 'https://www.bing.com/', emoji: '🌐', img: '/mytools/icons/edge.webp', fill: true, color: 200 },
        { name: 'bilibili', url: 'https://www.bilibili.com/', emoji: '📺', img: '/mytools/icons/bilibili.webp', fill: true, color: 330 },
        { name: 'GitHub', url: 'https://github.com/', emoji: '🐙', img: '/mytools/icons/github.webp', fill: true, color: 260 }
    ]
};
