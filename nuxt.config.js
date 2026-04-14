import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  modules: ["@nuxt/content", "@nuxt/fonts", "nuxt-studio", "nuxt-umami"],

  css: ["./assets/css/main.css"],

  tailwindcss: {
    exposeConfig: true,
  },

  vite: {
    plugins: [tailwindcss()],
    esbuild: {
      drop: ["console", "debugger"],
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Ich denk, ich schreib zu wenig",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/images/favicon/favicon-96x96.png",
          sizes: "96x96",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/images/favicon/favicon.svg",
        },
        {
          rel: "shortcut icon",
          href: "/images/favicon/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/images/favicon/apple-touch-icon.png",
        },
        {
          rel: "manifest",
          href: "/images/favicon/site.webmanifest",
        },
      ],
    },
  },

  studio: {
    route: "/_studio",

    repository: {
      provider: "github",
      owner: "timothyoesch",
      repo: "ich-denk-ich-schreib-zu-wenig",
      branch: "main",
    },
  },
  components: [
    {
      path: "~/components",
      global: true,
    },
    {
      path: "~/components/content",
      global: true,
    },
  ],

  umami: {
    id: "2783162f-0c86-49ad-b5ee-d717d2c7c711",
    host: "https://tr.toes.ch",
    autoTrack: true,
    ignoreLocalhost: true,
    domains: ["toes.ch"],
    logErrors: true,
  },
});
