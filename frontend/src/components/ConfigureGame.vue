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

  const addPlayerToTeam = (player, team) => {
    activeConnection.addToTeam(player, team);
  };
  
</script>

<template>
  <div>
    <h1>Spiel konfigurieren</h1>
    <div>
      <h3>Warteraum</h3>
      <ul>
        <li v-for="player in store.players" :key="player">{{ player }}
          <button class="buttonTeamA" @click="addPlayerToTeam(player, 'A')">Team A </button>
          <button class="buttonTeamB" @click="addPlayerToTeam(player, 'B')">Team B</button>
        </li>
      </ul>
    </div>
    <div>
      <h3>Team A</h3>
      <ul>
        <li v-for="player in store.teamA" :key="player">{{ player }}</li>
      </ul>
    </div>
    <div>
      <h3>Team B</h3>
      <ul>
        <li v-for="player in store.teamB" :key="player">{{ player }}</li>
      </ul>
    </div>
    <div>
      <button @click="startGame">Beginnen</button>
    </div>
  </div>
</template>

<style>
.buttonTeamA {
  background-color: #07a1fa;
  border: 2px solid #ffffff;
  padding: 2px 2px;
  color: white;
  border-radius: 2px;
  margin-right: 10px;
}

.buttonTeamA:hover{
  background-color: #ffffff;
  border: 2px solid #07a1fa;
  color: black;
  border-color: var(--highlight-color);
}

.buttonTeamB {
  background-color: #11ba24;
  border: 2px solid #ffffff;
  padding: 2px 2px;
  color: white;
  border-radius: 2px;
  margin-right: 10px;
}

.buttonTeamB:hover{
  background-color: #ffffff;
  border: 2px solid #11ba24;
  color: black;
  border-color: var(--highlight-color);
}


input[type="text"] {
  color: #000000;
}
</style>