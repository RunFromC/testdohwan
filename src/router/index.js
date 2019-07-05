import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

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
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
    ]
});

//added 로그인 인증을 위한 네비게이션 가드 추가.
router.beforeEach((to, from, next) => {
    // todo : 로그인 정보 확인.
    next();
});

export default router;
