import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import('flowbite/dist/flowbite')

import './assets/global.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
