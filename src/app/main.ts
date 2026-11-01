/* eslint-disable perfectionist/sort-imports */

// core
import { pinia } from "@/app/providers/pinia"
import { router } from "@/app/router"
import { installPlugins } from "@/app/plugins"
import App from "@/app/App.vue"
// css
import "normalize.css"
import "element-plus/dist/index.css"
import "@/app/styles/index.scss"
import "virtual:uno.css"

// Create the app instance
const app = createApp(App)

// Install plugins (global components, custom directives, etc.)
installPlugins(app)

// Install pinia and router
app.use(pinia).use(router)

// Mount the app once the router is ready
router.isReady().then(() => {
  app.mount("#app")
})
