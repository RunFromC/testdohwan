import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Client from '../views/Client.vue';
import Find from '../views/Find.vue';
import Join from '../views/Join.vue';
import ChangePW from '../views/ChangePW.vue';
import ClientJoin from '../views/client/Join.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'brands',
            component: Home
        },
        {
            path: '/influencer',
            name: 'influencer',
            component: Home
        },
        {
            path: '/market',
            name: 'market',
            component: Home
        },
        {
            path: '/client',
            name: 'client',
            component: Client
        },
        {
            path: '/client/join',
            name: 'clientJoin',
            component: ClientJoin
        },
        {
            path: '/find',
            name: 'find',
            component: Find
        },
        {
            path: '/changePW',
            name: 'changePW',
            component: ChangePW
        },
        {
            path: '/join',
            name: 'join',
            component: Join
        }
    ]
});

//added 로그인 인증을 위한 네비게이션 가드 추가.
router.afterEach((to, from) => {
    // todo : 로그인 정보 확인.
    if (!to.name) {
        console.log('not found page 404');
    }
});

export default router;
