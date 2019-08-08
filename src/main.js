import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/common.scss';
import './assets/scss/config.scss';
import vSelect from 'vue-select';
import 'vue-select/src/scss/vue-select.scss';
Vue.component('v-select', vSelect);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
