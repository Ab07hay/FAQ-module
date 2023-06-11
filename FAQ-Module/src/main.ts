// import './assets/main.css'
import './input.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vue-toastification/dist/index.css'
import Toast from "vue-toastification";
import App from './App.vue'
import router from './router'
const options = {
    position: 'top-center',
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false
  }
const app = createApp(App)

app.use(createPinia())
app.use(router),
app.use(Toast,options)

app.mount('#app')
