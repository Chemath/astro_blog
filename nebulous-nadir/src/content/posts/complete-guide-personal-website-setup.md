---
title: 从零开始：搭建个人网站的完整指南
description: 一站式个人网站搭建教程，涵盖域名注册、服务器选择、备案流程、WordPress部署、CDN配置及实用插件推荐。
date: 2024-08-10
---

## 一、首先需要一个域名（Domains）

推荐在[阿里云](https://www.aliyun.com/)上购买，这里的价格比常见的国外域名网站（[namecheap](https://www.namecheap.com/)，[GoDaddy](https://www.godaddy.com/)，[namesilo](https://www.namesilo.com/)）都便宜，如果你想省钱可以直接购买.top域名，注册十年只需要188元。但是还是推荐注册.com域名，因为这个后缀是最通用的，但是由于这个域名比较通用，所以比较难注册到自己喜欢的。

## 二、你需要购买一个云服务器

可以直接购买国内的云服务器商家（[阿里云](https://www.aliyun.com/)，[腾讯云](https://cloud.tencent.com/)以及[华为云](https://www.huaweicloud.com/)）。三家的云服务器都有针对新用户的优惠套餐，首年大概只要几十块钱，缺点是第二年续费很贵。但是现在腾讯云和阿里云都推出了99元的套餐（新老同享）。以阿里云为例，该99套餐可以续费到2026年，意味着你未来几年都可以以99元的低价保有上述云服务器。

但是通过国内的云服务器商家购买域名和服务器，需要进行ICP备案和公安备案。个人用户如果想快速通过备案流程，基本上只能进行非交互式的备案（这就意味着你的网站不能出现评论这个功能，只能当作展示页面）。

如果你不想备案，就只能购买海外的云服务器，常见的就是[Vultr](https://www.vultr.com/)，[Bandwagon](https://bandwagonhost.com/)（他家的CN2＋GIA线路直连国内效果很好，但是价格很贵），[亚马逊AWS](https://aws.amazon.com/cn/)等。只要你的云服务器不在中国大陆地区，都可以逃过备案的。

## 三、安装WordPress并搭建自己的网站

这里我们以阿里云为例，你先对自己的域名和服务器进行ICP备案，具体备案申请和所需的材料请查看阿里云的[ICP备案文档](https://beian.aliyun.com/)。备案流程如下图：

[![备案流程](https://s2.loli.net/2025/01/05/F9EulIdarL4DmV5.png)](https://s2.loli.net/2025/01/05/F9EulIdarL4DmV5.png)一般阿里云的初审没有问题，大概率管局终审也会通过，虽说管局需要20个工作日，但是我实际体验下来，大概一周就可以。

备案成功之后，借助FinalShell或者阿里云自带的远程访问工具连接服务器。如果不怎么熟悉Linux操作系统的小白。可以直接使用[宝塔面板](https://www.bt.cn/)（需要在云服务器安全组策略那里放行`443端口`，和宝塔面板外网访问的端口，其中`443端口`是用于申请SSL证书的）。安装完宝塔面板之后，需要绑定你的宝塔面板账户（非常想吐槽这个点），安装他推荐的运行环境。

访问[WordPress官网](https://wordpress.org/)，直接下载压缩包，随后在宝塔面板上上传刚刚下载的压缩包（这里可以参考[彼得汪的视频](https://www.bilibili.com/video/BV1Vg411w7os/)）。初始化你安装的WordPress，选择一个你喜欢的主题，这里我推荐[Blocksy主题](https://creativethemes.com/blocksy/)，主题的使用教程可以看梧[桐小课堂的这个视频](https://www.bilibili.com/video/BV1yt4y1z7qg)。网站的SSL证书可以直接在宝塔面板那里申请（需要放行`443端口`，支持自动续期），成功申请证书并部署之后，可以通过https访问自己的网站。

这是两个我觉得还不错的个人博客（[Another Dayu](https://anotherdayu.com/)和[Jack's Space](https://veryjack.com/)的网站，都是基于Blocksy主题）。

## 四、CDN服务和图床的搭建

### 1.CDN服务

经过上述过程你就可以得到一个你喜欢的个人博客网站。这时通过域名访问自己的网站，会发现通过Chrome浏览器的开发者工具很容易查询到自己的服务器公网IP地址，这会导致自己的服务器很容易被攻击。为了不泄露自己的服务器的公网IP，还需要为网站添加CDN服务。

对于个人博客，访问量一般是比较少的。我们可以尽量使用免费的CDN，首先常用的就是赛博大善人[Cloudflare](https://www.cloudflare-cn.com/)的CDN服务，你将自己网站的域名托管到Cloudflare即可。对于服务器在国内的用户，选择它可以说是瑕瑜互见。缺点是：Cloudflare在国内没有加速节点，所以他的CDN服务对于国内来说就是一个减速器；优点是：有一定的防御DDOS攻击的能力，个人用户可以完全白嫖他的CDN服务。

除此之外，你可以参加[又拍云联盟计划](https://www.upyun.com/league)，对于个人开发者，可以每月赠送一定流量的CDN和云存储空间。只需要在网站的页脚处添加又拍云的logo及[链接](https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral)。你可以通过我的[aff链接](https://console.upyun.com/register/?invite=CkW0zId9P)注册又拍云账号使用。

### 2.图床的搭建

你可以使用又拍云的云存储功能搭建属于自己的图床工具。常见的使用工具是PicGo＋对象存储，具体的搭建步骤可以看这个[文档](https://cloud.tencent.com/developer/article/1834572)。可以使用Typora＋PicGo，直接创建和编辑本地的markdown文件，同时启动图片自动上传功能。之后直接导出为HTML格式，发布到自己的网站上。

也可以直接使用[SM图床](https://sm.ms/)，自己注册一个免费账户。免费账户拥有5G的存储空间，限制上传单张照片的大小不超过5M.与又拍云的云存储一样，可以搭配PicGo和Typora一起使用。

## 五、使用的插件

**Blocksy Companion**：Blocksy主题的配套美化插件，选择Blocksy主题必备。

**Elementor**：可以和主题组合使用，实现一些个性化需求，缺点是有的主题不兼容，同时进阶功能需要付费开通Pro。

**Essential Addons for Elementor**：Elementor搭配插件。

**PRO Elements**：可以免费使用Elementor的Pro功能，可以免费[下载](https://proelements.org/)。

**Easy Table of Contents**：自动在文章最前方实现目录自动生成。

**UpdraftPlus-备份/恢复**：可以免费备份自己的Wordpress，一般用Google Drive或者Dropbox可以免费备份，但是使用OneDrive备份需要付费。

**Yoast SEO**：为文章提供 SEO 建议，但对中文文章优化有限，聊胜于无。

**WP-China-Yes**：解决评论区 WordPress 头像无法在国内显示的问题。

## 六、推荐字体

来自小米公司免费商用的字体Mi Sans，从[Jack's Space](https://veryjack.com/technique/how-to-build-blog/)处获得的代码。

在`主题-自定义-额外CSS`添加以下代码：

```css
@import url("https://font.sec.miui.com/font/css?family=MiSans:400,450:Chinese_Simplify,Latin&display=swap");

@font-face {
font-family: "MiSans", sans-serif;
font-weight: normal;
font-style: normal;
}
*:not([class*="icon"]):not(i) {
font-family: "MiSans" !important;
}
```

## 七、致谢

感谢[Jack](https://veryjack.com/)和[Dayu](https://anotherdayu.com/)的网站给我的参考。

感谢[彼得汪](https://www.bilibili.com/video/BV1Vg411w7os/)、[梧桐小课堂](https://www.bilibili.com/video/BV1yt4y1z7qg)和[IT楠老师](https://www.bilibili.com/video/BV1dm4y1X76F/)在哔哩哔哩的视频教程。

感谢小米公司发布的免费商用的字体，改善了本站在Mac和Windows系统下由于字体差异太大带来的不良浏览体验。