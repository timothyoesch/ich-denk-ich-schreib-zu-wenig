<script setup>
const slug = useRoute().params.slug
console.log("Slug:", slug)
const page = await queryCollection("pages").path(`/pages/${slug}`).first();

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