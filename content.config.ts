import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        pages: defineCollection({
            type: 'page',
            source: "pages/**/*.md"
        }),
        posts: defineCollection({
            type: 'page',
            source: "posts/**/*.md",
            schema: z.object({
                title: z.string(),
                date: z.date(),
                lead: z.string(),
                slug: z.string(),
                tags: z.array(z.string()),
            })
        })
    }
});