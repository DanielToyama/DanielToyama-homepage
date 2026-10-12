#!/usr/bin/env node
/*
 * 把图片链接（或本地文件）转成 180x180 的 webp，丢进 static/mytools/icons/。
 *
 * 用法：
 *   node scripts/add-icon.mjs <链接> [名字]
 *   node scripts/add-icon.mjs 名字=<链接> [名字=<链接> ...]
 *   npm run add-icon -- 名字=<链接>
 *
 * 例子：
 *   node scripts/add-icon.mjs phigros=https://img-tc.tapimg.com/market/images/cee5....png/_tap_appicon.jpg
 *   node scripts/add-icon.mjs https://music.163.com/xxx.png netease-music
 *   node scripts/add-icon.mjs ./下载/logo.png mylogo            # 本地文件也行
 *
 * 参数：
 *   --size=180        目标边长（默认 180）
 *   --quality=88      webp 质量（默认 88）
 *   --dir=<路径>      输出目录（默认 static/mytools/icons）
 *
 * 它会顺手处理这些坑：
 *   - 保留透明通道（TapTap 图标那种四角透明的圆角方图）
 *   - 源图比目标小就不放大（比如 TapTap 上 hololive Dreams 只有 32px，放大只会更糊）
 *   - 不是正方形的图用透明补成正方形，这样 fill / contain 两种模式都不会变形
 *   - 算一下透明像素占比，并给出该不该写 fill 的建议
 *   - 最后打印一行可以直接粘进 tabletHome.config.js 的配置
 *
 * 依赖：ffmpeg / ffprobe 在 PATH 里（只用到这两个，没有别的 npm 依赖）。
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_DIR = path.join(ROOT, 'static', 'mytools', 'icons');
const UA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36';

/* ------------------------------- 工具函数 ------------------------------- */

const run = (cmd, args) =>
    execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 });

const isUrl = (s) => /^https?:\/\//i.test(s);

const slugify = (s) =>
    String(s)
        .trim()
        .replace(/[\\/:*?"<>|\s]+/g, '-')
        .replace(/^-+|-+$/g, '');

// 从链接里猜个名字；猜不出来（网易/苹果那种一长串 hash）就返回空
const slugFromUrl = (url) => {
    try {
        const last = new URL(url).pathname.split('/').filter(Boolean).pop() || '';
        const s = last.replace(/\.[a-z0-9]+$/i, '');
        if (!s) return '';
        if (/^[0-9a-f]{12,}$/i.test(s)) return '';
        if (/^_?tap_appicon/i.test(s)) return '';
        return slugify(s);
    } catch (error) {
        return '';
    }
};

const probe = (file) => {
    const out = run('ffprobe', [
        '-v', 'error',
        '-select_streams', 'v:0',
        '-show_entries', 'stream=codec_name,width,height,pix_fmt',
        '-of', 'csv=p=0',
        file,
    ]).toString().trim();
    const [codec, width, height, pixFmt] = out.split(',');
    return { codec, width: Number(width), height: Number(height), pixFmt };
};

// 透明像素占比（缩到 64x64 再数，够准且快）
const alphaRatio = (file) => {
    const buf = run('ffmpeg', [
        '-nostdin', '-v', 'error', '-i', file,
        '-vf', 'scale=64:64', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-',
    ]);
    const total = Math.floor(buf.length / 4);
    if (!total) return 0;
    let transparent = 0;
    for (let i = 3; i < buf.length; i += 4) if (buf[i] < 250) transparent += 1;
    return transparent / total;
};

// 透明占比 → 该不该写 fill。返回 { fill, text }
const advise = ({ width, height }, alpha) => {
    const pct = alpha * 100;
    const square = Math.abs(width - height) <= Math.max(width, height) * 0.02;
    if (!square) {
        return {
            fill: true,
            text: `源图不是正方形（${width}x${height}），已用透明补成正方形 → 先看一眼效果再定 fill`,
        };
    }
    if (pct < 15) {
        return {
            fill: true,
            text: `不透明的整块方图（透明 ${pct.toFixed(0)}%，一般只是圆角）→ 写 fill: true，不垫底色`,
        };
    }
    if (pct < 32) {
        return {
            fill: false,
            text: `透明 ${pct.toFixed(0)}%，八成是圆形 logo → 别写 fill，让它垫在 color 底色上（方形投影露在圆外面会很难看）`,
        };
    }
    return {
        fill: false,
        text: `透明 ${pct.toFixed(0)}%，是个小 logo → 别写 fill，给 color 垫底，必要时再配 icon.imageInset 调留白`,
    };
};

const fmtSize = (bytes) =>
    bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)}MB` : `${(bytes / 1024).toFixed(1)}KB`;

const download = async (url, dest) => {
    const res = await fetch(url, {
        headers: { 'User-Agent': UA, Referer: new URL(url).origin + '/' },
        redirect: 'follow',
    });
    if (!res.ok) throw new Error(`下载失败 HTTP ${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 100) throw new Error('返回内容太小，可能不是图片');
    fs.writeFileSync(dest, buf);
    return buf.length;
};

