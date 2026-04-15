<script setup>
const route = useRoute();
const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection("posts")
    .where("tags", "LIKE", `%${route.params.tag}%`)
    .order("date", "DESC")
    .all();
});
</script>
<template>
  <div class="px-4 md:px-14" v-if="posts">
    <div class="toes-default-page-layout prose">
      <h3 class="mb-0! italic">Tag:</h3>
      <h1 class="mt-4!">#{{ route.params.tag }}</h1>
      <div class="toes__tag__posts mt-6 md:mt-10 flex flex-col">
        <div
          class="toes__tag__posts__post"
          v-for="(post, index) in posts"
          :key="index"
        >
          <h2 class="mb-4">
            <NuxtLink :to="post.path" class="no-underline!">{{
              post.title
            }}</NuxtLink>
          </h2>
          <div class="toes__post__meta flex gap-x-2 text-xs text-gray-500">
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
            &middot;
            <div class="toes__post__meta__tags flex flex-wrap gap-4">
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
          <p class="mt-2! mb-0!">
            {{
              post.lead.length > 200
                ? post.lead.substring(0, 200) + "..."
                : post.lead
            }}
          </p>
          <div>
            <NuxtLink :to="`${post.path}`" class="italic">
              Weiterlesen
            </NuxtLink>
          </div>
          <!-- if it isn't the last iteration, add a horizontal rule -->
          <hr class="border-primary/20" v-if="index < posts.length - 1" />
        </div>
      </div>
    </div>
  </div>
  <div class="toes-error-post-layout px-14" v-else>
    <h1 class="!text-4xl md:!text-9xl">404</h1>
    <p class="mt-4">Der Tag {{ route.params.tag }} wurde nicht gefunden.</p>
  </div>
</template>
