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
      <div class="certification-list" v-if="!this.$store.state.iccMode">
        <a href="#" id="m-facebook"></a>
        <a href="#" id="m-instagram"></a>
        <a href="#" id="m-youtube"></a>
        <a href="#" id="m-naver"></a>
        <a href="#" id="m-twitter"></a>
      </div>
      <div class="certification-list" v-else>
        <a href="#" id="m-instagram"></a>
      </div>
      <div class="SNS-btn">
        <a href="#">SNS인증하기</a>
      </div>
      <button class="SNSsave-btn on" @click="saveBtn">저장</button>
    </div>

    <!-- 희망원고료 , 희망수수료  -->
    <div class="accordion" id="accodion_pay" @click="onClickProfileCard('pay', $event)">
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/pay.png" alt="희망원고료아이콘" />
        </li>
        <li v-if="!this.$store.state.iccMode">희망원고료</li>
        <li v-else>희망수수료</li>
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
          <span v-if="!this.$store.state.iccMode">빅버드 추천을 받을게요</span>
          <span v-else>ICC 추천 받을게요</span>
          <i class="circle"></i>
        </div>
        <div class="checked" v-else @click.prevent="onClickRecommendCheck">
          <i class="check_box"></i>
          <span v-if="!this.$store.state.iccMode">빅버드 추천을 받을게요</span>
          <span v-else>ICC 추천 받을게요</span>
        </div>
        <i class="icon-questions-mark" @click.prevent="showTips(1)"></i>
      </div>
      <div class="pay-title" v-if="!this.$store.state.iccMode">기본 원고료</div>
      <div class="pay-title" v-else>보장 개런티</div>
      <div class="pay-input-wrap">
        <span v-if="!this.$store.state.iccMode">원고료</span>
        <span v-else>개런티</span>
        <div class="pay-wrap">
          <input class="pay" type="text" maxlength="4" placeholder="1000" />
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
          <input type="text" class="pay" maxlength="9" placeholder="0,000,000" />
          <span>원 이상</span>
        </div>
      </div>
      <div class="pay-input-wrap">
        <span v-if="!this.$store.state.iccMode">원고료</span>
        <span v-else>개런티</span>
        <div class="pay-wrap">
          <input class="pay" type="text" maxlength="4" placeholder="1000" />
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
        <button class="Paysave-btn on" @click="saveBtn">저장</button>
      </div>
    </div>

    <!-- 희망 공구 품목 -->
    <div
      class="accordion"
      id="accordion_item"
      v-if="checkService('brands',true) || checkService('influencer',true)"
      @click="onClickProfileCard('expectProduct', $event)"
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
      v-if="checkService('brands',true) || checkService('influencer',true)"
    >
      <div class="m-item">
        <div class="input-selectbox-wrap" id="m-itemSelect">
          <div class="select select-btn" @click.prevent="showSelectList">
            <input type="text" placeholder="공구품목 선택, 검색" />
          </div>
          <div class="listContents listWrap long">
            <ul class="list">
              <li>패션</li>
              <li>뷰티</li>
              <li>취미</li>
              <li>레저</li>
              <li>책 / 출판</li>
              <li>출산 / 육아</li>
              <li>지역</li>
              <li>일상 / 데일리</li>
            </ul>
          </div>
        </div>

        <div class="alert-text none">6글자 초과 입력할 수 없습니다</div>

        <div class="choice-list">
          <ul>
            <li>뷰티</li>
            <li class="close">
              <a href="#" class="closeImg"></a>
            </li>
            <li class="delete none">삭제</li>
          </ul>
          <ul>
            <li>뷰티</li>
            <li class="close">
              <a href="#" class="closeImg"></a>
            </li>
            <li class="delete none">삭제</li>
          </ul>
          <ul>
            <li>뷰티</li>
            <li class="close">
              <a href="#" class="closeImg"></a>
            </li>
            <li class="delete none">삭제</li>
          </ul>
          <ul>
            <li>뷰티</li>
            <li class="close">
              <a href="#" class="closeImg"></a>
            </li>
            <li class="delete none">삭제</li>
          </ul>
          <ul>
            <li>뷰티</li>
            <li class="close">
              <a href="#" class="closeImg"></a>
            </li>
            <li class="delete none">삭제</li>
          </ul>
          <ul>
            <li>뷰티</li>
            <li class="close">
              <a href="#" class="closeImg"></a>
            </li>
            <li class="delete none">삭제</li>
          </ul>
        </div>

        <div class="alert-text none">공구품목은 6개를 초과 선택할 수 없습니다</div>

        <div class="button-wrap">
          <button class="itemsave-btn on" @click="saveBtn">저장</button>
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
    <!-- 성별, 연령 -->
    <div
      id="accordion_gender"
      class="accordion"
      @click="onClickProfileCard('gender', $event)"
      v-if="checkService('brands',true) || checkService('influencer',true) || checkService('market', true)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/age_.png" alt="gender" />
        </li>
        <li>성별/연령</li>
        <li>
          <img class="arrow" src="~@/assets/img/arrow_butt.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      id="accordion-gender"
      :class="onProfileCard('gender')"
      v-if="checkService('brands',true) || checkService('influencer',true) || checkService('market', true)"
    >
      <div class="m-gender">
        <div
          class="gender-wrap gender-img radio-wrap"
          @click="eitherSelect('m')"
          :class="checkEither('m')"
        >
          <div class="image"></div>
          <span>남성</span>
          <i></i>
        </div>
        <div
          class="gender-wrap gender-img radio-wrap"
          @click="eitherSelect('w')"
          :class="checkEither('w')"
        >
          <div class="image"></div>
          <span>여성</span>
          <i></i>
        </div>
        <div class="input-selectbox-wrap" id="m-ageGeneration">
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>{{ageDefault}}</span>
            <i></i>
          </div>

          <div class="listContents listWrap">
            <ul class="list">
              <li @click="isText">10대</li>
              <li @click="isText">20대</li>
              <li @click="isText">30대</li>
              <li @click="isText">40대</li>
              <li @click="isText">50대</li>
              <li @click="isText">60대 이상</li>
            </ul>
          </div>
        </div>

        <div class="input-selectbox-wrap" id="m-ageGroup">
          <div class="select2 select-btn" @click.prevent="showSelectList">
            <span>{{generationDefault}}</span>
            <i></i>
          </div>

          <div class="listContents listWrap2">
            <ul class="list">
              <li @click="isText">초반</li>
              <li @click="isText">중반</li>
              <li @click="isText">후반</li>
            </ul>
          </div>
        </div>
        <div class="button-wrap">
          <button class="gendersave-btn on" @click="saveBtn">저장</button>
        </div>
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
        <ul id="m-jobStatus" class="status clearfix">
          <li>
            <a
              href="#"
              @click="[statusCheck('y','job'), haveJob = true]"
              :class="checkStatus('y','job') "
            >
              <em>있음</em>
              <span></span>
            </a>
          </li>
          <li>
            <a
              href="#"
              @click="[statusCheck('n','job'), haveJob = false]"
              :class="checkStatus('n','job')"
            >
              <em>없음</em>
              <span></span>
            </a>
          </li>
        </ul>
        <div class="status-selectbox-wrap clearfix" id="m-jobSelect" :class="!haveJob ? 'none': ''">
          <ul class="status-selectbox">
            <li class="select-box clearfix">
              <ul class="select-first select-btn" @click.prevent="showSelectList2">
                <li>
                  <span>현 직업</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-first listContents">
                <li v-if="!selectText">현 직업</li>
                <li v-else>전 직업</li>
              </ul>
            </li>
            <li class="select-box big clearfix">
              <ul class="select-second select-btn" @click.prevent="showSelectList2">
                <li>
                  <input type="text" placeholder="직업선택, 검색" />
                </li>
              </ul>
              <ul class="list-second listContents">
                <li>모델</li>
                <li>프리랜서</li>
                <li>마케터</li>
                <li>주부</li>
                <li>유튜브 크리에이터</li>
                <li>디자이너</li>
                <li>포토그래퍼</li>
                <li>여행작가</li>
                <li>개발자</li>
              </ul>
            </li>
            <li class="status-btn clearfix">
              <ul>
                <li class="status-add">
                  <a href="#">+</a>
                </li>
                <li class="status-remove none">
                  <a href="#">-</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="button-wrap">
        <button class="jobsave-btn on" @click="saveBtn">저장</button>
      </div>
    </div>
    <!-- 관심사 -->
    <!-- <div
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
          <button class="likesave-btn on" @click="saveBtn">저장</button>
        </div>
      </div>
    </div>-->
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
        <div class="marriage-wrap radio-wrap" @click="eitherSelect('y')" :class="checkEither('y')">
          <div class="image"></div>
          <span>기혼</span>
          <i></i>
        </div>
        <div class="marriage-wrap radio-wrap" @click="eitherSelect('n')" :class="checkEither('n')">
          <div class="image"></div>
          <span>미혼</span>
          <i></i>
        </div>
        <div class="button-wrap">
          <button class="marrysave-btn on" @click="saveBtn">저장</button>
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
      id="accordion-baby"
      class="accordion-contents"
      v-if="checkService('brands',true)"
      :class="onProfileCard('children')"
    >
      <div class="m-baby" id="m-children">
        <ul id="m-childStatus" class="status clearfix">
          <li>
            <a
              href="#"
              @click="[statusCheck('y','child'), haveChild = true]"
              :class="checkStatus('y','child') "
            >
              <em>있음</em>
              <span></span>
            </a>
          </li>
          <li>
            <a
              href="#"
              @click="[statusCheck('n','child'), haveChild = false]"
              :class="checkStatus('n','child')"
            >
              <em>없음</em>
              <span></span>
            </a>
          </li>
        </ul>
        <div
          class="status-selectbox-wrap clearfix"
          id="childSelect"
          :class="!haveChild ? 'none': ''"
        >
          <ul class="status-selectbox">
            <li class="select-box clearfix">
              <ul class="select-first select-btn" @click.prevent="showSelectList2">
                <li>
                  <span>연령</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-first listContents">
                <li>0~1세</li>
                <li>2~3세</li>
                <li>4~5세</li>
                <li>6~7세</li>
                <li>초등학생</li>
                <li>중학생</li>
                <li>고등학생</li>
                <li>20대</li>
                <li>30대</li>
                <li>40대</li>
              </ul>
            </li>
            <li class="select-box big clearfix">
              <ul class="select-second select-btn" @click.prevent="showSelectList2">
                <li>
                  <span>성별</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-second listContents">
                <li>남자</li>
                <li>여자</li>
              </ul>
            </li>
            <li class="status-btn clearfix">
              <ul>
                <li class="status-add">
                  <a href="#">+</a>
                </li>
                <li class="status-remove none">
                  <a href="#"></a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="button-wrap">
        <button class="babysave-btn on" @click="saveBtn">저장</button>
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
      id="accordion-pet"
      class="accordion-contents"
      v-if="checkService('brands',true)"
      :class="onProfileCard('pet')"
    >
      <div class="m-pet">
        <ul id="m-petStatus" class="status clearfix">
          <li>
            <a
              href="#"
              @click="[statusCheck('y','pet'), havePet = true]"
              :class="checkStatus('y','pet') "
            >
              <em>있음</em>
              <span></span>
            </a>
          </li>
          <li>
            <a
              href="#"
              @click="[statusCheck('n','pet'), havePet = false]"
              :class="checkStatus('n','pet')"
            >
              <em>없음</em>
              <span></span>
            </a>
          </li>
        </ul>
        <div class="status-selectbox-wrap clearfix" id="petSelect" :class="!havePet ? 'none': ''">
          <ul class="status-selectbox">
            <li class="select-box clearfix">
              <ul class="select-first select-btn" @click.prevent="showSelectList2">
                <li>
                  <span>동물종류</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-first listContents">
                <li>강아지</li>
                <li>고양이</li>
                <li>햄스터</li>
                <li>기타</li>
              </ul>
            </li>
            <li class="select-box big clearfix">
              <ul class="select-second select-btn" @click.prevent="showSelectList2">
                <li>
                  <span>몇마리</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-second listContents">
                <li>1마리</li>
                <li>2마리</li>
                <li>3마리</li>
                <li>4마리 이상</li>
              </ul>
            </li>
            <li class="status-btn clearfix">
              <ul>
                <li class="status-add">
                  <a href="#">+</a>
                </li>
                <li class="status-remove none">
                  <a href="#">-</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="button-wrap">
        <button class="petsave-btn on" @click="saveBtn">저장</button>
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
        <button class="bodysave-btn on" @click="saveBtn">저장</button>
      </div>
    </div>

    <!-- 피부 -->
    <div class="accordion" id="accordion_skin" @click="onClickProfileCard('skinType', $event)">
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
    <div class="accordion-contents" :class="onProfileCard('skinType')">
      <div class="m-skin">
        <div class="input-selectbox-wrap">
          <div class="select2 select-btn" @click.prevent="showSelectList">
            <span>{{skinDefault}}</span>
            <i></i>
          </div>

          <div class="listContents listWrap2 long">
            <ul class="list">
              <li @click="isText">건성</li>
              <li @click="isText">중성</li>
              <li @click="isText">지성</li>
              <li @click="isText">복합성</li>
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
              <li @click="checkSelect(0)" :class="isSkinOnOff[0] ? 'checked' : ''">해당없음</li>
              <li @click="checkSelect(1)" :class="isSkinOnOff[1] ? 'checked' : ''">아토피</li>
              <li @click="checkSelect(2)" :class="isSkinOnOff[2] ? 'checked' : ''">여드름</li>
              <li @click="checkSelect(3)" :class="isSkinOnOff[3] ? 'checked' : ''">민감성</li>
            </ul>
          </div>
        </div>
        <div class="button-wrap">
          <button class="skinsave-btn on" @click="saveBtn">저장</button>
        </div>
      </div>
    </div>
    <div class="m-finished">
      <a href="#">
        <span>프로필입력완료</span>
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
            basicValue: '-10',
            comboValue: '-10',
            isSkinOnOff: {
                0: false,
                1: false,
                2: false,
                3: false
            },
            isCertificationOnOff: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false,
                5: false
            },
            selectText: false,
            haveJob: false,
            haveChild: false,
            havePet: false,
            skinDefault: '피부타입',
            ageDefault: '10대',
            generationDefault: '초반',
            onStatusCheck: {
                job: null,
                child: null,
                pet: null
            },
            isCheck: undefined,
            // brandsList: [
            //     'sns',
            //     'pay',
            //     'area',
            //     'gender',
            //     'age',
            //     'job',
            //     'interests',
            //     'married',
            //     'children',
            //     'pet'
            // ],
            // influencerList: [
            //     'sns',
            //     'pay',
            //     'expectProduct',
            //     'gender',
            //     'age',
            //     'bodyProfile',
            //     'skinType'
            // ],
            influencerList: [
                'sns',
                'pay',
                'expectProduct',
                'gender',
                'job',
                'married',
                'children',
                'pet',
                'skinType'
            ],
            brandsList: [
                'sns',
                'pay',
                'expectProduct',
                'gender',
                'job',
                'married',
                'children',
                'pet',
                'skinType'
            ],
            marketList: ['sns', 'gender', 'age', 'bodyProfile', 'skinType'],

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
        ...mapState(['service', 'profileCard', 'currentCard']),
        ...mapGetters({
            currentIndex: 'getCurrentIndex'
        })
    },
    methods: {
        //희망수수료 개런티 카운트
        payUpPersent(type) {
            console.log(type);
            if (type === 'basicsUp' && this.basicValue > -40) {
                this.basicValue = this.basicValue - 5;
            } else if (type === 'comboUp' && this.comboValue > -40) {
                this.comboValue = this.comboValue - 5;
            }
        },
        payDownPersent(type) {
            console.log(type);
            if (type === 'basicsDown' && this.basicValue < -10) {
                this.basicValue = this.basicValue + 5;
            } else if (type === 'comboDown' && this.comboValue < -10) {
                this.comboValue = this.comboValue + 5;
            }
        },
        //셀렉트 선택 피부,연령
        isText(e) {
            let text = e.target.innerText;
            console.log();
            if (e.target.closest('#skin, .m-skin')) {
                this.skinDefault = text;
            } else if (e.target.closest('#ageGeneration, #m-ageGeneration')) {
                this.ageDefault = text;
            } else {
                this.generationDefault = text;
            }
        },

        //피부고민 중복선택,온오프
        checkSelect(idx) {
            if (idx === 0) {
                for (const keys in this.isSkinOnOff) {
                    console.log(keys);
                    this.isSkinOnOff[keys] = false;
                }
            } else {
                this.isSkinOnOff[0] = false;
            }

            this.isSkinOnOff[idx] = !this.isSkinOnOff[idx];
        },
        //직업
        statusCheck(value, type) {
            this.onStatusCheck[type] = value;
            console.log(this.onStatusCheck[type]);
        },
        checkStatus(el, type) {
            if (el.includes(this.onStatusCheck[type])) return 'on';
        },
        //성별,연령
        eitherSelect(value) {
            this.isCheck = value;
            this.profileCard.gender.onSaveButton == true;
        },
        checkEither(el) {
            if (el.includes(this.isCheck)) return 'checked';
        },
        checkService(serviceName, returnValue) {
            return this.service === serviceName ? returnValue : '';
        },
        onProfileCard(type) {
            return this.profileCard[type].on ? 'on' : '';
        },
        onClickProfileCard(value, event) {
            for (const key in this.profileCard) {
                if (key !== value) this.profileCard[key].on = false;
            }

            this.$store.commit('setCurrentCard', { currentCard: value });

            // event 있을 경우 mobile 없을 경우 desktop 화면이다.
            this.profileCard[value].on = event
                ? !this.profileCard[value].on
                : true;

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
                parent.scrollTop = index * 58;
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
        showSelectList2(e) {
            const selectBtn = e.target.closest('ul');
            const accordion = selectBtn.closest('.accordion-contents');

            this.showSelectList(e);
            if (selectBtn.classList.contains('select-first')) {
                accordion
                    .querySelector('.list-second')
                    .classList.remove('selectOn');
            } else {
                accordion
                    .querySelector('.list-first')
                    .classList.remove('selectOn');
            }
        },
        showSelectList(e) {
            const selectBtn = e.target.closest('div, ul');
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
        },
        getCardList() {
            let card = this.brandsList;

            if (this.service === 'influencer') {
                card = this.influencerList;
            } else if (this.service === 'market') {
                card = this.marketList;
            }
            return card;
        },
        prevDetailInfo(event) {
            this.changeDetailInfo('prev');
        },
        nextDetailInfo(event) {
            this.changeDetailInfo('next');
        },
        changeDetailInfo(type) {
            let card = this.getCardList();
            if (this.currentIndex === 0 && type === 'prev') return;
            if (this.currentIndex === card.length - 1 && type === 'next')
                return;

            this.clearCardList();

            let currentCard;
            if (type === 'prev') {
                currentCard = card[this.currentIndex - 1];
            } else {
                currentCard = card[this.currentIndex + 1];
            }

            this.$store.commit('setCurrentCard', {
                currentCard
            });
            this.profileCard[currentCard].on = true;
        },
        saveBtn(event) {
            if (event.target.className.includes('on')) {
                if (this.currentCard === 'sns') {
                    this.profileCard.sns.save = true;
                } else if (this.currentCard === 'pay') {
                    this.profileCard.pay.save = true;
                } else if (this.currentCard === 'expectProduct') {
                    this.profileCard.expectProduct.save = true;
                } else if (this.currentCard === 'gender') {
                    this.profileCard.gender.save = true;
                } else if (this.currentCard === 'job') {
                    this.profileCard.job.save = true;
                } else if (this.currentCard === 'married') {
                    this.profileCard.married.save = true;
                } else if (this.currentCard === 'children') {
                    this.profileCard.children.save = true;
                } else if (this.currentCard === 'pet') {
                    this.profileCard.pet.save = true;
                } else if (this.currentCard === 'skinType') {
                    this.profileCard.skinType.save = true;
                }
                this.nextDetailInfo(event);
            }
            return;
        },
        clearCardList() {
            for (const key in this.profileCard) {
                this.profileCard[key].on = false;
            }
        }
    },
    watch: {
        getCurrentCard(newValue, oldValue) {
            let card = this.getCardList();
            let currentIndex = card.indexOf(newValue);
            this.$store.commit('setCurrentIndex', {
                currentIndex
            });
        }
    }
};
</script>

<style>
</style>
