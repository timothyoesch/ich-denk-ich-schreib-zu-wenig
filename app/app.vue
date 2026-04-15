<template>
  <NuxtLayout>
    <div id="wrapper-content">
      <PageHeroine />
    </div>
    <div id="main-content">
      <NuxtPage />
    </div>
    <div
      class="toes__footer p-4 pb-2 text-xs flex justify-between items-center max-w-186"
    >
      <p class="toes__footer__copywrong">© Fuck Copyright</p>
      <div class="toes__footer__icons flex gap-x-4">
        <NuxtLink
          to="https://bsky.app/profile/toes.ch"
          target="_blank"
          class="noicon"
        >
          <Icon name="uil:cloud" class="w-6! h-6!" />
        </NuxtLink>
        <NuxtLink
          to="https://www.instagram.com/socialist_with_a_bowtie/"
          target="_blank"
          class="noicon"
        >
          <Icon name="uil:instagram" class="w-6! h-6!" />
        </NuxtLink>
        <NuxtLink
          to="https://github.com/timothyoesch"
          target="_blank"
          class="noicon"
        >
          <Icon name="uil:github-alt" class="w-6! h-6!" />
        </NuxtLink>
      </div>
    </div>
    <CookieBanner />
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
  window.addEventListener("click", (event) => {
    const target = event.target;
    if (
      target.tagName === "A" &&
      !target.href.startsWith("https://toes.ch") &&
      !target.href.startsWith("http://localhost") &&
      // check that href isn't empty and is set
      target.href &&
      target.href.trim() !== ""
    ) {
      event.preventDefault();
      window.open(target.href, "_blank");
    }
  });
});
</script>
