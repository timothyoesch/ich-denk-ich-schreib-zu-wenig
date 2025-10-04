<script setup>
const posts = await queryCollection("posts").order("date", "DESC").all();
console.log(posts);
let groupedPosts = posts.reduce((acc, post) => {
    const year = `Y${new Date(post.date).getFullYear().toString()}`;
    if (!acc[year]) {
        acc[year] = [];
    }
    acc[year].push(post);
    return acc;
}, {});

</script>
<template>
    <div class="toes-posts--grid flex flex-col flex-wrap w-fit">
        <div class="toes-posts__year h-full w-fit flex" v-for="(posts, year) in groupedPosts" :key="year">
            <div class="toes-posts__year--marker flex items-center justify-center w-24">
                <h2 class="text-2xl font-bold">{{ year.slice(1) }}</h2>
            </div>
            <div class="toes-posts__year__grid flex flex-col flex-wrap">
                <div v-for="post in posts" :key="post.slug" class="toes-posts__post md:aspect-square text-sm md:text-base">
                    <NuxtLink :to="`/posts/${post.slug}`">
                        <h3 class="text-4xl md:text-5xl mb-2">{{ post.title }}</h3>
                    </NuxtLink>
                    <p class="italic text-sm">{{ new Date(post.date).toLocaleDateString("de-CH", { year: "numeric", month: "long", day: "numeric", weekday: "long" }) }}</p>
                    <div class="flex gap-2 flex-wrap text-sm">
                        <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
                    </div>
                    <div class="mt-4">
                        <p>{{ post.lead }}</p>
                        <div class="mt-2">
                            <NuxtLink :to="`/posts/${post.slug}`" class="italic">Weiterlesen</NuxtLink>
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