import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');

  return rss({
    title: 'Chemath',
    description: '写写文字，记录生活。',
    site: context.site,
    items: posts
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
      .map((post) => ({
        title: post.data.title,
        pubDate: new Date(post.data.date),
        description: post.data.description,
        link: `/posts/${post.id}/`,
      })),
    customData: `<language>zh-cn</language>`,
  });
}
