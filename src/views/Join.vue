<template>
    <div id="join" @click.prevent="closeSelectList">
        <div id="header">
            <div class="container">
                <h1 class="logo" v-if="!this.$store.state.iccMode">
                    <img id="desktopLogo" src="~@/assets/img/logo_join.png" alt="빅버드회원가입">
                    <img id="tabletLogo" src="~@/assets/img/logo_join_tablet.png" alt="빅버드회원가입">   
                </h1>
                <h1 class="logo" v-else>                    
                    <span style="font-size: 30px; text-transform: uppercase; color: #4bd897">icc <em style="color: #000;">회원가입</em></span>
                </h1>
            </div>
        </div>
        <div id="card-container" ref="cardContainer">
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
                                        <input type="text">
                                        <button>중복확인</button>
                                        <div class="wrong-text none">사용중인 아이디입니다.</div>
                                    </div>
                                </div>

                                <div class="input-wrapper ">
                                    <div class="item password">
                                        <div class="label">비밀번호 </div>
                                        <input type="password" placeholder="영문,숫자 포함 6자리 이상">
                                        <a href="#" class="icon-eye" @click.prevent="changePwType"></a>
                                    </div>

                                    <div class="item password">
                                        <div class="label"> </div>
                                        <input type="password" placeholder="비밀번호 확인">
                                        <a href="#" class="icon-eye" @click.prevent="changePwType"></a>
                                        <div class="wrong-text none">비밀번호가 일치하지 않습니다</div>
                                    </div>
                                </div>

                                <div class="input-wrapper ">
                                    <div class="item text">
                                        <div class="label">이름 </div>
                                        <input type="text" placeholder="">
                                        
                                    </div>

                                    <div class="item">
                                        <div class="label">휴대폰번호 </div>
                                        <input type="text" placeholder="- 없이 입력">
                                        <button>인증하기</button>
                                    </div>

                                    <div class="item">
                                        <div class="label"> </div>
                                        <input type="text" placeholder="인증번호">
                                        <button>확인</button>
                                        <div class="wrong-text none">본인 인증에 실패하였습니다</div>
                                    </div>

                                </div>

                                <div class="input-wrapper">
                                    <div class="item">
                                        <div class="label">이메일</div>
                                        <input type="text" placeholder="직접입력">
                                        <button>중복확인</button>
                                        <div class="wrong-text">잘못된 이메일 형식입니다</div>
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
                                <div class="finished" :class="joinPage ? 'none': ''" @click="standardJoin"><a href="#"><span>가입완료</span></a></div>
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
                                    :class="onProfileCard('sns') ">
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
                                    :class="[onProfileCard('pay'), checkService('influencer','margin-bottom-31')]">
                                    <img src="~@/assets/img/pay.png" alt="pay">
                                    <div class="text">
                                        <span v-if="checkService('brands',true)">희망 원고료</span>
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
                                    :class="[onProfileCard('expectProduct'), checkService('brands','margin-bottom-31')]">
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
                                    :class="onProfileCard('gender')">
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
                                    :class="onProfileCard('job')">
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
                                    :class="onProfileCard('married')">
                                        <img src="~@/assets/img/married.png" alt="married">
                                        <div class="text">
                                            결혼유무
                                        </div>
                                        <div class="point"><span>1000포인트 적립</span></div>
                                        <div class="point-text">+ 1000 P</div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('children')" 
                                    v-if="checkService('brands',true)" 
                                    :class="onProfileCard('children')">
                                        <img src="~@/assets/img/baby.png" alt="children">
                                        <div class="text">
                                            자녀관계
                                        </div>
                                        <div class="point"><span>1000포인트 적립</span></div>
                                        <div class="point-text">+ 1000 P</div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('pet')" 
                                    v-if="checkService('brands',true)"  
                                    :class="onProfileCard('pet')">
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
                                    :class="onProfileCard('skinType')">
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
                            <li class="skip-btn"><router-link to="/" :class="this.$store.state.welcome = true">괜찮아요. 이대로 가입할게요</router-link></li>
                        </ul>
                        <ul class="content" v-else>
                            <li class="title">좀 더 소개해주실 수 있으세요?</li>
                            <li class="sub-text" style="margin-bottom: 88px;">포인트 적립, 고객사 매칭 등에 도움이 될 거예요</li>                            
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
                            <input type="text">
                            <button>중복확인</button>
                        </div>
                    </div>

                    <div class="input-wrapper ">
                        <div class="item password">
                            <div class="label">비밀번호 </div>
                            <input type="password" placeholder="영문,숫자 포함 6자리 이상">
                            <i class="icon-eye" @click.prevent="changePwType"></i>
                        </div>

                        <div class="item password">
                            <div class="label"> </div>
                            <input type="password" placeholder="비밀번호 확인">
                            <i class="icon-eye" @click.prevent="changePwType"></i>
                        </div>
                    </div>

                    <div class="input-wrapper ">
                        <div class="item text">
                            <div class="label">이름 </div>
                            <input type="text" placeholder="">
                        </div>

                        <div class="item">
                            <div class="label">휴대폰번호 </div>
                            <input type="text" placeholder="- 없이 입력">
                            <button>인증하기</button>
                        </div>

                        <div class="item">
                            <div class="label"> </div>
                            <input type="text" placeholder="인증번호">
                            <button>확인</button>
                        </div>

                    </div>

                    <div class="input-wrapper">
                        <div class="item">
                            <div class="label">이메일</div>
                            <input type="text" placeholder="직접입력">
                            <button>중복확인</button>
                        </div>
                    </div>

                    <div class="line"></div>


                    <div class="checkbox-wrap" >
                        <div class="label" @click.prevent="openTermsMobile(1)">약관동의(필수)</div>
                        <i @click.prevent="changeTermCheck('termsOfUse')" :class="termsChecked('termsOfUse')"></i>
                    </div>
                    <div class="checkbox-wrap margin-bottom-58">
                        <div class="label" @click.prevent="openTermsMobile(2)">통합회원가입하기(선택)</div>
                        <i @click.prevent="changeTermCheck('termsOfIMS')" :class="termsChecked('termsOfIMS')"></i>
                    </div>
                    <div class="m-finished" id="welcome-finished"><a href="#"><span>가입하기</span> <i></i></a></div>
                </div>
                <div class="tab" id="additionalInfo" v-else>
                    <div class="add_wrap add_wrap_group" v-if="!isAccodionOn">
                        <div class="title">좀 더 소개해주실 수 있으세요?</div>
                        <div class="text">고객사 매칭 등에 도움이 될 거예요</div>
                        <img class="top" src="~@/assets/img/coin.png" alt="동전탑이미지">
                        <div class="text2">
                            추가정보 작성시 <br>
                            총 <span>8000 포인트</span> 적립
                        </div>
                        <button class="add_btn" id="addinfoPageBtn" @click.prevent="accodionOpen">추가정보 입력</button>
                        <div class="skip"><a href="#">괜찮아요.이대로가입할게요 &gt;</a></div>
                    </div>
                    <MobileDetailInfo v-if="isAccodionOn"/>
            </div>
            <TermsMobile v-if="isMobileTermsOn" @update="changedTabForTemrs" @close="openTermsMobile(1)"/>
            <div id="backBlock"></div>
        </div>
    </div>
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
            
            isCardFlip: false,
            isMobileTermsOn: false,
            isToggleMobileTab: 1,
            isAccodionOn: false,
            joinPage: false,
            addJoinPage: false
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
    methods :{
        addJoin() {
            this.joinPage = true;
        },
        standardJoin() {
            this.addJoinPage = !this.addJoinPage
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
            console.log('click', index);
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
    }
}
</script>

<style lang="scss">

</style>
