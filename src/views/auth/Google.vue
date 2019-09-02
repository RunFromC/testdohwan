<template></template>

<script>
export default {
    async mounted() {
        try {
            const query = this.$route.query;
            const uri = `/auth/google?code=${query.code}&scope=${query.scope}&authuser=2&session_state=${query.session_state}&prompt=${query.prompt}`;
            const res = await this.$axios('get', uri);
            console.log(res);
            window.opener.authResultForGoogle(res);
            window.close();
        } catch (e) {
            console.error(e);
            alert('인증에 실패하였습니다.');
            window.close();
        }
    }
};
</script>

<style>
</style>
