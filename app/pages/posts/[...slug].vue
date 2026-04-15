<script setup>
const route = useRoute();
const { data: post } = await useAsyncData(
  route.path,
  () => queryCollection("posts").path(route.path).first(),
  {
    // Do 404 checking manually, because unlisted posts should also be accessible, but not show up in the list of posts
    transform: function (data) {
      if (!data) {
        throw createError({ statusCode: 404, statusMessage: "Not Found" });
      }
      return data;
    },
  },
);

if (post.value?.unlisted) {
  const hash = route.query.HASH;
  if (!hash || hash !== post.value?.hash) {
    post.value = null;
  }
}

onMounted(() => {
  // 1. Nuke the old Commento state from the window object
  if (window.commento) {
    delete window.commento;
  }

  // 2. Remove the old script tag if it exists from a previous route
  const existingScript = document.getElementById("commento-script");
  if (existingScript) {
    existingScript.remove();
  }

  // 3. Create and inject a fresh script tag
  const script = document.createElement("script");
  script.id = "commento-script";
  script.src = "https://commento.toes.ch/js/commento.js";

  // We leave auto-init as true (the default) so Commento
  // automatically boots up as soon as the script finishes downloading
  document.body.appendChild(script);
});

// Optional: Clean up the DOM when navigating away
onBeforeUnmount(() => {
  const container = document.getElementById("commento");
  if (container) {
    container.innerHTML = "";
  }
});

useSeoMeta({
  post,
  title: () => `${post.value?.title || "Nicht gefunden"} | Timothy Oesch`,
  description: () => post.value?.lead || "Dieser Beitrag existiert nicht",
  ogTitle: () => `${post.value?.title || "Nicht gefunden"} | Timothy Oesch`,
  ogDescription: () => post.value?.lead || "Dieser Beitrag existiert nicht",
  ogImage: () => post.value?.coverImage || null,
  ogType: "article",
  twitterCard: () =>
    post.value?.coverImage ? "summary_large_image" : "summary",
});
</script>

<template>
  <div class="px-4 md:px-14" v-if="post">
    <div class="toes-default-post-layout mt-4 md:mt-0 prose">
      <div v-if="post.unlisted" class="mb-12">
        <div
          class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <p class="font-bold mb-2!">
            Dieser Beitrag ist (noch) nicht öffentlich!
          </p>
          <p class="my-0! text-sm">
            Nur Personen mit dem direkten Link können ihn sehen.<br />
            <em>Bitte nicht teilen, thanks ❤️</em>
          </p>
        </div>
      </div>
      <h1 class="text-6xl! md:text-8xl! mb-2! md:mb-3! mt-0!">
        {{ post.title }}
      </h1>
      <div
        class="toes__post__meta flex flex-col lg:flex-row gap-x-4 gap-y-2 text-sm text-gray-500"
      >
        <span class="italic text-nowrap">
          {{
            new Date(post.date).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })
          }}
        </span>
        <span class="hidden lg:inline-block"> &middot; </span>
        <div class="toes__post__meta__tags flex flex-wrap gap-x-4 gap-y-0">
          <NuxtLink
            v-for="(tag, index) in post.tags"
            :key="index"
            :to="`/tags/${tag}`"
            class="toes__post__meta__tag no-underline! text-primary"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </div>
      <p class="mb-4 md:mb-8 text-lg md:text-2xl font-bold">{{ post.lead }}</p>
      <ContentRenderer :value="post" />
      <div class="toes__post__comments mt-12 lg:mt-20">
        <div class="w-12 h-1 bg-primary mb-4"></div>
        <h2 class="text-3xl! mb-4! mt-0!">Kommentare</h2>
        <div id="commento"></div>
      </div>
    </div>
  </div>
  <div class="px-4 md:px-14 min-h-100" v-else>
    <div class="toes-error-post-layout mt-4">
      <h1 class="text-6xl! md:text-7xl!">404 :(</h1>
      <p class="mt-4">Der Beitrag wurde nicht gefunden.</p>
    </div>
  </div>
</template>
