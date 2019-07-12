<template>
  <div class="loginBg">
    <div class="card_wrap" id="findWrap">
      <div class="contents type1" v-if="!onQuestionTab">
        <a href="#" class="icon-questions" @click.prevent="toggleQuestionTab(true)"></a>
        <router-link to="/" class="icon-back-btn"></router-link>
        <div class="top">
          <div class="container">
            <div class="title">아이디/비밀번호 찾기</div>
            <div class="tabBtnWrap">
              <a href="#" @click.prevent="toggleTab" :class="!isTabToggle ? 'on' : '' ">아이디</a>
              <a href="#" @click.prevent="toggleTab" :class="isTabToggle ? 'on' : '' ">비밀번호</a>
            </div>

            <div class="tab">
              <div class="inputArea">
                <div id="findID" :class="isTabToggle ? 'none' : '' ">
                  <input class="input-text" type="text" placeholder="이름" />
                </div>
                <div id="findPW" :class="!isTabToggle ? 'none' : '' ">
                  <input class="input-text" type="text" placeholder="가입된 아이디" />
                  <input class="input-text" type="text" placeholder="이름" />
                </div>
              </div>

              <div class="text">인증수단 선택</div>
              <div class="certificationBtnWrap" v-if="!certification.isCertOn">
                <input
                  id="email"
                  type="button"
                  value="이메일"
                  class="input-button"
                  @click.prevent="onCertification(true,'email')"
                />
                <input
                  id="phone"
                  type="button"
                  value="핸드폰"
                  class="input-button"
                  @click.prevent="onCertification(true,'phone')"
                />
              </div>
              <div class="certificationTabs" v-if="certification.isCertOn">
                <div class="certification" id="cert_email" v-if="certification.isCertEmailOn">
                  <input type="text" placeholder="이메일" class="input-text" />
                  <input type="button" value="인증메일 요청" class="input-button" />
                  <span class="wrongMsg">
                    <i class="none">잘못된 이메일 형식입니다</i>
                  </span>
                  <a href="#">인증메일 재전송 요청 ></a>
                </div>

                <div class="certification" id="cert_phone" v-if="certification.isCertPhoneOn">
                  <div class="phoneNumberWrap">
                    <input type="text" placeholder="핸드폰" class="input-phone" />
                    <input type="text" class="input-phone" />
                    <input type="text" class="input-phone" />
                  </div>
                  <input type="button" value="인증번호 요청" class="input-button" />

                  <div id="certNumberWrap">
                    <input type="text" id="certNumberInput" placeholder="인증번호 입력" />
                    <div id="countDown">05:00</div>
                    <input type="button" id="certNumberBtn" value="확인" />
                  </div>

                  <a class="reSendCertNum" href="#">인증번호 재전송 요청 ></a>
                  <span class="resMessage none">인증번호가 일치하지 않습니다.</span>
                  <span class="successMessage none">
                    ***님의 아이디는
                    <i>concepters123456</i>입니다.
                  </span>

                  <div id="certBtnWrap" class="none">
                    <a href="/" id="goLogin">로그인</a>
                    <a href="#" id="goPassword">비밀번호 찾기</a>
                  </div>
                </div>

                <a href="#" id="goBack" @click.prevent="onCertification(false)">처음으로</a>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <a href="#" class="go_bigbird_btn">
            <img
              v-if="service==='brands'"
              src="~@/assets/img/login_bigbird-i_butt.png"
              alt="빅버드i 둘러보기"
            />
            <img
              v-if="service === 'client'"
              src="~@/assets/img/client_login_butt.png"
              alt="Pick 둘러보기"
            />
            <img
              v-if="service === 'influencer' || service === 'market'"
              src="~@/assets/img/market_under.png"
              alt="마켓 둘러보기"
            />
          </a>
        </div>
      </div>
      <questionTab v-else @close="toggleQuestionTab" />
    </div>
  </div>
</template>

<script>
import questionTab from '../components/QuestionTab';
import { mapState } from 'vuex';

export default {
    name: 'Find',
    data() {
        return {
            onQuestionTab: false,
            isTabToggle: false,
            certification: {
                isCertOn: false,
                isCertEmailOn: false,
                isCertPhoneOn: false
            }
        };
    },
    computed: {
        ...mapState(['service', 'isQuestionTab'])
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
        toggleTab() {
            this.isTabToggle = !this.isTabToggle;
            this.certification.isCertOn = false;
        },
        onCertification(onOff, type) {
            this.certification.isCertOn = onOff;
            if (type.includes('email')) {
                this.certification.isCertEmailOn = true;
                this.certification.isCertPhoneOn = false;
            } else {
                this.certification.isCertEmailOn = false;
                this.certification.isCertPhoneOn = true;
            }
            console.log(this.certification);
        }
    },
    mounted() {
        if (this.service === '') {
            this.$router.push('/');
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/login/findIdPw.scss';
</style>

