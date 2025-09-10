
const CUSTOM_UA = localStorage.getItem('customUA') || 'Mozilla/5.0 (Custom-UA)';

// 拦截所有请求并修改 UA
self.addEventListener('fetch', (event) => {
    const newHeaders = new Headers(event.request.headers);
    newHeaders.set('User-Agent', CUSTOM_UA);

    const newRequest = new Request(event.request, {
        headers: newHeaders,
        credentials: 'include'
    });

    event.respondWith(fetch(newRequest));
});