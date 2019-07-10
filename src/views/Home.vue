<template>
  <div class="card_wrap" id="loginPage">
    <div class="contents type1" :class="checkOnLoginForm" v-if="!onQuestionTab" id="loginTab">
      <a href="#" class="icon-questions" @click="toggleQuestionTab(true)"></a>
      <div class="top">
        <div class="titleWrap">
          <div class="imgWrap">
            <img src="../assets/img/login_bigbird_icon.png" alt="bigbird" />
          </div>

          <div class="text" v-if="!welcome">{{title}}</div>
          <div class="text" v-else>회원가입을 환영합니다</div>
        </div>
        <div class="loginBox">
          <div class="tab1">
            <div class="toggleBtnWrap">
              <a href="#" @click="changeLoginType">신청받은 플랫폼으로 로그인</a>
            </div>
            <div class="platformList">
              <a href="#" class="facebook"></a>
              <a href="#" class="instagram"></a>
              <a href="#" class="youtube"></a>
              <a href="#" class="naver" @click="toggleQuestionTab(false)"></a>
              <a href="#" class="twitter"></a>
            </div>
          </div>
          <div class="partition">
            <div class="line"></div>
            <div class="text">or</div>
            <div class="line"></div>
          </div>
          <div class="tab2">
            <div class="toggleBtnWrap">
              <a href="#" @click.prevent="changeLoginType">빅버드 ID 로그인</a>
            </div>
            <form action="/" method="get" id="loginForm">
              <input class="input-text" type="text" placeholder="아이디" />
              <input class="input-text" type="password" placeholder="비밀번호" />
              <input class="input-button" type="submit" value="로그인" />
              <div class="box">
                <div class="checkBoxWrap">
                  <input type="checkbox" class="input-check-box" />
                  <i></i>
                  <span>로그인 유지</span>
                </div>

                <router-link to="/find" class="idPwFindBtn">아이디/비밀번호 찾기</router-link>
              </div>

              <router-link to="/join" class="join_btn">인플루언서 회원가입 ></router-link>
            </form>
          </div>
        </div>
      </div>
      <div class="bottom">
        <a href="#" class="go_bigbird_btn">
          <img
            src="../assets/img/login_bigbird-i_butt.png"
            alt="빅버드i 둘러보기"
            v-if="service === 'brands'"
          />
          <img src="../assets/img/market_under.png" alt="빅버드i 둘러보기" v-else />
        </a>
      </div>
    </div>

    <questionTab v-else @close="toggleQuestionTab" isQuestionTab="isQuestionTab">
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
    </questionTab>
  </div>
</template>

<script>
import questionTab from '../components/QuestionTab';
import { mapState } from 'vuex';

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
        },
        ...mapState(['service']),
        title() {
            return this.service === 'brands'
                ? '가능성은 당신에게 있어요'
                : '빅버드 마켓에 오신 것을 환영합니다';
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
@import '../assets/scss/index.scss';
</style>
