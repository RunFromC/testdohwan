<template>
  <div class="add_wrap2 add_wrap_group" @click="closeSelectList">
    <!-- SNS연동  -->
    <div class="accordion" id="accodion_sns" @click="onClickProfileCard('sns', $event)">
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/sns.png" alt="sns연동아이콘" />
        </li>
        <li>SNS연동</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div class="accordion-contents" :class="onProfileCard('sns')">
      <div class="certification-list">
        <a href="#" id="m-facebook"></a>
        <a href="#" id="m-instagram"></a>
        <a href="#" id="m-youtube"></a>
        <a href="#" id="m-naver"></a>
        <a href="#" id="m-twitter"></a>
      </div>
      <div class="SNS-btn">
        <a href="#">SNS인증하기</a>
      </div>
      <button class="SNSsave-btn">저장</button>
    </div>

    <!-- 희망원고료  -->
    <div
      class="accordion"
      id="accodion_pay"
      v-if="checkService('brands',true) || checkService('influencer',true)"
      @click="onClickProfileCard('pay', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/pay.png" alt="희망원고료아이콘" />
        </li>
        <li>희망원고료</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      :class="onProfileCard('pay')"
      v-if="checkService('brands',true) || checkService('influencer',true)"
    >
      <div class="recommend-checkbox">
        <div class="uncheck" v-if="!isRecommendCheck" @click.prevent="onClickRecommendCheck">
          <span>빅버드 추천을 받을게요</span>
          <i class="circle"></i>
        </div>
        <div class="checked" v-else @click.prevent="onClickRecommendCheck">
          <i class="check_box"></i>
          <span>빅버드 추천을 받을게요</span>
        </div>
        <i class="icon-questions-mark" @click.prevent="showTips(1)"></i>
      </div>
      <div class="pay-title">기본 원고료</div>
      <div class="pay-input-wrap">
        <span>원고료</span>
        <div class="pay-wrap">
          <input class="pay" type="text" maxlength="4" />
          <span>만원</span>
        </div>
        <select class="percentage-select">
          <option value="-10%">- 10 %</option>
          <option value="-20%">- 20 %</option>
          <option value="-30%">- 30 %</option>
          <option value="-40%">- 40 %</option>
        </select>
        <i class="icon-questions-mark" data-type="0" @click.prevent="showTips(2)"></i>
      </div>
      <div class="pay-text-wrap" id="m-Paytext1" v-if="tip.title">
        <div class="paytext">{{tip.title}}</div>
        <div class="paytext2">{{tip.text}}</div>
        <div class="m-closeBtn">
          <a href="#" @click.prevent="closeTips">
            <img src="~@/assets/img/x_botton.png" alt="닫기버튼" />
          </a>
        </div>
      </div>
      <div class="pay-title">협찬제품이 있을 경우</div>
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
        <select class="percentage-select">
          <option value="-10%">- 10 %</option>
          <option value="-20%">- 20 %</option>
          <option value="-30%">- 30 %</option>
          <option value="-40%">- 40 %</option>
        </select>
        <i class="icon-questions-mark" data-type="1" @click.prevent="showTips(3)"></i>
      </div>
      <div class="button-wrap">
        <button class="Paysave-btn">저장</button>
      </div>
    </div>

    <!-- 희망 공구 품목 -->
    <div
      class="accordion"
      id="accordion_item"
      @click="onClickProfileCard('expectProduct', $event)"
      v-if="checkService('brands',true) || checkService('influencer',true)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/box.png" alt="희망공구아이콘" />
        </li>
        <li>희망 공구 품목</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      id="accordion-product"
      class="accordion-contents"
      :class="onProfileCard('expectProduct')"
      v-if="checkService('influencer',true)"
    >
      <div class="m-item">
        <div class="input-selectbox-wrap" id="m-itemSelect">
          <div class="select3 select-btn" id="itemselect-btn">
            <span>공구품목 선택</span>
            <i></i>
          </div>

          <div class="listContents listWrap3 long">
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

        <div class="input-text-wrap" id="m-item">
          <input type="text" placeholder="기타 공구품목 입력" maxlength="6" />
        </div>

        <div class="alert-text none">6글자 초과 입력할 수 없습니다</div>

        <div class="choice-list"></div>

        <div class="alert-text none">공구품목은 6개를 초과 선택할 수 없습니다</div>

        <div class="button-wrap">
          <button class="itemsave-btn">저장</button>
        </div>
      </div>
    </div>
    <!-- 주 활동 지역  -->
    <!-- <div
      class="accordion"
      id="accordion-hot"
      @click="onClickProfileCard('area', $event)"
      v-if="checkService('brands',true)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/location.png" alt="주활동지역아이콘" />
        </li>
        <li>주 활동 지역</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      id="accordion-place"
      :class="onProfileCard('area')"
      v-if="checkService('brands',true)"
    >
      <MapSvg class="area-map" />
      <div class="input-search-wrap">
        <input type="text" placeholder="지역검색" />
        <i></i>
      </div>

      <div class="input-selectbox-wrap">
        <div class="select select-btn" id="select-btn" @click.prevent="showSelectList">
          <span>상세지역</span>
          <i></i>
        </div>

        <div class="listContents listContents listWrap">
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
    </div>-->
    <!-- 성별 -->
    <div
      class="accordion"
      id="accordion_gender"
      @click="onClickProfileCard('gender', $event)"
      v-if="checkService('brands',true) || checkService('influencer',true) || checkService('market', true)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/men_women.png" alt="성별아이콘" />
        </li>
        <li>성별</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      :class="onProfileCard('gender')"
      v-if="checkService('brands',true) || checkService('influencer',true) || checkService('market', true)"
    >
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
    <div
      class="accordion"
      id="accordion_age"
      @click="onClickProfileCard('age', $event)"
      v-if="checkService('brands',true) || checkService('influencer',true) || checkService('market', true)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/age.png" alt="연령아이콘" />
        </li>
        <li>연령</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      :class="onProfileCard('age')"
      v-if="checkService('brands',true) || checkService('influencer',true) || checkService('market', true)"
    >
      <div class="m-age">
        <div class="input-selectbox-wrap mt" id="m_ageGeneration">
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>10대</span>
            <i></i>
          </div>

          <div class="listContents listWrap">
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
          <div class="select2 select-btn" @click.prevent="showSelectList">
            <span>초반</span>
            <i></i>
          </div>

          <div class="listContents listWrap2">
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
    <div
      class="accordion"
      id="accordion_job"
      v-if="checkService('brands',true)"
      @click="onClickProfileCard('job', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/job.png" alt="직업아이콘" />
        </li>
        <li>직업</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      id="accordion-job"
      class="accordion-contents"
      v-if="checkService('brands',true)"
      :class="onProfileCard('job')"
    >
      <div class="m-job">
        <div class="input-selectbox-wrap" id="m-jobSelect">
          <div class="select2 select-btn" id="jobselect-btn" @click.prevent="showSelectList">
            <span>직업선택</span>
            <i></i>
          </div>

          <div class="listContents listWrap2 long">
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
        <button class="jobsave-btn">저장</button>
      </div>
    </div>
    <!-- 관심사 -->
    <div
      class="accordion"
      id="accordion_like"
      v-if="checkService('brands',true)"
      @click="onClickProfileCard('interests', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/like.png" alt="관심사아이콘" />
        </li>
        <li>관심사</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      id="accordion-interests"
      class="accordion-contents"
      v-if="checkService('brands',true)"
      :class="onProfileCard('interests')"
    >
      <div class="m-like">
        <div class="input-selectbox-wrap" id="m-interestsSelect">
          <div class="select3 select-btn" id="likeselect-btn" @click.prevent="showSelectList">
            <span>관심사 선택</span>
            <i></i>
          </div>

          <div class="listContents listWrap3 long">
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
          <input type="text" placeholder="기타 관심사 입력" maxlength="6" />
        </div>

        <div class="alert-text none">6글자 초과 입력할 수 없습니다</div>

        <div class="choice-list"></div>

        <div class="alert-text none">관심사는 6개를 초과 선택할 수 없습니다</div>

        <div class="button-wrap">
          <button class="likesave-btn">저장</button>
        </div>
      </div>
    </div>
    <!-- 결혼 유무 -->
    <div
      class="accordion"
      id="accordion_marry"
      v-if="checkService('brands',true)"
      @click="onClickProfileCard('married', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/married.png" alt="결혼유무아이콘" />
        </li>
        <li>결혼 유무</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      v-if="checkService('brands',true)"
      :class="onProfileCard('married')"
    >
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
          <button class="marrysave-btn">저장</button>
        </div>
      </div>
    </div>
    <!-- 자녀 관계 -->
    <div
      class="accordion"
      id="accordion_baby"
      v-if="checkService('brands',true)"
      @click="onClickProfileCard('children', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/baby.png" alt="자녀관계아이콘" />
        </li>
        <li>자녀 관계</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      v-if="checkService('brands',true)"
      :class="onProfileCard('children')"
    >
      <div class="m_baby" id="m_children">
        <div id="m_childrenSelectedContainer" class="selected-container none"></div>

        <div id="m_childrenSelectBox" class="input-selectbox-wrap">
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>자녀 (0명)</span>
            <i></i>
          </div>

          <div class="listContents listWrap" id="m_selectChildren">
            <ul class="list">
              <li>없음</li>
              <li>1명</li>
              <li>2명</li>
              <li>3명</li>
              <li>4명 이상</li>
            </ul>
          </div>
        </div>

        <div id="m_childrenInfoWrap" class="select-container"></div>

        <button class="addBtnWrap">+</button>
      </div>
      <div class="button-wrap">
        <button class="babysave-btn">저장</button>
      </div>
    </div>
    <!-- 반려동물 -->
    <div
      class="accordion"
      id="accordion_pet"
      v-if="checkService('brands',true)"
      @click="onClickProfileCard('pet', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/pet.png" alt="반려동물아이콘" />
        </li>
        <li>반려동물</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      v-if="checkService('brands',true)"
      :class="onProfileCard('pet')"
    >
      <div class="m-pet">
        <div id="m_petSelectedContainer" class="selected-container none"></div>

        <div id="m_petSelectContainer">
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

          <div class="input-selectbox-wrap mtb0">
            <div class="selec select-btnt" @click.prevent="showSelectList">
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
          <div id="m_petSelectedContainer" class="selected-container"></div>
        </div>

        <button class="addBtnWrap">+</button>
      </div>
      <div class="button-wrap">
        <button class="petsave-btn" onclick="location.href='/welcome' ">저장</button>
      </div>
    </div>

    <!-- 바디 프로필 -->
    <div
      class="accordion"
      id="accordion_body"
      v-if="checkService('market',true) || checkService('influencer', true)"
      @click="onClickProfileCard('bodyProfile', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/body.png" alt="바디프로필아이콘" />
        </li>
        <li>바디프로필</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      v-if="checkService('market',true) || checkService('influencer', true)"
      :class="onProfileCard('bodyProfile')"
    >
      <div class="m-body">
        <div class="input-wrap">
          <input type="text" placeholder="키" maxlength="3" />
          <span>cm</span>
        </div>
        <div id="m-bodySelectbox">
          <div class="input-selectbox-wrap">
            <div class="select2 select-btn" @click.prevent="showSelectList">
              <span>상의 사이즈</span>
              <input type="text" maxlength="10" placeholder="직접입력" style="display: none;" />
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
              <input type="text" maxlength="10" placeholder="직접입력" style="display: none;" />
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
          <input type="text" maxlength="3" placeholder="운동화 사이즈" />
          <span>mm</span>
        </div>
        <div class="input-wrap">
          <input type="text" maxlength="3" placeholder="구두 사이즈" />
          <span>mm</span>
        </div>
      </div>
      <div class="button-wrap">
        <button class="bodysave-btn">저장</button>
      </div>
    </div>

    <!-- 피부 -->
    <div
      class="accordion"
      id="accordion_skin"
      v-if="checkService('market',true) || checkService('influencer', true)"
      @click="onClickProfileCard('skinType', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/skin.png" alt="피부아이콘" />
        </li>
        <li>피부</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      v-if="checkService('market',true) || checkService('influencer', true)"
      :class="onProfileCard('skinType')"
    >
      <div class="m-skin">
        <div class="input-selectbox-wrap">
          <div class="select2 select-btn" @click.prevent="showSelectList">
            <span>피부 타입</span>
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
        <div class="button-wrap">
          <button class="skinsave-btn">저장</button>
        </div>
      </div>
    </div>
    <div class="m-finished">
      <a href="#">
        <span>가입하기</span>
        <i></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MapSvg from '../MapSvg';

