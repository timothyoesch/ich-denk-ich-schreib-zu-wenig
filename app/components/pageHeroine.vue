<script setup>
import { ref, onMounted } from 'vue';
const counterElement = ref(null);
const startDateTime = new Date('2025-09-25T22:12:00+02:00'); // Set your start date and time here
const currentDateTime = new Date();
const diffTime = Math.abs(currentDateTime - startDateTime);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
const headerElement = ref(null);

function setVariables() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    if (headerElement.value) {
        document.documentElement.style.setProperty('--header-height', `${headerElement.value.offsetHeight}px`);
    }
}

onMounted(() => {
    if (counterElement.value) {
        counterElement.value.textContent = diffDays.toString();
    }

    setVariables();
    window.addEventListener('resize', setVariables);

});

</script>
<template>
    <div class="toesch-page-Heroine p-4 pt-6 md:!p-14 md:text-2xl" ref="headerElement">
        <h1>Ich denk, ich schreib zu wenig.</h1>
        <p class="toes-container">Vor <span ref="counterElement" class="text-primary"></span> Tagen begann ich wieder zu schreiben. Diese Textsammlung ist das Resultat.</p>
        <div class="flex gap-4 mt-6">
            <NuxtLink to="/" activeClass="toes-active-link">Texte</NuxtLink>
            <NuxtLink to="/ueber-mich" activeClass="toes-active-link">Über mich</NuxtLink>
            <NuxtLink to="/konktakt" activeClass="toes-active-link">Kontakt</NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    font-size: clamp(3rem, 7.5vw, 12rem);
}

</style>