<template>
  <div class="loginBg">
    <div class="card_wrap" id="loginPage">
      <div class="contents type1" :class="checkOnLoginForm" v-if="!onQuestionTab" id="loginTab">
        <a href="#" class="icon-questions" @click.prevent="toggleQuestionTab(true)"></a>
        <div class="top">
          <div class="titleWrap">
            <div class="imgWrap">
              <img
                src="../assets/img/login_bigbird_icon.png"
                alt="bigbird"
                v-if="!this.$store.state.iccMode"
              />
              <span v-else style="font-size: 30px; color: #4bd897">ICC</span>
            </div>

            <div class="text" v-if="this.$store.state.welcome = false">{{title}}</div>
            <div class="text" v-else>회원가입을 환영합니다</div>
          </div>
          <div class="loginBox" v-if="!this.$store.state.iccMode">
            <div class="tab1">
              <div class="toggleBtnWrap">
                <a href="#" @click.prevent="changeLoginType">신청받은 플랫폼으로 로그인</a>
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

                <router-link to="/join" class="join_btn" v-if="service !== 'market'">인플루언서 회원가입 ></router-link>
                <router-link to="/join" class="join_btn" v-else>구매자 회원가입 ></router-link>
              </form>
            </div>
          </div>
          <div class="loginBox" v-else>
            <div class="tab2">
              <div class="toggleBtnWrap">
                <a href="#" @click.prevent="changeLoginType">로그인/회원가입</a>
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

                <router-link to="/join" class="join_btn" v-if="service !== 'market'">인플루언서 회원가입 ></router-link>
                <router-link to="/join" class="join_btn" v-else>구매자 회원가입 ></router-link>
              </form>
            </div>
          </div>
        </div>
        <div class="bottom">
          <a href="#" class="go_bigbird_btn" v-if="!this.$store.state.iccMode">
            <img
              src="../assets/img/login_bigbird-i_butt.png"
              alt="빅버드i 둘러보기"
              v-if="service === 'brands'"
            />
            <img src="../assets/img/market_under.png" alt="빅버드i 둘러보기" v-else />
          </a>
          <a href="#" class="go_bigbird_btn" v-else>
            <span style="font-size: 16px; color: #4bd897; text-transform: uppercase;">icc 둘러보기</span>
          </a>
        </div>
      </div>

      <questionTab v-else @close="toggleQuestionTab"></questionTab>
    </div>
  </div>
</template>

<script>
import questionTab from '../components/QuestionTab';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Home',
    data() {
        return {
            onLoginForm: false,
            onQuestionTab: false
        };
    },
    computed: {
        checkOnLoginForm() {
            // return (this.onLoginForm = true ? 'open' : '');
            return !this.$store.state.iccMode
                ? this.onLoginForm
                    ? 'open'
                    : ''
                : !this.onLoginForm
                ? 'open'
                : '';
        },
        ...mapState(['service', 'isQuestionTab']),
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
            if (!this.$store.state.iccMode) {
                console.log('빅버드야~');
                this.onLoginForm = !this.onLoginForm;
            } else {
                console.log('icc야~');
                this.onLoginForm = false;
            }
            // this.onLoginForm = !this.onLoginForm;
        },
        toggleQuestionTab(isQuestion) {
            this.$store.commit('setToggleType', {
                type: isQuestion
            });
            this.onQuestionTab = !this.onQuestionTab;
        }
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/index_client.scss';
</style>
