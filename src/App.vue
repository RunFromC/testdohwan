<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations(['setService']),
    },
    mounted() {
        this.$store.commit(
            'setIccMode',
            'true' === process.env.VUE_APP_ICC_MODE
        );
        this.setService({ path: this.$router.currentRoute.path });
    }
};
</script>

<style lang="scss">
</style>