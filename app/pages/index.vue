<script setup>
const {
  data: groupedPosts,
  status,
  error,
} = await useAsyncData(
  "all-posts-grouped", // A unique key to ensure data is fetched and cached correctly
  () => queryCollection("posts").order("date", "DESC").all(),
  {
    transform: (posts) => {
      return posts.reduce((acc, post) => {
        // Good practice: ensure post.date exists before parsing to avoid crashes
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
          <NuxtLink :to="post.path">
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
          <div class="flex gap-2 flex-wrap text-sm">
            <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
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

<style scoped lang="scss">
.toes-posts--grid {
  height: calc(100 * var(--vh, 1vh) - var(--header-height, 60px));
  overflow-y: hidden;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.toes-posts {
  &__year {
    &--marker {
      height: 100%;
      border: 1px solid theme("colors.charcoal");
      @apply bg-creme p-6;

      h2 {
        @apply font-migra font-extrabold -rotate-90 text-3xl md:text-5xl;
      }
    }
    &:nth-child(n + 2) {
      margin-left: -1px;
    }
  }

  &__post {
    height: 100%;
    border: 1px solid theme("colors.charcoal");
    margin-left: -1px;
    padding: 1rem;
  }
}
</style>
