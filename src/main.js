import { createApp } from 'vue'
import { router } from './router/index'
import { store } from './store/index'
import App from './App.vue'
import './index.css'

const app = createApp(App)
app.use(router)
app.use(store)

const components = import.meta.globEager('./components/*.vue')
Object.entries(components).forEach(([path, definition]) => {
  const componentName = path.split('/').pop().replace(/\.\w+$/, '')
  app.component(componentName, definition.default)
})

app.mount('#app')