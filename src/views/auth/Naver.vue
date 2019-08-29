<template></template>

<script>
export default {
    async mounted() {
        try {
            const uri = `/auth/naver?code=${this.$route.query.code}&state=${this.$route.query.state}`;
            const res = await this.$axios('get', uri);
            window.opener.authResultForInsta(res);
            window.close();
        } catch (e) {
            console.error(e);
        }
    }
};
</script>

<style>
</style>
