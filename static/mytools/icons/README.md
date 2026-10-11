# 图标图片放这里

在 `static/mytools/tabletHome.config.js` 的 `icons` / `dockItems` 里，把 `img` 写成
`/mytools/icons/文件名.webp` 就会用这张图；`img: ''` 则回退到 `emoji`。

## 当前已有的文件（34 个，共 376KB，都是 180×180 webp）

| 来源 | 文件 | 说明 |
|---|---|---|
| TapTap | 21 个音游图标 | `phigros` `project-sekai` `paradigm-reboot` `musedash` `ryceam` `rotaeno` `band-dream` `orzmic` `cytus2` `blue-archive` `rizline` `malody` `cytus` `astrodx` `jiezou-dashi` `chainbeet` `milthm` `minecraft` `arcaea` `dynamix` `deemo` |
| App Store | 9 个应用图标 | `edge` `netease-music` `qq` `wechat` `bilibili` `github` `taobao` `zhihu` `baidu` |
| 站点自己的 icon | 4 个 | `yukiebot`(128px) `ksmbot`(96px) `sparkbridge`(180px) `home` |

`home.webp` 取自站内 `static/img/rabbit.jpg`（640×640），不是抓来的。
`yukiebot` / `ksmbot` 是 ICO 里最大的那帧（128 / 96px），没有再放大以免糊。

统一用 `ffmpeg -i 原图 -vf scale=180:180:flags=lanczos -c:v libwebp -quality 88` 转出来的。
（注意跑 ffmpeg 时加 `-nostdin`，否则在 `while read` 循环里会吃掉 stdin、把下一行首字符吞掉。）

### 音游图标：TapTap

`tabletHome.config.js` 里每行末尾 `// tt:<app id>` 就是 TapTap 的 app id。

```bash
# GET 详情接口不需要 CSRF；X-UA 从页面 performance 里捞一个就行，不带多半也能返回
curl "https://www.taptap.cn/webapiv2/app/v4/detail?id=165287&X-UA=V%3D1%26PN%3DWebApp%26LANG%3Dzh_CN"
# data.icon.url → 图标地址；去掉末尾 /_tap_appicon.jpg 就是 270px 的 PNG（带透明圆角）
```

搜 app id 的办法：浏览器开 `https://www.taptap.cn/search/apps/<关键词>`，等 5 秒左右结果才渲染，
从 DOM 取 `a[href="/app/<数字>"]`（注意排除侧栏的 `/app/<id>/topic`）。
TapTap 的搜索**只索引游戏**，微信/QQ/淘宝这类应用搜不到。

### 应用图标：App Store（iTunes Search API）

```bash
# 公开 JSON 接口，不用爬页面；中文词记得自己 percent-encode
curl "https://itunes.apple.com/search?term=%E5%BE%AE%E4%BF%A1&country=cn&entity=software&limit=6"
# 结果里的 artworkUrl100 把 100x100bb 换成 180x180bb 就是 180px 图
# GitHub 这类国内商店没有的，把 country 换成 us
```

苹果给的图标是**不带透明通道的正方形图**，所以要配 `fill: true`。
另外官方图标会随活动变（bilibili 现在是英雄联盟S16、淘宝是天猫双11 那版），
不想要带活动横幅的就自己换张图。

### 站点自己的 icon

直接读页面 HTML 里声明的 icon，优先 `apple-touch-icon`，其次 `rel=icon`，最后兜底 `/favicon.ico`：

```bash
curl -s https://yukiebot.top/ | grep -o '<link[^>]*rel="[^"]*icon[^"]*"[^>]*>'
# 雪绘Bot → https://yukiebot.top/img/Yukie.ico
# Ksmbot  → https://ksmbot.top/img/ksm.ico
# SparkBridge → https://sparkbridge.cn/logo_round.jpg（其实是 1982×1982 的 PNG，带透明通道）
```

ICO 里通常塞了多个尺寸，ffmpeg 直接读会取第一帧（一般就是最大的那帧）：

```bash
ffprobe -v error -show_entries stream=width,height -of csv=p=0 Yukie.ico   # 128,128
ffmpeg -i Yukie.ico -vf scale=128:128:flags=lanczos -c:v libwebp -quality 90 yukiebot.webp
```

**判断要不要写 `fill`**：数一下透明像素占比（把 webp 转 raw RGBA 数 alpha<250 的比例）。

- 占比 0% 左右 → 不透明的整块方图 → `fill: true`
- 占比 4~5% → 只是四角圆角透明，仍是整块方图 → `fill: true`
- 占比 ~21% 以上 → 是个圆形 logo（圆内切正方形的空白正好 21.5%），
  **不要写 `fill`**，让它垫在 `color` 底色上，否则方形的投影会露在一个圆外面

## 自己放图时的两种配法

- **带透明通道的小 logo**（四周留白、只有一个图形）
  `color` 就是垫在底下的颜色（数字色相或 `'#43b581'` 这类 CSS 颜色），
  默认还会按 `icon.imageInset` 缩进一圈，让 logo 别顶满格子。

- **铺满整格的正方形图**（TapTap / App Store 的图标都是这种）
  该项加 `fill: true`：铺满整格、不垫底色、不留白边，此时 `color` 无效。
  建议 256×256 或 512×512 的正方形 PNG/WebP。
