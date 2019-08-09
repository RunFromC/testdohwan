<template>
  <div>
    <form id="kmcis_form" name="kmcis_form" method="get"></form>
  </div>
</template>

<script>
export default {
    mounted() {
        var move_page_url = 'http://member.concepters.co.kr/join';

        var UserAgent = navigator.userAgent;

        document.kmcis_form.action = move_page_url;

        // if (
        //     UserAgent.match(
        //         /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
        //     ) != null ||
        //     UserAgent.match(/LG|SAMSUNG|Samsung/) != null
        // ) {
        //     document.kmcis_form.submit();
        // } else {
        //     document.kmcis_form.target = opener.window.name;
        //     document.kmcis_form.submit();
        //     self.close();
        // }

        window.opener.cert_result(this.$route.query);
        self.close();
    }
};
</script>

<style>
</style>
