import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'
import router from './router'

// remove when flowbite-vue migration is completed
import('flowbite')

const app = createApp(App)

app.use(router)

app.mount('#app')
