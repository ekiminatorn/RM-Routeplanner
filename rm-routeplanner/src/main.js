import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';

//Toasts
import VueToasts from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//V-Drag
import drag from "v-drag";

Vue.use(VueToasts, {
    position: 'bottom',
    duration: 5000
});

Vue.use(ElementUI);
Vue.use(drag);

Vue.config.productionTip = false
Vue.prototype.$apiURL = 'http://localhost:3000';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
