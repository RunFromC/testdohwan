<template>
    <div>{{msg}}</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';

export default {
    name: 'Home',
    data() {
        return {
            msg: 'test'
        };
    },
    computed: {},
    components: {},
    methods: {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
