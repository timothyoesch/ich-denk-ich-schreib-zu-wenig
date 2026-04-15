<template>
  <div class="bg-creme p-4 border-charcoal border-2 my-6 lg:my-12">
    <p v-if="trackingStatus === true">
      <b>Aktuell wird dein Webseitenverhalten getrackt.</b>
    </p>
    <p v-else-if="trackingStatus === false">
      <b>Aktuell wird dein Webseitenverhalten nicht getrackt.</b>
    </p>
    <p v-else>
      <b>
        Es konnte nicht festgestellt werden, ob dein Webseitenverhalten getrackt
        wird.
      </b>
    </p>
    <p>
      <a href="#" @click.prevent="resetSettings">Einstellungen zurücksetzen</a>
    </p>
  </div>
</template>

<script setup>
const trackingStatus = ref(null);
onMounted(() => {
  trackingStatus.value =
    localStorage.getItem("cookieConsent") === "true" ||
    localStorage.getItem("cookieConsent") === null;
});

const resetSettings = () => {
  localStorage.removeItem("cookieConsent");
  trackingStatus.value = null;
  window.location.reload();
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
