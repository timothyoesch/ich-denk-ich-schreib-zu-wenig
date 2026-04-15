<template>
  <div class="bg-creme p-4 border-charcoal border-2 my-6 lg:my-12">
    <p v-if="trackingStatus === true">
      <b>Aktuell wird dein Webseitenverhalten aufgezeichnet.</b>
    </p>
    <p v-else-if="trackingStatus === false">
      <b>Aktuell wird dein Webseitenverhalten nicht aufgezeichnet.</b>
    </p>
    <p v-else>
      <b>
        Es konnte nicht festgestellt werden, ob dein Webseitenverhalten
        aufgezeichnet wird. Ist das Cookie Banner noch sichtbar?
      </b>
    </p>
    <p v-if="trackingStatus !== null">
      <a href="#" @click.prevent="resetSettings">Einstellungen zurücksetzen</a>
    </p>
  </div>
</template>

<script setup>
const trackingStatus = ref(null);
onMounted(() => {
  if (localStorage.getItem("cookieConsent") != null) {
    trackingStatus.value = localStorage.getItem("cookieConsent") == "true";
  }
  window.addEventListener("cookieConsentChanged", (event) => {
    trackingStatus.value = event.detail.newSetting;
  });
});

const resetSettings = () => {
  localStorage.removeItem("cookieConsent");
  trackingStatus.value = null;
  window.dispatchEvent(
    new CustomEvent("cookieConsentChangedFromTrackingStatus", {
      detail: {
        newSetting: null,
      },
    }),
  );
};
</script>

<style scoped>
p {
  margin: 0;
  font-size: 1.25rem;
}
p a {
  font-size: 1rem;
}
</style>
