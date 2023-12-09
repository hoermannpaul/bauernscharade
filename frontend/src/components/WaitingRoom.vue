<template>
  <div>
    <h3>Warteraum</h3>
    <li v-for="player in store.players" :key="player">{{ player }}</li>
  </div>
</template>

<script setup>
import { store } from '../store';
</script>

<style>

</style>