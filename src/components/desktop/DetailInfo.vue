<template>
  <div class="contents">
    <div class="article" v-if="profileCard.default.on" id="defaultBlock">
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
      <button>프로필입력완료</button>
    </div>
    <!-- sns -->
    <div class="article" id="sns" v-if="profileCard.sns.on">
      <div class="header margin-bottom-0">SNS 연동</div>
      <div class="inner-contents">
        <div class="certification-list" v-if="!this.$store.state.iccMode">
          <a
            href="#"
            id="facebook"
            @click="checkCertification(0)"
            :class="isCertificationOnOff[0] ? 'on' : ''"
          ></a>
          <a
            href="#"
            id="instagram"
            @click="checkCertification(1)"
            :class="isCertificationOnOff[1] ? 'on' : ''"
          ></a>
          <a
            href="#"
            id="youtube"
            @click="checkCertification(2)"
            :class="isCertificationOnOff[2] ? 'on' : ''"
          ></a>
          <a
            href="#"
            id="naver"
            @click="checkCertification(3)"
            :class="isCertificationOnOff[3] ? 'on' : ''"
          ></a>
          <a
            href="#"
            id="twitter"
            @click="checkCertification(4)"
            :class="isCertificationOnOff[4] ? 'on' : ''"
          ></a>
        </div>
        <div class="certification-list" v-else>
          <a
            href="#"
            id="instagram"
            @click="checkCertification(1)"
            :class="isCertificationOnOff[1] ? 'on' : ''"
          ></a>
        </div>
        <a
          href="#"
          id="deskSnsSaveBtn"
          @click="snsSaveBotton()"
          :class="onSaveButton ? 'on' : '' "
        >SNS인증하기</a>
        <div class="certification-text" :class="!onSaveButton ? 'none' : ''">
          <span>인증완료 되었습니다</span>
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn" :class="onSaveButton">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" @click="joinCheck">프로필입력완료</button>
      </div>
    </div>
    <!--  pay profileCard.pay -->
    <div class="article" id="pay" v-if="profileCard.pay.on">
      <div class="header margin-bottom-0">희망 원고료</div>
      <div class="inner-contents">
        <div class="recommend-checkbox" v-if="!this.$store.state.iccMode">
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

        <div class="recommend-checkbox" v-else>
          <div class="uncheck" v-if="!isRecommendCheck" @click.prevent="onClickRecommendCheck">
            <span>ICC 추천을 받을게요</span>
            <i></i>
          </div>
          <div class="checked" v-else @click.prevent="onClickRecommendCheck">
            <i></i>
            <span>ICC 추천을 받을게요</span>
          </div>
          <i class="icon-questions-mark" @click.prevent="showTips(1)"></i>
        </div>

        <div class="title">기본 원고료</div>

        <div class="pay-input-wrap">
          <span>원고료</span>
          <div class="pay-wrap">
            <input class="pay" type="text" maxlength="4" placeholder="1000" />
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
            <input type="text" class="pay" maxlength="9" placeholder="0,000,000" />
            <span>원 이상</span>
          </div>
        </div>

        <div class="pay-input-wrap">
          <span>원고료</span>
          <div class="pay-wrap">
            <input class="pay" type="text" maxlength="4" placeholder="1000" />
            <span>만원</span>
          </div>
          <div class="percentage-wrap">
            <input class="percentage" type="text" maxlength="2" value="-10" />
            <span>%</span>
            <div class="up-down-wrap">
              <i @click="payUpPersent" class="up"></i>
              <i @click="payDownPersent" class="down"></i>
            </div>
          </div>
          <i class="icon-questions-mark" data-type="1" @click.prevent="showTips(3)"></i>
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" @click="joinCheck">프로필입력완료</button>
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
    <div class="article" v-if="profileCard.area.on" id="area">
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
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>

        <button class="join-finish-btn" @click="joinCheck">가입확인</button>
      </div>
    </div>
    <!-- gender -->
    <div class="article" id="gender" v-if="profileCard.gender.on">
      <div class="header margin-bottom-0">성별</div>

      <div class="inner-contents">
        <div class="gender-wrap radio-wrap" @click="eitherSelect('m')" :class="checkEither('m')">
          <div class="image"></div>
          <span>남성</span>
          <i></i>
        </div>
        <div class="gender-wrap radio-wrap" @click="eitherSelect('w')" :class="checkEither('w')">
          <div class="image"></div>
          <span>여성</span>
          <i></i>
        </div>
      </div>
      <div class="header margin-bottom-0">연령</div>
      <div class="inner-contents">
        <div class="input-selectbox-wrap" id="ageGeneration">
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

        <div class="input-selectbox-wrap" id="ageGroup">
          <div class="select select-btn" @click.prevent="showSelectList">
            <span>{{generationDefault}}</span>
            <i></i>
          </div>

          <div class="listContents listWrap">
            <ul class="list">
              <li @click="isText">초반</li>
              <li @click="isText">중반</li>
              <li @click="isText">후반</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" @click="joinCheck">가입확인</button>
      </div>
    </div>

    <!-- age -->
    <!-- <div class="article" id="age" v-if="profileCard.age.on">
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
          <li class="back-btn" @click="prevDetailInfo">
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
    </div>-->

    <!-- job -->
    <div class="article" id="job" v-if="profileCard.job.on">
      <div class="header margin-bottom-0">직업</div>
      <div class="inner-contents">
        <ul id="jobStatus" class="status clearfix">
          <li>
            <a href="#" @click="[statusCheck('y'), haveJob = true]" :class="checkStatus('y') ">
              <em>있음</em>
              <span></span>
            </a>
          </li>
          <li>
            <a href="#" @click="[statusCheck('n'), haveJob = false]" :class="checkStatus('n')">
              <em>없음</em>
              <span></span>
            </a>
          </li>
        </ul>
        <div class="status-selectbox-wrap clearfix" id="jobSelect" :class="!haveJob ? 'none': ''">
          <!-- <div>
            <div class="select small" @click.prevent="showSelectList">
              <span>현 직업</span>
              <i></i>
            </div>
            <div class="select select-btn" @click.prevent="showSelectList">
              <input type="text" placeholder="직업선택, 선택" />
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

            <div class="add-btn">
              <a class="plus" href="#"></a>
            </div>
          </div>-->
          <ul class="status-selectbox">
            <li class="select-box clearfix">
              <ul class="select-first">
                <li>
                  <span>현 직업</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-first">
                <li>현 직업</li>
                <li>전 직업</li>
              </ul>
            </li>
            <li class="select-box big clearfix">
              <ul class="select-second">
                <li>
                  <input type="text" placeholder="직업선택, 검색" />
                  <i></i>
                </li>
              </ul>
              <ul class="list-second">
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
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" @click="joinCheck">가입확인</button>
      </div>
    </div>

    <!-- interests -->
    <!-- <div class="article" id="interests" v-if="profileCard.interests.on">
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
          <li class="back-btn" @click="prevDetailInfo">
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
    </div>-->
    <!-- marriage -->
    <div class="article" id="married" v-if="profileCard.married.on">
      <div class="header margin-bottom-0">결혼유무</div>
      <div class="inner-contents">
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
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" @click="joinCheck">가입확인</button>
      </div>
    </div>

    <!-- children -->
    <div class="article" id="children" v-if="profileCard.children.on">
      <div class="header margin-bottom-0">자녀관계</div>
      <div class="inner-contents">
        <!-- <div id="childrenSelectedContainer" class="selected-container none"></div>
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
        <div class="inner-contents">-->
        <ul id="childStatus" class="status clearfix">
          <li>
            <a href="#" @click="[statusCheck('y'), haveJob = true]" :class="checkStatus('y') ">
              <em>있음</em>
              <span></span>
            </a>
          </li>
          <li>
            <a href="#" @click="[statusCheck('n'), haveJob = false]" :class="checkStatus('n')">
              <em>없음</em>
              <span></span>
            </a>
          </li>
        </ul>
        <div class="status-selectbox-wrap clearfix" id="childSelect" :class="!haveJob ? 'none': ''">
          <ul class="status-selectbox">
            <li class="select-box clearfix">
              <ul class="select-first">
                <li>
                  <span>연령</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-first">
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
              <ul class="select-second">
                <li>
                  <span>성별</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-second">
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

        <!-- <div id="childrenInfoWrap" class="select-container"></div>

        <button class="addBtnWrap">+</button>-->
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" @click="joinCheck">가입확인</button>
      </div>
    </div>

    <!-- Pet -->
    <div class="article" id="pet" v-if="profileCard.pet.on">
      <div class="header margin-bottom-0">반려동물</div>
      <div class="inner-contents">
        <ul id="petStatus" class="status clearfix">
          <li>
            <a href="#" @click="[statusCheck('y'), haveJob = true]" :class="checkStatus('y') ">
              <em>있음</em>
              <span></span>
            </a>
          </li>
          <li>
            <a href="#" @click="[statusCheck('n'), haveJob = false]" :class="checkStatus('n')">
              <em>없음</em>
              <span></span>
            </a>
          </li>
        </ul>
        <div class="status-selectbox-wrap clearfix" id="petSelect" :class="!haveJob ? 'none': ''">
          <ul class="status-selectbox">
            <li class="select-box clearfix">
              <ul class="select-first">
                <li>
                  <span>동물 종류</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-first">
                <li>강아지</li>
                <li>고양이</li>
                <li>햄스터</li>
                <li>기타</li>
              </ul>
            </li>
            <li class="select-box big clearfix">
              <ul class="select-second">
                <li>
                  <span>몇마리</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-second">
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
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" @click="joinCheck">가입확인</button>
      </div>
    </div>

    <!-- Product -->
    <div class="article" id="item" v-if="profileCard.expectProduct.on">
      <div class="header margin-bottom-0">희망 공구품목</div>
      <div class="inner-contents">
        <div class="input-selectbox-wrap" id="itemSelect">
          <!-- <div class="select select-btn" @click.prevent="showSelectList">
            <input type="text" placeholder="공구품목 선택, 입력" />
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
          </div>-->
          <v-select :options="options"></v-select>
        </div>

        <div class="choice-list">
          <ul>
            <li v-if="ChoiceList">
              레
              123저
            </li>
            <li v-if="ChoiceList" class="close">
              <span class="close-btn">
                <a href="#" @click="ChoicedeleteList">X</a>
              </span>
            </li>
            <li v-else @click="deleteChoiceList" class="delete">삭제</li>
          </ul>
          <ul>
            <li v-if="ChoiceList">레저</li>
            <li v-if="ChoiceList" class="close">
              <span class="close-btn">
                <a href="#" @click="ChoicedeleteList">X</a>
              </span>
            </li>
            <li v-else @click="deleteChoiceList" class="delete">삭제</li>
          </ul>
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" @click="joinCheck">가입확인</button>
      </div>
    </div>

    <!-- BodyProfile -->
    <div class="article" id="body" v-if="profileCard.bodyProfile.on">
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
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" @click="joinCheck">가입확인</button>
      </div>
    </div>
    <!-- Skin -->
    <div class="article" id="skin" v-if="profileCard.skinType.on">
      <div class="header margin-bottom-0">피부</div>
      <div class="inner-contents">
        <div id="skinSelectbox">
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
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" @click="joinCheck()">가입확인</button>
      </div>
    </div>
    <div class="article brand market" v-if="profileCard.finishBlock.on" id="finishBlock">
      <div class="title">
        000님
        <br />프로필 입력을 완료하셨습니다!
      </div>
      <img src="~@/assets/img/coin.png" alt />
      <div class="text2">
        <span>현재 6000P 적립완료</span>
        <strong>추가 2000P 적립가능</strong>
        <a href="#">추가적립하기 &gt;</a>
      </div>
      <router-link
        class="finishbtn"
        to="/"
        @click.native="pageReset() "
        :class="this.$store.state.welcome = true"
      >프로필입력완료</router-link>
    </div>
  </div>
