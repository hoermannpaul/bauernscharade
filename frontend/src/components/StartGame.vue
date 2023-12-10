<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { activeConnection } from '../store'
import {generateRandomString as generatedRandom} from "../randomGnerator"

const gameCode = ref("");
const adminName = ref('');
const router = useRouter();

const generateRandomString = () => {
  const stringLength = 4; 
  const randomStr = generatedRandom(stringLength);
  gameCode.value = randomStr;
};

const connectAndNavigate = () => {
  // player und admin in addPlayer nur weil ich nicht weiß
  //ob wir noch wo unterscheiden müssen zwischen admin und player
  activeConnection.addPlayer('admin', adminName.value);
  router.push('/configuregame');
};

</script>

<template>
  <div>
    <h2>Code</h2>
    <div>
      <button @click="generateRandomString">Generiere Gamecode</button>
      <h4>{{ gameCode }}</h4>
    </div>
    <div>
        <button @click="activeConnection.connect(gameCode);">Link kopieren</button>
    </div>
    <div>
      <h5>Name</h5>
      <input type="text" v-model="adminName" />
    </div>
    <div>
        <button @click="connectAndNavigate">Weiter</button>
    </div>
  </div>
</template>


<style>

</style>