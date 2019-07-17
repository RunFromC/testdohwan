<template>
  <div class="contents">
    <div class="article" v-if="profileCard.default" id="defaultBlock">
      <div class="title">좀 더 소개해주실 수 있으세요?</div>
      <div class="text">
        포인트 적립, 고객사 매칭등에
        <br />도움이 될 거에요.
      </div>
      <img src="~@/assets/img/coin.png" alt />
      <div class="text2">
        인플루언서 프로필 작성시
        <br />총
        <span>8000 포인트</span> 적립
      </div>
      <button>가입확인</button>
    </div>
    <!-- sns -->
    <div class="article" id="sns" v-if="profileCard.sns">
      <div class="header margin-bottom-0">SNS 연동</div>
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
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>
    <!--  pay profileCard.pay -->
    <div class="article" id="pay" v-if="profileCard.pay">
      <div class="header margin-bottom-0">희망 원고료</div>
      <div class="inner-contents">
        <div class="recommend-checkbox">
          <div class="uncheck" v-if="!isRecommendCheck" @click.prevent="onClickRecommendCheck">
            <span>빅버드 추천을 받을게요</span>
            <i></i>
          </div>
          <div class="checked" v-else @click.prevent="onClickRecommendCheck">
            <i></i>
            <span>빅버드 추천을 받을게요</span>
          </div>
          <i class="icon-questions-mark" @click.prevent="showTips(1)"></i>
        </div>

        <div class="title">기본 원고료</div>

        <div class="pay-input-wrap">
          <span>원고료</span>
          <div class="pay-wrap">
            <input class="pay" type="text" maxlength="4" />
            <span>만원</span>
          </div>
          <div class="percentage-wrap">
            <input class="percentage" type="text" maxlength="2" value="-10" />
            <span>%</span>
            <div class="up-down-wrap">
              <i class="up"></i>
              <i class="down"></i>
            </div>
          </div>
          <i class="icon-questions-mark" data-type="0" @click.prevent="showTips(2)"></i>
        </div>

        <div class="title margin-top-58">협찬제품이 있을 경우</div>

        <div class="product-input-wrap">
          <span>제품가</span>
          <div class="product-wrap">
            <input type="text" class="pay" maxlength="9" />
            <span>원 이상</span>
          </div>
        </div>

        <div class="pay-input-wrap">
          <span>원고료</span>
          <div class="pay-wrap">
            <input class="pay" type="text" maxlength="4" />
            <span>만원</span>
          </div>
          <div class="percentage-wrap">
            <input class="percentage" type="text" maxlength="2" value="-10" />
            <span>%</span>
            <div class="up-down-wrap">
              <i class="up"></i>
              <i class="down"></i>
            </div>
          </div>
          <i class="icon-questions-mark" data-type="1" @click.prevent="showTips(3)"></i>
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
      <div class="pay-text-wrap" id="Paytext1" v-if="tip.title">
        <div class="paytext">{{tip.title}}</div>
        <div class="paytext2">{{tip.text}}</div>
        <div class="closeBtn">
          <a href="#" @click.prevent="closeTips">
            <img src="~@/assets/img/x_botton.png" alt="닫기버튼" />
          </a>
        </div>
      </div>
    </div>
    <!-- area  v-if="profileCard.area" -->
    <div class="article" v-if="profileCard.area" id="area">
      <div class="header margin-bottom-0">주 활동 지역</div>
      <div class="inner-contents">
        <MapSvg class="area-map" />
        <div class="input-search-wrap">
          <input type="text" maxlength="8" placeholder="지역검색" />
          <i></i>
        </div>

        <div class="input-selectbox-wrap">
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>상세지역</span>
            <i></i>
          </div>

          <div class="listContents listWrap">
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
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>

        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>
    <!-- gender -->
    <div class="article" id="gender" v-if="profileCard.gender">
      <div class="header margin-bottom-0">성별</div>

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
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>

    <!-- age -->
    <div class="article" id="age" v-if="profileCard.age">
      <div class="header margin-bottom-0">연령</div>
      <div class="inner-contents">
        <div class="input-selectbox-wrap" id="ageGeneration">
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>10대</span>
            <i></i>
          </div>

          <div class="listContents listWrap">
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
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>초반</span>
            <i></i>
          </div>

          <div class="listContents listWrap">
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
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>

    <!-- job -->
    <div class="article" id="job" v-if="profileCard.job">
      <div class="header margin-bottom-0">직업</div>
      <div class="inner-contents">
        <div class="input-selectbox-wrap" id="jobSelect">
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>직업선택</span>
            <i></i>
          </div>

          <div class="listContents listWrap long">
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
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>

    <!-- interests -->
    <div class="article" id="interests" v-if="profileCard.interests">
      <div class="header margin-bottom-0">관심사</div>
      <div class="inner-contents">
        <div class="input-selectbox-wrap" id="interestsSelect">
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>관심사 선택</span>
            <i></i>
          </div>

          <div class="listContents listWrap long">
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
          <input type="text" placeholder="기타 관심사 입력" maxlength="6" />
        </div>

        <div class="choice-list"></div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>
    <!-- marriage -->
    <div class="article" id="married" v-if="profileCard.married">
      <div class="header margin-bottom-0">결혼유무</div>
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
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>

    <!-- children -->
    <div class="article" id="children" v-if="profileCard.children">
      <div class="header margin-bottom-0">자녀관계</div>
      <div class="inner-contents">
        <div id="childrenSelectedContainer" class="selected-container none"></div>

        <div id="childrenSelectBox" class="input-selectbox-wrap">
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>자녀 (0명)</span>
            <i></i>
          </div>

          <div class="listContents listWrap" id="selectChildren">
            <ul class="list">
              <li>없음</li>
              <li>1명</li>
              <li>2명</li>
              <li>3명</li>
              <li>4명 이상</li>
            </ul>
          </div>
        </div>

        <div id="childrenInfoWrap" class="select-container"></div>

        <button class="addBtnWrap">+</button>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>

    <!-- Pet -->
    <div class="article" id="pet" v-if="profileCard.pet">
      <div class="header margin-bottom-0">반려동물</div>
      <div class="inner-contents">
        <div id="petSelectedContainer" class="selected-container none"></div>

        <div id="petSelectContainer">
          <div class="input-selectbox-wrap">
            <div class="select select-btn" @click.prevent="showSelectList">
              <span>동물 종류</span>
              <i></i>
            </div>

            <div class="listContents listWrap">
              <ul class="list">
                <li>강아지</li>
                <li>고양이</li>
                <li>햄스터</li>
                <li>기타</li>
              </ul>
            </div>
          </div>

          <div class="input-selectbox-wrap">
            <div class="select select-btn" @click.prevent="showSelectList">
              <span>몇마리</span>
              <i></i>
            </div>

            <div class="listContents listWrap">
              <ul class="list">
                <li>1마리</li>
                <li>2마리</li>
                <li>3마리</li>
                <li>4마리 이상</li>
              </ul>
            </div>
          </div>
        </div>

        <button class="addBtnWrap">+</button>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>

    <!-- Product -->
    <div class="article" id="item" v-if="profileCard.expectProduct">
      <div class="header margin-bottom-0">희망 공구품목</div>
      <div class="inner-contents">
        <div class="input-selectbox-wrap" id="itemSelect">
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>공구품목 선택</span>
            <i></i>
          </div>

          <div class="listContents listWrap long">
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
          <input type="text" placeholder="기타 공구품목 입력" maxlength="6" />
        </div>

        <div class="choice-list"></div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>

    <!-- BodyProfile -->
    <div class="article" id="body" v-if="profileCard.bodyProfile">
      <div class="header margin-bottom-0">바디 프로필</div>
      <div class="inner-contents">
        <div class="input-wrap">
          <input type="text" data-idx="0" placeholder="키" maxlength="3" />
          <span>cm</span>
        </div>
        <div id="bodySelectbox">
          <div class="input-selectbox-wrap">
            <div class="select2 select-btn" @click.prevent="showSelectList">
              <span>상의 사이즈</span>
              <input
                type="text"
                data-idx="1"
                maxlength="10"
                placeholder="직접입력"
                style="display: none;"
              />
              <i></i>
            </div>

            <div class="listContents listWrap2 long">
              <ul class="list">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
                <li>직접입력</li>
              </ul>
            </div>
          </div>
          <div class="input-selectbox-wrap">
            <div class="select2 select-btn" @click.prevent="showSelectList">
              <span>하의 사이즈</span>
              <input
                type="text"
                data-idx="2"
                maxlength="10"
                placeholder="직접입력"
                style="display: none;"
              />
              <i></i>
            </div>

            <div class="listContents listWrap2 long">
              <ul class="list">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
                <li>직접입력</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="input-wrap">
          <input data-idx="3" type="text" maxlength="3" placeholder="운동화 사이즈" />
          <span>mm</span>
        </div>
        <div class="input-wrap">
          <input data-idx="4" type="text" maxlength="3" placeholder="구두 사이즈" />
          <span>mm</span>
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>
    <!-- Skin -->
    <div class="article" id="skin" v-if="profileCard.skinType">
      <div class="header margin-bottom-0">피부</div>
      <div class="inner-contents">
        <div id="skinSelectbox">
          <div class="input-selectbox-wrap">
            <div class="select2 select-btn" @click.prevent="showSelectList">
              <span>피부타입</span>
              <i></i>
            </div>

            <div class="listContents listWrap2 long">
              <ul class="list">
                <li>건성</li>
                <li>중성</li>
                <li>지성</li>
                <li>복합성</li>
              </ul>
            </div>
          </div>
          <div class="choice-wrap">
            <div class="text-wrap">
              <div class="title">피부고민</div>
              <div class="text">(중복선택가능)</div>
            </div>
            <div class="choice-list2">
              <ul>
                <li>해당없음</li>
                <li>아토피</li>
                <li>여드름</li>
                <li>민감성</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn">가입확인</button>
      </div>
    </div>
    <div class="article none brand market" id="finishBlock">
      <div class="title">
        000님
        <br />프로필 입력을 완료하셨습니다!
      </div>
      <img src="~@/assets/img/coin.png" alt />
      <div class="text2">
        총
        <span>8000 포인트</span>
        <br />적립완료!
      </div>
      <button>가입확인</button>
    </div>
  </div>
