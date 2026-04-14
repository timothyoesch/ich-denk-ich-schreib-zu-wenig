<template>
  <NuxtLayout>
    <div id="wrapper-content">
      <PageHeroine />
    </div>
    <div id="main-content">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

<script setup>
// Always open external links in a new tab (links that don't start with https://toes.ch or http://localhost)
onMounted(() => {
  umTrackView();
  window.addEventListener("click", (event) => {
    const target = event.target;
    if (
      target.tagName === "A" &&
      !target.href.startsWith("https://toes.ch") &&
      !target.href.startsWith("http://localhost")
    ) {
      event.preventDefault();
      window.open(target.href, "_blank");
    }
  });
});
</script>
