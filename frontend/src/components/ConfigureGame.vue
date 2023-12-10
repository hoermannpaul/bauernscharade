<script setup>
  import { store } from '../store';
  import { activeConnection } from '../store'
  import { watch } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  watch(() => store.currentRoute, (newRoute) => {
    if (newRoute) {
        router.push(newRoute);
    }
  }, { immediate: true }); 

  const startGame = () => {
    activeConnection.startGame();
  };
  
</script>

<template>
  <div>
    <h1>Spiel konfigurieren</h1>
    <div>
      <h3>Warteraum</h3>
      <li v-for="player in store.players" :key="player">{{ player }}</li>
    </div>
    <div>
      <button @click="startGame">Beginnen</button>
    </div>
  </div>
</template>

<style>

</style>