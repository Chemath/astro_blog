# Astro Blog

一个基于 Astro 6 构建的静态博客项目，使用 Markdown 管理文章内容，Tailwind CSS 4 负责样式，内置 RSS、Sitemap 和 Waline 评论能力。

这个仓库已经完成从 Astro 5 到 Astro 6 的内容系统迁移，当前文章通过 `src/content.config.ts` 中的 `posts` collection 加载，并由 `src/pages/posts/[slug].astro` 渲染。

## 功能概览

- Astro 6 静态站点生成
- Markdown 文章内容管理
- 基于 Content Collections 的文章校验
- 首页最近文章展示
- 文章列表页
- 文章详情页
- RSS 输出
- Sitemap 自动生成
- Waline 评论集成
- Tailwind CSS 4 样式系统

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
│  └─ favicon.ico
├─ src/
│  ├─ components/
│  │  ├─ TableOfContents.astro
│  │  ├─ Waline.astro
│  │  └─ Welcome.astro
│  ├─ content/
│  │  └─ posts/
│  │     └─ *.md
│  ├─ layouts/
│  │  └─ Layout.astro
│  ├─ pages/
│  │  ├─ about.astro
│  │  ├─ index.astro
│  │  ├─ rss.xml.js
│  │  └─ posts/
│  │     ├─ [slug].astro
│  │     └─ index.astro
│  ├─ styles/
│  │  └─ global.css
│  ├─ utils/
│  │  └─ date.js
│  └─ content.config.ts
├─ astro.config.mjs
├─ package.json
└─ README.md
```

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

默认会启动在 `http://localhost:4321`。

### 3. 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/`。

### 4. 本地预览构建结果

```bash
npm run preview
```

## 可用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 构建静态站点到 `dist/` |
| `npm run preview` | 本地预览构建结果 |
| `npm run astro` | 运行 Astro CLI |

## 如何写文章

所有文章放在 `src/content/posts/` 目录下，文件格式为 `.md`。

### 最小 frontmatter

```md
---
title: "文章标题"
date: 2026-04-18
description: "一句简短摘要，可选但推荐填写"
---

# 正文标题

这里开始写 Markdown 正文。
```

### 当前支持的 frontmatter 字段

这些字段由 `src/content.config.ts` 校验：

- `title`: 必填，字符串
- `date`: 必填，日期，会被 `z.coerce.date()` 转成 `Date`
- `description`: 可选，字符串

### 文章路由规则

`src/content/posts/hello-world.md` 会生成：

```text
/posts/hello-world/
```

当前项目在 Astro 6 下使用内容条目的 `id` 作为路由参数，因此文章链接和详情页生成逻辑都依赖文件名。

## 内容系统说明

项目使用 Astro Content Collections 管理文章，而不是直接从 `src/pages` 读取 Markdown 页面。

核心配置文件：

- `src/content.config.ts`
- `src/pages/posts/[slug].astro`
- `src/pages/posts/index.astro`
- `src/pages/index.astro`

当前集合定义为：

- 集合名：`posts`
- 内容目录：`src/content/posts`
- 文章详情页通过 `render(post)` 渲染 Markdown 内容

如果你后续升级 Astro 或调整内容目录，请确保下面三者始终一致：

- `getCollection('posts')`
- `src/content.config.ts` 里的集合名
- `loader: glob({ base: './src/content/posts' })`

## 评论系统

项目集成了 Waline 评论组件，代码位于 `src/components/Waline.astro`。

### 启用方式

在项目根目录创建 `.env` 或 `.env.local`：

```env
PUBLIC_WALINE_SERVER_URL=https://your-waline-server.example.com
```

### 说明

- 变量名必须是 `PUBLIC_WALINE_SERVER_URL`
- 如果未配置，文章页会显示“Waline 未配置”的提示块
- 评论路径默认使用当前页面路径

## RSS 与 Sitemap

### RSS

RSS 生成文件位于：

- `src/pages/rss.xml.js`

访问路径：

```text
/rss.xml
```

### Sitemap

Sitemap 通过 `@astrojs/sitemap` 自动生成。

配置文件：

- `astro.config.mjs`

输出路径通常为：

```text
/sitemap-index.xml
```

## 需要按需修改的地方

### 1. 站点域名

在 `astro.config.mjs` 中修改：

```js
site: 'https://chemath.com'
```

如果你要部署到自己的域名，必须更新这里，否则 RSS、Sitemap 和部分绝对链接会不准确。

### 2. 站点名称与头像

在 `src/layouts/Layout.astro` 中修改：

- `name`
- `avatar`

这会影响侧边栏、页面标题等展示内容。

### 3. About 页面内容

在 `src/pages/about.astro` 中修改个人介绍、时间线和链接文案。

## 部署建议

这是一个静态输出项目，适合部署到：

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- 任意支持静态文件托管的平台

部署前建议至少执行一次：

```bash
npm run build
```

确认没有构建报错后，再上传 `dist/` 或接入平台自动构建。

## 常见问题

### 1. Markdown 文章不显示

优先检查以下几项：

- 文章是否放在 `src/content/posts/`
- frontmatter 是否包含 `title` 和 `date`
- `src/content.config.ts` 是否仍然定义为 `posts`
- 页面里是否仍然使用 `getCollection('posts')`

### 2. Astro 升级后文章页报错

Astro 6 内容层和旧写法有差异，重点检查：

- 是否错误地继续使用 `post.slug`
- 是否错误地继续使用 `post.render()`

当前正确写法是：

```ts
import { getCollection, render } from 'astro:content';

const posts = await getCollection('posts');
const { Content, headings } = await render(post);
```

### 3. Waline 不显示评论框

检查：

- `PUBLIC_WALINE_SERVER_URL` 是否存在
- Waline 服务端是否可访问
- 浏览器控制台是否有加载错误

## 后续可扩展方向

- 增加文章封面图字段
- 增加标签和分类系统
- 增加草稿字段和草稿过滤
- 增加分页
- 增加全文搜索
- 增加 MDX 支持
- 增加图片懒加载和图片优化

## License

如果你打算公开发布这个项目，建议补充一个明确的许可证文件，例如 `MIT`。
