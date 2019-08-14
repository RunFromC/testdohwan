<template>
  <div id="join">
    <div id="header">
      <div class="container">
        <h1 class="logo" v-if="!this.$store.state.iccMode">
          <img id="desktopLogo" src="~@/assets/img/logo_join.png" alt="빅버드회원가입" />
          <img id="tabletLogo" src="~@/assets/img/logo_join_tablet.png" alt="빅버드회원가입" />
        </h1>
        <h1 class="logo" v-else>                    
            <span id="desktopLogo" style="font-size: 30px; text-transform: uppercase; color: #4bd897">icc <em style="color: #000;">회원가입</em></span>
            <span id="tabletLogo" style="font-size: 14px; text-transform: uppercase; color: #4bd897">icc <em style="color: #000;">회원가입</em></span>
        </h1>
      </div>
    </div>
        <div id="card-container" ref="cardContainer" :class="joinPage ? 'min' : ''">
<!--        <div class="scene">-->
            <div :class="joinPage == false &&  addJoinPage ? 'none': '' || cardFilp" class="card" id="cardStep1" >
                <div class="front">
                    <a href="#" class="rotate-btn"  @click.prevent="onCardFilp"></a>
                    <div class="contents">
                        <div class="article">
                            <div class="header">
                                1. 정보입력(필수)
                            </div>
                            <div class="input-wrapper">
                                <div class="item">
                                    <div class="label">아이디 </div>
                                    <input type="text" v-model="id" @keyup="idvalidationReset">
                                    <button @click="idCheck" :class="id ? 'on':''" v-bind:disabled="idCheckDisable">중복확인</button>
                                    <div class="wrong-text" v-if="id && idValidityText">영문,숫자 포함 4~12자리</div>
                                    <div class="possible-text" v-if="id && idPossibleText">사용가능한 아이디입니다</div>
                                    <div class="wrong-text" v-if="id && idWrongText">사용중인 아이디입니다</div>
                                    <div class="wrong-text" v-if="id && idCheckText">중복확인이 필요합니다</div>
                                </div>
                            </div>

                            <div class="input-wrapper ">
                                <div class="item password">
                                    <div class="label">비밀번호 </div>
                                    <input type="password" placeholder="비밀번호" v-model="pw" @keyup="pwInput">
                                    <a href="#" class="icon-eye" @click.prevent="changePwType"></a>
                                    <div class="wrong-text" v-if="pwValidityText">영문,숫자,특수문자 포함 6~14자리</div>
                                </div>

                                <div class="item password">
                                    <div class="label"> </div>
                                    <input type="password" placeholder="비밀번호 확인" v-model="pwAgain" @keyup="pwCheck">
                                    <a href="#" class="icon-eye" @click.prevent="changePwType"></a>
                                    <div class="wrong-text" v-if="pwWrongText">비밀번호가 일치하지 않습니다</div>
                                </div>
                            </div>

                            <div class="input-wrapper ">
                                <div class="item password">
                                    <div class="label">이름 </div>
                                    <input type="text" v-model="name" disabled>
                                </div>

                                <div class="item">
                                    <div class="label">휴대폰번호 </div>
                                    <input type="text" v-model="phoneNumber" disabled>
                                    <button @click="phoneCheck" :class="phoneNumber ? '':'on'">인증하기</button>
                                    <div class="possible-text" v-if="certPossibleText">본인 인증에 성공하였습니다</div>
                                    <div class="wrong-text" v-if="certWrongText">본인 인증에 실패하였습니다</div>
                                </div>

                                <!-- <div class="item">
                                    <div class="label"> </div>
                                    <input type="text" v-model="certNumber">
                                    <button :class="certNumber ? 'on':''" v-bind:disabled="certCheckDisable">확인</button>
                                    <div class="possible-text" v-if="certPossibleText">본인 인증에 성공하였습니다</div>
                                    <div class="wrong-text" v-if="certWrongText">본인 인증에 실패하였습니다</div>
                                </div> -->

                            </div>

                            <div class="input-wrapper">
                                <div class="item">
                                    <div class="label">이메일</div>
                                    <input type="text" placeholder="직접입력" v-model="email" @keyup="emailvalidationReset">
                                    <button @click="eamilCheck" :class="email ? 'on':''" v-bind:disabled="emailCheckDisable">중복확인</button>
                                    <div class="wrong-text" v-if="email && emailValidityText">잘못된 이메일 형식입니다</div>
                                    <div class="possible-text" v-if="email && emailPossibleText">사용가능한 이메일입니다</div>
                                    <div class="wrong-text" v-if="email && emailWrongText">사용중인 이메일입니다</div>
                                    <div class="wrong-text" v-if="email && emailCheckText">중복확인이 필요합니다</div>
                                </div>
                            </div>

                            <div class="line"></div>

                            <div class="checkbox-wrap">
                                <div class="label"  @click.prevent="termCardFlip(1)">약관동의(필수)</div>
                                <input type="checkbox" class="input-checkbox" >
                                <i @click.prevent="changeTermCheck('termsOfUse')" :class="termsChecked('termsOfUse')"></i>
                            </div>
                            <div class="checkbox-wrap margin-bottom-0" v-if="!this.$store.state.iccMode">
                                <div class="label" @click.prevent="termCardFlip(2)">통합회원가입하기(선택)</div>
                                <input type="checkbox" class="input-checkbox" >
                                <i @click.prevent="changeTermCheck('termsOfIMS')" :class="termsChecked('termsOfIMS')"></i>
                            </div>
                            <div class="link_wrap" v-if="!this.$store.state.iccMode">
                                <a href="#"><img src="~@/assets/img/market_logo.png" alt=""></a>
                                <div class="split"></div>
                                <a href="#"><img src="~@/assets/img/pick_logo.png" alt=""></a>
                                <div class="split"></div>
                                <a href="#"><img src="~@/assets/img/bigbird-i_logo.png" alt=""></a>
                            </div>
                            <div class="finished" :class="joinPage ? 'none': ''" @click="standardJoin">
                                <a href="#" :class="id&&pw&&pwAgain&&name&&phoneNumber&&email&&getByFormData.termsOfUse == true ? 'on':''"><span>가입완료</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="back">
                    <a href="#" class="rotate-btn2" @click.prevent="onCardFilp"></a>
                    <div class="contents">
                        <Terms @update="changedTabForTemrs" />
                    </div>
                </div>
            </div>
