<template>
  <div id="app">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
    mounted() {
        this.$store.commit(
            'setIccMode',
            'true' === process.env.VUE_APP_ICC_MODE
        );
    }
};
</script>


<style lang="scss">
</style>