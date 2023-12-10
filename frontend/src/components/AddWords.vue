<script setup>
import { ref } from 'vue';
import { activeConnection } from '../store'
import { useRouter } from 'vue-router';

  const router = useRouter();

  const word1 = ref('');
  const word2 = ref('');
  const word3 = ref('');
  const words = ref([]);

  const addWordsToArray = () => {
    words.value = [word1.value, word2.value, word3.value];
  };
  
  const Navigate = () => {
  activeConnection.addWord(words.value);
  router.push('/playroom');
};
  
</script>

<template>
  <div>
    <div>words: {{ words }}</div>
    <h1>Wörter eingeben</h1>
    <input type="text" v-model="word1" @input="addWordsToArray"/> <br> <br>
    <input type="text" v-model="word2" @input="addWordsToArray"/> <br> <br>
    <input type="text" v-model="word3" @input="addWordsToArray"/>
    <div>
      <button @click="Navigate">Weiter</button>
    </div>
  </div>
</template>
<style>

</style>