<!--        </div>-->
<!--        <div class="scene">-->
            <div :class="joinPage == false ? 'none': ''" class="card" id="cardStep2">
                <div class="front">
                    <div class="contents">
                        <div class="article">
                            <div class="header">
                            2. 회사정보(선택)
                            </div>
                            <div class="input-wrapper pb15">
                                <div class="item col1">
                                    <div class="label">회사명</div>
                                    <input type="text" v-model="companyName">
                                    <div class="wrong-text" v-if="companyName && companyNameValidityText">영문,숫자 포함 4~12자리</div>
                                    <div class="possible-text" v-if="companyName && companyNamePossibleText">사용가능한 아이디입니다</div>
                                    <div class="wrong-text" v-if="companyName && companyNameWrongText">사용중인 아이디입니다</div>
                                </div>
                            </div>

                            <div class="input-wrapper pb15">
                                <div class="item col1">
                                    <div class="label">연락처</div>
                                    <input type="text" class="input-phone" maxlength="4" placeholder="010" v-model="companyPhoneNumber1">
                                    <input type="text" class="input-phone" maxlength="4" v-model="companyPhoneNumber2">
                                    <input type="text" class="input-phone" maxlength="4" v-model="companyPhoneNumber3">
                                </div>
                            </div>

                            <div class="input-wrapper pb31">
                                <div class="ceo-btn">
                                    <button>사업자 등록증 업로드</button>
                                    <div class="uploadtextfaise none">최대 업로드 파일 크기: 5MB</div>
                                    <div class="uploadtexttrue none">
                                        <span>파일명최대10글자.jpg</span>
                                        <span>5MB</span>
                                    </div>
                                </div>
                            </div>

                            <div class="input-wrapper pb15">
                                <div class="item col1">
                                    <div class="label ceo">사업자<br>등록번호</div>
                                    <input type="text" class="ceo-num" placeholder="123" maxlength="3" v-model="businessRegistrationNumber1">
                                    <input type="text" class="ceo-num" placeholder="45" maxlength="2" v-model="businessRegistrationNumber2">
                                    <input type="text" class="ceo-num" placeholder="67890" maxlength="5" v-model="businessRegistrationNumber3">
                                </div>
                            </div>
                            <div class="input-wrapper pb31">
                                <div class="ceo-btn">
                                    <button>통신판매업증 업로드</button>
                                    <div class="uploadtextfaise none">최대 업로드 파일 크기: 5MB</div>
                                    <div class="uploadtexttrue none">
                                        <span>파일명최대10글자.jpg</span>
                                        <span>5MB</span>
                                    </div>
                                </div>
                            </div>

                            <div class="input-wrapper pb15">
                                <div class="item col1">
                                    <div class="label ceo">통신판매업<br>번호</div>
                                    <input type="text" class="ceo-num" placeholder="123" maxlength="3" v-model="mailOrderNumber1">
                                    <input type="text" class="ceo-num" placeholder="45" maxlength="2" v-model="mailOrderNumber2">
                                    <input type="text" class="ceo-num" placeholder="67890" maxlength="5" v-model="mailOrderNumber3">
                                </div>
                            </div>

                            <div class="input-wrapper pb15">
                                <div class="item col1">
                                    <div class="label">회사 분류</div>
                                    <ul class="select-wrap">
                                        <li class="select-contents">
                                            <div class="select">
                                                <span>대분류</span>
                                                <i class="rotate"></i>
                                            </div>
                                            <div class="listWrap">
                                                <ul class="list">
                                                    <li>1</li>
                                                    <li>2</li>
                                                    <li>3</li>
                                                    <li>4</li>
                                                </ul>
                                            </div>
                                        </li>                                        
                                    </ul>
                                </div>
                            </div>


                            <div class="input-wrapper">
                                <div class="item col1">
                                    <div class="label">회사 URL</div>
                                    <input type="text" v-model="companyURL">
                                </div>
                            </div>
                            <router-link  id="join-finished" to="/client" :class="this.$store.state.welcome = true">회사정보 입력완료</router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div :class="joinPage == false ? 'none': ''" class="card" id="cardStep3">
                <div class="front">
                    <div class="contents" >
                        <div class="article" style="display: block;" id="callkakao">
                            <div class="top">
                                <div class="title">문의</div>
                                <img src="~@/assets/img/login_ask_kakao icon.png" alt="카카오 문의">
                                <input type="button" class="input-button" value="카카오톡 상담하기">
                            </div>
                            <div class="middle">
                                <a href="#" class="tel">Tel. 1661 - 6213</a>
                                <div class="text">
                                    평일:10:00 ~ 18:30 <br> off-time: 12:30 ~ 13:30 <br> (공휴일 휴무)
                                </div>
                            </div>
                            <div class="bottom">
                                <a href="#" class="email">bigbird-pick@concepters.co.kr</a>
                            </div>
                        </div>
                        <div class="article" style="display: none;" id="welcome">
                            <div class="img-warp">
                                <img src="~@/assets/img/market_B_LOGO.png" alt="마켓 비 아이콘">
                            </div>
                            <div class="title">
                                파트너가 되어 반갑습니다
                            </div>
                            <div class="text">
                                가입 승인 후 이메일을 통해<br>
                                빠르게 연락드리겠습니다.
                            </div>
                            <button>확인</button>
                            <div class="linktext">
                                서비스 둘러보기
                            </div>
                            <div class="link_wrap">
                                <a href="#"><img src="~@/assets/img/market_logo.png" alt=""></a>
                                <div class="split"></div>
                                <a href="#"><img src="~@/assets/img/pick_logo.png" alt=""></a>
                                <div class="split"></div>
                                <a href="#"><img src="~@/assets/img/bigbird-i_logo.png" alt=""></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card" id="cardStep4" :class="!addJoinPage ? 'none': '' || !joinPage == false ? 'none': ''">
                <div class="front">
                    <ul class="content">
                        <li class="title">좀 더 소개해주실 수 있으세요?</li>
                        <li class="sub-text">보다 빠른 가입 승인 및 담당자 지정에 도움이 됩니다</li>
                        
                        <li class="button"><a href="#" @click="addJoin">추가정보 입력</a></li>
                        <li class="skip-btn"><router-link to="/client" :class="this.$store.state.welcome = true">괜찮아요. 이대로 가입할게요 ></router-link></li>
                    </ul>
                </div>
            </div>
    </div>

    <div id="m-container">
        <div class="header">
            <div class="header-title">
                <router-link to="/client" class="icon-back-btn"><i></i></router-link>
                <span>브랜드 회원가입</span>
            </div>
            <div class="tab-list">
                <div @click="toggleMobileTab(1)" :class="isToggleMobileTab === 1 ? 'on': ''">필수정보</div>
                <div @click="toggleMobileTab(2)" :class="isToggleMobileTab === 2 ? 'on': ''">회사정보(선택)</div>
            </div>
        </div>
        <div class="contents">
            <div class="tab" id="requiredInfo" v-if="isToggleMobileTab === 1">
                <div class="input-wrapper">
                    <div class="item">
                        <div class="label">아이디 </div>
                        <input type="text" v-model="id" @keyup="idvalidationReset">
                        <button @click="idCheck" :class="id ? 'on':''" v-bind:disabled="idCheckDisable">중복확인</button>
                        <div class="wrong-text" v-if="id && idValidityText">영문,숫자 포함 4~12자리</div>
                        <div class="possible-text" v-if="id && idPossibleText">사용가능한 아이디입니다</div>
                        <div class="wrong-text" v-if="id && idWrongText">사용중인 아이디입니다</div>
                        <div class="wrong-text" v-if="id && idCheckText">중복확인이 필요합니다</div>
                    </div>
                </div>

                <div class="input-wrapper ">
                    <div class="item password">
                        <div class="label">비밀번호 </div>
                        <input type="password" placeholder="비밀번호" v-model="pw" @keyup="pwInput">
                        <a href="#" class="icon-eye" @click.prevent="changePwType"></a>
                        <div class="wrong-text" v-if="pwValidityText">영문,숫자,특수문자 포함 6~14자리</div>
                    </div>

                    <div class="item password">
                        <div class="label"> </div>
                        <input type="password" placeholder="비밀번호 확인" v-model="pwAgain" @keyup="pwCheck">
                        <a href="#" class="icon-eye" @click.prevent="changePwType"></a>
                        <div class="wrong-text" v-if="pwWrongText">비밀번호가 일치하지 않습니다</div>
                    </div>
                </div>

                <div class="input-wrapper ">
                    <div class="item">
                        <div class="label">이름 </div>
                        <input type="text" v-model="name" disabled>
                    </div>

                    <div class="item">
                        <div class="label">휴대폰번호 </div>
                        <input type="text" v-model="phoneNumber" disabled>
                        <button @click="phoneCheck" :class="phoneNumber ? '':'on'">인증하기</button>
                        <div class="possible-text" v-if="certPossibleText">본인 인증에 성공하였습니다</div>
                        <div class="wrong-text" v-if="certWrongText">본인 인증에 실패하였습니다</div>
                    </div>

                    <!-- <div class="item">
                        <div class="label"> </div>
                        <input type="text" v-model="certNumber">
                        <button :class="certNumber ? 'on':''" v-bind:disabled="certCheckDisable">확인</button>
                        <div class="possible-text" v-if="certPossibleText">본인 인증에 성공하였습니다</div>
                        <div class="wrong-text" v-if="certWrongText">본인 인증에 실패하였습니다</div>
                    </div> -->
                </div>

                <div class="input-wrapper">
                    <div class="item text">
                        <div class="label">이메일</div>
                        <input type="text" placeholder="직접입력" v-model="email" @keyup="emailvalidationReset">
                        <button @click="eamilCheck" :class="email ? 'on':''" v-bind:disabled="emailCheckDisable">중복확인</button>
                        <div class="wrong-text" v-if="email && emailValidityText">잘못된 이메일 형식입니다</div>
                        <div class="possible-text" v-if="email && emailPossibleText">사용가능한 이메일입니다</div>
                        <div class="wrong-text" v-if="email && emailWrongText">사용중인 이메일입니다</div>
                        <div class="wrong-text" v-if="email && emailCheckText">중복확인이 필요합니다</div>
                    </div>
                </div>

                <div class="line"></div>

                <div class="checkbox-wrap" >
                    <div class="label" @click.prevent="openTermsMobile(1)">약관동의(필수)</div>
                    <i @click.prevent="changeTermCheck('termsOfUse')" :class="termsChecked('termsOfUse')"></i>
                </div>
                <div class="checkbox-wrap margin-bottom-58" v-if="!this.$store.state.iccMode">
                    <div class="label" @click.prevent="openTermsMobile(2)">통합회원가입하기(선택)</div>
                    <i @click.prevent="changeTermCheck('termsOfIMS')" :class="termsChecked('termsOfIMS')"></i>
                </div>

                <div class="m-finished" id="welcome-finished" :class="joinPage ? 'none': ''" @click="standardJoin">
                    <a href="#" :class="id&&pw&&pwAgain&&name&&phoneNumber&&email&&getByFormData.termsOfUse == true ? 'on':''"><span>가입완료</span></a>
                </div>
            </div>
            <div class="tab" id="additionalInfo" v-else>
                <div class="add_wrap add_wrap_group"  v-if="!isAccodionOn">
                    <div class="title">좀 더 소개해주실 수 있으세요?</div>
                    <div class="text">보다 빠른 가입 승인 및<br>담당자 지정에 도움이 됩니다.</div>
                    <button class="add_btn" id="addinfoPageBtn" @click.prevent="accodionOpen">회사정보 입력</button>
                    <div class="skip"><a href="#">괜찮아요.이대로가입할게요 &gt;</a></div>
                </div>
                <div class="add_wrap2 add_wrap_group" v-else>
                    <div class="input-wrapper mb15">
                        <div class="item col1">
                            <div class="label">회사명</div>
                            <input type="text">
                        </div>
                    </div>

                    <div class="input-wrapper mb30">
                        <div class="item col1">
                            <div class="label">연락처</div>
                            <input type="text" class="input-phone" maxlength="4" placeholder="010">
                            <input type="text" class="input-phone" maxlength="4">
                            <input type="text" class="input-phone" maxlength="4">
                        </div>
                    </div>

                    <div class="input-wrapper mb30">
                        <div class="ceo-btn">
                            <button>사업자 등록증 업로드</button>
                            <div class="uploadtextfaise none">최대 업로드 파일 크기: 5MB</div>
                            <div class="uploadtexttrue none">
                                <span>파일명최대10글자.jpg</span>
                                <span>5MB</span>
                            </div>
                        </div>
                    </div>

                    <div class="input-wrapper mb15">
                        <div class="item col1">
                            <div class="label ceo">사업자<br>등록번호</div>
                            <input type="text" class="ceo-num" placeholder="123" maxlength="3">
                            <input type="text" class="ceo-num" placeholder="45" maxlength="2">
                            <input type="text" class="ceo-num" placeholder="67890" maxlength="5">
                        </div>
                    </div>
                    <div class="input-wrapper mb31">
                        <div class="ceo-btn">
                            <button>통신판매업증 업로드</button>
                            <div class="uploadtextfaise none">최대 업로드 파일 크기: 5MB</div>
                            <div class="uploadtexttrue none">
                                <span>파일명최대10글자.jpg</span>
                                <span>5MB</span>
                            </div>
                        </div>
                    </div>

                    <div class="input-wrapper mb15">
                        <div class="item col1">
                            <div class="label ceo">통신판매업<br>번호</div>
                            <input type="text" class="ceo-num" placeholder="123" maxlength="3">
                            <input type="text" class="ceo-num" placeholder="45" maxlength="2">
                            <input type="text" class="ceo-num" placeholder="67890" maxlength="5">
                        </div>
                    </div>

                    <div class="input-wrapper mb15">
                        <div class="item col1">
                            <div class="label">회사 분류</div>
                            <ul class="select-wrap">
                                <li class="select-contents">
                                    <div class="select">
                                        <span>대분류</span>
                                        <i class="rotate"></i>
                                    </div>
                                    <div class="listWrap">
                                        <ul class="list">
                                            <li>1</li>
                                            <li>2</li>
                                            <li>3</li>
                                            <li>4</li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="select-contents">
                                    <div class="select">
                                        <span>소분류</span>
                                        <i class="rotate"></i>
                                    </div>
                                    <div class="listWrap">
                                        <ul class="list">
                                            <li>1</li>
                                            <li>2</li>
                                            <li>3</li>
                                            <li>4</li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <div class="item col1">
                            <div class="label">회사 URL</div>
                            <input type="text">
                        </div>
                    </div>

                    <div class="m-text">보다 빠른 가입 승인 및 담당자 지정에 도움이 됩니다</div>
                    <div class="m-finished"><a href="#"><span>가입완료</span><i></i></a></div>
                </div>
            </div>
        </div>
        <TermsMobile v-if="isMobileTermsOn" @update="changedTabForTemrs" @close="openTermsMobile(1)"/>

    </div>
    <div id="backBlock"></div>
    
  </div>
</template>

<script>
import Terms from '../../components/Terms.vue'
import TermsMobile from '../../components/TermsMoblie.vue'
import Join from '../Join';
import { mapState, mapGetters } from 'vuex';

export default {
    data () {
        return {
            // 정보입력-회사정보
            companyName: '',
            companyPhoneNumber: '',
            companyPhoneNumber1: '', companyPhoneNumber2: '', companyPhoneNumber3: '',
            businessRegistrationNumber: '',
            businessRegistrationNumber1: '', businessRegistrationNumber2: '', businessRegistrationNumber3: '',
            mailOrderNumber: '',
            mailOrderNumber1: '', mailOrderNumber2: '', mailOrderNumber3: '',
            companyClassify: '',
            companyURL: '',

            isCardFlip: false,
            joinPage: false,
            addJoinPage: false
        }
    },
    extends: Join,
    components: {
        Terms, TermsMobile
    },
    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/client-login/join.scss'
</style>