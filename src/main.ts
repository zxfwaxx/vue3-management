import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import "@/router/permission"

import "./assets/css/normalize.css"
import "@/styles/index.scss"
createApp(App).use(router).mount('#app')
