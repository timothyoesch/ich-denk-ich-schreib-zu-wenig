<script setup>
const {
  data: groupedPosts,
  status,
  error,
} = await useAsyncData(
  "all-posts-grouped",
  () =>
    queryCollection("posts")
      .order("date", "DESC")
      // post.id does not contain TEMPLATE.md
      .where("id", "NOT LIKE", "%TEMPLATE.md")
      .andWhere("unlisted", "==", false)
      .all(),
  {
    transform: (posts) => {
      console.log(posts);
      return posts.reduce((acc, post) => {
        if (!post.date) return acc;

        const year = `Y${new Date(post.date).getFullYear().toString()}`;
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(post);
        return acc;
      }, {});
    },
  },
);
</script>
<template>
  <div v-if="status === 'pending'">Lade Beiträge...</div>
  <div v-else-if="error">Fehler beim Laden der Beiträge.</div>
  <div class="toes-posts--grid flex flex-col flex-wrap w-fit" v-else>
    <div
      class="toes-posts__year h-full w-fit flex"
      v-for="(posts, year) in groupedPosts"
      :key="year"
    >
      <div
        class="toes-posts__year--marker flex items-center justify-center w-24"
      >
        <h2 class="text-2xl font-bold">{{ year.slice(1) }}</h2>
      </div>
      <div class="toes-posts__year__grid flex flex-col flex-wrap">
        <div
          v-for="post in posts"
          :key="post.slug"
          class="toes-posts__post md:aspect-square text-sm md:text-base"
        >
          <NuxtLink :to="post.path" class="no-underline!">
            <h3 class="text-4xl md:text-5xl mb-2">{{ post.title }}</h3>
          </NuxtLink>
          <p class="italic text-sm">
            {{
              new Date(post.date).toLocaleDateString("de-CH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })
            }}
          </p>
          <div class="flex gap-2 flex-wrap text-sm mt-2">
            <NuxtLink
              v-for="tag in post.tags"
              :key="tag"
              :to="`/tags/${tag}`"
              class="no-underline! text-primary"
            >
              #{{ tag }}
            </NuxtLink>
          </div>
          <div class="mt-4">
            <p>
              {{
                post.lead.length > 200
                  ? post.lead.substring(0, 200) + "..."
                  : post.lead
              }}
            </p>
            <div class="mt-2">
              <NuxtLink :to="`${post.path}`" class="italic">
                Weiterlesen
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