export default {
    name: 'mobileDetailInfo',
    data() {
        return {
            isRecommendCheck: false,
            recommendType: null,
            gender: false,
            tip: {
                title: null,
                text: null
            },
            tips: [
                {
                    title: '원고료 산정방식',
                    text:
                        '희망원고료의 최소 퍼센트 범위를 지정해주시면 고객사 매칭에 도움이 될 거에요.희망원고료의 희망원고료의 최소 퍼센트 범위를 지정해주시면 고객사 매칭에 도움이 될 거에요.'
                },
                {
                    title: '원고료 산정방식 2',
                    text:
                        '희망원고료의 최소 퍼센트 범위를 지정해주시면 고객사 매칭에 도움이 될 거에요.희망원고료의 희망원고료의 최소 퍼센트 범위를 지정해주시면 고객사 매칭에 도움이 될 거에요.'
                },
                {
                    title: '원고료 산정방식 3',
                    text:
                        '희망원고료의 최소 퍼센트 범위를 지정해주시면 고객사 매칭에 도움이 될 거에요.희망원고료의 희망원고료의 최소 퍼센트 범위를 지정해주시면 고객사 매칭에 도움이 될 거에요.'
                }
            ]
        };
    },
    components: {
        MapSvg
    },
    computed: {
        ...mapState(['service', 'profileCard', 'currentCard'])
    },
    methods: {
        checkService(serviceName, returnValue) {
            return this.service === serviceName ? returnValue : '';
        },
        onProfileCard(type) {
            return this.profileCard[type] ? 'on' : '';
        },
        onClickProfileCard(value, event) {
            for (const key in this.profileCard) {
                if (key !== value) this.profileCard[key] = false;
            }

            this.$store.commit('setCurrentCard', { currentCard: value });

            // event 있을 경우 mobile 없을 경우 desktop 화면이다.
            this.profileCard[value] = event ? !this.profileCard[value] : true;

            if (event) {
                this.closeSelectList;
                const target = event.target.closest('.accordion');
                const parent = target.closest('div#additionalInfo');
                const wrap = target.closest('.add_wrap_group');
                const accordionList = parent.querySelectorAll('.accordion');
                const index = Array.prototype.indexOf.call(
                    accordionList,
                    target
                );

                wrap.style.marginBottom = 35 * index + 'px';
                const time = setTimeout(() => {
                    parent.scrollTop = index * 55;
                    clearTimeout(time);
                }, 500);
            }
        },
        onClickRecommendCheck() {
            this.isRecommendCheck = !this.isRecommendCheck;
        },
        showTips(index) {
            if (!this.tip.title) {
                this.tip.title = this.tips[index - 1].title;
                this.tip.text = this.tips[index - 1].text;
            } else {
                this.closeTips();
            }
        },
        closeTips() {
            this.tip.title = null;
            this.tip.text = null;
        },
        showSelectList(e) {
            const selectBtn = e.target.closest('div');
            const accordion = selectBtn.closest('.accordion-contents');

            if (selectBtn.nextSibling.classList.contains('selectOn')) {
                selectBtn.nextSibling.classList.remove('selectOn');

                if (!accordion) return;

                accordion.classList.remove('height');
            } else {
                selectBtn.nextSibling.classList.add('selectOn');
                selectBtn.nextSibling.style.top =
                    selectBtn.offsetHeight - 3 + 'px';

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

                parent.querySelectorAll('.accordion-contents').forEach(el => {
                    el.classList.remove('height');
                });
            }
        }
    }
};
</script>

<style>
</style>
