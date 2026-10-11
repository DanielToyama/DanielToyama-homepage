# 壁纸放这里

在 `static/mytools/tabletHome.config.js` 里写：

```js
wallpaper: {
    image: '/mytools/wallpapers/pad.jpg',
    gradient: [ ... ],        // image 为空时才用
    overlay: 'rgba(0,0,0,0.25)',  // 可选，压暗一层让图标名看得清
    blur: 8                   // 可选，模糊 px
}
```

建议用横图（16:9 / 4:3），会被 `cover` 裁切铺满，所以主体内容别贴边。
图片越大越费流量，2K 以内就够，手机上看不出差别。
