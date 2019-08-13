<template></template>

<script>
export default {
    mounted() {
        console.log(this.$route.query);
        window.opener.authResultForInsta(this.$route.query);
        window.close();
    }
};
</script>

<style>
</style>