</template>

<script>
import MapSvg from '../../components/MapSvg.vue';
import mobileDetailInfo from '../mobile/DetailInfo.vue';
import { log } from 'util';

export default {
    name: 'desktopDetailInfo',
    extends: mobileDetailInfo,
    data() {
        return {
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
            influencerList: [
                'sns',
                'pay',
                'expectProduct',
                'gender',
                'age',
                'bodyProfile',
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
            isCheck: 'undefined',
            skinDefault: '피부타입',
            ageDefault: '10대',
            generationDefault: '초반',
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
            onSaveButton: false,
            onStatusCheck: 'undefined',
            haveJob: false,
            showJobList: false,
            ChoiceList: true,
            options: [
                '가족',
                '패션',
                '출산',
                '뷰티',
                '레져',
                '책',
                '출판',
                '지역',
                '일상',
                '데일리'
            ]
        };
    },
    computed: {
        getCurrentCard() {
            return this.$store.getters.getCurrentCard;
        }
    },
    template: {
        MapSvg
    },
    methods: {
        statusCheck(value) {
            this.onStatusCheck = value;
        },
        checkStatus(el) {
            if (el.includes(this.onStatusCheck)) return 'on';
        },
        snsSaveBotton() {
            this.onSaveButton = !this.onSaveButton ? 'on' : '';
        },
        //셀렉트 메뉴
        isText(e) {
            let text = e.target.innerText;
            console.log();
            if (e.target.closest('#skin')) {
                this.skinDefault = text;
            } else if (e.target.closest('#ageGeneration')) {
                this.ageDefault = text;
            } else {
                this.generationDefault = text;
            }
        },

        //둘중 하나 선택하기
        eitherSelect(value) {
            this.isCheck = value;
        },
        checkEither(el) {
            if (el.includes(this.isCheck)) return 'checked';
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

        //sns 연동 아이콘 온오프
        checkCertification(idx) {
            this.isCertificationOnOff[idx] = !this.isCertificationOnOff[idx];
        },
        pageReset() {
            this.clearCardList();
            this.profileCard['default'].on = true;
        },
        joinCheck() {
            this.clearCardList();
            this.profileCard['finishBlock'].on = true;
        },

        saveBtn(event) {
            if (event.target.className.includes('on')) {
                this.nextDetailInfo(event);
            }
            return;
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
                currentCard: currentCard
            });
            this.profileCard[currentCard].on = true;
        },
        clearCardList() {
            for (const key in this.profileCard) {
                this.profileCard[key].on = false;
            }
        },
        payUpPersent() {},
        payDownPersent() {},
        ChoicedeleteList() {
            this.ChoiceList = false;
        },
        deleteChoiceList(e) {
            e.path[1].remove();
        }
    },
    watch: {
        getCurrentCard(newValue, oldValue) {
            let card = this.getCardList();
            this.currentIndex = card.indexOf(newValue);
            console.log(this.currentIndex);
        }
    }
};
</script>

<style>
</style>
