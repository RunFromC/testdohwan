<template>
  <div class="loginBg">
    <div class="card_wrap" id="findWrap">
      <div class="contents type1" v-if="!onQuestionTab">
        <a href="#" class="icon-questions" @click.prevent="toggleQuestionTab(true)"></a>
        <router-link to="/find" class="icon-back-btn"></router-link>
        <div class="top">
          <div class="container">
            <div class="title">비밀번호 변경</div>
            <div class="tabBtnWrap">
              <a href="#">아이디</a>
              <a href="#" class="on">비밀번호</a>
            </div>

            <div class="tab">
              <div class="inputArea">
                <div id="changePw">
                  <div class="inputWrapper">
                    <input
                      id="password"
                      class="input-text"
                      type="password"
                      placeholder="새 비밀번호"
                      maxlength="20"
                    />
                    <i class="icon-eye"></i>
                  </div>

                  <div class="inputWrapper">
                    <input
                      id="passwordCheck"
                      class="input-text"
                      type="password"
                      placeholder="새 비밀번호 확인"
                      maxlength="20"
                    />
                    <i class="icon-eye"></i>
                  </div>
                </div>
              </div>
              <div class="wrong-msg" v-if="wrongPw === true ? 'none': ''">
                <span>비밀번호가 일치하지 않습니다.</span>
              </div>
              <a href="#" id="changePassword" @click="isPwEq()">변경하기</a>
            </div>
          </div>
        </div>

        <div class="bottom">
          <a href="#" class="go_bigbird_btn" v-if="!this.$store.state.iccMode">
            <img src="../assets/img/market_under.png" alt="빅버드i 둘러보기" />
          </a>
          <a href="#" class="go_bigbird_btn">
            <span style="font-size: 16px; color: #4bd897; text-transform: uppercase;">icc 둘러보기</span>
          </a>
        </div>
      </div>
      <questionTab v-else @close="toggleQuestionTab" />
    </div>
  </div>
</template>

<script>
import '../assets/scss/login/findIdPw.scss';
import questionTab from '../components/QuestionTab';
export default {
    data() {
        return {
            isTabToggle: false,
            onQuestionTab: false,
            wrongPw: false
        };
    },
    components: {
        questionTab
    },
    methods: {
        toggleQuestionTab(isQuestion) {
            this.$store.commit('setToggleType', {
                type: isQuestion
            });
            this.onQuestionTab = !this.onQuestionTab;
        },
        isPwEq() {
            this.wrongPw = true;
        }
    }
};
</script>

<style>
</style>
