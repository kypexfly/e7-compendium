<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FootBar from './components/FootBar.vue';
</script>

<template>
    <NavBar/>
    <RouterView />
    <FootBar/>
</template>

<style scoped></style>
