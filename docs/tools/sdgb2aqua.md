---
sidebar_position: 1
---

import IframeWithDynamicSrc from '@site/src/components/IframeWithDynamicSrc';


# 舞萌国服数据转Aqua服工具

---

2024.12.28 添加水鱼api存档转换支持

2024.12.22 修复部分错误导致的部分存档无法进入游戏

2024.12.20 添加落雪maimai存档转换

---

随手写的一个用来把国服舞萌的部分游戏记录导入到私服的小工具，也算是希望能帮到大家了。

~~也许未来会支持chunithm也说不定喔~~

请选择你的阵营（）

1.在tg某麦当劳机器人使用/getplaydata json下载gamedata.json打开[maidatatrans.html](https://danieltoyama.github.io/MaiData2Aqua/maidatatrans.html),导入gamedata.json并且转换

2.使用[lxns.html](https://danieltoyama.github.io/MaiData2Aqua/lxns.html)从落雪maimai工具转换

3.使用[divingfish.html](https://danieltoyama.github.io/MaiData2Aqua/divingfish.html)从水鱼maimai工具转换(P.S.:因为使用了Cloudfare的服务可能部分地区需要使用VPN才能正常使用)

4.本地启动Nodejs环境使用[index.js](https://danieltoyama.github.io/MaiData2Aqua/index.js)转换麦当劳机器人获取的数据（非常不推荐）

github链接：https://github.com/DanielToyama/MaiData2Aqua