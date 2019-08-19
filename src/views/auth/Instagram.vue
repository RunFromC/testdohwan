<template></template>

<script>
export default {
    mounted() {
        window.opener.authResultForInsta(this.$route.query);
        window.close();
    }
};
</script>

<style>
</style>
