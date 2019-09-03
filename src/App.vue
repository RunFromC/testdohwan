<template>
    <div id="app">
        <router-view :key="$route.path" />
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
    methods: {
        ...mapMutations(['setService'])
    },
    mounted() {
        this.$store.commit(
            'setIccMode',
            'true' === process.env.VUE_APP_ICC_MODE
        );

        console.log(this.$route.path);
        console.log(this.$route.query.service);

        if (this.$route.path === '/join' && !this.$route.query.service) {
            this.$router.push('/join?service=brands');
            this.setService({ service: 'brands' });
        } else if (this.$route.path === '/influencer') {
            this.setService({ service: 'influencer' });
        } else if (this.$route.path === '/market') {
            this.setService({ service: 'market' });
        } else if (this.$route.path === '/') {
            this.setService({ service: 'brands' });
        } else if (this.$route.path === '/client') {
            this.setService({ service: 'client' });
        } else if (this.$route.query.service) {
            this.setService({ service: this.$route.query.service });
        }
    }
};
</script>

<style lang="scss">
</style>