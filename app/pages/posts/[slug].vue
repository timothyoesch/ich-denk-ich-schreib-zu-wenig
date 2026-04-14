<script setup>
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection("posts").path(route.path).first(),
);

useSeoMeta({
  post,
  title: () => `${post.value.title} | Timothy Oesch`,
  description: () => post.value.lead,
  ogTitle: () => `${post.value.title} | Timothy Oesch`,
  ogDescription: () => post.value.lead,
  ogImage: () => post.value.coverImage || null,
  ogType: "article",
  twitterCard: () =>
    post.value.coverImage ? "summary_large_image" : "summary",
});
</script>

<template>
  <div class="px-4 md:px-14" v-if="post">
    <div class="toes-default-post-layout mt-4 md:mt-0 prose">
      <h1 class="!text-6xl md:!text-8xl mb-4 md:mb-8">{{ post.title }}</h1>
      <p class="mb-4 md:mb-8 text-lg md:text-2xl font-bold">{{ post.lead }}</p>
      <ContentRenderer :value="post" />
    </div>
  </div>
  <div class="toes-error-post-layout px-14" v-else>
    <h1 class="!text-4xl md:!text-9xl">404</h1>
    <p class="mt-4">Der Beitrag wurde nicht gefunden.</p>
  </div>
</template>
