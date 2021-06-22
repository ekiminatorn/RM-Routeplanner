import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';

//Toasts
import VueToasts from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToasts, {
    position: 'bottom'
});

Vue.config.productionTip = false
Vue.prototype.$apiURL = 'http://localhost:3000';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
