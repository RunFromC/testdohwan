<template>
  <div id="app">
    <div class="loginBg"></div>
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    methods: {
        ...mapMutations(['setService'])
    },
    mounted() {
        console.log(this.$router.currentRoute.path);
        const path = this.$router.currentRoute.path;
        if (path.includes('influencer')) {
            this.setService({ service: 'influencer' });
        } else if (path.includes('client')) {
            this.setService({ service: 'client' });
        } else if (path.includes('market')) {
            this.setService({ service: 'market' });
        } else {
            this.setService({ service: 'brands' });
        }
    }
};
</script>


<style lang="scss">
</style>
