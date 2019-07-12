<template>
    <div id="join">
        <div id="header">
            <div class="container">
                <h1 class="logo">
                    <img id="desktopLogo" src="~@/assets/img/logo_join.png" alt="빅버드회원가입">
                    <img id="tabletLogo" src="~@/assets/img/logo_join_tablet.png" alt="빅버드회원가입">
                </h1>
            </div>
        </div>
        <div id="card-container">
                <div class="card" id="cardStep1" :class="cardFilp">
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
                                    <div class="item text">
                                        <div class="label">이메일</div>
                                        <input type="text" placeholder="직접입력">
                                    </div>
                                </div>

                                <div class="line"></div>

                                <div class="checkbox-wrap" >
                                    <div class="label" @click.prevent="termCardFlip(1)">약관동의(필수)</div>
                                    <i @click.prevent="changeTermCheck('termsOfUse')" :class="termsChecked('termsOfUse')"></i>
                                </div>
                                <div class="checkbox-wrap margin-bottom-0" >
                                    <div class="label" @click.prevent="termCardFlip(2)">통합회원가입하기(선택)</div>
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
                        <a href="#" class="rotate-btn2" @click.prevent="onCardFilp"></a>
                        <div class="contents">
                            <Terms @update="changedTabForTemrs" />
                        </div>
                    </div>
                </div>
                <div class="card" id="cardStep2">
                    <div class="front">
                        <div class="contents">
                            <div class="article" >
                                <div class="header">
                                2. 인플루언서 프로필(선택)
                                </div>
                                <div class="box big"  
                                    @click="onClickProfileCard('sns')" 
                                    :class="onProfileCard('sns')">
                                    <img src="~@/assets/img/sns.png" alt="sns">
                                    <div class="text">
                                        SNS 연동으로 <br>
                                        좀 더 편하게 이용하세요.
                                    </div>
                                </div>

                                <div class="box big" 
                                    @click="onClickProfileCard('pay')" 
                                    v-if="checkService('brands',true) || checkService('influencer',true)" 
                                    :class="[onProfileCard('pay'), checkService('brands','margin-bottom-31')]">
                                    <img src="~@/assets/img/pay.png" alt="pay">
                                    <div class="text">
                                        <span v-if="checkService('brands',true)">희망 원고료</span>
                                        <span v-else>희망 수수료</span>
                                        <br>
                                        고객사 매칭에 도움이 됩니다.
                                    </div>
                                </div>

                                <div class="box big"
                                    @click="onClickProfileCard('expectProduct')" 
                                    v-if="checkService('influencer',true)" 
                                    :class="[onProfileCard('expectProduct'), checkService('influencer','margin-bottom-31')]">
                                    <img src="~@/assets/img/box.png" alt="item">
                                    <div class="text">
                                        희망 공구 품목<br>
                                        고객사 매칭에 도움이 됩니다.
                                    </div>
                                </div>
                                <div>
                                    <div class="box small" @click="onClickProfileCard('area')" 
                                    v-if="checkService('brands',true)" 
                                    :class="onProfileCard('area')">
                                        <img src="~@/assets/img/location.png" alt="area">
                                        <div class="text">
                                            주 활동 지역
                                        </div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('gender')" 
                                    v-if="checkService('brands',true) || checkService('influencer',true) || checkService('market', true)" 
                                    :class="onProfileCard('gender')">
                                        <img src="~@/assets/img/men_women.png" alt="gender">
                                        <div class="text">
                                            성별
                                        </div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('age')" 
                                    v-if="checkService('brands',true) || checkService('influencer',true) || checkService('market', true)" 
                                    :class="onProfileCard('age')">
                                        <img src="~@/assets/img/age.png" alt="age">
                                        <div class="text">
                                            연령
                                        </div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('job')" 
                                    v-if="checkService('brands',true)" 
                                    :class="onProfileCard('job')">
                                        <img src="~@/assets/img/job.png" alt="job">
                                        <div class="text">
                                            직업
                                        </div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('interests')" 
                                    v-if="checkService('brands',true)" 
                                    :class="onProfileCard('interests')">
                                        <img src="~@/assets/img/like.png" alt="interests">
                                        <div class="text">
                                            관심사
                                        </div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('married')" 
                                    v-if="checkService('brands',true)" 
                                    :class="onProfileCard('married')">
                                        <img src="~@/assets/img/married.png" alt="married">
                                        <div class="text">
                                            결혼유무
                                        </div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('children')" 
                                    v-if="checkService('brands',true)" 
                                    :class="onProfileCard('children')">
                                        <img src="~@/assets/img/baby.png" alt="children">
                                        <div class="text">
                                            자녀관계
                                        </div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('pet')" 
                                    v-if="checkService('brands',true)"  
                                    :class="onProfileCard('pet')">
                                        <img src="~@/assets/img/pet.png" alt="pet">
                                        <div class="text">
                                            반려동물
                                        </div>
                                    </div>
                                    <div class="box small" @click="onClickProfileCard('bodyProfile')" 
                                    v-if="checkService('market',true) || checkService('influencer', true)" 
                                    :class="onProfileCard('bodyProfile')" >
                                        <img src="~@/assets/img/body.png" alt="sns">
                                        <div class="text">
                                            바디프로필
                                        </div>
                                    </div>

                                    <div class="box small" @click="onClickProfileCard('skinType')" 
                                    v-if="checkService('market',true) || checkService('influencer', true)" 
                                    :class="onProfileCard('skinType')">
                                        <img src="~@/assets/img/skin.png" alt="sns">
                                        <div class="text">
                                            피부
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="card" id="cardStep3">
                <div class="front">
                    <div class="contents" >
                        <div class="article"  v-if="profileCard.default" id="defaultBlock">
                            <div class="title">좀 더 소개해주실 수 있으세요?</div>
                            <div class="text">포인트 적립, 고객사 매칭등에 <br> 도움이 될 거에요.</div>
                            <img src="~@/assets/img/coin.png" alt="">
                            <div class="text2">
                                인플루언서 프로필 작성시 <br>
                                총 <span>8000 포인트</span> 적립
                            </div>
                            <button>가입확인</button>
                        </div>
                        <div class="article" v-if="profileCard.sns" data-save="false" id="sns">
                            <div class="header margin-bottom-0">
                                SNS 연동
                            </div>
                            <div class="inner-contents">
                                <div class="certification-list">
                                    <a href="#" id="facebook"></a>
                                    <a href="#" id="instagram"></a>
                                    <a href="#" id="youtube"></a>
                                    <a href="#" id="naver"></a>
                                    <a href="#" id="twitter"></a>
                                </div>
                                <a href="#" id="deskSnsSaveBtn">SNS인증하기</a>
                            </div>
                            <div class="button-wrap">
                                <ul>
                                    <li class="back-btn"><i></i>뒤로가기</li>
                                    <li class="save-btn">저장하기</li>
                                    <li class="next-btn">건너뛰기<i></i></li>
                                </ul>
                                <button class="join-finish-btn">가입확인</button>
                            </div>
                        </div>
                        <div class="article" v-if="profileCard.pay" data-save="false" id="pay">
                            <div class="header margin-bottom-0">
                            희망 원고료
                            </div>
                            <div class="inner-contents">
                                <div class="recommend-checkbox">
                                    <div class="uncheck"><span>빅버드 추천을 받을게요</span> <i></i></div>
                                    <div class="checked none"><i></i> <span>빅버드 추천을 받을게요</span></div>
                                    <i class="icon-questions-mark"></i>
                                </div>

                                <div class="title">
                                    기본 원고료
                                </div>

                                <div class="pay-input-wrap">
                                    <span>원고료</span>
                                    <div class="pay-wrap"><input class="pay" type="text" maxlength="4"><span>만원</span></div>
                                    <div class="percentage-wrap">
                                        <input class="percentage" type="text" maxlength="2" value="-10"><span>%</span>
                                        <div class="up-down-wrap">
                                            <i class="up"></i>
                                            <i class="down"></i>
                                        </div>
                                    </div>
                                    <i class="icon-questions-mark" data-type="0"></i>
                                </div>



                                <div class="title margin-top-58">
                                    협찬제품이 있을 경우
                                </div>

                                <div class="product-input-wrap">
                                    <span>제품가</span>
                                    <div class="product-wrap">
                                        <input type="text" class="pay" maxlength="9">
                                        <span>원 이상</span>
                                    </div>
                                </div>

                                <div class="pay-input-wrap">
                                    <span>원고료</span>
                                    <div class="pay-wrap"><input class="pay" type="text" maxlength="4"><span>만원</span></div>
                                    <div class="percentage-wrap">

                                        <input class="percentage" type="text" maxlength="2" value="-10"><span>%</span>
                                        <div class="up-down-wrap">
                                            <i class="up"></i>
                                            <i class="down"></i>
                                        </div>
                                    </div>
                                    <i class="icon-questions-mark" data-type="1"></i>
                                </div>

                            </div>
                            <div class="button-wrap">
                                <ul>
                                    <li class="back-btn"><i></i>뒤로가기</li>
                                    <li class="save-btn">저장하기</li>
                                    <li class="next-btn">건너뛰기<i></i></li>
                                </ul>
                                <button class="join-finish-btn">가입확인</button>
                            </div>
                            <div class="pay-text-wrap none" id="Paytext1">
                                <div class="paytext">
                                    원고료 산정방식?1
                                </div>
                                <div class="paytext2">
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.희망원고료의
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.
                                </div>
                                <div class="closeBtn">
                                    <a href="#"><img src="~@/assets/img/x_botton.png" alt="닫기버튼"></a>
                                </div>
                            </div>
                            <div class="pay-text-wrap none" id="Paytext2">
                                <div class="paytext">
                                    원고료 산정방식?2
                                </div>
                                <div class="paytext2">
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.희망원고료의
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.
                                </div>
                                <div class="closeBtn">
                                    <a href="#"><img src="~@/assets/img/x_botton.png" alt="닫기버튼"></a>
                                </div>
                            </div>
                            <div class="pay-text-wrap none" id="Paytext3">
                                <div class="paytext">
                                    협찬제품이 있을 때 원고료 산정방식!3
                                </div>
                                <div class="paytext2">
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.희망원고료의
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.
                                </div>
                                <div class="closeBtn">
                                    <a href="#"><img src="~@/assets/img/x_botton.png" alt="닫기버튼"></a>
                                </div>
                            </div>
                        </div>
                        <div class="article" v-if="profileCard.area" data-save="false" id="area">
                            <div class="header margin-bottom-0">
                            주 활동 지역
                            </div>
                            <div class="inner-contents">
                                <MapSvg class="area-map" />
                                <div class="input-search-wrap">
                                    <input type="text" maxlength="8" placeholder="지역검색">
                                    <i></i>
                                </div>

                                <div class="input-selectbox-wrap">
                                    <div class="select">
                                        <span>상세지역</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap">
                                        <ul class="list">
                                            <li>수원시</li>
                                            <li>성남시</li>
                                            <li>용인시</li>
                                            <li>안양시</li>
                                            <li>안양시</li>
                                            <li>안양시</li>
                                            <li>안양시</li>
                                            <li>안양시</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="button-wrap">
                                <ul>
                                    <li class="back-btn"><i></i>뒤로가기</li>
                                    <li class="save-btn">저장하기</li>
                                    <li class="next-btn">건너뛰기<i></i></li>
                                </ul>

                                <button class="join-finish-btn">가입확인</button>
                            </div>
                        </div>
                        <div class="article" v-if="profileCard.gender" data-save="false" id="gender">
                            <div class="header margin-bottom-0">
                            성별
                            </div>

                            <div class="inner-contents">
                                <div class="gender-wrap radio-wrap checked">
                                    <div class="image"></div>
                                    <span>남성</span>
                                    <i></i>
                                </div>
                                <div class="gender-wrap radio-wrap">
                                    <div class="image"></div>
                                    <span>여성</span>
                                    <i></i>
                                </div>
                            </div>

                            <div class="button-wrap">
                                <ul>
                                    <li class="back-btn"><i></i>뒤로가기</li>
                                    <li class="save-btn">저장하기</li>
                                    <li class="next-btn">건너뛰기<i></i></li>
                                </ul>
                                <button class="join-finish-btn">가입확인</button>
                            </div>
                        </div>
                        <div class="article" v-if="profileCard.age" data-save="false" id="age">
                            <div class="header margin-bottom-0">
                            연령
                            </div>
                            <div class="inner-contents">
                                <div class="input-selectbox-wrap" id="ageGeneration">
                                    <div class="select" >
                                        <span>10대</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap">
                                        <ul class="list">
                                            <li data-inx="0" style="display:none;">10대</li>
                                            <li data-inx="1">20대</li>
                                            <li data-inx="2">30대</li>
                                            <li data-inx="3">40대</li>
                                            <li data-inx="4">50대</li>
                                            <li data-inx="5">60대 이상</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="input-selectbox-wrap" id="ageGroup">
                                    <div class="select">
                                        <span>초반</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap">
                                        <ul class="list">
                                            <li data-inx="0" style="display: none">초반</li>
                                            <li data-inx="1">중반</li>
                                            <li data-inx="2">후반</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="button-wrap">
                                <ul>
                                    <li class="back-btn"><i></i>뒤로가기</li>
                                    <li class="save-btn">저장하기</li>
                                    <li class="next-btn">건너뛰기<i></i></li>
                                </ul>
                                <button class="join-finish-btn">가입확인</button>
                            </div>
                        </div>
                        <div class="article" v-if="profileCard.job" data-save="false" id="job">
                            <div class="header margin-bottom-0">
                            직업
                            </div>
                            <div class="inner-contents">
                                <div class="input-selectbox-wrap" id="jobSelect">
                                    <div class="select">
                                        <span>직업선택</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap long">
                                        <ul class="list">
                                            <li>모델</li>
                                            <li>프리랜서</li>
                                            <li>마케터</li>
                                            <li>주부</li>
                                            <li>유튜브 크리에이터</li>
                                            <li>디자이너</li>
                                            <li>포토그래퍼</li>
                                            <li>여행작가</li>
                                            <li>개발자</li>
                                            <li>개발자</li>
                                            <li>개발자</li>
                                            <li>개발자</li>
                                            <li>개발자</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="button-wrap">
                                <ul>
                                    <li class="back-btn"><i></i>뒤로가기</li>
                                    <li class="save-btn">저장하기</li>
                                    <li class="next-btn">건너뛰기<i></i></li>
                                </ul>
                                <button class="join-finish-btn">가입확인</button>
                            </div>
                        </div>
                        <div class="article" v-if="profileCard.interests" data-save="false" id="interests">
                            <div class="header margin-bottom-0">
                            관심사
                            </div>
                            <div class="inner-contents">
                                <div class="input-selectbox-wrap" id="interestsSelect">
                                    <div class="select">
                                        <span>관심사 선택</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap long">
                                        <ul class="list">
                                            <li>패션</li>
                                            <li>뷰티</li>
                                            <li>취미</li>
                                            <li>레져</li>
                                            <li>책 / 출판</li>
                                            <li>출산 / 육아</li>
                                            <li>지역</li>
                                            <li>일상 / 데일리</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="input-text-wrap">
                                    <input type="text" placeholder="기타 관심사 입력" maxlength="6">
                                </div>

                                <div class="choice-list">

                                </div>
                            </div>
                            <div class="button-wrap">
                                <ul>
                                    <li class="back-btn"><i></i>뒤로가기</li>
                                    <li class="save-btn">저장하기</li>
                                    <li class="next-btn">건너뛰기<i></i></li>
                                </ul>
                                <button class="join-finish-btn">가입확인</button>
                            </div>
                        </div>
                        <div class="article" v-if="profileCard.married" data-save="false" id="married">
                            <div class="header margin-bottom-0">
                            결혼유무
                            </div>
                            <div class="inner-contents">
                                <div class="marriage-wrap radio-wrap checked">
                                    <div class="image"></div>
                                    <span>기혼</span>
                                    <i></i>
                                </div>
                                <div class="marriage-wrap radio-wrap">
                                    <div class="image"></div>
                                    <span>미혼</span>
                                    <i></i>
                                </div>
                            </div>
                            <div class="button-wrap">
                                <ul>
                                    <li class="back-btn"><i></i>뒤로가기</li>
                                    <li class="save-btn">저장하기</li>
                                    <li class="next-btn">건너뛰기<i></i></li>
                                </ul>
                                <button class="join-finish-btn">가입확인</button>
                            </div>
                        </div>
                        <div class="article" v-if="profileCard.children" data-save="false" id="children">
                            <div class="header margin-bottom-0">
                            자녀관계
                            </div>
                            <div class="inner-contents">
                                <div id="childrenSelectedContainer" class="selected-container none">

                                </div>

                                <div id="childrenSelectBox" class="input-selectbox-wrap">
                                    <div class="select">
                                        <span>자녀 (0명)</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap" id="selectChildren">
                                        <ul class="list">
                                            <li>없음</li>
                                            <li>1명</li>
                                            <li>2명</li>
                                            <li>3명</li>
                                            <li>4명 이상</li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="childrenInfoWrap" class="select-container">
                                </div>

                                <button class="addBtnWrap">
                                    +
                                </button>
                            </div>
                            <div class="button-wrap">
                                <ul>
                                    <li class="back-btn"><i></i>뒤로가기</li>
                                    <li class="save-btn">저장하기</li>
                                    <li class="next-btn">건너뛰기<i></i></li>
                                </ul>
                                <button class="join-finish-btn">가입확인</button>
                            </div>
                        </div>
                        <div class="article" v-if="profileCard.pet" data-save="false" id="pet">
                            <div class="header margin-bottom-0">
                            반려동물
                            </div>
                            <div class="inner-contents">
                                <div id="petSelectedContainer" class="selected-container none">

                                </div>

                            <div id="petSelectContainer">
                                <div class="input-selectbox-wrap">
                                    <div class="select">
                                        <span>동물 종류</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap" >
                                        <ul class="list">
                                            <li>강아지</li>
                                            <li>고양이</li>
                                            <li>햄스터</li>
                                            <li>기타</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="input-selectbox-wrap">
                                    <div class="select">
                                        <span>몇마리</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap" >
                                        <ul class="list">
                                            <li>1마리</li>
                                            <li>2마리</li>
                                            <li>3마리</li>
                                            <li>4마리 이상</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                                <button class="addBtnWrap">
                                    +
                                </button>
                            </div>
                            <div class="button-wrap">
                                <ul>
                                    <li class="back-btn"><i></i>뒤로가기</li>
                                    <li class="save-btn on">저장하기</li>
                                    <li class="next-btn">건너뛰기<i></i></li>
                                </ul>
                                <button class="join-finish-btn">가입확인</button>
                            </div>
                        </div>

                        <div class="article none brand market" id="finishBlock">
                            <div class="title">000님 <br> 프로필 입력을 완료하셨습니다!</div>
                            <img src="~@/assets/img/coin.png" alt="">
                            <div class="text2">
                                총 <span>8000 포인트</span> <br>적립완료!
                            </div>
                            <button>가입확인</button>
                        </div>
                    </div>
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
                    <div @click="toggleMobileTab(2)" :class="!isToggleMobileTab === 2 ? 'on': ''">추가정보</div>
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
                        <div class="item text">
                            <div class="label">이메일</div>
                            <input type="text" placeholder="직접입력">
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
                    <div class="add_wrap add_wrap_group">
                        <div class="title">좀 더 소개해주실 수 있으세요?</div>
                        <div class="text">고객사 매칭 등에 도움이 될 거예요</div>
                        <img class="top" src="~@/assets/img/coin.png" alt="동전탑이미지">
                        <div class="text2">
                            추가정보 작성시 <br>
                            총 <span>8000 포인트</span> 적립
                        </div>
                        <button class="add_btn" id="addinfoPageBtn">추가정보 입력</button>
                        <div class="skip"><a href="#">괜찮아요.이대로가입할게요 &gt;</a></div>
                    </div>
                    <div class="add_wrap2 add_wrap_group" style="display: none;">
                        <!-- SNS연동  -->
                        <div class="accordion" id="accodion_sns">
                            <ul>
                                <li><img class="icon" src="~@/assets/img/sns.png" alt="sns연동아이콘"></li>
                                <li>SNS연동</li>
                                <li><img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘"></li>
                            </ul>
                        </div>
                        <div class="accordion-contents">
                            <div class="certification-list">
                                <a href="#" id="m-facebook"></a>
                                <a href="#" id="m-instagram"></a>
                                <a href="#" id="m-youtube"></a>
                                <a href="#" id="m-naver"></a>
                                <a href="#" id="m-twitter"></a>
                            </div>
                            <div class="SNS-btn"><a href="#">SNS인증하기</a></div>
                            <button class="SNSsave-btn">저장</button>
                        </div>
                        <!-- 희망원고료  -->
                        <div class="accordion" id="accodion_pay">
                            <ul>
                                <li><img class="icon" src="~@/assets/img/pay.png" alt="희망원고료아이콘"></li>
                                <li>희망원고료</li>
                                <li><img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘"></li>
                            </ul>
                        </div>
                        <div class="accordion-contents">
                            <div class="recommend-checkbox">
                                <div class="uncheck"><span>빅버드 추천을 받을게요</span> <i class="circle"></i></div>
                                <div class="checked none">
                                    <i class="check_box"></i>
                                    <span>빅버드 추천을 받을게요</span>
                                </div>
                                <i class="icon-questions-mark"></i>
                            </div>
                            <div class="pay-title">
                                기본 원고료
                            </div>
                            <div class="pay-input-wrap">
                                <span>원고료</span>
                                <div class="pay-wrap"><input class="pay" type="text" maxlength="4"><span>만원</span></div>
                                <select class="percentage-select">
                                    <option value="-10%">-  10 %</option>
                                    <option value="-20%">-  20 %</option>
                                    <option value="-30%">-  30 %</option>
                                    <option value="-40%">-  40 %</option>
                                </select>
                                <i class="icon-questions-mark" data-type="0"></i>

                            </div>
                            <div class="pay-text-wrap" id="m-Paytext1">
                                <div class="paytext">
                                    원고료 산정방식?1
                                </div>
                                <div class="paytext2">
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.희망원고료의
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.
                                </div>
                                <div class="m-closeBtn">
                                    <a href="#"><img src="~@/assets/img/x_botton.png" alt="닫기버튼"></a>
                                </div>
                            </div>
                            <div class="pay-text-wrap" id="m-Paytext2">
                                <div class="paytext">
                                    원고료 산정방식?2
                                </div>
                                <div class="paytext2">
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.희망원고료의
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.
                                </div>
                                <div class="m-closeBtn">
                                    <a href="#"><img src="~@/assets/img/x_botton.png" alt="닫기버튼"></a>
                                </div>
                            </div>
                            <div class="pay-text-wrap" id="m-Paytext3">
                                <div class="paytext">
                                    협찬제품이 있을 때 원고료 산정방식!3
                                </div>
                                <div class="paytext2">
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.희망원고료의
                                    희망원고료의 최소 퍼센트 범위를 지정해주시면
                                    고객사 매칭에 도움이 될 거에요.
                                </div>
                                <div class="m-closeBtn">
                                    <a href="#"><img src="~@/assets/img/x_botton.png" alt="닫기버튼"></a>
                                </div>
                            </div>
                            <div class="pay-title">
                                협찬제품이 있을 경우
                            </div>
                            <div class="product-input-wrap">
                                <span>제품가</span>
                                <div class="product-wrap">
                                    <input type="text" class="pay" maxlength="9">
                                    <span>원 이상</span>
                                </div>
                            </div>
                            <div class="pay-input-wrap">
                                <span>원고료</span>
                                <div class="pay-wrap"><input class="pay" type="text" maxlength="4"><span>만원</span></div>
                                <select class="percentage-select">
                                    <option value="-10%">-  10 %</option>
                                    <option value="-20%">-  20 %</option>
                                    <option value="-30%">-  30 %</option>
                                    <option value="-40%">-  40 %</option>
                                </select>
                                <i class="icon-questions-mark" data-type="1"></i>
                            </div>
                            <div class="button-wrap">
                                <button class="Paysave-btn">저장</button>
                            </div>
                        </div>
                        <!-- 주 활동 지역  -->
                        <div class="accordion" id="accordion-hot">
                            <ul>
                                <li><img class="icon" src="~@/assets/img/location.png" alt="주활동지역아이콘"></li>
                                <li>주 활동 지역</li>
                                <li><img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘"></li>
                            </ul>
                        </div>
                        <div class="accordion-contents" id="accordion-place">
                            <MapSvg class="area-map" />
                            <div class="input-search-wrap">
                                <input type="text" placeholder="지역검색">
                                <i></i>
                            </div>

                            <div class="input-selectbox-wrap">
                                <div class="select" id="select-btn">
                                    <span>상세지역</span>
                                    <i></i>
                                </div>

                                <div class="listWrap">
                                    <ul class="list">
                                        <li>수원시</li>
                                        <li>성남시</li>
                                        <li>용인시</li>
                                        <li>안양시</li>
                                        <li>안양시</li>
                                        <li>안양시</li>
                                        <li>안양시</li>
                                        <li>안양시</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="button-wrap">
                                <button class="hotsave-btn">저장</button>
                            </div>
                        </div>
                        <!-- 성별 -->
                        <div class="accordion" id="accordion_gender">
                            <ul>
                                <li><img class="icon" src="~@/assets/img/men_women.png" alt="성별아이콘"></li>
                                <li>성별</li>
                                <li><img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘"></li>
                            </ul>
                        </div>
                        <div class="accordion-contents">
                            <div class="m-gender">
                                <div class="gender-wrap gender-img radio-wrap checked">
                                    <div class="image"></div>
                                    <span>남성</span>
                                    <i></i>
                                </div>
                                <div class="gender-wrap gender-img radio-wrap">
                                    <div class="image"></div>
                                    <span>여성</span>
                                    <i></i>
                                </div>
                            </div>
                            <div class="button-wrap">
                                <button class="gendersave-btn">저장</button>
                            </div>
                        </div>
                        <!-- 연령 -->
                        <div class="accordion"  id="accordion_age">
                            <ul>
                                <li><img class="icon" src="~@/assets/img/age.png" alt="연령아이콘"></li>
                                <li>연령</li>
                                <li><img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘"></li>
                            </ul>
                        </div>
                        <div class="accordion-contents" >
                            <div class="m-age">
                                <div class="input-selectbox-wrap mt" id="m_ageGeneration">
                                    <div class="select">
                                        <span>10대</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap">
                                        <ul class="list">
                                            <li data-inx="0" style="display: none">10대</li>
                                            <li data-inx="1">20대</li>
                                            <li data-inx="2">30대</li>
                                            <li data-inx="3">40대</li>
                                            <li data-inx="4">50대</li>
                                            <li data-inx="5">60대 이상</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="input-selectbox-wrap" id="m_ageGroup">
                                    <div class="select2">
                                        <span>초반</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap2">
                                        <ul class="list">
                                            <li data-inx="0" style="display: none">초반</li>
                                            <li data-inx="1">중반</li>
                                            <li data-inx="2">후반</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="button-wrap">
                                <button class="agesave-btn">저장</button>
                            </div>
                        </div>
                        <!-- 직업 -->
                        <div class="accordion" id="accordion_job">
                            <ul>
                                <li><img class="icon" src="~@/assets/img/job.png" alt="직업아이콘"></li>
                                <li>직업</li>
                                <li><img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘"></li>
                            </ul>
                        </div>
                        <div class="accordion-contents">
                            <div class="m-job">
                                <div class="input-selectbox-wrap" id="m-jobSelect">
                                    <div class="select2" id="jobselect-btn">
                                        <span>직업선택</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap2 long">
                                        <ul class="list">
                                            <li>모델</li>
                                            <li>프리랜서</li>
                                            <li>마케터</li>
                                            <li>주부</li>
                                            <li>유튜브 크리에이터</li>
                                            <li>디자이너</li>
                                            <li>포토그래퍼</li>
                                            <li>여행작가</li>
                                            <li>개발자</li>
                                            <li>개발자</li>
                                            <li>개발자</li>
                                            <li>개발자</li>
                                            <li>개발자</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="button-wrap">
                                <button class="jobsave-btn" >저장</button>
                            </div>
                        </div>
                        <!-- 관심사 -->
                        <div class="accordion" id="accordion_like">
                            <ul>
                                <li><img class="icon" src="~@/assets/img/like.png" alt="관심사아이콘"></li>
                                <li>관심사</li>
                                <li><img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘"></li>
                            </ul>
                        </div>
                        <div class="accordion-contents">
                            <div class="m-like">
                                <div class="input-selectbox-wrap" id="m-interestsSelect">
                                    <div class="select3" id="likeselect-btn">
                                        <span>관심사 선택</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap3 long">
                                        <ul class="list">
                                            <li data-sub="0">패션</li>
                                            <li data-sub="1">뷰티</li>
                                            <li data-sub="2">취미</li>
                                            <li data-sub="3">레져</li>
                                            <li data-sub="4">책 / 출판</li>
                                            <li data-sub="5">출산 / 육아</li>
                                            <li data-sub="6">지역</li>
                                            <li data-sub="7">일상 / 데일리</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="input-text-wrap" id="m-interests">
                                    <input type="text" placeholder="기타 관심사 입력" maxlength="6">
                                </div>

                                <div class="alert-text none">6글자 초과 입력할 수 없습니다</div>

                                <div class="choice-list">

                                </div>

                                <div class="alert-text none">관심사는 6개를 초과 선택할 수 없습니다</div>

                                <div class="button-wrap">
                                    <button class="likesave-btn" >저장</button>
                                </div>
                            </div>
                        </div>
                        <!-- 결혼 유무 -->
                        <div class="accordion" id="accordion_marry">
                            <ul>
                                <li><img class="icon" src="~@/assets/img/married.png" alt="결혼유무아이콘"></li>
                                <li>결혼 유무</li>
                                <li><img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘"></li>
                            </ul>
                        </div>
                        <div class="accordion-contents">
                            <div class="m-marry">
                                <div class="marriage-wrap radio-wrap checked">
                                    <div class="image"></div>
                                    <span>기혼</span>
                                    <i></i>
                                </div>
                                <div class="marriage-wrap radio-wrap">
                                    <div class="image"></div>
                                    <span>미혼</span>
                                    <i></i>
                                </div>
                                <div class="button-wrap">

                                    <button class="marrysave-btn" >저장</button>
                                </div>
                            </div>
                        </div>
                        <!-- 자녀 관계 -->
                        <div class="accordion" id="accordion_baby">
                            <ul>
                                <li><img class="icon" src="~@/assets/img/baby.png" alt="자녀관계아이콘"></li>
                                <li>자녀 관계</li>
                                <li><img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘"></li>
                            </ul>
                        </div>
                        <div class="accordion-contents">
                            <div class="m_baby" id="m_children">
                                <div id="m_childrenSelectedContainer" class="selected-container none">

                                </div>

                                <div id="m_childrenSelectBox" class="input-selectbox-wrap">
                                    <div class="select">
                                        <span>자녀 (0명)</span>
                                        <i></i>
                                    </div>

                                    <div class="listWrap" id="m_selectChildren">
                                        <ul class="list">
                                            <li>없음</li>
                                            <li>1명</li>
                                            <li>2명</li>
                                            <li>3명</li>
                                            <li>4명 이상</li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="m_childrenInfoWrap" class="select-container">
                                </div>

                                <button class="addBtnWrap">
                                    +
                                </button>
                            </div>
                            <div class="button-wrap">
                                <button class="babysave-btn">저장</button>
                            </div>
                        </div>
                        <!-- 반려동물 -->
                        <div class="accordion" id="accordion_pet">
                            <ul>
                                <li><img class="icon" src="~@/assets/img/pet.png" alt="반려동물아이콘"></li>
                                <li>반려동물</li>
                                <li><img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘"></li>
                            </ul>
                        </div>
                        <div class="accordion-contents">
                            <div class="m-pet">
                                <div id="m_petSelectedContainer" class="selected-container none">

                                </div>

                                <div id="m_petSelectContainer">
                                    <div class="input-selectbox-wrap">
                                        <div class="select">
                                            <span>동물 종류</span>
                                            <i></i>
                                        </div>

                                        <div class="listWrap" >
                                            <ul class="list">
                                                <li>강아지</li>
                                                <li>고양이</li>
                                                <li>햄스터</li>
                                                <li>기타</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="input-selectbox-wrap mtb0">
                                        <div class="select">
                                            <span>몇마리</span>
                                            <i></i>
                                        </div>

                                        <div class="listWrap" >
                                            <ul class="list">
                                                <li>1마리</li>
                                                <li>2마리</li>
                                                <li>3마리</li>
                                                <li>4마리 이상</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div id="m_petSelectedContainer" class="selected-container ">
                                    </div>
                                </div>
                            </div>

                                <button class="addBtnWrap"> + </button>
                        </div>
                            <div class="button-wrap">
                                <button class="petsave-btn" onclick="location.href='/welcome' ">저장</button>
                            </div>
                        </div>
                        <div class="m-finished"><a href="#"><span>가입하기</span><i></i></a></div>
                    </div>
            </div>
            <TermsMobile v-if="isMobileTermsOn" @update="changedTabForTemrs" @close="openTermsMobile(1)"/>
            <div id="backBlock"></div>
        </div>
            

    </div>