/* ------------------------------- 参数解析 ------------------------------- */

const argv = process.argv.slice(2);
const flags = { size: 180, quality: 88, dir: DEFAULT_DIR };
const sources = [];

for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') {
        console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0].replace(/^\/\*/, '').trim());
        process.exit(0);
    }
    if (/^--size=/.test(arg)) { flags.size = Number(arg.split('=')[1]); continue; }
    if (/^--quality=/.test(arg)) { flags.quality = Number(arg.split('=')[1]); continue; }
    if (/^--dir=/.test(arg)) { flags.dir = path.resolve(arg.split('=')[1]); continue; }

    // 名字=<来源>
    const eq = arg.match(/^([^=/\\]+)=(.+)$/);
    if (eq) {
        sources.push({ name: eq[1], source: eq[2] });
        continue;
    }
    // <来源> [名字]
    const next = argv[i + 1];
    const hasName = next && !isUrl(next) && !next.startsWith('--') && !next.includes('=');
    if (isUrl(arg) || fs.existsSync(arg)) {
        sources.push({ name: hasName ? next : '', source: arg });
        if (hasName) i += 1;
    } else {
        sources.push({ name: arg, source: '' });
    }
}

if (sources.length === 0) {
    console.error('没给来源。用法：node scripts/add-icon.mjs <链接> [名字]  或  名字=<链接>\n加 --help 看完整说明。');
    process.exit(1);
}

/* --------------------------------- 主流程 -------------------------------- */

try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch (error) {
    console.error('找不到 ffmpeg，请先确认它在 PATH 里（ffmpeg -version 能跑通）。');
    process.exit(1);
}

fs.mkdirSync(flags.dir, { recursive: true });
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'add-icon-'));
let ok = 0;
let failed = 0;

for (const item of sources) {
    const { source } = item;
    let name = slugify(item.name);

    if (!source) {
        console.error(`✗ ${name || '(无名)'}：没有给来源。写法是 名字=<链接> 或 <链接> 名字`);
        failed += 1;
        continue;
    }
    if (!name) name = slugFromUrl(source);
    if (!name) {
        console.error(`✗ ${source}\n   从链接里猜不出名字（多半是一长串 hash），请补一个，例如：\n   node scripts/add-icon.mjs 我的图标=${source}`);
        failed += 1;
        continue;
    }

    const raw = path.join(tmpDir, `${name}.raw`);
    const out = path.join(flags.dir, `${name}.webp`);
    try {
        const bytes = isUrl(source) ? await download(source, raw) : fs.copyFileSync(source, raw) ?? fs.statSync(raw).size;
        const info = probe(raw);
        if (!info.width || !info.height) throw new Error('ffprobe 读不出尺寸，可能不是图片');

        const alpha = alphaRatio(raw);
        const maxSide = Math.max(info.width, info.height);
        const size = Math.min(flags.size, maxSide); // 不放大
        const upscaled = size < flags.size;

        run('ffmpeg', [
            '-nostdin', '-y', '-v', 'error', '-i', raw,
            '-vf', `scale=${size}:${size}:force_original_aspect_ratio=decrease,pad=${size}:${size}:(ow-iw)/2:(oh-ih)/2:color=0x00000000`,
            '-c:v', 'libwebp', '-quality', String(flags.quality), '-compression_level', '6',
            out,
        ]);

        const outBytes = fs.statSync(out).size;
        const rel = `/mytools/icons/${name}.webp`;
        const advice = advise(info, alpha);
        console.log(`✅ ${name}.webp  ${size}x${size}  ${fmtSize(outBytes)}  （源 ${info.width}x${info.height} ${info.codec}，下载 ${fmtSize(bytes)}）`);
        if (upscaled) console.log(`   ⚠ 源图只有 ${maxSide}px，没放大到 ${flags.size}，免得糊`);
        console.log(`   建议：${advice.text}`);
        console.log(`   配置行：{ name: '${name}', url: '', emoji: '', img: '${rel}'${advice.fill ? ', fill: true' : ''}, color: 210 },`);
        console.log('');
        ok += 1;
    } catch (error) {
        console.error(`✗ ${name}：${error.message}`);
        failed += 1;
    }
}

fs.rmSync(tmpDir, { recursive: true, force: true });
console.log(`完成：成功 ${ok} 个${failed ? `，失败 ${failed} 个` : ''}。文件在 ${path.relative(ROOT, flags.dir).replace(/\\/g, '/')}/`);
if (ok) console.log('记得把配置行里的 name / url / color 改成你要的，然后 git add 图片。');
