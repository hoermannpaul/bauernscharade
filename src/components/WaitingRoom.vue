<template>
  <div>
    <h3>Warteraum</h3>
    <li v-for="player in players" :key="player">{{ player }}</li>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const players=ref(["Herbert", "Günther"])
</script>

<style>

</style>