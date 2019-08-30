<template>
    <div id="join" @click.prevent="closeSelectList">
        <div id="header">
            <div class="container">
                <h1 class="logo" v-if="!this.$store.state.iccMode">
                    <img id="desktopLogo" src="~@/assets/img/logo_join.png" alt="빅버드회원가입">
                    <img id="tabletLogo" src="~@/assets/img/logo_join_tablet.png" alt="빅버드회원가입">   
                </h1>
                <h1 class="logo" v-else>                    
                    <span id="desktopLogo" style="font-size: 30px; text-transform: uppercase; color: #4bd897">icc <em style="color: #000;">회원가입</em></span>
                    <span id="tabletLogo" style="font-size: 14px; text-transform: uppercase; color: #4bd897">icc <em style="color: #000;">회원가입</em></span>
                </h1>
            </div>
        </div>
        <div id="card-container" ref="cardContainer" :class="joinPage ? 'min' : ''">
                <div :class="joinPage == false &&  addJoinPage ? 'none': '' || cardFilp" class="card" id="cardStep1" >
                    <div class="front">
                        <a href="#" class="rotate-btn" @click.prevent="onCardFilp"></a>
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
                                    <div class="item text">
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
                                    <div class="label" @click.prevent="termCardFlip(1)">약관동의(필수)</div>
                                    <i @click.prevent="changeTermCheck('termsOfUse')" :class="termsChecked('termsOfUse')"></i>
                                </div>
                                <div class="checkbox-wrap margin-bottom-0" v-if="!this.$store.state.iccMode">
                                    <div class="label" @click.prevent="termCardFlip(2)">통합회원가입하기(선택)</div>
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
                <div :class="joinPage == false ? 'none': ''" class="card" id="cardStep2">
                    <div class="front">
                        <div class="contents">
                            <div class="article" >
                                <div class="header">
                                2. 인플루언서 프로필(선택)
                                </div>
                                <div class="box big"  
                                    @click="onClickProfileCard('sns')" 
                                    :class="[onProfileCard('sns'), this.profileCard.sns.save ? 'save': '' ]">
                                    <img src="~@/assets/img/sns.png" alt="sns">
                                    <div class="text">
                                        SNS 연동으로 <br>
                                        좀 더 편하게 이용하세요.
                                    </div>
                                    <div class="point"><span>1000포인트 적립</span></div>
                                    <div class="point-text">+ 1000 P</div> 
                                </div>

                                <div class="box big" 
                                    @click="onClickProfileCard('pay')" 
                                    v-if="checkService('brands',true) || checkService('influencer',true)" 
                                    :class="[onProfileCard('pay'), checkService('influencer','margin-bottom-31') , this.profileCard.pay.save ? 'save': '']">
                                    <img src="~@/assets/img/pay.png" alt="pay">
                                    <div class="text">
                                        <span v-if="checkService('brands',true) && !this.$store.state.iccMode">희망 원고료</span>
                                        <span v-else>희망 수수료</span>
                                        <br>
                                        고객사 매칭에 도움이 됩니다.
                                    </div>
                                    <div class="point"><span>1000포인트 적립</span></div>
                                    <div class="point-text">+ 1000 P</div>
                                </div>

                                <div class="box big"
                                    @click="onClickProfileCard('expectProduct')" 
                                    v-if="checkService('brands',true) || checkService('influencer',true)" 
                                    :class="[onProfileCard('expectProduct'), checkService('brands','margin-bottom-31'), this.profileCard.expectProduct.save ? 'save': '']">
                                    <img src="~@/assets/img/box.png" alt="item">
                                    <div class="text">
                                        희망 공구 품목<br>
                                        고객사 매칭에 도움이 됩니다.
                                    </div>
                                    <div class="point"><span>1000포인트 적립</span></div>
                                    <div class="point-text">+ 1000 P</div>
                                </div>
                                <div>
                                    <!-- <div class="box small" @click="onClickProfileCard('area')" 
                                    v-if="checkService('brands',true)" 
                                    :class="onProfileCard('area')">
                                        <img src="~@/assets/img/location.png" alt="area">
                                        <div class="text">
                                            주 활동 지역
                                        </div>
                                    </div> -->

                                    <div class="box small" @click="onClickProfileCard('gender')" 
                                    v-if="checkService('brands',true) || checkService('influencer',true) || checkService('market', true)" 
                                    :class="[onProfileCard('gender'), this.profileCard.gender.save ? 'save': '']">
                                        <img src="~@/assets/img/age_.png" alt="gender">
                                        <div class="text">
                                            성별/연령
                                        </div>
                                        <div class="point"><span>1000포인트 적립</span></div>
                                        <div class="point-text">+ 1000 P</div>
                                    </div>

                                    <!-- <div class="box small" @click="onClickProfileCard('age')" 
                                    v-if="checkService('brands',true) || checkService('influencer',true) || checkService('market', true)" 
                                    :class="onProfileCard('age')">
                                        <img src="~@/assets/img/age_.png" alt="age">
                                        <div class="text">
                                            성별/연령
                                        </div>
                                    </div> -->

                                    <div class="box small" @click="onClickProfileCard('job')" 
                                    v-if="checkService('brands',true)" 
                                    :class="[onProfileCard('job'), this.profileCard.job.save ? 'save': '']">
                                        <img src="~@/assets/img/job.png" alt="job">
                                        <div class="text">
                                            직업
                                        </div>
                                        <div class="point"><span>1000포인트 적립</span></div>
                                        <div class="point-text">+ 1000 P</div>
                                    </div>

                                    <!-- <div class="box small" @click="onClickProfileCard('interests')" 
                                    v-if="checkService('brands',true)" 
                                    :class="onProfileCard('interests')">
                                        <img src="~@/assets/img/like.png" alt="interests">
                                        <div class="text">
                                            관심사
                                        </div>
                                    </div> -->

                                    <div class="box small" @click="onClickProfileCard('married')" 
                                    v-if="checkService('brands',true)" 
                                    :class="[onProfileCard('married'), this.profileCard.married.save ? 'save': '']">
                                        <img src="~@/assets/img/married.png" alt="married">
                                        <div class="text">
                                            결혼유무
                                        </div>
                                        <div class="point"><span>1000포인트 적립</span></div>
                                        <div class="point-text">+ 1000 P</div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('children')" 
                                    v-if="checkService('brands',true)" 
                                    :class="[onProfileCard('children'), this.profileCard.children.save ? 'save': '']">
                                        <img src="~@/assets/img/baby.png" alt="children">
                                        <div class="text">
                                            자녀관계
                                        </div>
                                        <div class="point"><span>1000포인트 적립</span></div>
                                        <div class="point-text">+ 1000 P</div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('pet')" 
                                    v-if="checkService('brands',true)"  
                                    :class="[onProfileCard('pet'), this.profileCard.pet.save ? 'save': '']">
                                        <img src="~@/assets/img/pet.png" alt="pet">
                                        <div class="text">
                                            반려동물
                                        </div>
                                        <div class="point"><span>1000포인트 적립</span></div>
                                        <div class="point-text">+ 1000 P</div>
                                    </div>
                                    <div class="box small" @click="onClickProfileCard('bodyProfile')" 
                                    v-if="checkService('market',true) || checkService('influencer', true)" 
                                    :class="onProfileCard('bodyProfile')" >
                                        <img src="~@/assets/img/body.png" alt="body">
                                        <div class="text">
                                            바디프로필
                                        </div>
                                        <div class="point"><span>1000포인트 적립</span></div>
                                        <div class="point-text">+ 1000 P</div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('skinType')" 
                                    v-if="checkService('brands',true) || checkService('influencer', true)" 
                                    :class="[onProfileCard('skinType'), this.profileCard.skinType.save ? 'save': '']">
                                        <img src="~@/assets/img/skin.png" alt="skin">
                                        <div class="text">
                                            피부
                                        </div>
                                        <div class="point"><span>1000포인트 적립</span></div>
                                        <div class="point-text">+ 1000 P</div>
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div :class="joinPage == false ? 'none': ''" class="card" id="cardStep3">
                    <div class="front">
                        <!-- detail info for desktop -->
                        <DesktopDetailInfo />
                    </div>
                </div>
                <div class="card" id="cardStep4" :class="!addJoinPage ? 'none': '' || !joinPage == false ? 'none': ''">
                    <div class="front">
                        <ul class="content" v-if="!this.$store.state.iccMode">
                            <li class="title">좀 더 소개해주실 수 있으세요?</li>
                            <li class="sub-text">포인트 적립, 고객사 매칭 등에 도움이 될 거예요</li>
                            <li><img src="../assets/img/coin.png" alt="동전탑 이미지"></li>
                            <li class="point-text">인플루언서 프로필 작성시 총 <strong>8000 포인트</strong> 적립</li>
                            <li class="button"><a href="#" @click="addJoin">추가정보 입력</a></li>
                            <li class="skip-btn"><router-link to="/" :class="this.$store.state.welcome = true">괜찮아요. 이대로 가입할게요 &gt;</router-link></li>
                        </ul>
                        <ul class="content" v-else>
                            <li class="title">좀 더 소개해주실 수 있으세요?</li>
                            <li class="sub-text" >고객사 매칭 등에 도움이 될 거예요</li>                            
                            <li class="button"><a href="#" @click="addJoin">추가정보 입력</a></li>
                            <li class="skip-btn"><router-link to="/" :class="this.$store.state.welcome = true">괜찮아요. 이대로 가입할게요 &gt;</router-link></li>
                        </ul>
                    </div>
                </div>

            <div id="backBlock2"></div>
        </div>

        <div id="m-container">
            <div class="header">
                <div class="header-title">
                    <router-link to="/" class="icon-back-btn"><i></i></router-link>
                    <span>인플루언서 회원가입</span>
                </div>
                <div class="tab-list">
                    <div @click="toggleMobileTab(1)" :class="isToggleMobileTab === 1 ? 'on': ''">필수정보</div>
                    <div @click="toggleMobileTab(2)" :class="isToggleMobileTab === 2 ? 'on': ''">추가정보</div>
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
                        <div class="item text">
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

                    <div class="m-finished" id="welcome-finished" :class="joinPage ? 'none': ''" @click="standardJoin" >
                        <a href="#" :class="id&&pw&&pwAgain&&name&&phoneNumber&&email&&getByFormData.termsOfUse == true ? 'on':''" ><span>가입완료</span></a>
                    </div>
                </div>
                <div class="tab" id="additionalInfo" v-else>
                    <div class="add_wrap add_wrap_group" v-if="!isAccodionOn">
                        <div class="title">좀 더 소개해주실 수 있으세요?</div>
                        <div class="text">고객사 매칭 등에 도움이 될 거예요</div>
                        <img  v-if="!this.$store.state.iccMode" class="top" src="~@/assets/img/coin.png" alt="동전탑이미지">
                        <!-- <div class="text2">
                            추가정보 작성시 <br>
                            총 <span>8000 포인트</span> 적립
                        </div> -->
                        <button class="add_btn" id="addinfoPageBtn" @click.prevent="accodionOpen">추가정보 입력</button>
                        <div class="skip"><router-link to="/client" :class="this.$store.state.welcome = true">괜찮아요.이대로가입할게요 &gt;</router-link></div>
                    </div>
                    <MobileDetailInfo v-if="isAccodionOn"/>
                </div>
            <TermsMobile v-if="isMobileTermsOn" @update="changedTabForTemrs" @close="openTermsMobile(1)"/>
            <div id="backBlock"></div>
        </div>
    </div>
    <form name="requestCert" method="post" action="#">
        <input type="hidden" name="tr_cert" v-model="trCert">
        <input type="hidden" name="tr_url" v-model="trUrl">
        <input type="hidden" name="tr_add" v-model="trAdd">
    </form>
    </div>
