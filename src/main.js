import '@babel/polyfill';
import elementClosest from 'element-closest';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './api';
import './assets/scss/common.scss';
import './assets/scss/config.scss';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import 'nodelist-foreach-polyfill';

elementClosest(window);

Vue.prototype.$axios = axios;

Vue.component('v-select', vSelect);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');