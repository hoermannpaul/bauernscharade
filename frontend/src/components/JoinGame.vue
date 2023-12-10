<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { activeConnection } from '../store'
//import { store }  from '../store'


const roomName = ref('');
const playerName = ref('');
const router = useRouter();
const connectWebSocket = () => { 
  activeConnection.connect(roomName.value);
};

const connectAndNavigate = () => {
  // player und admin in addPlayer nur weil ich nicht weiß
  //ob wir noch wo unterscheiden müssen zwischen admin und player
  activeConnection.addPlayer('player', playerName.value);
  router.push('/waitingroom');
};


</script>

<template>
  <div>
    <h1>Code eingeben</h1>
    <div>
        <h5 class="code">Code</h5>
        <input type="text" v-model="roomName" />
        <button @click="connectWebSocket">Verbinden</button>
    </div>
    <button v-on:click="() => {activeConnection.send('test')}">Test</button>
    <div>
        <h5>Name</h5>
        <input type="text" v-model="playerName" />
    </div>
    <div>
        <button @click="connectAndNavigate">Weiter</button>
        <!-- <router-link to="/waitingroom">Weiter</router-link> -->
    </div>
  </div>
</template>

<style>

</style>