</template>

<script>
import Terms from '../components/Terms.vue'
import TermsMobile from '../components/TermsMoblie.vue'
import { mapState, mapGetters } from 'vuex';
import { createHash } from 'crypto';
import MapSvg from '../components/MapSvg.vue';

export default { 
    components: {
        Terms,
        TermsMobile,
        MapSvg
    },
    data () {
        return {
            isCardFlip: false,
            isMobileTermsOn: false,
            profileCard: {
                default:true,
                sns: false,
                pay: false,
                expectProduct: false,
                area: false,
                gender: false,
                age: false,
                job: false,
                interests: false,
                married: false,
                children: false,
                pet: false,
                bodyProfile: false,
                skinType: false
            },
            isToggleMobileTab: 1
        }
    },
    computed: {
        ...mapState(['service']),
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
        checkService(serviceName, returnValue) {
            return this.service === serviceName ? returnValue : '';
        },
        onProfileCard(type) {
            return this.profileCard[type] ? 'on' : '';
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
        onClickProfileCard(value ) {
            for (const key in this.profileCard) {
                this.profileCard[key] = false;
            }
            this.profileCard[value] = !this.profileCard[value];
        },
        toggleMobileTab(index) {
            console.log('click', index);
            this.isToggleMobileTab = index;
        }
    },
    mounted() {
        // if(this.service === '') this.$router.push('/');
    }
}
</script>

<style lang="scss">
@import '../assets/scss/login/join.scss'
</style>
