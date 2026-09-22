---
sidebar_position: 3
---

# Web页面跳转器

随手搓的，用于使得那些奇奇怪怪的客户端内置webview跳转到想要去的任何地方。

一般的做法是寻找第三方api使用说明，然后找到腾讯云，sdk，打开仓库，github跳到这里来，就行了

页面里另外带了一个「WebView 诊断」面板：在目标 App 的内置浏览器里打开时，可以枚举 App 注入到页面上的原生对象（JSBridge），以及做一次带 Cookie 的直连测试。用于判断能不能借 App 的原生能力（发请求 / 取 token）绕开 CORS 和 SameSite 去调它自家的接口。诊断只读属性、不调用任何方法，报告里也不含数据，可以安全外发。



<a href="/mytools/webJumpAny.html" onClick={(e) => { e.preventDefault(); window.location.href = '/mytools/webJumpAny.html'; }}>全屏</a>

<iframe src="/mytools/webJumpAny.html" width="1000px" height="1000px"></iframe>

