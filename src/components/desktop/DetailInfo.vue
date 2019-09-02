<template>
  <div class="contents">
    <div class="article callkakao" v-if="profileCard.default.on" id="defaultBlock">
      <div class="top">
        <div class="title">문의</div>
        <img src="~@/assets/img/login_ask_kakao icon.png" alt="카카오 문의">
        <input type="button" class="input-button" value="카카오톡 상담하기" @click="kakaoCounseling">
      </div>
      <div class="middle">
        <a href="#" class="tel">Tel. 1661 - 6213</a>
        <div class="text">
            평일:10:00 ~ 18:30 <br> off-time: 12:30 ~ 13:30 <br> (공휴일 휴무)
        </div>
      </div>
    </div>
    <!-- SNS연동 -->
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
            v-if="instagramImg"
          ></a>
          <a
            href="#"
            id="instagram"
            :class="isCertificationOnOff[1] ? 'on' : ''"
            v-else
            style="cursor: default;"
          ></a>
          <a
            href="#"
            id="youtube"
            @click="checkCertification(2)"
            :class="isCertificationOnOff[2] ? 'on' : ''"
            v-if="youtubeImg"
          ></a>
          <a
            href="#"
            id="youtube"
            :class="isCertificationOnOff[2] ? 'on' : ''"
            v-else
            style="cursor: default;"
          ></a>
          <a
            href="#"
            id="naver"
            @click="checkCertification(3)"
            :class="isCertificationOnOff[3] ? 'on' : ''"
            v-if="naverImg"
          ></a>
          <a
            href="#"
            id="naver"
            :class="isCertificationOnOff[3] ? 'on' : ''"
            v-else
            style="cursor: default;"
          ></a>
        </div>
        <a
          href="#"
          id="deskSnsSaveBtn"
          v-if="snsDefaultCertBtn"
        >SNS인증하기</a>
        <a
          href="#"
          id="deskSnsSaveBtn"
          :class="isCertificationOnOff[1] || isCertificationOnOff[2] || isCertificationOnOff[3] ? 'on' : ''"
          @click="snsSaveBotton()"
          v-if="snsCertBtn"
        >SNS인증하기</a>
        <a
          href="#"
          id="deskSnsSaveBtn"
          v-if="snsCertSuccessBtn"
        >SNS인증완료</a>
        <div class="certification-text">
          <span class="possible-text" v-if="instagramWaitText">인증 대기중 입니다</span>
          <span class="possible-text" v-if="instagramPossibleText">인증완료 되었습니다</span>
          <span class="wrong-text" v-if="instagramWrongText">인증실패 되었습니다</span>
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn" :class="this.profileCard.sns.onSaveButton ? 'on':''">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
      </div>
    </div>
    <!--  pay profileCard.pay -->
    <div class="article" id="pay" v-if="profileCard.pay.on">
      <div
        v-if="checkService('brands',true) && !this.$store.state.iccMode"
        class="header margin-bottom-0"
      >희망 원고료</div>
      <div v-else class="header margin-bottom-0">희망 수수료</div>
      <div class="inner-contents">
        <div class="recommend-checkbox" v-if="!this.$store.state.iccMode">
          <div class="uncheck" v-if="!isRecommendCheck" @click.prevent="onClickRecommendCheck">
            <span>빅버드 추천을 받을게요</span>
            <i></i>
          </div>
          <div class="checked" v-else @click.prevent="onClickRecommendCheck">
            <span>빅버드 추천을 받을게요</span>
            <i></i>
            
          </div>
        </div>

        <div class="recommend-checkbox" v-else>
          <div class="checked" v-if="isRecommendCheck" @click.prevent="onClickRecommendCheck">
            <span>ICC 추천을 받을게요</span>
            <i></i>
          </div>
          <div class="uncheck" v-else @click.prevent="onClickRecommendCheck">
            <span>ICC 추천을 받을게요</span>
            <i></i>
          </div>

          <!-- <i class="icon-questions-mark" @click.prevent="showTips(1)"></i> -->
        </div>

        <div class="title" v-if="checkService('brands',true) && !this.$store.state.iccMode">기본 원고료</div>
        <div class="title" v-else>보장 개런티</div>

        <div class="pay-input-wrap">
          <span v-if="checkService('brands',true) && !this.$store.state.iccMode">원고료</span>
          <span v-else>개런티</span>
          <div class="pay-wrap">
            <input class="pay" type="number" placeholder="0" v-model="defaultFeeInput" @keyup="inNumberAndMakeNotSave" @input="maxLengthCheckDefaultFee" />
            <span>만원</span>
          </div>
          <div class="percentage-wrap">
            <input class="percentage" type="text" v-model="basicValue" disabled />
            <span>%</span>
            <div class="up-down-wrap">
              <i class="up" @click="payUpPersent('basicsUp')"></i>
              <i class="down" @click="payDownPersent('basicsDown')"></i>
            </div>
          </div>
          <i class="icon-questions-mark" data-type="0" @click.prevent="showTips(1)"></i>
        </div>

        <div class="title margin-top-58">협찬제품이 있을 경우</div>

        <div class="product-input-wrap">
          <span>제품가</span>
          <div class="product-wrap">
            <input type="number" class="pay" placeholder="0" v-model="productPriceInput" @keyup="inNumberAndMakeNotSave" @focus="makeNotSave" @input="maxLengthCheckProductPrice" />
            <span>원 이상</span>
          </div>
        </div>

        <div class="pay-input-wrap">
          <span v-if="checkService('brands',true) && !this.$store.state.iccMode">원고료</span>
          <span v-else>개런티</span>
          <div class="pay-wrap">
            <input class="pay" type="number" placeholder="0" v-model="productFeeInput" @keyup="inNumberAndMakeNotSave" @focus="makeNotSave" @input="maxLengthCheckProductFee" />
            <span>만원</span>
          </div>
          <div class="percentage-wrap">
            <input class="percentage" type="text" v-model="comboValue" disabled />
            <span>%</span>
            <div class="up-down-wrap">
              <i class="up" @click="payUpPersent('comboUp')"></i>
              <i class="down" @click="payDownPersent('comboDown')"></i>
            </div>
          </div>
          <i class="icon-questions-mark" data-type="1" @click.prevent="showTips(2)"></i>
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li class="save-btn" @click="saveBtn" :class="this.profileCard.pay.onSaveButton ? 'on' : ''"
          >저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
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
          <div class="select select-btn" @click.prevent="showSelectList2">
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

        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
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
          <div class="select select-btn select-first" @click.prevent="showGenderSelectList">
            <span>{{ageDefault}}</span>
            <i class="icon"></i>
          </div>

          <div class="listContents listWrap list-first age-top">
            <ul class="list">
              <li v-for="(item,index) in ageList" @click="isText($event,index)" :key="index">{{item.age}}</li>
            </ul>
          </div>
        </div>

        <div class="input-selectbox-wrap" id="ageGroup">
          <div class="select select-btn select-second" @click.prevent="showGenderSelectList">
            <span>{{generationDefault}}</span>
            <i class="icon"></i>
          </div>

          <div class="listContents listWrap list-second age-top2">
            <ul class="list">
              <li v-for="(item,index) in ageGroupList" @click="isText($event,index)" :key="index">{{item.ageGroup}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li
            class="save-btn"
            @click="saveBtn"
            :class="(checkEither('m') || checkEither('w')) && ageChoice && ageGroupChoice ? 'on':''"
          >저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
      </div>
    </div>

    <!-- age -->
    <!-- <div class="article" id="age" v-if="profileCard.age.on">
      <div class="header margin-bottom-0">연령</div>
      <div class="inner-contents">
        <div class="input-selectbox-wrap" id="ageGeneration">
          <div class="select select-btn" @click.prevent="showSelectList2">
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
          <div class="select select-btn" @click.prevent="showSelectList2">
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
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
      </div>
    </div>-->

    <!-- job -->
    <div class="article" id="job" v-if="profileCard.job.on">
      <div class="header margin-bottom-0">직업</div>
      <div class="inner-contents">
        <ul id="jobStatus" class="status clearfix">
          <li>
            <a
              href="#"
              @click="[statusCheck('y','job'), haveJob = true]"
              :class="checkStatus('y','job')"
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
        <div class="status-selectbox-wrap clearfix" id="jobSelect" :class="!haveJob ? 'none': ''">
          <ul class="status-selectbox">
            <li class="select-box clearfix" id="jobTense">
              <ul class="select-first select-btn" @click.prevent="showSelectList2">
                <li>
                  <span>{{jobDefault}}</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-first listContents">
                <li @click="isText($event)" v-if="jobDefault == '전 직업'">현 직업</li>
                <li @click="isText($event)" v-if="jobDefault == '현 직업'">전 직업</li>
              </ul>
            </li>
            <li class="select-box big clearfix" id="jobSearchSelect">
              <ul class="select-second select-btn" @click.prevent="showSelectList2">
                <li>
                  <input type="text" placeholder="직업선택, 검색" v-model="jobSearchDefault" @keyup="jobSearch" />
                  <i></i>
                </li>
              </ul>
              <ul class="list-second listContents">
                <li v-for="(list,index) in jobList" :key="index" @click="isText($event,index)">{{list.name}}</li>
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
          <li class="save-btn" @click="saveBtn" 
          :class="checkStatus('n','job') || (checkStatus('y','job') && jobTenseChoice && jobSearchChoice) ? 'on':''">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
      </div>
    </div>

    <!-- interests -->
    <div class="article" id="interests" v-if="profileCard.interests.on">
      <div class="header margin-bottom-0">관심사</div>      
      <div class="inner-contents">
        <div class="input-selectbox-wrap" id="interestsSelect">
          <div class="select select-btn" @click.prevent="showSelectList">
            <input type="text" placeholder="공구품목 선택, 검색" v-model="purchaseList" @keyup="purchaseInput" />
          </div>
          <div class="listContents listWrap long like-top">
            <ul class="list">
              <li v-for="(list,index) in groupPurchaseList" :key="index">{{list.name}}</li>
            </ul>
          </div>
          <!-- <v-select placeholder="선택해주세요" :options="item" @input="myAction"></v-select> -->
        </div>
        <div class="alert-text" v-if="purchaseInputText">공백 포함 8글자를 초과할 수 없습니다</div>
        <div class="choice-list">
          <ul v-for="list in 6" :key="list">
            <li>뷰티</li>
            <li class="close">
              <a href="#" class="closeImg"></a>
            </li>
            <li class="delete none">삭제</li>
          </ul>
        </div>
        <div class="alert-text none">공구품목은 6개를 초과 선택할 수 없습니다</div>
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
        <button class="join-finish-btn">프로필 입력완료</button>
      </div>
    </div>
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
          <li class="save-btn" @click="saveBtn" :class="checkEither('y') || checkEither('n') ? 'on':''">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
      </div>
    </div>

    <!-- children -->
    <div class="article" id="children" v-if="profileCard.children.on">
      <div class="header margin-bottom-0">자녀관계</div>
      <div class="inner-contents">
        <!-- <div id="childrenSelectedContainer" class="selected-container none"></div>
        <div id="childrenSelectBox" class="input-selectbox-wrap">
          <div class="select select-btn" @click.prevent="showSelectList2">
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
            <a
              href="#"
              @click="[statusCheck('y','child'), haveChild = true]"
              :class="checkStatus('y','child')"
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
            <li class="select-box clearfix" id="childAge">
              <ul class="select-first select-btn" @click.prevent="showSelectList2">
                <li>
                  <span>{{childAgeDefault}}</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-first listContents">
                <li v-for="(item,index) in childrenAgeList" @click="isText($event,index)" :key="index">{{item.age}}</li>
              </ul>
            </li>
            <li class="select-box big clearfix" id="childGender">
              <ul class="select-second select-btn" @click.prevent="showSelectList2">
                <li>
                  <span>{{childGenderDefault}}</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-second listContents">
                <li @click="isText($event)">남자</li>
                <li @click="isText($event)">여자</li>
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
          <li class="save-btn" @click="saveBtn" 
          :class="checkStatus('n','child') || (checkStatus('y','child') && childrenAgeChoice && childrenGenderChoice !== null) ? 'on':''">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
      </div>
    </div>

    <!-- Pet -->
    <div class="article" id="pet" v-if="profileCard.pet.on">
      <div class="header margin-bottom-0">반려동물</div>
      <div class="inner-contents">
        <ul id="petStatus" class="status clearfix">
          <li>
            <a
              href="#"
              @click="[statusCheck('y','pet'), havePet = true]"
              :class="checkStatus('y','pet')"
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
            <li class="select-box clearfix" id="petType">
              <ul class="select-first select-btn" @click.prevent="showSelectList2">
                <li>
                  <span>{{petTypeDefault}}</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-first listContents">
                <li v-for="(item,index) in petList" @click="isText($event,index)" :key="index">{{item.typeName}}</li>
              </ul>
            </li>
            <li class="select-box big clearfix" id="petDigit">
              <ul class="select-second select-btn" @click.prevent="showSelectList2">
                <li>
                  <span>{{petDigitDefault}}</span>
                  <i></i>
                </li>
              </ul>
              <ul class="list-second listContents">
                <li @click="isText($event)">1마리</li>
                <li @click="isText($event)">2마리</li>
                <li @click="isText($event)">3마리</li>
                <li @click="isText($event)">4마리 이상</li>
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
          <li class="save-btn" @click="saveBtn" 
          :class="checkStatus('n','pet') || (checkStatus('y','pet') && petTypeChoice && petNumChoice) ? 'on':''">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
      </div>
    </div>

    <!-- Product -->
    <div class="article" id="item" v-if="profileCard.expectProduct.on">
      <div class="header margin-bottom-0">희망 공구품목</div>
      <div class="inner-contents">
        <div class="input-selectbox-wrap" id="itemSelect">
          <div class="select select-btn" @click.prevent="showSelectList">
            <input type="text" placeholder="공구품목 선택, 검색" v-model="purchaseList" @keyup="purchaseInput" />
          </div>
          <div class="listContents listWrap long item-top">
            <ul class="list">
              <li v-for="(list,index) in groupPurchaseList" :key="index">{{list.name}}</li>
            </ul>
          </div>
          <!-- <v-select placeholder="선택해주세요" :options="item" @input="myAction"></v-select> -->
        </div>
        <div class="alert-text" v-if="purchaseInputText">공백 포함 8글자를 초과할 수 없습니다</div>
        <div class="choice-list">
          <ul v-for="list in 6" :key="list">
            <li>뷰티</li>
            <li class="close">
              <a href="#" class="closeImg"></a>
            </li>
            <li class="delete none">삭제</li>
          </ul>
        </div>
        <div class="alert-text none">공구품목은 6개를 초과 선택할 수 없습니다</div>
      </div>
      <div class="button-wrap">
        <ul>
          <li class="back-btn" @click="prevDetailInfo">
            <i></i>뒤로가기
          </li>
          <li
            class="save-btn"
            @click="saveBtn"
            :class="this.profileCard.expectProduct.onSaveButton ? 'on':''"
          >저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
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
            <div class="select2 select-btn" @click.prevent="showSelectList2">
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
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
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

            <div class="listContents listWrap2 long skin-top">
              <ul class="list">
                <li v-for="(item,index) in skinList" @click="isText($event,index)" :key="index">{{item.type}}</li>
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
          <li class="save-btn" @click="saveBtn" :class="skinChoice && (isSkinOnOff[0]||isSkinOnOff[1]||isSkinOnOff[2]||isSkinOnOff[3]) ? 'on':''">저장하기</li>
          <li class="next-btn" @click="nextDetailInfo">
            건너뛰기
            <i></i>
          </li>
        </ul>
        <button class="join-finish-btn" v-if="joinDisableBtn">프로필 입력완료</button>
        <button class="join-finish-btn finish-button" @click="joinCheck()" v-if="joinFinishBtn">프로필 입력완료</button>
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
      >프로필 입력완료</router-link>
    </div>
  </div>
</template>

<script>
import MapSvg from '../../components/MapSvg.vue';
import mobileDetailInfo from '../mobile/DetailInfo.vue';
import { log } from 'util';
import { async } from 'q';

export default {
    name: 'desktopDetailInfo',
    extends: mobileDetailInfo,

    data() {
        return {
            snsOnSaveButton: false,
            payOnSaveButton: false,
            itemOnSaveButton: false,
            onStatusCheck: {
                job: null,
                child: null,
                pet: null
            },
            haveJob: false,
            haveChild: false,
            havePet: false,
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
        myAction(selectKey) {
            console.log(selectKey);
            this.keyPush = selectKey;
        },
        checkStatus(el, type) {
            if (el.includes(this.onStatusCheck[type])) return 'on';
        },
        itemOnSave(event) {
            this.profileCard.expectProduct.onSaveButton = true;
            console.log(event.target);
        },
        pageReset() {
            this.clearCardList();
            this.profileCard['default'].on = true;
        },
    }
};
</script>

<style>
</style>