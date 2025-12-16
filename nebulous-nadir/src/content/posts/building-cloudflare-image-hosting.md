---
title: 使用 Cloudflare R2 搭建个人图床
description: 详细记录使用 Cloudflare R2 对象存储搭建个人图床的完整流程，包括存储桶配置、API设置和PicGo客户端集成，实现高效图片托管。
date: 2025-09-20
---
最近使用Hugo＋GitHub＋Vercel＋Cloudflare CDN构建了自己的个人博客网站，考虑到需要可能会上传一部分照片，Blog不可能只有文字，图片是必不可少的一部分，就起了搭建图床的想法。其实SM图床免费的也还行，但是有时候会出现识别问题，所以最后还是决定自己搭建一个，考虑到价格的问题，就想着薅一下羊毛，毕竟“赛博大善人”的名号不是叫着玩的。

## Cloudflare

前面已经在搭建网站时就已经注册过了，毕竟域名都是在这上面注册的，这里就按下不表了。如果有不清楚的，可以在[哔哩哔哩](https://bilibili.com)上找到相关教程。

进入页面之后，选择`R2 对象存储`，之后`创建存储桶`，你需要设置一个自己喜欢的名字，请记住他！之后在PicGo配置图床的时候需要填写他。之后配置一个自己拥有的域名（如果你将域名的DNS托管在Cloudflare，这一步会很简单），同时并允许`公共开发URL`。

这时候你就可以回到`R2对象存储`页面，设置一个API（`将R2与API配合使用`），将配置的API密钥都保存下来，包含令牌值、访问密钥 ID、机密访问密钥以及为 S3 客户端使用管辖权地特定的终结点。

做完这些工作，与Cloudflare的操作就算结束了。

## PicGo

在GitHub下载[PicGo](https://github.com/Molunerfinn/PicGo)，我选择的是v2.4.0-beta.10，我试过2.3.1 正式版，没办法正常检索插件S3。

![PicGo插件设置](https://img.chemath.com/PicGo插件设置.webp)

你安装红框内的S3插件之后，在图床设置的位置就会出现Amazon S3选项，点击进入，填写在Cloudflare记录的相关的API令牌和桶名即可。

![AmazonS3设置](https://img.chemath.com/AmazonS3设置.png)

- `图床配置名`不用动，你也可以使用自己喜欢的名称
- `应用密钥ID`就是在Cloudflare API令牌中的`访问密钥 ID`
- `应用密钥`是你在Cloudflare API令牌中的`机密访问密钥`
- `桶名`就是`创建存储桶`设置的名称
- 上传文件路径我是选的 `{fileName}.{extName}`
- `自定义节点`一定要填写！是Cloudflare API令牌中的`为 S3 客户端使用管辖权地特定的终结点`中默认下面的链接
- `设置输出图片URL前缀`，是为了让你能直接在PicGo中的相册预览图片。由于我在Cloudflare中设置的自定义域名为`https://img.chemath.com`所以我就填写了这个`https://img.chemath.com/`，这样我上传的图片的文件名和拓展名都能保留

其他配置保持默认即可，确认参数无误后点击确定与设置为默认图床即可。