<script setup>
  import { store } from '../store';
  import { watch } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  watch(() => store.currentRoute, (newRoute) => {
    if (newRoute) {
        router.push(newRoute);
    }
  }, { immediate: true }); 

</script>

<template>
  <div>
    <h3>Warteraum</h3>
    <li v-for="player in store.players" :key="player">{{ player }}</li>
  </div>
</template>


<style>

</style>