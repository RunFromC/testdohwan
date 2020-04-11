<template>
    <div>
        <span>
            <router-link to="/">home</router-link>
        </span>
        <br />
        <button @click="resetUserList">button</button>
        <br />
        <!-- <span>{{msg}}</span> -->
        <ul>
            <li v-for="(item, i) in userList" v-bind:key="item">{{i + 1}} 번째 데이터 : {{item.id}}</li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';

export default {
    name: 'Test',
    data() {
        return {
            msg: 'king bat ne',
            userList: new Array()
        };
    },
    computed: {},
    components: {},
    methods: {
        ...mapMutations(['setUserListNull']),
        resetUserList() {
            this.setUserListNull();
        }
    },
    mounted() {
        // this.$axios('get', '/user').then(res => {
        //     console.log(res);
        //     if (res.data.result) {
        //         this.userList = res.data.data;
        //     }
        // });

        this.userList = this.$store.getters.getUserList;
    }
};
</script>

<style lang="scss" scoped>
ul {
    list-style-type: none;
    padding: 0;
}
</style>
