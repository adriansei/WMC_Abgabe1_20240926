import './assets/main.css'
import './assets/tailwind.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.min.css"

createApp(App).use(router).mount('#app')
