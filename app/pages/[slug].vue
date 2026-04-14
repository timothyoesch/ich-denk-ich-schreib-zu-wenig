<script setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("pages").path(route.path).first();
});
</script>
<template>
  <div class="px-4 md:px-14" v-if="page">
    <div class="toes-default-page-layout">
      <ContentRenderer :value="page" />
    </div>
  </div>
  <div class="toes-error-page-layout px-14" v-else>
    <h1 class="text-4xl md:text-9xl">404</h1>
    <p class="mt-4">Die Seite wurde nicht gefunden.</p>
  </div>
</template>
