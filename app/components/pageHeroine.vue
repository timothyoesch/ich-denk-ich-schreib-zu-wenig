<script setup>
import { ref, onMounted } from "vue";
const counterElement = ref(null);
const startDateTime = new Date("2025-11-25T22:12:00+02:00");
const currentDateTime = new Date();
const diffTime = Math.abs(currentDateTime - startDateTime);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
const headerElement = ref(null);

function setVariables() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  if (headerElement.value) {
    document.documentElement.style.setProperty(
      "--header-height",
      `${headerElement.value.offsetHeight}px`,
    );
  }
}

onMounted(() => {
  if (counterElement.value) {
    counterElement.value.textContent = diffDays.toString();
  }

  setVariables();
  window.addEventListener("resize", setVariables);
});

/**
 * Navbar links
 */
const {
  data: pages,
  status,
  error,
} = await useAsyncData("all-pages", () =>
  queryCollection("pages").order("sort", "ASC").all(),
);
</script>
<template>
  <div
    class="toesch-page-Heroine p-4 pt-6 md:p-14! md:text-2xl"
    ref="headerElement"
  >
    <NuxtLink to="/" class="no-underline!">
      <h1>Ich denk, ich schreib zu wenig.</h1>
    </NuxtLink>
    <p class="toes-container">
      Vor <span ref="counterElement" class="text-primary"></span> Tagen begann
      ich wieder zu schreiben. Diese Textsammlung ist das Resultat.
    </p>
    <div
      class="flex flex-nowrap gap-8 mt-6 overflow-x-scroll relative pb-2 px-1"
    >
      <NuxtLink to="/" activeClass="toes-active-link" class="text-nowrap">
        Texte
      </NuxtLink>
      <NuxtLink
        :to="page.path"
        activeClass="toes-active-link"
        class="text-nowrap"
        v-for="page in pages"
        :key="page.slug"
      >
        {{ page.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: clamp(3rem, 5.5vw, 12rem);
}
::-webkit-scrollbar {
  height: 2px;
  opacity: 0.15;
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: theme("colors.primary");
  color: theme("colors.primary");
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}
</style>
