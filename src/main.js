import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from 'vue-router'
import { createWebHashHistory } from 'vue-router'
import StartGame from './components/StartGame.vue'
import NewGame from './components/NewGame.vue'

const routes = [
    { path: '/', component: NewGame },
    { path: '/startgame', component: StartGame },
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

const app = createApp(App)

app.use(router)

app.mount('#app')

