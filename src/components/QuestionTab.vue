<template>
  <div class="contents type2">
    <a href="#" class="icon-back-btn" @click.prevent="close"></a>
    <div class="box" id="questionTab" v-if="isQuestionTab">
      <div class="top">
        <div class="title">문의</div>
        <img src="../assets/img/login_ask_kakao icon.png" alt="카카오톡 문의" />
        <input type="button" class="input-button" value="카카오톡 상담하기" />
      </div>
      <div class="middle">
        <a href="#" class="tel">Tel. 1661 - 6213</a>
        <div class="text">
          평일: 10:00 ~ 18:30
          <br />off-time: 12:30 ~ 13:30
          <br />(공휴일 휴무)
        </div>
      </div>
      <div class="bottom">
        <a href="mailto:bigbird-pick@concepters.co.kr" class="email">bigbird-pick@concepters.co.kr</a>
      </div>
    </div>

    <div class="box" id="naverTab" v-else>
      <div class="top">
        <div class="title">
          로그인시
          <br />이메일 제공을
          <br />꼭 체크해주세요.
        </div>
        <img src="../assets/img/login_sns login_naver icon.png" alt="카카오톡 문의" />
      </div>
      <div class="middle">
        <div class="text">
          인플루언서 선정공지 등 캠페인 진행을
          <br />위해서는 이메일 정보가 필요해요
        </div>
      </div>
      <div class="bottom">
        <input type="button" class="input-button" value="네이버 로그인" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['isQuestionTab'])
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style>
</style>
