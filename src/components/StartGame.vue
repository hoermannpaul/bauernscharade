<script setup>
import { ref } from 'vue';

const gameCode = ref("XY23Z1")
</script>

<template>
  <div>
    <h2>Code</h2>
    <div>
        <button><h4>{{ gameCode }}</h4></button>
    </div>
    <div>
        <button>Link kopieren</button>
    </div>
    <div>
        <button>Weiter</button>
    </div>
  </div>
</template>


<style>

</style>