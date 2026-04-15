<template>
  <div
    v-if="isVisible"
    class="fixed bottom-4 px-2 md:px-4 md:w-full md:max-w-md z-50"
  >
    <div
      class="bg-charcoal text-eggshell border p-4 flex flex-col gap-4 transition-all text-sm"
    >
      <h3 class="text-lg lg:text-2xl">Lass uns über Cookies sprechen</h3>
      <p>
        Ich nutze genau einen einsamen Cookie, um zu erfahren, wie viele Leute
        auf meiner Webseite sind. An Drittparteien werden keine Daten
        übermittelt. Eine supersimple Erklärung dazu findest du in meiner
        <NuxtLink to="/datenschutz">Datenschutzerklärung</NuxtLink>.
      </p>

      <div class="flex flex-col sm:flex-row gap-2 md:gap-3 mt-1">
        <!--<button
          @click="acceptCookies"
          aria-label="Alle Cookies akzeptieren"
          class="w-full sm:w-auto flex-1 px-5 py-2.5 bg-primary text-eggshell text-sm font-bold hover:bg-primary/75 transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-primary"
        >
          Zustimmen
        </button>
        -->
        <button
          @click="denyCookies"
          class="w-full sm:w-auto flex-1 px-5 py-2.5 bg-eggshell text-gray-800 text-sm font-bold hover:bg-gray-400 transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-400"
        >
          Lieber nicht
        </button>
        <button
          @click="closeBanner"
          class="w-full sm:w-auto flex-1 px-5 py-2.5 bg-primary text-eggshell text-sm font-bold hover:bg-primary/75 transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-primary"
        >
          Ok! 👍
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isVisible = ref(false);

const denyCookies = () => {
  localStorage.setItem("cookieConsent", "false");
  window.location.reload();
};

const closeBanner = () => {
  localStorage.setItem("cookieConsent", "true");
  isVisible.value = false;
};

onMounted(() => {
  const consent = localStorage.getItem("cookieConsent");
  if (consent === null) {
    isVisible.value = true;
  }
  if (consent === "true" || consent === null) {
    umTrackView();
  }
});
</script>
