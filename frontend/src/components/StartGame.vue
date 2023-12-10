<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { activeConnection } from '../store'
import {generateRandomString as generatedRandom} from "../randomGnerator"

const gameCode = ref("");
const adminName = ref('');
const router = useRouter();

const copyMessage = ref("");

const generateAndConnect = () => {
  generateRandomString();
  activeConnection.connect(gameCode.value);
}

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

const copyToClipboard = async () => {
    await navigator.clipboard.writeText(gameCode.value);
    copyMessage.value = "Gamecode kopiert!";
    setTimeout(() => copyMessage.value = "", 3000);
};

</script>

<template>
  <div>
    <h2>Code</h2>
    <div>
      <button @click="generateAndConnect">Generiere Gamecode</button>
      <h4>{{ gameCode }}</h4>
    </div>
    <div>
        <button @click="copyToClipboard">Link kopieren</button>
        <div v-if="copyMessage">{{ copyMessage }}</div>
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