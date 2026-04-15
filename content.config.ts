import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: {
        include: "pages/*.md",
        prefix: "/",
      },
      schema: z.object({
        menu: z.boolean().default(false),
        sort: z.number().optional(),
      }),
    }),
    posts: defineCollection({
      type: "page",
      source: {
        include: "posts/**/*.md",
        prefix: "/posts/",
      },
      schema: z.object({
        title: z.string(),
        date: z.date(),
        lead: z.string().editor({ input: "textarea" }),
        coverImage: z.string().editor({ input: "media" }),
        tags: z.array(z.string()),
        unlisted: z.boolean().default(false),
        hash: z.string().optional(),
      }),
    }),
  },
});