</template>

<script>
import Terms from '../components/Terms.vue'
import TermsMobile from '../components/TermsMoblie.vue'
import { mapState, mapGetters } from 'vuex';
import MobileDetailInfo from '../components/mobile/DetailInfo.vue';
import DesktopDetailInfo from '../components/desktop/DetailInfo.vue';
import '../assets/scss/login/join.scss'

export default { 
    components: {
        Terms,
        TermsMobile,
        MobileDetailInfo,DesktopDetailInfo
    },
    extends: MobileDetailInfo,
    data () {
        return {
            // 정보입력
            id:'',
            idValidityText: false,
            idPossibleText: false,
            idWrongText: false,
            idCheckText: false,
            idCheckDisable: true,

            pw:'',
            pwAgain:'',
            pwValidityText: false,
            pwWrongText: false,

            name: '',
            phoneNumber: '',
            certIdx: NaN,
            certPossibleText: false,
            certWrongText: false,
            certExistsText: false,
            // 인증하기
            trCert: '',
            trUrl: '',
            trAdd: '',

            email: '',
            emailValidityText: false,
            emailPossibleText: false,
            emailWrongText: false,
            emailCheckText: false,
            emailCheckDisable: true,

            userIndex: 0, //가입완료시 받는 userIndex
            userService: NaN, //회원가입 service

            isCardFlip: false,
            isMobileTermsOn: false,
            isToggleMobileTab: 1,
            isAccodionOn: false,
            joinPage: false,
            addJoinPage: false
        }
    },
    watch: {
        id(newValue) {
            this.idCheckDisable = newValue ? false : true;
        },
        email(newValue) {
            this.emailCheckDisable = newValue ? false : true;
        }
    },
    computed: {
        ...mapState(['service', 'profileCard']),
        ...mapGetters(['getByFormData']),
        cardFilp () {
            if (this.isCardFlip) {
                return 'applyflip'
            } else {
                return 'applyflip2'
            }
        },       
    },
    methods: {
        addInforShow(){ //가입완료 클릭시 추가정보 탭으로 이동
            this.isToggleMobileTab === 2;
        },
        idvalidationReset(e) {
            if(e.code === 'Enter') return;
            this.idCheckText = true;
            this.idWrongText = false;
            this.idPossibleText = false;
            this.idValidityText = false;
        },
        emailvalidationReset(e) {
            if(e.code === 'Enter') return;
            this.emailCheckText = true;
            this.emailWrongText = false;
            this.emailPossibleText = false;
            this.emailValidityText = false;
        },
        idCheck() { // 아이디 중복확인
            this.idCheckText = false;
            if(this.id) {
                let validity = /^[A-Za-z0-9_.]{6,20}$/i; // 영문,숫자,특수문자(_,.) 6~20자
                if(validity.test(this.id)) {
                    this.$axios('post','/check/id', {
                        id: this.id
                    }).then((res) => {
                        if(res.data.result > 0) { // 사용X(중복)
                            this.idWrongText = true;
                            this.idPossibleText = false;
                            this.idValidityText = false;
                        } else { // 사용O
                            this.idPossibleText = true;
                            this.idWrongText = false;
                            this.idValidityText = false;
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    this.idValidityText = true;
                    this.idPossibleText = false;
                    this.idWrongText = false;
                }
            }
        },
        pwInput() { // 비밀번호 입력
            if(this.pw || this.pwAgain) {
                let validity = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,20}$/i; // 영문,숫자,특수문자 포함 6~20자
                if(validity.test(this.pw)) {
                    this.pwValidityText = false;
                } else {
                    this.pwValidityText = true;
                }
            }
        },
        pwCheck() { // 비밀번호 확인
            if(this.pw && this.pwAgain) {
                if(this.pw !== this.pwAgain) {
                    this.pwWrongText = true;
                } else {
                    this.pwWrongText = false;
                }
            }
        },
        phoneCheck() { // 휴대폰 본인인증
            let certWindow;
            
            function openCertification() {
                window.name = "Bigbird - i";
                let UserAgent = navigator.userAgent;
                if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
                    document.requestCert.target = '';
                }
                else {
                    certWindow = window.open('', 'KMCISWindow', 'width=396, height=643, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=435, top=250');
                    if(certWindow == null) {
                        alert(" ※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n    화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다.");
                    }
                    document.requestCert.target = 'KMCISWindow';
                }
                document.requestCert.action = 'https://www.kmcert.com/kmcis/web/kmcisReq.jsp';
                document.requestCert.submit();  
            }

            openCertification();
        },
        eamilCheck() { // 이메일 중복확인
            this.emailCheckText = false;
            if(this.email) {
                let validity = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 정규식(보통사이트)
                if(validity.test(this.email)) {
                    this.$axios('post','/check/email', {
                        email: this.email
                    }).then((res) => {
                        if(res.data.result > 0) { // 사용X(중복)
                            this.emailWrongText = true;
                            this.emailPossibleText = false;
                            this.emailValidityText = false;
                        } else { // 사용O
                            this.emailPossibleText = true;
                            this.emailWrongText = false;
                            this.emailValidityText = false;
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    this.emailValidityText = true;
                    this.emailPossibleText = false;
                    this.emailWrongText = false;
                }
            } 
        },
        addJoin() {
            this.joinPage = true;            
        },
        standardJoin() { // 가입완료
            if(this.id && this.pw && this.pwAgain && this.name && this.phoneNumber && this.email && this.getByFormData.termsOfUse == true) {
                if(this.idValidityText) {
                    alert("아이디는 영문,숫자,특수문자(_,.) 6~20자로 입력해주세요");
                    return;
                }
                if(this.idWrongText) {
                    alert("사용중인 아이디입니다 다시 입력해주세요");
                    return;
                }
                if(this.idCheckText) {
                    alert("아이디 중복확인해주세요");
                    return;
                }
                if(this.pwValidityText) {
                    alert("비밀번호는 영문,숫자,특수문자 포함 6~20자로 입력해주세요");
                    return;
                }
                if(this.pwWrongText) {
                    alert("비밀번호가 일치하지 않습니다");
                    return;
                }
                if(!this.name || !this.phoneNumber || (!this.name && !this.phoneNumber)) {
                    alert("본인인증이 필요합니다");
                    return;
                }
                if(this.emailValidityText) {
                    alert("잘못된 이메일 형식입니다 다시 입력해주세요");
                    return;
                }
                if(this.emailWrongText) {
                    alert("사용중인 이메일입니다 다시 입력해주세요");
                    return;
                }
                if(this.emailCheckText) {
                    alert("이메일 중복확인해주세요");
                    return;
                }
                this.$axios('post',`/join/${this.userService}`, {
                    id: this.id,
                    pw: this.pw,
                    certIdx: this.certIdx,
                    email: this.email,
                    termsAgreed: true
                }).then((res) => {
                    this.userIndex = res.data.userIdx;
                }).catch((err) => {
                    console.log(err);
                })
                this.addJoinPage = !this.addJoinPage;
                this.toggleMobileTab(2);
            } else {
                alert('정보를 모두 입력해주세요');
            }
        },
        onCardFilp () {
            this.isCardFlip = !this.isCardFlip;
        },
        commitTermIndex(index) {
            this.$store.commit('setTermIndex',{
                index
            })
        },
        changedTabForTemrs (data) { 
            this.commitTermIndex(data.termIndex === 1 ? 2 : 1)
        },
        termCardFlip(index) {
            this.commitTermIndex(index)
            this.onCardFilp()
        },
        termsChecked (key) {
            return this.getByFormData[key] ? 'checked' : ''
        },
        changeTermCheck (key) {
            this.$store.commit('setTerms', {
                key,
                isChecked: !this.getByFormData[key]
            })
        },
        openTermsMobile(index) {
            this.commitTermIndex(index)
            this.isMobileTermsOn = !this.isMobileTermsOn;
        },
        changePwType(el){
            const sibling = el.target.previousSibling;
            if(sibling.type.includes('password')) {
                sibling.setAttribute('type', 'text');
                el.target.classList.add('on');
            } else {
                sibling.setAttribute('type', 'password');
                el.target.classList.remove('on');
            }
        },
        toggleMobileTab(index) { 
            this.isToggleMobileTab = index;
        },
        accodionOpen() {
            this.isAccodionOn = !this.isAccodionOn;
        }
    },
    mounted() {
        this.$store.commit('setLocalService');
        const agent = navigator.userAgent.toLowerCase();
        
        if (
            (navigator.appName == 'Netscape' &&
                navigator.userAgent.search('Trident') != -1) ||
            agent.indexOf('msie') != -1
        ) {
            this.$refs.cardContainer.classList.add('iebase');
        } else {
            if (agent.indexOf('edge/') != -1) {
                this.$refs.cardContainer.classList.add('iebase');
                this.$refs.containerWrap.classList.add('edge');
            }
        }
        // cert init 
        this.$axios('get',`/cert/init/${this.service}`, {
            }).then((res) => {
                console.log(res);
                this.trCert = res.data.trCert;
                this.trUrl = res.data.trUrl;
                this.trAdd = res.data.trAdd;
            }).catch((err) => {
                console.log(err)
            });

        // service 나누기
        if(this.service === 'client') {
            this.userService = 1;
        } else if(this.service === 'influencer') {
            this.userService = 2;
        } else if(this.service === 'brands') {
            this.userService = 3;
        } else if(this.service === 'market') {
            this.userService = 4;
        }
        // cert result.
        window.cert_result = (data) => {
            this.$axios('get',`/cert/decrypte/${this.userService}?rec_cert=${data.rec_cert}&certNum=${data.certNum}`, 
            {}).then((res) => {
                if(res.data.result === 'fail') {
                    alert('오류가 발생했습니다.');
                    this.certWrongText = true;
                    this.certPossibleText = false;
                    this.certExistsText = false;
                } else if(res.data.result === 'exists') {
                    this.certExistsText = true;
                    this.certPossibleText = false;
                    this.certWrongText = false;
                } else {
                    this.certPossibleText = true;
                    this.certWrongText = false;
                    this.certExistsText = false;
                    this.certIdx = res.data.certIdx;
                    this.phoneNumber = res.data.phoneNumber;
                    this.name = res.data.name;
                }
            }).catch((err) => {
                console.log(err)
                alert('오류가 발생했습니다.');
            });
        };
    }
}
</script>

<style lang="scss">

</style>