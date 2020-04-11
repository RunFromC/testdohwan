import elementClosest from 'element-closest';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './api';
import moment from 'moment';
import VueMomentJS from 'vue-momentjs';
import vSelect from 'vue-select';

import 'vue-select/dist/vue-select.css';
import 'nodelist-foreach-polyfill';

elementClosest(window);

// noinspection JSUnusedGlobalSymbols
Vue.prototype.$axios = axios;

// noinspection JSUnusedGlobalSymbols
Vue.prototype.interval = null;

// added by JY. (2020.01.15 14:41:08)
Vue.use(VueMomentJS, moment);
Vue.component('v-select', vSelect);
Vue.config.productionTip = false;

// noinspection JSUnusedGlobalSymbols
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
