<template>
  <div id="join">
    <div id="header">
      <div class="container">
        <h1 class="logo">
          <img id="desktopLogo" src="~@/assets/img/logo_join.png" alt="빅버드회원가입" />
          <img id="tabletLogo" src="~@/assets/img/logo_join_tablet.png" alt="빅버드회원가입" />
        </h1>
      </div>
    </div>
        <div id="card-container">
<!--        <div class="scene">-->
            <div class="card" id="cardStep1" :class="cardFilp">
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
                                <input type="text">
                                <button>중복확인</button>
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
                            </div>
                        </div>

                        <div class="input-wrapper ">
                            <div class="item password">
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
                            <div class="item password">
                                <div class="label">이메일</div>
                                <input type="text" placeholder="직접입력">
                            </div>
                        </div>

                        <div class="line"></div>

                        <div class="checkbox-wrap">
                            <div class="label"  @click.prevent="termCardFlip(1)">약관동의(필수)</div>
                            <input type="checkbox" class="input-checkbox" >
                            <i@click.prevent="changeTermCheck('termsOfUse')" :class="termsChecked('termsOfUse')"></i>
                        </div>
                        <div class="checkbox-wrap margin-bottom-0">
                            <div class="label" @click.prevent="termCardFlip(2)">통합회원가입하기(선택)</div>
                            <input type="checkbox" class="input-checkbox" >
                            <i @click.prevent="changeTermCheck('termsOfIMS')" :class="termsChecked('termsOfIMS')"></i>
                        </div>
                        <div class="link_wrap">
                            <a href="#"><img src="~@/assets/img/market_logo.png" alt=""></a>
                            <div class="split"></div>
                            <a href="#"><img src="~@/assets/img/pick_logo.png" alt=""></a>
                            <div class="split"></div>
                            <a href="#"><img src="~@/assets/img/bigbird-i_logo.png" alt=""></a>
                        </div>
                        <div class="finished"><a href="#"><span>가입완료</span> <i></i></a></div>
                    </div>
                </div>
            </div>
            <div class="back">
                <a href="#" class="rotate-btn2"  @click.prevent="onCardFilp"></a>
                <div class="contents">
                     <Terms @update="changedTabForTemrs" />
                </div>
            </div>
        </div>
<!--        </div>-->
<!--        <div class="scene">-->
            <div class="card" id="cardStep2">
            <div class="front">
                <div class="contents">
                    <div class="article">
                        <div class="header">
                           2. 회사정보(선택)
                        </div>
                        <div class="input-wrapper mb15">
                            <div class="item col1">
                                <div class="label">회사명</div>
                                <input type="text">
                            </div>
                        </div>

                        <div class="input-wrapper mb15">
                            <div class="item col1">
                                <div class="label">연락처</div>
                                <input type="text" class="input-phone" maxlength="4" placeholder="010">
                                <input type="text" class="input-phone" maxlength="4">
                                <input type="text" class="input-phone" maxlength="4">
                            </div>
                        </div>

                        <div class="input-wrapper mb31">
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

                        <button id="join-finished">가입확인</button>
                    </div>
                </div>
            </div>
        </div>

            <div class="card" id="cardStep3">
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
    </div>

    <div id="m-container">
        <div class="header">
            <div class="header-title">
                <a href="/client" class="icon-back-btn"><i></i></a>
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
                    <div class="item">
                        <div class="label">이름 </div>
                        <input type="text" placeholder="">
                        <button>실명인증</button>
                    </div>
                </div>

                <div class="input-wrapper">
                    <div class="item text">
                        <div class="label">이메일</div>
                        <input type="text" placeholder="">
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
                    <div class="m-finished"><a href="#"><span>가입하기</span><i></i></a></div>
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
export default {
    data () {
        return {
            isCardFlip: false,
        }
    },
    extends: Join,
    components: {
        Terms, TermsMobile
    },
    
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/client-login/join.scss'
</style>
