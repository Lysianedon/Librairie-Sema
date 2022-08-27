import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// IMPORTS LIBRARIES ----------
import 'bulma/css/bulma.css'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

// IMPORTS MAIN CSS ----------
import '@/assets/css/main.css'

// SET UP FONT AWESOME ---------
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPowerOff, faHeart, faBook, faHome, faGear, faCircleInfo, faArrowUp, fa9, faEye, faTrashCan, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPowerOff, faHeart, faBook, faHome, faGear, faCircleInfo, faArrowUp, fa9, faEye, faTrashCan, faCirclePlus)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
