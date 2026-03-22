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

const looks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedDate: z.string(),
    status: z.enum(['draft', 'approved', 'live', 'rejected']).default('draft'),
    featured: z.boolean().optional().default(false),
    season: z.string().optional(),
    coverImage: z.string().optional(),
    items: z.array(z.object({
      name: z.string(),
      brand: z.string(),
      category: z.string(),
      price: z.string().optional(),
      buyUrl: z.string().optional(),
      image: z.string(),
    })),
  }),
});

export const collections = { articles, looks };
