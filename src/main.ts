import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BootstrapVue3 from "bootstrap-vue-3";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(BootstrapVue3);

app.use(createPinia())
app.use(router)

app.mount('#app')
