<script setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("pages").path(route.path).first();
});

useSeoMeta({
  page,
  title: () => `${page.value?.title || "Nicht gefunden"} | Timothy Oesch`,
  description: () => page.value?.lead || "Dieser Beitrag existiert nicht",
  ogTitle: () => `${page.value?.title || "Nicht gefunden"} | Timothy Oesch`,
  ogDescription: () => page.value?.lead || "Dieser Beitrag existiert nicht",
  ogImage: () => page.value?.coverImage || null,
  ogType: "article",
});
</script>
<template>
  <div class="px-4 md:px-14" v-if="page">
    <div class="toes-default-page-layout prose">
      <ContentRenderer :value="page" />
    </div>
  </div>
  <div class="px-4 md:px-14 min-h-100" v-else>
    <div class="toes-error-post-layout mt-4">
      <h1 class="text-6xl! md:text-7xl!">404 :(</h1>
      <p class="mt-4">Die Seite wurde nicht gefunden.</p>
    </div>
  </div>
</template>
