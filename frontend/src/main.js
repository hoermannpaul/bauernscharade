import './main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from 'vue-router'
import { createWebHashHistory } from 'vue-router'
import StartGame from './components/StartGame.vue'
import JoinGame from './components/JoinGame.vue'
import NewGame from './components/NewGame.vue'
import WaitingRoom from './components/WaitingRoom.vue'
import ConfigureGame from './components/ConfigureGame.vue'
import AddWords from './components/AddWords.vue';

import Playroom from './components/Playroom.vue'


const routes = [
  { path: '/', component: NewGame },
  { path: '/joingame', component: JoinGame },
  { path: '/startgame', component: StartGame },
  { path: '/waitingroom', component: WaitingRoom },
  { path: '/configuregame', component: ConfigureGame },
  { path: '/addwords', component: AddWords },
  { path: '/playroom', component: Playroom },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')

