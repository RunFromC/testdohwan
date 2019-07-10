import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Client from '../views/Client.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/influencer',
            name: 'home',
            component: Home
        },
        {
            path: '/market',
            name: 'home',
            component: Home
        },
        {
            path: '/client',
            name: 'client',
            component: Client
        }
    ]
});

//added 로그인 인증을 위한 네비게이션 가드 추가.
router.beforeEach((to, from, next) => {
    // todo : 로그인 정보 확인.
    next();
});

export default router;
