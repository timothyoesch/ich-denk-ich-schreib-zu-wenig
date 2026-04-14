import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: {
        include: "pages/*.md",
        prefix: "/",
      },
    }),
    posts: defineCollection({
      type: "page",
      source: "posts/**/*.md",
      schema: z.object({
        title: z.string(),
        date: z.date(),
        lead: z.string().editor({ input: "textarea" }),
        coverImage: z.string().editor({ input: "media" }),
        tags: z.array(z.string()),
      }),
    }),
  },
});
