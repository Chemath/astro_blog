# Astro Blog

一个基于 Astro 6 的静态博客项目，使用 Markdown 管理文章内容，集成 RSS、Sitemap 和 Waline 评论能力，适合作为个人博客或内容站点的起点模板。

## 功能

- Astro 6 静态站点生成
- Markdown 内容管理
- Astro Content Collections
- 文章列表与文章详情页
- RSS 输出
- Sitemap 自动生成
- Waline 评论集成
- Tailwind CSS 4 样式体系

## 技术栈

- Astro `^6.1.7`
- Tailwind CSS `^4.1.18`
- `@astrojs/rss`
- `@astrojs/sitemap`
- `@tailwindcss/vite`

## 项目结构

```text
/
├─ public/
├─ src/
│  ├─ components/
│  ├─ content/
│  │  └─ posts/
│  ├─ layouts/
│  ├─ pages/
│  │  └─ posts/
│  ├─ styles/
│  ├─ utils/
│  └─ content.config.ts
├─ astro.config.mjs
├─ package.json
├─ LICENSE
└─ README.md
```

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址为 `http://localhost:4321`。

## 构建与预览

```bash
npm run build
npm run preview
```

构建产物输出到 `dist/`。

## 写文章

将文章放在 `src/content/posts/` 目录下，使用 `.md` 文件。

最小 frontmatter 示例：

```md
---
title: "文章标题"
date: 2026-04-18
description: "一句简短摘要"
---

# 正文标题
```

当前支持的 frontmatter 字段：

- `title`
- `date`
- `description`

## 评论配置

在项目根目录创建 `.env` 或 `.env.local`：

```env
PUBLIC_WALINE_SERVER_URL=https://your-waline-server.example.com
```

如果未配置该变量，文章页会显示未配置提示。

## 自定义站点信息

公开仓库默认使用通用占位配置，部署前可按需修改以下文件：

- `astro.config.mjs`：站点域名
- `src/layouts/Layout.astro`：站点名称、头像等基础信息
- `src/pages/about.astro`：关于页内容
- `src/pages/rss.xml.js`：RSS 标题与描述

## 部署

这是一个静态站点，可部署到：

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

部署前建议先执行：

```bash
npm run build
```

## License

本项目基于 MIT License 开源，详见 [LICENSE](./LICENSE)。
