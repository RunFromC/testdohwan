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
              <a
                href="#"
                @click.prevent="[toggleTab('id'), onCertification(false)]"
                :class="isTabToggle('id')"
              >아이디</a>
              <a
                href="#"
                @click.prevent="[toggleTab('pw'), onCertification(false)]"
                :class="isTabToggle('pw')"
              >비밀번호</a>
            </div>

            <div class="tab">
              <div class="inputArea">
                <div id="findID" v-if="isTabToggle('id')">
                  <input class="input-text" type="text" placeholder="이름" />
                </div>
                <div id="findPW" v-else>
                  <input class="input-text" type="text" placeholder="가입된 아이디" />
                  <input class="input-text" type="text" placeholder="이름" />
                </div>
              </div>

              <div class="text">인증수단 선택</div>
              <div class="certificationBtnWrap" v-if="this.certification.isCertOn">
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
              <div class="certificationTabs" v-else>
                <div class="certification" id="cert_email" v-if="certification.isCertEmailOn">
                  <input type="text" placeholder="이메일" class="input-text" />
                  <a href="#" class="input-button" @click="certInputOnOff">인증번호 요청</a>
                  <span class="wrongMsg">
                    <i class="none">잘못된 이메일 형식입니다</i>
                  </span>
                  <div id="certNumberWrap" v-show="certification.isCertInputOn">
                    <input type="text" id="certNumberInput" placeholder="인증번호 입력" />
                    <div id="countDown">05:00</div>
                    <a href="#" id="certNumberBtn">확인</a>
                  </div>

                  <a href="#">인증메일 재전송 요청 ></a>
                </div>

                <div class="certification" id="cert_phone" v-else-if="certification.isCertPhoneOn">
                  <div class="phoneNumberWrap">
                    <input type="text" placeholder="핸드폰" class="input-phone" />
                    <input type="text" class="input-phone" />
                    <input type="text" class="input-phone" />
                  </div>

                  <div id="certNumberWrap">
                    <input type="text" id="certNumberInput" placeholder="인증번호 입력" />
                    <div id="countDown">05:00</div>
                    <a href="#" id="certNumberBtn">확인</a>
                  </div>
                  <input type="button" value="인증번호 요청" class="input-button" />

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
          <a href="#" class="go_bigbird_btn" v-if="!this.$store.state.iccMode">
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
          <a href="#" class="go_bigbird_btn" v-else>
            <span style="font-size: 16px; color: #4bd897; text-transform: uppercase;">icc 둘러보기</span>
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
            isTabToggleValue: 'id',
            certification: {
                isCertOn: true,
                isCertEmailOn: false,
                isCertPhoneOn: false,
                isCertInputOn: false
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
        certInputOnOff() {
            this.certification.isCertInputOn = true;
        },
        toggleTab(value) {
            this.isTabToggleValue = value;
        },
        isTabToggle(el) {
            if (el.includes(this.isTabToggleValue)) return 'on';
        },
        toggleQuestionTab(isQuestion) {
            this.$store.commit('setToggleType', {
                type: isQuestion
            });
            this.onQuestionTab = !this.onQuestionTab;
        },
        // toggleTab(type) {
        //     this.isTabToggle = !this.isTabToggle;
        //     this.certification.isCertOn = false;
        //     console.log(type);
        // },
        onCertification(onOff, type) {
            this.certification.isCertOn = onOff;
            this.certification.isCertOn = !this.certification.isCertOn;
            if (type.includes('email')) {
                this.certification.isCertEmailOn = true;
                this.certification.isCertPhoneOn = false;
            } else {
                this.certification.isCertEmailOn = false;
                this.certification.isCertPhoneOn = true;
            }
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

