// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 定义posts集合
const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().or(z.date()),
    tags: z.array(z.string()).optional(),
  })
});

export const collections = { posts };