import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishedDate: z.string(),
    status: z.enum(['draft', 'approved', 'live', 'rejected']).default('draft'),
    price: z.string().nullish(),
    image: z.string().nullish(),
    gallery: z.array(z.string()).nullish(),
    buyUrl: z.string().nullish(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { articles };
