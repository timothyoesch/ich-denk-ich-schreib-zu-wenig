<template>
  <div ref="container" v-if="isVisible">
    <div
      ref="banner"
      class="fixed bottom-4 px-2 md:px-4 max-w-lg z-50 transition-opacity duration-300 ease-in-out"
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
          <button
            @click="denyCookies"
            class="w-full sm:w-auto flex-1 px-5 py-2.5 bg-eggshell text-gray-800 text-sm font-bold hover:bg-gray-400 transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-400"
          >
            Lieber nicht 🙅
          </button>
          <button
            @click="acceptCookies"
            aria-label="Alle Cookies akzeptieren"
            class="w-full sm:w-auto flex-1 px-5 py-2.5 bg-primary text-eggshell text-sm font-bold hover:bg-primary/75 transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-primary"
          >
            Ok 👍
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isVisible = ref(false);
const banner = ref(null);
const container = ref(null);

const acceptCookies = () => {
  localStorage.setItem("cookieConsent", true);
  umTrackView();
  notifyPage(true);
  toggleOff();
};

const denyCookies = () => {
  localStorage.setItem("cookieConsent", false);
  notifyPage(false);
  toggleOff();
};

onMounted(() => {
  const consent = localStorage.getItem("cookieConsent");
  if (consent === null) {
    isVisible.value = true;
  }
  if (consent === "true") {
    umTrackView();
  }
  nextTick(() => {
    sizeContainer();
    window.addEventListener("resize", sizeContainer);
    window.addEventListener(
      "cookieConsentChangedFromTrackingStatus",
      (event) => {
        if (event.detail.newSetting === null) {
          isVisible.value = true;
          nextTick(() => {
            sizeContainer();
          });
        }
      },
    );
  });
});

const toggleOff = () => {
  if (banner.value) {
    banner.value.classList.add("opacity-0", "pointer-events-none");
    container.value.animate(
      [
        { maxHeight: `${banner.value.offsetHeight + 16}px` },
        { maxHeight: "0px" },
      ],
      {
        duration: 300,
        easing: "ease-in-out",
        fill: "forwards",
      },
    );
    setTimeout(() => {
      isVisible.value = false;
    }, 300);
  }
};

const sizeContainer = () => {
  if (container.value) {
    container.value.style.height = `${banner.value.offsetHeight + 16}px`;
  }
};

const notifyPage = (status) => {
  window.dispatchEvent(
    new CustomEvent("cookieConsentChanged", {
      detail: {
        newSetting: status,
      },
    }),
  );
};
</script>
