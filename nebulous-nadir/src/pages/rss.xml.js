import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts'); // 改为 'posts'
  
  return rss({
    title: 'Chemath',
    description: '写写文字，记录生活。',
    site: context.site,
    items: posts
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date)) // 按日期排序
      .map((post) => ({
        title: post.data.title,
        pubDate: new Date(post.data.date), // 使用 date 而不是 pubDate
        description: post.data.description,
        link: `/posts/${post.slug}/`, // 或者根据你的实际路由调整
      })),
    customData: `<language>zh-cn</language>`,
  });
}