<template>
  <div>
    <h3>Warteraum</h3>
    <li v-for="player in players" :key="player">{{ player }}</li>
  </div>
</template>

<script setup>
import { store } from '../store';
// import { computed } from 'vue';
// import { useStore } from 'vuex';

// const store = useStore();
// const players = computed(() => store.state.players);

console.log("Players in WaitingRoom:", store.players);
const players = store.players

</script>

<style>

</style>