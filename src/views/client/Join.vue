<template>
  <div id="join">
    <div id="header">
      <div class="container">
        <h1 class="logo" v-if="!this.$store.state.iccMode">
          <img id="desktopLogo" src="~@/assets/img/login/join/pick_main_desktop.png" alt="빅버드회원가입" />
          <img id="tabletLogo" src="~@/assets/img/login/join/pick_main_tablet.png" alt="빅버드회원가입" />
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
                                    <div class="wrong-text" v-if="id && idValidityText">영문,숫자,밑줄,점 6~20자</div>
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
                                    <div class="wrong-text" v-if="pwValidityText">영문,숫자,특수문자 포함 6~20자</div>
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
                                    <div class="wrong-text" v-if="certExistsText">이미 인증받은 사용자입니다</div>
                                </div>
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
                    <div class="contents" @click="closeSelectList">
                        <div class="article">
                            <div class="header">
                            2. 회사정보(선택)
                            </div>
                            <div class="input-wrapper pb15 companyValidityText">
                                <div class="item col1">
                                    <div class="label">회사명</div>
                                    <input type="text" v-model="companyName" @keyup="companyNameInput">
                                    <div class="wrong-text" v-if="companyNameValidityText">한글,영문,숫자,특수문자 2자이상</div>
                                </div>
                            </div>

                            <div class="input-wrapper pb10">
                                <div class="item col1">
                                    <div class="label">연락처</div>
                                    <input type="number" class="input-phone" placeholder="-없이 입력" v-model="companyContact" @input="maxLengthCheckCompanyContact">                                    
                                </div>
                            </div>

                            <div class="input-wrapper pb21">
                                <div class="ceo-btn">
                                    <label for="fileUpload" :class="companyRegistrationFileName == true && companyRegistrationFileSize == false ? 'on':''">사업자등록증 업로드</label>
                                    <input type="file" id="fileUpload" @change="companyRegistrationFileChange($event)" accept=".gif, .jpg, .png">
                                    <div class="uploadtextfaise" v-if="companyRegistrationFileSize">최대 업로드 파일 크기 : 5MB</div>
                                    <div class="uploadtexttrue" v-if="companyRegistrationFileName">
                                        <span>{{companyRegistrationfileUploadName}}</span>
                                        <span>{{companyRegistrationfileUploadSize}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="input-wrapper pb10">
                                <div class="item col1">
                                    <div class="label ceo">사업자<br>등록번호</div>
                                    <input type="number" class="ceo-num" placeholder="-없이 입력" v-model="companyRegistrationNumber" @input="maxLengthCheckCompanyRegistration">
                                    
                                </div>
                            </div>
                            <div class="input-wrapper pb21">
                                <div class="ceo-btn">
                                    <label for="fileUpload-second" :class="mailorderBusinessFileName == true && mailorderBusinessFileSize == false ? 'on':''">통신판매업증 업로드</label>
                                    <input type="file" id="fileUpload-second" @change="mailorderBusinessFileChange($event)" accept=".gif, .jpg, .png">
                                    <div class="uploadtextfaise" v-if="mailorderBusinessFileSize">최대 업로드 파일 크기 : 5MB</div>
                                    <div class="uploadtexttrue" v-if="mailorderBusinessFileName">
                                        <span>{{mailorderBusinessfileUploadName}}</span>
                                        <span>{{mailorderBusinessfileUploadSize}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="input-wrapper pb10">
                                <div class="item col1">
                                    <div class="label ceo">통신판매업<br>번호</div>
                                    <input type="number" class="ceo-num" placeholder="-없이 입력" v-model="mailorderBusinessNumber" @input="maxLengthCheckMailorderBusiness">                                    
                                </div>
                            </div>

                            <div class="input-wrapper pb10">
                                <div class="item col1">
                                    <div class="label">회사 분류</div>
                                    <ul class="select-wrap" id="companyClassify">
                                        <li class="select-contents">
                                            <div class="select select-btn" @click.prevent="showSelectList">
                                                <span>{{companyClassifyDefault}}</span>
                                                <i></i>
                                            </div>
                                            <ul class="listWrap listContents">
                                                <ul class="list">
                                                    <li v-for="(item,index) in companyClassifyList" @click="isText($event,index)" :key="index">{{item.name}}</li>
                                                </ul>
                                            </ul>
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
                            <div id="join-finished" @click="companyJoin"
                                :class="companyName||companyContact||companyRegistrationFileName == true||companyRegistrationNumber||mailorderBusinessFileName == true||mailorderBusinessNumber||companyClassifyChoice||companyURL ? 'on':''">회사정보 입력완료
                            </div>
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
                            <!-- <div class="bottom">
                                <a href="#" class="email">bigbird-pick@concepters.co.kr</a>
                            </div> -->
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
                        <li class="sub-text">담당자 지정에 도움이 됩니다</li>
                        
                        <li class="button"><a href="#" @click="addJoin">추가정보 입력</a></li>
                        <li class="skip-btn"><router-link to="/client" :class="this.$store.state.welcome = true">괜찮아요. 이대로 가입할게요 &gt;</router-link></li>
                    </ul>
                </div>
            </div>
    </div>

    <div id="m-container">
        <div class="header">
            <div class="header-title">
                <router-link to="/client" class="icon-back-btn"><i></i></router-link>
                <span>광고주 회원가입</span>
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
                        <div class="wrong-text" v-if="id && idValidityText">영문,숫자,밑줄,점 6~20자</div>
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
                        <div class="wrong-text" v-if="pwValidityText">영문,숫자,특수문자 포함 6~20자</div>
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
                        <div class="wrong-text" v-if="certExistsText">이미 인증받은 사용자입니다</div>
                    </div>
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

                <div class="checkbox-wrap" >
                    <div class="label" @click.prevent="openTermsMobile(1)">약관동의(필수)</div>
                    <i @click.prevent="changeTermCheck('termsOfUse')" :class="termsChecked('termsOfUse')"></i>
                </div>
                <div class="checkbox-wrap margin-bottom-58" v-if="!this.$store.state.iccMode">
                    <div class="label" @click.prevent="openTermsMobile(2)">통합회원가입하기(선택)</div>
                    <i @click.prevent="changeTermCheck('termsOfIMS')" :class="termsChecked('termsOfIMS')"></i>
                </div>

                <div class="m-finished" id="welcome-finished" :class="joinPage ? 'none': ''" @click="standardJoin">
                    <a href="#" @click="toggleMobileTab(2)" :class="id&&pw&&pwAgain&&name&&phoneNumber&&email&&getByFormData.termsOfUse == true ? 'on':''"><span>가입완료</span></a>
                </div>
            </div>
            <div class="tab" id="additionalInfo" v-else>
                <div class="add_wrap add_wrap_group"  v-if="!isAccodionOn">
                    <div class="title">좀 더 소개해주실 수 있으세요?</div>
                    <div class="text">담당자 지정에 도움이 됩니다.</div>
                    <button class="add_btn" id="addinfoPageBtn" @click.prevent="accodionOpen">회사정보 입력</button>
                    <div class="skip"><router-link to="/client" :class="this.$store.state.welcome = true">괜찮아요.이대로가입할게요 &gt;</router-link></div>
                </div>
                <div class="add_wrap2 add_wrap_group" v-else @click="closeSelectList">
                    <div class="input-wrapper">
                        <div class="item col1">
                            <div class="label">회사명</div>
                            <input type="text" v-model="companyName" @keyup="companyNameInput">
                            <div class="wrong-text" v-if="companyNameValidityText">한글,영문,숫자,특수문자 2자이상</div>
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <div class="item col1">
                            <div class="label">연락처</div>
                            <input type="text" class="input-phone" placeholder="-없이 입력" v-model="companyContact" @input="maxLengthCheckCompanyContact">
                            
                        </div>
                    </div>

                    <div class="input-wrapper mb5">
                        <div class="ceo-btn clearfix">
                            <label for="fileUpload" :class="companyRegistrationFileName == true && companyRegistrationFileSize == false ? 'on':''">사업자등록증 업로드</label>
                            <input type="file" id="fileUpload" @change="companyRegistrationFileChange($event)" accept=".gif, .jpg, .png">
                            <div class="uploadtextfaise" v-if="companyRegistrationFileSize">최대 업로드 파일 크기 : 5MB</div>
                            <div class="uploadtexttrue" v-if="companyRegistrationFileName">
                                <span>{{companyRegistrationfileUploadName}}</span>
                                <span>{{companyRegistrationfileUploadSize}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <div class="item col1">
                            <div class="label ceo">사업자<br>등록번호</div>
                            <input type="text" class="ceo-num" placeholder="-없이 입력" v-model="companyRegistrationNumber" @input="maxLengthCheckCompanyRegistration">
                        </div>
                    </div>
                    <div class="input-wrapper mb5">
                        <div class="ceo-btn clearfix">
                            <label for="fileUpload-second" :class="mailorderBusinessFileName == true && mailorderBusinessFileSize == false ? 'on':''">통신판매업증 업로드</label>
                            <input type="file" id="fileUpload-second" @change="mailorderBusinessFileChange($event)" accept=".gif, .jpg, .png">
                            <div class="uploadtextfaise" v-if="mailorderBusinessFileSize">최대 업로드 파일 크기 : 5MB</div>
                            <div class="uploadtexttrue" v-if="mailorderBusinessFileName">
                                <span>{{mailorderBusinessfileUploadName}}</span>
                                <span>{{mailorderBusinessfileUploadSize}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <div class="item col1">
                            <div class="label ceo">통신판매업<br>번호</div>
                            <input type="text" class="ceo-num" placeholder="-없이 입력" v-model="mailorderBusinessNumber" @input="maxLengthCheckMailorderBusiness">
                            
                        </div>
                    </div>

                    <div class="input-wrapper">
                        <div class="item col1">
                            <div class="label">회사 분류</div>
                            <ul class="select-wrap" id="m-companyClassify">
                                <li class="select-contents">
                                    <div class="select select-btn" @click.prevent="showSelectList">
                                        <span>{{companyClassifyDefault}}</span>
                                        <i></i>
                                    </div>
                                    <ul class="listWrap listContents">
                                        <ul class="list">
                                            <li v-for="(item,index) in companyClassifyList" @click="isText($event,index)" :key="index">{{item.name}}</li>
                                        </ul>
                                    </ul>
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

                    <!-- <div class="m-text">보다 빠른 가입 승인 및 담당자 지정에 도움이 됩니다</div> -->
                    <div class="m-finished" @click="companyJoin" 
                        :class="companyName||companyContact||companyRegistrationFileName == true||companyRegistrationNumber||mailorderBusinessFileName == true||mailorderBusinessNumber||companyClassifyChoice||companyURL ? 'on':''">회사정보 입력완료
                    </div>
                </div>
            </div>
        </div>
        <TermsMobile v-if="isMobileTermsOn" @update="changedTabForTemrs" @close="openTermsMobile(1)"/>

    </div>
    <div id="backBlock"></div>
    
    <form name="requestCert" method="post" action="#">
        <input type="hidden" name="tr_cert" v-model="trCert">
        <input type="hidden" name="tr_url" v-model="trUrl">
        <input type="hidden" name="tr_add" v-model="trAdd">
    </form>
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
            companyNameValidityText: false,
            companyContact: '',
            companyRegistrationNumber: '',
            mailorderBusinessNumber: '',
            companyClassifyList: [],
            companyClassifyDefault: '대분류',
            companyClassifyChoice: NaN,
            companyURL: '',
            companyRegistrationFileSize: false,
            companyRegistrationFileName: false,
            mailorderBusinessFileSize: false,
            mailorderBusinessFileName: false,
            companyRegistrationfileUploadName: '',
            companyRegistrationfileUploadSize: '',
            mailorderBusinessfileUploadName: '',
            mailorderBusinessfileUploadSize: '',
            companyRegistrationFileData: {},
            mailorderBusinessFileData: {},

            isCardFlip: false,
            joinPage: false,
            addJoinPage: false
        }
    },
    extends: Join,
    components: {
        Terms, TermsMobile
    },
    mounted() {
        this.$axios('get','/join/client/classificationList').then((res)=> {
            this.companyClassifyList = res.data;
        })
    },
    methods: {   
        addJoin() {
            this.joinPage = true;
        },
        companyJoin(){
            if(this.companyName || this.companyContact || this.companyRegistrationNumber || this.companyRegistrationFileName == true ||
                this.mailorderBusinessFileName == true || this.mailorderBusinessNumber || this.companyClassifyChoice || this.companyURL) {
                this.$axios('post','/join/info/save', {
                    companyName: this.companyName,
                    contact: this.companyContact,
                    companyRegistrationNumber: this.companyRegistrationNumber,
                    mailorderBusinessNumber: this.mailorderBusinessNumber,
                    classification: this.companyClassifyChoice,
                    companyUrl: this.companyURL
                })
                this.$store.state.welcome = true;
                this.$router.push({path: '/client'})
            } else {
                alert('회사정보 중 한개라도 입력해야 합니다');
            }
        },
        showSelectList(e) {
            const selectBtn = e.target.closest('div, ul');
            const accordion = selectBtn.closest('.accordion-contents');
            const icon = selectBtn.querySelector('i');

            if (selectBtn.nextSibling.classList.contains('selectOn')) {
                selectBtn.nextSibling.classList.remove('selectOn');
                icon.classList.remove('rotate');
                
                if (!accordion) return;
                accordion.classList.remove('height');
            } else {
                selectBtn.nextSibling.classList.add('selectOn');                 
                icon.classList.add('rotate');
               
                if (!accordion) return;
                accordion.classList.add('height');
            }
        },
        closeSelectList(e) {
            const parent = e.target.closest('#join');
            if (!e.target.closest('.select-btn') && parent) {
                parent.querySelectorAll('.listContents').forEach(element => {
                    element.classList.remove('selectOn');
                });
                parent.querySelectorAll('i').forEach(con => {
                    con.classList.remove('rotate');
                });

                parent.querySelectorAll('.accordion-contents').forEach(el => {
                    el.classList.remove('height');
                });
            }
        },
        isText(e, idx) {
            let text = e.target.innerText;
            if (e.target.closest('#companyClassify, #m-companyClassify')) {
                this.companyClassifyDefault = text;
                this.companyClassifyChoice = this.companyClassifyList[idx].id;
            }
        },
        companyNameInput() {
            // if(this.companyName) {
            //     let validity = /^[가-힣A-Za-z0-9!@#$%^&*()]{2,}$/i;
            //     if(validity.test(this.companyName)) {
            //         this.companyNameValidityText = false;
            //     } else {
            //         this.companyNameValidityText = true;
            //     }
            // }
        },
        maxLengthCheckCompanyContact() {
            if(this.companyContact > 11) this.companyContact = this.companyContact.slice(0, 11);
        },
        maxLengthCheckCompanyRegistration() {
            if(this.companyRegistrationNumber > 10) this.companyRegistrationNumber = this.companyRegistrationNumber.slice(0, 10);
        },
        maxLengthCheckMailorderBusiness() {
            if(this.mailorderBusinessNumber > 10) this.mailorderBusinessNumber = this.mailorderBusinessNumber.slice(0, 10);
        },
        companyRegistrationFileChange(e) {
            this.companyRegistrationFileData = e.target.files[0]
            let formData = new FormData();
            formData.append('multipartFile', this.companyRegistrationFileData);
            if(this.companyRegistrationFileData.name.length > 14) {
                alert('파일명최대 10글자입니다.');
            } else {
                this.$axios('post','/file/upload/companyRegistration', formData).then((res) => {
                    if(res.status !== 200 && (res.data.size !== this.companyRegistrationFileData.size)) {
                        alert('파일업로드 오류가 발생하였습니다.');
                    } else {
                        this.companyRegistrationfileUploadName = this.companyRegistrationFileData.name;
                        this.companyRegistrationFileName = true;
                        this.companyRegistrationFileSize = false;
                        if(this.companyRegistrationFileData.size < 1024) {
                            let bytesSize = this.companyRegistrationFileData.size;
                            this.companyRegistrationfileUploadSize = bytesSize + 'Bytes';
                            this.companyRegistrationFileName = true;
                            this.companyRegistrationFileSize = false;
                        } else if(this.companyRegistrationFileData.size >= 1024 && this.companyRegistrationFileData.size < 1048576) {
                            let kbSize = Math.round(this.companyRegistrationFileData.size / 1024);
                            this.companyRegistrationfileUploadSize = kbSize + 'KB';
                            this.companyRegistrationFileName = true;
                            this.companyRegistrationFileSize = false;
                        } else if(this.companyRegistrationFileData.size >= 1048576) {
                            let mbSize = Math.round(this.companyRegistrationFileData.size / 1048576);
                            if(mbSize > 5) {
                                this.companyRegistrationFileSize = true;
                                this.companyRegistrationFileName = false;
                            } else {
                                this.companyRegistrationfileUploadSize = mbSize + 'MB';
                                this.companyRegistrationFileName = true;
                                this.companyRegistrationFileSize = false;
                            }
                        }
                    }
                })
            }
        },
        mailorderBusinessFileChange(e) {
            this.mailorderBusinessFileData = e.target.files[0]
            let formData = new FormData();
            formData.append('multipartFile', this.mailorderBusinessFileData);
            if(this.mailorderBusinessFileData.name.length > 14) {
                alert('파일명최대 10글자입니다.');
            } else {
                this.$axios('post','/file/upload/mailorderBusiness', formData).then((res) => {
                    if(res.status !== 200 && (res.data.size !== this.mailorderBusinessFileData.size)) {
                        alert('파일업로드 오류가 발생하였습니다.');
                    } else {
                        this.mailorderBusinessfileUploadName = this.mailorderBusinessFileData.name;
                        this.mailorderBusinessFileName = true;
                        this.mailorderBusinessFileSize = false;
                        if(this.mailorderBusinessFileData.size < 1024) {
                            let bytesSize = this.mailorderBusinessFileData.size;
                            this.mailorderBusinessfileUploadSize = bytesSize + 'Bytes';
                            this.mailorderBusinessFileName = true;
                            this.mailorderBusinessFileSize = false;
                        } else if(this.mailorderBusinessFileData.size >= 1024 && this.mailorderBusinessFileData.size < 1048576) {
                            let kbSize = Math.round(this.mailorderBusinessFileData.size / 1024);
                            this.mailorderBusinessfileUploadSize = kbSize + 'KB';
                            this.mailorderBusinessFileName = true;
                            this.mailorderBusinessFileSize = false;
                        } else if(this.mailorderBusinessFileData.size >= 1048576) {
                            let mbSize = Math.round(this.mailorderBusinessFileData.size / 1048576);
                            if(mbSize > 5) {
                                this.mailorderBusinessFileSize = true;
                                this.mailorderBusinessFileName = false;
                            } else {
                                this.mailorderBusinessfileUploadSize = mbSize + 'MB';
                                this.mailorderBusinessFileName = true;
                                this.mailorderBusinessFileSize = false;
                            }
                        }
                    }
                })
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/client-login/join.scss'
</style>