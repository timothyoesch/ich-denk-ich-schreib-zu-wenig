import { defineContentConfig, defineCollection } from '@nuxt/content'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/fonts'],
    css: ['~/assets/css/main.scss'],
    tailwindcss: {
        exposeConfig: true,
    },
    vite: {
        esbuild: {
            drop: ['console', 'debugger'],
        },
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            title: 'Ich denk, ich schreib zu wenig',
            script: [
                {
                    src: "https://analytics.toes.ch/api/script.js",
                    async: true,
                    defer: true,
                    'data-site-id': 'e33ac068f510',
                }
            ],
            link: [
                {
                    rel: 'icon', type: 'image/png', href: '/images/favicon/favicon-96x96.png', sizes: '96x96'
                },
                {
                    rel: 'icon', type: 'image/svg+xml', href: '/images/favicon/favicon.svg'
                },
                {
                    rel: 'shortcut icon', href: '/images/favicon/favicon.ico'
                },
                {
                    rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicon/apple-touch-icon.png'
                },
                {
                    rel: 'manifest', href: '/images/favicon/site.webmanifest'
                }
            ]
        }
    }
})