</template>

<script>
import MapSvg from '../../components/MapSvg.vue';
import mobileDetailInfo from '../mobile/DetailInfo.vue';

export default {
    name: 'desktopDetailInfo',
    extends: mobileDetailInfo,
    template: {
        MapSvg
    },
    methods: {
        saveBtn(event) {
            this.nextDetailInfo(event);
        },
        nextDetailInfo(event) {
            const id = event.target.closest('.article').getAttribute('id');

            for (const key in this.profileCard) {
                this.profileCard[key] = false;
            }

            console.log(this.service);

            if (id === 'sns') {
                if (this.service === 'market') {
                    this.profileCard.gender = true;
                } else {
                    this.profileCard.pay = true;
                }
            } else if (id === 'pay') {
                if (this.service === 'brands') {
                    this.profileCard.area = true;
                } else if (this.service === 'influencer') {
                    this.profileCard.expectProduct = true;
                }
            } else if (id === 'area') {
                this.profileCard.gender = true;
            } else if (id === 'gender') {
                this.profileCard.age = true;
            } else if (id === 'age') {
                if (
                    this.service === 'influencer' ||
                    this.service === 'market'
                ) {
                    this.profileCard.bodyProfile = true;
                } else {
                    this.profileCard.job = true;
                }
            } else if (id === 'job') {
                this.profileCard.interests = true;
            } else if (id === 'interests') {
                this.profileCard.married = true;
            } else if (id === 'married') {
                this.profileCard.children = true;
            } else if (id === 'children') {
                this.profileCard.pet = true;
            } else if (id === 'item') {
                if (this.service === 'influencer') {
                    this.profileCard.gender = true;
                }
            } else if (id === 'body') {
                this.profileCard.skinType = true;
            } else if (id === 'skin') {
                this.profileCard.skinType = true;
            } else if (id === 'pet') {
                this.profileCard.pet = true;
            }
        }
    }
};
</script>

<style>
</style>
