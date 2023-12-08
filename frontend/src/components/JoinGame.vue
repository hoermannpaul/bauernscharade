<script setup>
import { ref } from 'vue';


const webSocket = new WebSocket('ws://localhost:8080?room=asdf');

webSocket.onmessage = (message) => {
  console.debug(message);
};

</script>

<template>
  <div>
    <h1>Code eingeben</h1>
    <div>
        <h5>Code</h5>
        <input type="text" />
    </div>
    <div>
        <h5>Name</h5>
        <input type="text" />
    </div>
    <div>
        <router-link to="/waitingroom">Weiter</router-link>
    </div>
  </div>
</template>

<style>

</style>
