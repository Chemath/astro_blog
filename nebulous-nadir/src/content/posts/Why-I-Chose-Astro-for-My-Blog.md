---
title: "为何选择Astro搭建静态博客"
date: 2025-12-18
description: "从 Next.js 升级问题转向 Astro，实现低维护、高安全的静态博客，介绍技术栈与防护策略。"
---



## 这事得从一封邮件说起

最近被Next.js折腾得够呛，觉得还是记录一下比较好——万一有人跟我踩一样的坑呢？12月4日突然收到 Vercel Security的邮件，说Next.js 有react服务器组件中有一个严重漏洞（[CVE-2025-55182](https://tracking.inflection.io/02522a2b2726fb0a03bb19f2d8d9524d/gAAAAABpMNfq61RM8TfdHvZLVhGDjP_289f1spIg6rV8mwHMXV2KKyvYimWL6gEqylSPS2ADvlKGixnSPm36RudAsoNpn-wR9lWWspJqhgxDcsBZ-01cSApKTkoDnjsQr9XNVQa65jTfM9L_ugc73xwR2MUWPhIhIP8Ohhv88P9E2_TvQVZRbAgioP9ctohVIa3GFTmc-Omxgq6JddJas0j6_m3LI1QTFjzE88arFiPf7lajBUdkmgdmgMJuFhPsv8y0OOF2gApiFNE2mzDesdiNZESRNEMFtylI5TaP4yhFjT_JWvRNwbBvntjSu01y3qd_2bdE-6NdGZxXQUBValZ-5Dcqi5GWVYjCZk5nVWF98vdQrPlaDVdkHv36kYjFy02naD6Vj434T2ZRYaKoW3TiuBUT3xU_YWBAtZjoXEkzNEgKIwAGwoHZytP_-Owgwy8YsvG0_-DP2x771nDqkIBu_Z-Lier-u9-T2oVf7rUd8zecYemJuR8QxfOQ8WFPx3xNCp-ZP3p5pPeHBXkZjvhgAyFh9fEMwxCH3ohpfZ8eDU7ReY4zimRptCp8K7JcGknM9Z_ilfVgE9jR36dobGJfv5PMeEw5XzA_XOhVQKNYhbo5m9WcLFMt6mZfOPZj8mXvcLO850AC8PdSao52j0DHTMyzfdE2sZPWCIOoh6wlZBe5sW9PQ3mWBiYTdQevo11pxmqnofM3hxiEWIET7O3SStYWrJguSzVxD-YDon1KWZKgekE-1NcCqCgQMbIuFk0wYloLWe4rgQ3J5IgYvk4l_uRBJFUwhzhTAN0gZmLPiHtfxp306Klu8PVvzr9YoFvP7FJ1bqBFlZUM37L_wtLYWM6yEzbdE6Hrk-2hkFumMx345-k6bwULxoHrOlHb99t_dmhssEGnfg2NuBSXfkr0oS0dF-GIuCHhxhsUdhD6zYCZcpOK-90=/redirect?redirect=https://www.cve.org/CVERecord?id=CVE-2025-55182&inf_ver=2&inf_ctx=r6OyKji2QpzygNYN0nn-XdS-rx8Q2EbwyWWjABgXsSyylFiu9ZqyVzija7hUa_h0a4dPL-RConYXo9spx3Jr8d7J3qoRRivVrToSbBnPzQ0Vco7_N9n-P_ywdtLFNeH8FXN5HYBTBHF4vs4r6dgfiJL6HKDUvKjhSGqRotkEZbjFf-RrFjoGeaQYzlGUFUWuvzBS9flBV7WWAr5q1X-YFebR8FrjetDWYL1_8TvzOb2VciOSBC1biLMTWr3Lc6kMibhGI5w-QzpbT-g2v70k5ELvmCfHQmVFB8r16kjnDUH7PLbJ828ngHL_RE5Kagusnd02mFx1z_2U0LwTh3P85w%3D%3D)）被披露。我当时就有点懵——就硬着头皮升级到最新版，结果后面就又刷到了Next.js出现别的漏洞。那种感觉就像修好了漏水的水管，却发现别的地方又漏了。最后，我决定给我的博客站换成Astro。

## 我曾经的尝试

最早开始搭建博客，我和大多数小白一样，选择了WordPress。买了服务器并且绑定了域名，由于服务器位于中国大陆境内，我还给我的域名进行了ICP备案（这个过程倒是挺快的）以及网站进行了公安网备。但是我没有啥艺术细胞，没办法设计出自己看得顺眼的网站形态，此外感觉写博客有点麻烦，我个人是更喜欢在markdown写的东西，但是复制到WordPress自带的文档编辑器之后，总会有点小偏差。

此外嘛，就是我的钱包有点遭不住，既要续费域名，又要续费服务器，为了找便宜的服务器，还得迁移我的站点，我是真没招了。而且我最初觉得互联网应该就是”人人分享“的理想国，结果恶意爬虫和攻击脚本无处不在。我总是害怕自己的小站被人攻击，发布一些违规的内容，最后被上门修水管。好吧，我承认我是有点杞人忧天了。最后我还是决定关闭了站点。

后来换过Hexo和Hugo，但是他们满足不了我的定制化需求。我想着AI现在发展这么快，我直接辅助编程呗，遂用Next.js+Remark做自己的静态站点，既安全又现代。结果……嗯，你们知道开头发生了什么。其实我的Next.js项目一天都没有上线（虽然他已经写完了），就被Vercel Security的邮件弄得胎死腹中了。

## Astro 救了我的命

在兜兜转转的过程中，我最后选择了Astro。要不是在在[DeepSeek](https://chat.deepseek.com) 和[ChatGPT](https://chatgpt.com) 帮忙，我可能还在跟配置打架。ChatGPT帮助我搭建骨架，然后DeepSeek帮助我装修，材料用的是Tailwind CSS。总体来说，Astro 上手比我想象的顺太多，相较于Next.js结构简单很多，一周不到，我现在这个网站就上线了。

现在整体的技术栈看起来有点混搭：

- 主框架是**Astro**，配了Tailwind CSS v4
- 文章全用**Markdown**写，存在`content/posts`里
- 主站部署在**Vercel**上，用**Cloudflare**做DNS和防护
- 评论系统是**Waline**，绑定主站的子域名跑在**Vercel**上，同样使用**Cloudflare**做 DNS 和防护
- 此外图床使用的用**Cloudflare**的R2服务，并添加了WAF规则去防盗链（这玩意儿单纯的防君子不防小人）

这里得单独说说评论系统——之前在 Hexo 上用过 Waline，没做任何额外的设置，结果被脚本跑来发垃圾链接。最后就只能被迫关评论并停止使用Waline。这次加了 Cloudflare 的 Turnstile 验证，希望能够减少这种情况。

## 我现在怎么更新博客

特别简单：

1. 打开Typora，在`content/Posts`里新建个`.md`文件
2. 将自己自己写好markown文件的内容保存
3. 使用 GitHub Desktop 同步到GitHub的仓库
4. 等两分钟，刷一下网站——更新好了

都不用登录后台，不用点“发布”，不用清理缓存。这种体验，对于我这种懒得要命的人来说，简直救命。

## 一些碎碎念

我知道我这个小破站没人什么值得特意攻击，但该做的防护还是做了：

- Cloudflare 开了 WAF 和速率限制
- Vercel部署，然后自动开启HTTPS，免除了我要时常盯着证书失效了没，之前WordPress经常会出现，三个月之后自己不续签，掉了HTTPS

最后，希望这个站点可以安安全全的。

