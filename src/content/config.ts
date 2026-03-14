import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishedDate: z.string(),
    status: z.enum(['draft', 'approved', 'live', 'rejected']).default('draft'),
    price: z.string().optional(),
    image: z.string().optional(),
    buyUrl: z.string().optional(),
  }),
});

export const collections = { articles };
