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
// import { store } from './store';

const routes = [
  { path: '/', component: NewGame },
  { path: '/joingame', component: JoinGame },
  { path: '/startgame', component: StartGame },
  { path: '/waitingroom', component: WaitingRoom },
  { path: '/configuregame', component: ConfigureGame },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
// app.use(store)

app.mount('#app')

