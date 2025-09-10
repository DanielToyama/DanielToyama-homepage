// 从 localStorage 读取自定义 UA，若无则使用默认值
const CUSTOM_UA = localStorage.getItem('customUA') || 'Mozilla/5.0 (Custom-UA)';

// 拦截所有请求并修改 UA
self.addEventListener('fetch', (event) => {
    const newHeaders = new Headers(event.request.headers);
    newHeaders.set('User-Agent', CUSTOM_UA);

    const newRequest = new Request(event.request, {
        headers: newHeaders,
        credentials: 'include' // 保留 Cookie 等登录状态
    });

    event.respondWith(fetch(newRequest));
});