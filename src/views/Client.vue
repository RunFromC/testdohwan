<template>
  <div class="card_wrap" id="loginPage">
    <div class="contents type1 open" id="loginTab" v-if="!onQuestionTab">
      <a href="#" class="icon-questions" @click="toggleQuestionTab(true)"></a>
      <div class="top">
        <div class="titleWrap">
          <div class="imgWrap">
            <img src="../assets/img/pick_big.png" alt="bigbird" />
          </div>

          <div class="text" v-if="!welcome">보다 정교한, 나만의 인플루언서 선택</div>
          <div class="text" v-else>파트너가 되어 반갑습니다</div>
        </div>
        <div class="loginBox">
          <div class="tab2">
            <div class="toggleBtnWrap">
              <a href="#">빅버드 ID 로그인</a>
            </div>
            <form action="/?service=client" method="get" id="loginForm">
              <input class="input-text" type="text" placeholder="아이디" />
              <input class="input-text" type="password" placeholder="비밀번호" />
              <input class="input-button" type="submit" value="로그인" />
              <div class="box">
                <div class="checkBoxWrap">
                  <input type="checkbox" class="input-check-box" />
                  <i></i>
                  <span>로그인 유지</span>
                </div>

                <router-link to="/find?service=client" class="idPwFindBtn">아이디/비밀번호 찾기</router-link>
              </div>

              <router-link to="/join" class="join_btn">브랜드 회원가입 ></router-link>
            </form>
          </div>
        </div>
      </div>
      <div class="bottom">
        <a href="#" class="go_bigbird_btn">
          <img src="../assets/img/client_login_butt.png" alt="Pick - 둘러보기" />
        </a>
      </div>
    </div>

    <questionTab v-else @close="toggleQuestionTab" isQuestionTab="isQuestionTab">
      <div class="box" id="questionTab">
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
    </questionTab>
  </div>
</template>

<script>
import questionTab from '../components/QuestionTab';

export default {
    name: 'Home',
    data() {
        return {
            welcome: false,
            onLoginForm: false,
            onQuestionTab: false,
            isQuestionTab: true
        };
    },
    computed: {
        checkOnLoginForm() {
            return this.onLoginForm ? 'open' : '';
        }
    },
    components: {
        questionTab
    },
    methods: {
        changeLoginType() {
            this.onLoginForm = !this.onLoginForm;
        },
        toggleQuestionTab(isQuestion) {
            this.isQuestionTab = isQuestion;
            this.onQuestionTab = !this.onQuestionTab;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/index_client.scss';
</style>
