import React, { useEffect, useState } from 'react';

/*
 * 网易云 outchain 播放器。
 *
 * 为什么要包一层组件而不是直接写 <iframe>：
 * 网易按 UA 分流——移动 UA 访问 /outchain/player 会 302 到
 *   http://music.163.com/m/outchain/player   ← 注意是明文 http
 * 而 HTTPS 页面里的 http iframe 属于「可阻止的混合内容」，Chrome/Edge/Safari 会直接
 * 拦掉这次 frame 导航（实测 Chrome 不做自动升级，frame 连文档都不提交），页面上就是一块空白。
 * 国产浏览器多数放宽/关闭了这条检查，所以反而能显示——不是新旧标准的问题，是它们更宽松。
 *
 * 所以移动端要显式请求 https 的 /m/ 路径（实测 200、无 X-Frame-Options，可以内嵌），
 * 桌面端用普通路径（实测 200）。两边都停在 https 上，就没有那一跳了。
 * 注意：同一个 /m/ 路径配桌面 UA 会 302 到 http://music.163.com/outchain/player，
 * 桌面端又会踩同一个坑，所以不能无条件都用 /m/。
 *
 * 服务端渲染时先不给 src，等 hydrate 后再按 UA 填，避免移动端白发一个必然被拦的请求。
 */
const DESKTOP_PATH = 'https://music.163.com/outchain/player?type=2&id=';
const MOBILE_PATH = 'https://music.163.com/m/outchain/player?type=2&id=';

const isMobile = () =>
    typeof navigator !== 'undefined' &&
    /Android|iPhone|iPad|iPod|Mobile|HarmonyOS/i.test(navigator.userAgent);

const NetEasePlayer = ({
    id,
    auto = false,
    width = '40%',
    height = 110,
    minWidth = '260px',
    maxWidth = '100%',
    title = '网易云音乐播放器',
}) => {
    const [src, setSrc] = useState(null);

    useEffect(() => {
        const path = isMobile() ? MOBILE_PATH : DESKTOP_PATH;
        setSrc(`${path}${id}&auto=${auto ? 1 : 0}&height=90`);
    }, [id, auto]);

    return (
        <iframe
            title={title}
            {...(src ? { src } : {})}
            width={width}
            height={height}
            frameBorder="no"
            border="0"
            marginWidth="0"
            marginHeight="0"
            style={{ minWidth, maxWidth }}
        />
    );
};

export default NetEasePlayer;
