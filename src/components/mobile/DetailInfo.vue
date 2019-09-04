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
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
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
        <a
            href="#"
            id="m-instagram"
            @click="checkCertification(1)"
            :class="isCertificationOnOff[1] ? 'on' : ''"
            v-if="instagramImg"
          ></a>
          <a
            href="#"
            id="m-instagram"
            :class="isCertificationOnOff[1] ? 'on' : ''"
            v-else
            style="cursor: default;"
          ></a>
          <!-- <a
            href="#"
            id="m-youtube"
            @click="checkCertification(2)"
            :class="isCertificationOnOff[2] ? 'on' : ''"
            v-if="youtubeImg"
          ></a>
          <a
            href="#"
            id="m-youtube"
            :class="isCertificationOnOff[2] ? 'on' : ''"
            v-else
            style="cursor: default;"
          ></a>
          <a
            href="#"
            id="m-naver"
            @click="checkCertification(3)"
            :class="isCertificationOnOff[3] ? 'on' : ''"
            v-if="naverImg"
          ></a>
          <a
            href="#"
            id="m-naver"
            :class="isCertificationOnOff[3] ? 'on' : ''"
            v-else
            style="cursor: default;"
          ></a> -->
      </div>
      <div class="SNS-btn-default" v-if="snsDefaultCertBtn">
        <a href="#">SNS인증하기</a>
      </div>
      <div class="SNS-btn" v-if="snsCertBtn" :class="isCertificationOnOff[1] || isCertificationOnOff[2] || isCertificationOnOff[3] ? 'on' : ''">
        <a href="#" @click="snsSaveBotton()">SNS인증하기</a>
      </div>
      <div class="SNS-btn-default" v-if="snsCertSuccessBtn">
        <a href="#">SNS인증완료</a>
      </div>
      <div class="certification-text">
        <span class="possible-text" v-if="snsWaitText">인증 대기중 입니다</span>
        <span class="possible-text" v-if="snsPossibleText">인증완료 되었습니다</span>
        <span class="wrong-text" v-if="snsWrongText">인증실패 되었습니다</span>
      </div>
      <button class="SNSsave-btn" :class="this.profileCard.sns.onSaveButton ? 'on':''" @click="saveBtn">저장</button>
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
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      :class="onProfileCard('pay')"
      v-if="checkService('brands',true) || checkService('influencer',true)"
    >
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
        <div class="checked" v-if="!isRecommendCheck" @click.prevent="onClickRecommendCheck">
          <span>ICC 추천을 받을게요</span>
          <i></i>
        </div>
        <div class="uncheck" v-else @click.prevent="onClickRecommendCheck">
          <span>ICC 추천을 받을게요</span>
          <i></i>
        </div>

        <!-- <i class="icon-questions-mark" @click.prevent="showTips(1)"></i> -->
      </div>
      <div class="pay-title" v-if="!this.$store.state.iccMode">기본 원고료</div>
      <div class="pay-title" v-else>보장 개런티</div>
      <div class="pay-input-wrap">
        <span v-if="!this.$store.state.iccMode">원고료</span>
        <span v-else>개런티</span>
        <div class="pay-wrap">
          <input class="pay" type="number" placeholder="0" v-model="defaultFeeInput" @keyup="inNumberAndMakeNotSave" @input="maxLengthCheckDefaultFee" />
          <span>만원</span>
        </div>
        <select class="percentage-select" id="defaultFee-selectBox">
          <option value="-10">- 10 %</option>
          <option value="-20">- 20 %</option>
          <option value="-30">- 30 %</option>
        </select>
        <i class="icon-questions-mark" data-type="0" @click.prevent="showTips(1)"></i>
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
          <input type="number" class="pay" placeholder="0" v-model="productPriceInput" @keyup="inNumberAndMakeNotSave" @focus="makeNotSave" @input="maxLengthCheckProductPrice" />
          <span>원 이상</span>
        </div>
      </div>
      <div class="pay-input-wrap">
        <span v-if="!this.$store.state.iccMode">원고료</span>
        <span v-else>개런티</span>
        <div class="pay-wrap">
          <input class="pay" type="number" placeholder="0" v-model="productFeeInput" @keyup="inNumberAndMakeNotSave" @focus="makeNotSave" @input="maxLengthCheckProductFee" />
          <span>만원</span>
        </div>
        <select class="percentage-select" id="productFee-selectBox">
          <option value="-10">- 10 %</option>
          <option value="-20">- 20 %</option>
          <option value="-30">- 30 %</option>
        </select>
        <i class="icon-questions-mark" data-type="1" @click.prevent="showTips(2)"></i>
      </div>
      <div class="button-wrap">
        <button class="Paysave-btn" @click="saveBtn" :class="this.profileCard.pay.onSaveButton ? 'on' : ''">저장</button>
      </div>
    </div>

    <!-- 희망 공구 품목 -->
    <div
      class="accordion"
      id="accordion_item"
      v-if="checkService('market',true) || checkService('influencer',true)"
      @click="onClickProfileCard('expectProduct', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/box.png" alt="희망공구아이콘" />
        </li>
        <li>희망 공구 품목</li>
        <li>
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      id="accordion-product"
      class="accordion-contents"
      :class="onProfileCard('expectProduct')"
      v-if="checkService('market',true) || checkService('influencer',true)"
    >
      <div class="m-item">
        <div class="input-selectbox-wrap" id="itemSelect">
          <div class="select select-btn" @click.prevent="showSelectList">
            <input type="text" placeholder="공구품목 선택, 검색" v-model="purchaseList" @keyup="groupPurchaseSearch" />
            <i class="none"></i>
          </div>
          <div class="listContents listWrap long item-top">
            <ul class="list" v-if="purchaseKindList">
              <li v-for="(list,index) in purchaseGroupList" @click="isText($event,index)" :key="index">{{list.name}}</li>
            </ul>
            <ul class="list" v-else>
              <li v-for="(list,index) in purchaseSearchList" @click="isText($event,index)" :key="index">
                <HighlightColorText :result="list.name" :keyword="purchaseList" />
              </li>
            </ul>
          </div>
        </div>

        <div class="alert-text" v-if="purchaseInputText">공백포함 8글자를 초과할 수 없습니다</div>

        <div class="choice-list" v-if="purchaseGroupTag">
          <ul v-for="(item,index) in groupPurchaseChoice" :key="index">
            <li>{{item.name}}</li>
            <a href="#" class="closeImg" @click="deleteIcon(index)"></a>
            <li class="delete" v-if="onDeletePurchase(index)" :data-idx="item.idx" @click="deletePurchaseList">삭제</li>
          </ul>
        </div>

        <div class="alert-text" v-if="purchaseListText">공구품목은 14개까지 선택할 수 있습니다</div>

        <div class="button-wrap">
          <button class="itemsave-btn" @click="saveBtn" :class="this.profileCard.expectProduct.onSaveButton == true ? 'on':''">저장</button>
        </div>
      </div>
    </div>
    <!-- 주 활동 지역  -->
    <div
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
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
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
    </div>
    <!-- 성별, 연령 -->
    <div
      id="accordion_gender"
      class="accordion"
      @click="onClickProfileCard('gender', $event)"
      
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/age_.png" alt="gender" />
        </li>
        <li>성별/연령</li>
        <li>
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      id="accordion-gender"
      :class="onProfileCard('gender')"
      
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
          <div class="select select-btn select-first" @click.prevent="showGenderSelectList">
            <span>{{ageDefault}}</span>
            <i></i>
          </div>

          <div class="listContents listWrap list-first age-top">
            <ul class="list">
              <li v-for="(item,index) in ageList" @click="isText($event,index)" :key="index">{{item.age}}</li>
            </ul>
          </div>
        </div>

        <div class="input-selectbox-wrap" id="m-ageGroup">
          <div class="select2 select-btn select-second" @click.prevent="showGenderSelectList">
            <span>{{generationDefault}}</span>
            <i></i>
          </div>

          <div class="listContents listWrap list-second age-top2">
            <ul class="list">
              <li v-for="(item,index) in ageGroupList" @click="isText($event,index)" :key="index">{{item.ageGroup}}</li>
            </ul>
          </div>
        </div>
        <div class="button-wrap">
          <button class="gendersave-btn" @click="saveBtn" :class="(checkEither('m') || checkEither('w')) && ageChoice && ageGroupChoice ? 'on':''">저장</button>
        </div>
      </div>
    </div>

    <!-- 직업 -->
    <div
      class="accordion"
      id="accordion_job"
      
      @click="onClickProfileCard('job', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/job.png" alt="직업아이콘" />
        </li>
        <li>직업</li>
        <li>
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      id="accordion-job"
      class="accordion-contents"
      
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
            <li class="select-box clearfix" id="m-jobTense">
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
        <button class="jobsave-btn" @click="saveBtn" :class="checkStatus('n','job') || (checkStatus('y','job') && jobTenseChoice && jobSearchChoice) ? 'on':''">저장</button>
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
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
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
          <div class="select select-btn" @click.prevent="showSelectList">
            <input type="text" placeholder="공구품목 선택, 검색" v-model="purchaseList" @keyup="purchaseInput" />
          </div>
          <div class="listContents listWrap long item-top">
            <ul class="list">
              <li v-for="(list,index) in groupPurchaseList" :key="index">{{list.name}}</li>
            </ul>
          </div>
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

        <div class="button-wrap">
          <button class="itemsave-btn on" @click="saveBtn">저장</button>
        </div>
      </div>
    </div>
    <!-- 결혼 유무 -->
    <div
      class="accordion"
      id="accordion_marry"
      @click="onClickProfileCard('married', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/married.png" alt="결혼유무아이콘" />
        </li>
        <li>결혼 유무</li>
        <li>
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
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
          <button class="marrysave-btn" @click="saveBtn" :class="checkEither('y') || checkEither('n') ? 'on':''">저장</button>
        </div>
      </div>
    </div>
    <!-- 자녀 관계 -->
    <div
      class="accordion"
      id="accordion_baby"
      @click="onClickProfileCard('children', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/baby.png" alt="자녀관계아이콘" />
        </li>
        <li>자녀 관계</li>
        <li>
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      id="accordion-baby"
      class="accordion-contents"
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
            <li class="select-box clearfix" id="m-childAge">
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
            <li class="select-box big clearfix" id="m-childGender">
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
      </div>
      <div class="button-wrap">
        <button class="babysave-btn" @click="saveBtn" :class="checkStatus('n','child') || (checkStatus('y','child') && childrenAgeChoice && childrenGenderChoice !== null) ? 'on':''">저장</button>
      </div>
    </div>
    <!-- 반려동물 -->
    <div
      class="accordion"
      id="accordion_pet"
      @click="onClickProfileCard('pet', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/pet.png" alt="반려동물아이콘" />
        </li>
        <li>반려동물</li>
        <li>
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      id="accordion-pet"
      class="accordion-contents"
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
            <li class="select-box clearfix" id="m-petType">
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
            <li class="select-box big clearfix" id="m-petDigit">
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
        <button class="petsave-btn" @click="saveBtn" :class="checkStatus('n','pet') || (checkStatus('y','pet') && petTypeChoice && petNumChoice) ? 'on':''">저장</button>
      </div>
    </div>

    <!-- 바디 프로필 -->
    <!-- <div
      class="accordion"
      id="accordion_body"
      
      @click="onClickProfileCard('bodyProfile', $event)"
    >
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/body.png" alt="바디프로필아이콘" />
        </li>
        <li>바디프로필</li>
        <li>
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div
      class="accordion-contents"
      
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
    </div> -->

    <!-- 피부 -->
    <div class="accordion" id="accordion_skin" v-if="checkService('market',true) || checkService('influencer',true)" @click="onClickProfileCard('skinType', $event)">
      <ul>
        <li>
          <img class="icon" src="~@/assets/img/skin.png" alt="피부아이콘" />
        </li>
        <li>피부</li>
        <li>
          <img class="arrow" src="~@/assets/img/down_mobile.png" alt="아래화살표아이콘" />
        </li>
      </ul>
    </div>
    <div class="accordion-contents" v-if="checkService('market',true) || checkService('influencer',true)" @click="onClickProfileCard('skinType', $event)" :class="onProfileCard('skinType')">
      <div class="m-skin">
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
        <div class="button-wrap">
          <button class="skinsave-btn" @click="saveBtn" :class="skinChoice && (isSkinOnOff[0]||isSkinOnOff[1]||isSkinOnOff[2]||isSkinOnOff[3]) ? 'on':''">저장</button>
        </div>
      </div>
    </div>
    <div class="m-finished">
      <a href="#">
        <span @click="joinCheck()">프로필입력완료</span>
        <i></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import HighlightColorText from '../HighlightColorText.vue';
import MapSvg from '../MapSvg';
import { async } from 'q';

export default {
    name: 'mobileDetailInfo',
    data() {
        return {
            isSkinOnOff: {
                0: false,
                1: false,
                2: false,
                3: false
            },
            isCertificationOnOff: {
                0: false, // 페이스북
                1: false, // 인스타그램
                2: false, // 유투브
                3: false, // 네이버
                4: false, // 트위터
                5: false 
            },
            instagramImg: true,
            youtubeImg: true,
            naverImg: true,
            selectText: false,
            haveJob: false,
            haveChild: false,
            havePet: false,
            petDigitDefault: '몇마리',
            petTypeDefault: '동물종류',
            childGenderDefault: '성별',
            childAgeDefault: '연령',
            skinDefault: '피부타입',
            ageDefault: '10대',
            generationDefault: '초반',
            jobDefault: '현 직업',
            jobSearchDefault: '',
            groupPurchaseDefault: '',
            addJobBtn: true,
            addChildBtn: true,
            addPetBtn: true,
            onStatusCheck: {
                job: null,
                child: null,
                pet: null
            },
            isCheck: undefined,
            
            influencerList: [
                'sns',
                'pay',
                'expectProduct',
                'gender',
                'job',
                'interests',
                'married',
                'children',
                'pet',
                'skinType'
            ],
            brandsList: [
                'sns',
                'pay',                
                'area',
                'gender',
                'job',
                'interests',
                'married',
                'children',
                'pet',
            ],
            marketList: ['sns', 'expectProduct', 'gender', 'job', 'married', 'children',
                'pet', 'skinType'],

            isRecommendCheck: true,
            recommendType: null,
            gender: false,
            tip: {
                title: null,
                text: null
            },
            tips: [
                {
                    title: '원고료 산정방식1',
                    text:
                        '희망원고료의 최소 퍼센트 범위를 지정해주시면 고객사 매칭에 도움이 될 거에요.희망원고료의 희망원고료의 최소 퍼센트 범위를 지정해주시면 고객사 매칭에 도움이 될 거에요.'
                },
                {
                    title: '원고료 산정방식2',
                    text:
                        '희망원고료의 최소 퍼센트 범위를 지정해주시면 고객사 매칭에 도움이 될 거에요.희망원고료의 희망원고료의 최소 퍼센트 범위를 지정해주시면 고객사 매칭에 도움이 될 거에요.'
                },
            ],
            snsDefaultCertBtn: true,
            snsCertBtn: false,
            snsCertSuccessBtn: false,
            snsWaitText: false,
            snsPossibleText: false,
            snsWrongText: false,
            // 추가 프로필
            // sns
            instagramCertIdx: null,
            youtubeCertIdx: null,
            naverCertIdx: null,
            auth: [],
            // 희망수수료
            defaultFeeInput: '',
            basicValue: '-10', //개런티 퍼센트
            productPriceInput: '',
            productFeeInput: '',
            comboValue: '-10', //개런티 퍼센트
            expectFee: { 
              recommendFee: null,
              defaultFee: NaN, //100000
              defaultFeePer: NaN, //-10
              productPrice: NaN, //1000000
              productFee: NaN, //100000
              productFeePer: NaN //-10
            },
            // 희망공구품목
            purchaseGroupList: [],
            groupPurchaseChoice: [],
            groupPurchaseList: [],
            purchaseGroupTag: false,
            deletePurchase: null,
            purchaseList: '',
            purchaseSearchList: [],
            purchaseKindList: true,
            purchaseInputText: false,
            purchaseListText: false,
            // 성별,연령
            genderExists: null,
            ageList: [],
            ageGroupList: [],
            ageChoice: null,
            ageGroupChoice: null,
            ageAndGender: { 
              gender: null,
              age: null,
              ageGroup: null,
            },
            // 직업
            jobList: [],
            jobExists: null,
            jobTenseChoice: true,
            jobSearchChoice: null,
            jobSearchList:[],
            jobKindList: true,
            job: { 
              exists: null,
              jobList: [
                {
                  isCurrentJob: null,
                  idx: null
                }
              ]
            },
            // 결혼
            marry: null,
            married: null, 
            // 자녀
            childrenAgeList: [],
            childrenExists: null,
            childrenAgeChoice: null,
            childrenGenderChoice: null,
            children: { 
              exists: null,
              childrenList: [
                {
                  age: null,
                  gender: null,
                }
              ]
            },
            // 반려동물
            petList: [],
            petExists: null,
            petTypeChoice: null,
            petNumChoice: null,
            pet: {
              exists: null,
              petList: [
                {
                  typeIdx: null,
                  number: null,
                }
              ]
            },
            // 피부
            skinList: [],
            troubleList: [],
            skinChoice: null,
            troubleChoice: [],
            skin: { 
              type: null,
              trouble: []
            },
            joinDisableBtn: true,
            joinFinishBtn: false,
        };
    },
    components: {
        MapSvg,
        HighlightColorText
    },
    computed: {
        ...mapState(['service', 'profileCard', 'currentCard']),
        ...mapGetters({
            currentIndex: 'getCurrentIndex'
        })
    },
    mounted() {
      this.$axios('get','/join/info/init', {
        }).then((res) => {
            console.log(res);      
            this.purchaseGroupList = res.data.groupPurchaseList;
            this.ageList = res.data.age;
            this.ageGroupList = res.data.ageGroup;
            this.jobList = res.data.job;
            this.childrenAgeList = res.data.childrenAge;
            this.petList = res.data.pet;
            this.skinList = res.data.skin.skinType;
            this.troubleList = res.data.skin.trouble;
        }).catch((err) => {
            console.log(err)
        });
    },
    methods: {
        onDeletePurchase(index) {
          return this.deletePurchase === index;
        },
        deleteIcon(index) {
          if(this.deletePurchase === index) {
            this.deletePurchase = null;
          } else {
            this.deletePurchase = index;
          }
        },
        deletePurchaseList(e) {
          let idx = Number(e.target.getAttribute('data-idx'));
          let result = this.groupPurchaseChoice.filter((value) => {
            return value.idx !== idx;
          });
          this.groupPurchaseChoice = result;
          if(this.groupPurchaseChoice.length == 0) {
            this.profileCard.expectProduct.onSaveButton = false;
          }
          this.deletePurchase = null;
        },
        addChild() {
          this.addChildBtn = false;
        },
        removeChild() {
          let removeChildren = document.getElementById("addChildren");
          removeChildren.parentNode.removeChild(removeChildren);
        },
        jobSearch() {
          this.$axios('post','/join/search/job', {
            name: this.jobSearchDefault
          }).then((res) => {
            if(this.jobSearchDefault) {
              this.jobSearchList = res.data;
              this.jobKindList = false;
            } else {
              this.jobKindList = true;
            }
          }).catch((err) => {
            console.log(err)
          });
        },
        // 희망 수수료 maxLength 제한
        maxLengthCheckDefaultFee() {
          if(this.defaultFeeInput > 4) this.defaultFeeInput = this.defaultFeeInput.slice(0, 4);
        },
        maxLengthCheckProductPrice() {
          if(this.productPriceInput > 7) this.productPriceInput = this.productPriceInput.slice(0, 7);
        },
        maxLengthCheckProductFee() {
          if(this.productFeeInput > 4) this.productFeeInput = this.productFeeInput.slice(0, 4);
        },
        // 희망 수수료 input 입력 시
        inNumberAndMakeNotSave() {
          if(this.productPriceInput > 1000000) {
            alert("제품가는 1,000,000원(100만원) 이상 적을 수 없습니다");
            this.productPriceInput = '';
          }
          if(this.isRecommendCheck) {
            this.profileCard.pay.onSaveButton = true;
            if(this.defaultFeeInput&&(!this.productPriceInput&&this.productFeeInput)) {
              this.profileCard.pay.onSaveButton = false;
            } else if(this.defaultFeeInput&&(this.productPriceInput&&!this.productFeeInput)) {
              this.profileCard.pay.onSaveButton = false;
            } else if(!this.defaultFeeInput&&(!this.productPriceInput&&this.productFeeInput)) {
              this.profileCard.pay.onSaveButton = false;
            } else if(!this.defaultFeeInput&&(this.productPriceInput&&!this.productFeeInput)) {
              this.profileCard.pay.onSaveButton = false;
            }
          } else {
            this.profileCard.pay.onSaveButton = false;
            if(this.defaultFeeInput&&this.productPriceInput&&this.productFeeInput) {
              this.profileCard.pay.onSaveButton = true;
            }
          } 
        },
        // 희망 수수료 focus 
        makeNotSave() {
          if(this.isRecommendCheck) {
            if(this.defaultFeeInput&&(!this.productPriceInput||!this.productFeeInput)) {
              this.profileCard.pay.onSaveButton = false;
            } else if(!this.defaultFeeInput&&(!this.productPriceInput||!this.productFeeInput)) {
              this.profileCard.pay.onSaveButton = false;
            }
          }
        },
        // 희망 수수료 추천 클릭 시
        onClickRecommendCheck() {
          this.isRecommendCheck = !this.isRecommendCheck;
          if(this.isRecommendCheck) {
            this.profileCard.pay.onSaveButton = true;
            if(this.defaultFeeInput&&(!this.productPriceInput&&this.productFeeInput)) {
              this.profileCard.pay.onSaveButton = false;
            } else if(this.defaultFeeInput&&(this.productPriceInput&&!this.productFeeInput)) {
              this.profileCard.pay.onSaveButton = false;
            } else if(!this.defaultFeeInput&&(!this.productPriceInput&&this.productFeeInput)) {
              this.profileCard.pay.onSaveButton = false;
            } else if(!this.defaultFeeInput&&(this.productPriceInput&&!this.productFeeInput)) {
              this.profileCard.pay.onSaveButton = false;
            }
          } else {
            this.profileCard.pay.onSaveButton = false;
            if(this.defaultFeeInput&&this.productPriceInput&&this.productFeeInput) {
              this.profileCard.pay.onSaveButton = true;
            }
          } 
        },
        //공구품목 검색
        groupPurchaseSearch() {
          this.$axios('post','/join/search/grouppurchase', {
            name: this.purchaseList
          }).then((res) => {
            if(this.purchaseList) {
              this.purchaseSearchList = res.data;
              this.purchaseKindList = false;
            } else {
              this.purchaseKindList = true;
            }
            if(this.purchaseList.length > 8) {
              this.purchaseInputText = true;
            } else {
              this.purchaseInputText = false;
            }
          }).catch((err) => {
            console.log(err)
          });
        },
        //sns 연동 아이콘 온오프
        checkCertification(idx) {
            var keys = Object.keys(this.isCertificationOnOff);
            keys.forEach((i, obj) => {
              if(obj !== idx){
                this.isCertificationOnOff[obj] = false;
              }
            })
            this.isCertificationOnOff[idx] = !this.isCertificationOnOff[idx];
            if(this.isCertificationOnOff[1] || this.isCertificationOnOff[2] || this.isCertificationOnOff[3]) {
              this.snsCertBtn = true;
              this.snsDefaultCertBtn = false;
            } else {
              this.snsCertBtn = false;
              this.snsDefaultCertBtn = true;
            }
        },
        snsSaveBotton() {
            if(this.snsPossibleText) {
              return;
            }
            if(this.isCertificationOnOff[1]){
              this.authInstagram();
            } else if (this.isCertificationOnOff[2]) {
              this.authGoogle();
            } else if (this.isCertificationOnOff[3]) {
              this.authNaver();
            }
        },
        async authGoogle() {
          const url = '/auth/google'
          const res = await this.$axios('get', url );

          window.authResultForGoogle = async data => {
            console.log(data.data);
            try {
              this.snsWaitText = true;
              if(data.data.result === 'success') {
                this.youtubeCertIdx = data.data.authIdx;
                this.youtubeImg = false;
                this.snsPossibleText = true;
                this.snsWaitText = false;
                this.snsCertSuccessBtn = true;
                this.snsCertBtn = false;
                this.profileCard.sns.onSaveButton = true;
              }
            } catch(error) {
                console.log(error);
                this.snsWrongText = true;
                this.snsWaitText = false;
                this.snsCertBtn = true;
                this.snsCertSuccessBtn = false;
            }
          }

          window.open(
              res.data,
              '_blank',
              'toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400'
          );
        },
        async authNaver() {
          const res = await this.$axios('get', `/auth/naver` );

          window.authResultForNaver = async data => {
            console.log(data.data);
            try {
              this.snsWaitText = true;
              if(data.data.result === 'success') {
                this.naverCertIdx = data.data.authIdx;
                this.naverImg = false;
                this.snsPossibleText = true;
                this.snsWaitText = false;
                this.snsCertSuccessBtn = true;
                this.snsCertBtn = false;
                this.profileCard.sns.onSaveButton = true;
              }
            } catch(error) {
                console.log(error);
                this.snsWrongText = true;
                this.snsWaitText = false;
                this.snsCertBtn = true;
                this.snsCertSuccessBtn = false;
            }
          }
          // popup open
          window.open(
              res.data,
              '_blank',
              'toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400'
          );
        },
        authInstagram() {
            const redirectUri = 'http://member.concepters.co.kr/auth/instagram';
            const clientId = 'cacd978cda8742149e4b7240e9481acb';

            // get result from child
            window.authResultForInsta = async data => {
                try {
                  this.snsWaitText = true;
                    const res = await this.$axios(
                        'get',
                        `/auth/instagram?code=${data.code}&errorReason=${data.errorReason}&error=${data.error}`,
                        {}
                    );
                    if(res.data.result === 'success') {
                      this.instagramCertIdx = res.data.authIdx;
                      this.instagramImg = false; //아이콘
                      this.snsPossibleText = true; //인증문구
                      this.snsWaitText = false;
                      this.snsCertSuccessBtn = true; //인증버튼
                      this.snsCertBtn = false;
                      this.profileCard.sns.onSaveButton = true; //저장하기버튼
                    }
                } catch (error) {
                    console.log(error);
                    this.snsWrongText = true;
                    this.snsWaitText = false;
                    this.snsCertBtn = true;
                    this.snsCertSuccessBtn = false;
                }
            };

            // popup open
            window.open(
                `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`,
                '_blank',
                'toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400'
            );
        },
        //희망수수료 개런티 카운트
        payUpPersent(type) {
            if (type === 'basicsUp' && this.basicValue > -30) {
                this.basicValue = this.basicValue - 10;
            } else if (type === 'comboUp' && this.comboValue > -30) {
                this.comboValue = this.comboValue - 10;
            }
        },
        payDownPersent(type) {
            if (type === 'basicsDown' && this.basicValue < -10) {
                this.basicValue = this.basicValue + 10;
            } else if (type === 'comboDown' && this.comboValue < -10) {
                this.comboValue = this.comboValue + 10;
            }
        },
        //셀렉트 선택 피부,연령
        isText(e, idx) {
            let text = e.target.innerText;
            if (e.target.closest('#skin, .m-skin')) {
                this.skinDefault = text;
                this.skinChoice = this.skinList[idx].idx;
            } else if (e.target.closest('#ageGeneration, #m-ageGeneration')) {
                this.ageDefault = text; 
                this.ageChoice = this.ageList[idx].ageIdx;
            } else if (e.target.closest('#childAge, #m-childAge')) {
                this.childAgeDefault = text;
                this.childrenAgeChoice = this.childrenAgeList[idx].idx;
            } else if (e.target.closest('#childGender, #m-childGender')) {
                this.childGenderDefault = text;
                if(text == '남자') {
                  this.childrenGenderChoice = true;
                } else {
                  this.childrenGenderChoice = false;
                }
            } else if (e.target.closest('#petType, #m-petType')) {
                this.petTypeDefault = text;
                this.petTypeChoice = this.petList[idx].ptNum;
            } else if (e.target.closest('#petDigit, #m-petDigit')) {
                this.petDigitDefault = text;
                if(text == '1마리') {
                  this.petNumChoice = 1;
                } else if(text == '2마리') {
                  this.petNumChoice = 2;
                } else if(text == '3마리') {
                  this.petNumChoice = 3;
                } else {  
                  this.petNumChoice = 4;
                }
            } else if(e.target.closest('#jobTense, #m-jobTense')) {
                this.jobDefault = text;
                if(text == '현 직업') {
                  this.jobTenseChoice = true;
                } else {
                  this.jobTenseChoice = false;
                }
            } else if(e.target.closest('#jobSearchSelect', '#m-jobSearchSelect')) {
                this.jobSearchDefault = text;
                this.jobSearchChoice = this.jobList[idx].idx;
            } else if(e.target.closest('#itemSelect', '#m-itemSelect')) {
                this.groupPurchaseDefault = text;
                if(this.purchaseKindList == true) {
                  if(this.groupPurchaseChoice.length > 13) {
                    this.purchaseListText = true;
                  } else {
                    this.purchaseListText = false;
                    this.purchaseGroupTag = true;
                    this.profileCard.expectProduct.onSaveButton = true;
                    if(!this.groupPurchaseChoice.find((v) => this.purchaseGroupList[idx].idx === v.idx))
                      this.groupPurchaseChoice.push(this.purchaseGroupList[idx]);
                  }
                } else {
                  if(this.groupPurchaseChoice.length > 13) {
                    this.purchaseListText = true;
                  } else {
                    this.purchaseListText = false;
                    this.purchaseGroupTag = true;
                    this.profileCard.expectProduct.onSaveButton = true;
                    if(!this.groupPurchaseChoice.find((v) => this.purchaseSearchList[idx].idx === v.idx))
                      this.groupPurchaseChoice.push(this.purchaseSearchList[idx]);
                  }
                }
            } else {
                this.generationDefault = text;
                this.ageGroupChoice = this.ageGroupList[idx].idx;
            }
        },
        //피부고민 중복선택,온오프
        checkSelect(idx) {
            if (idx === 0) {
                for (const keys in this.isSkinOnOff) {
                    this.isSkinOnOff[keys] = false;
                }
                this.troubleChoice.splice(0, this.troubleChoice.length);
            } else {
                this.isSkinOnOff[0] = false;
                if (!this.troubleChoice.includes(this.troubleList[idx-1].idx)) {
                  this.troubleChoice.push(this.troubleList[idx-1].idx);
                } else {
                  const delIdx = this.troubleChoice.indexOf(this.troubleList[idx-1].idx);
                  this.troubleChoice.splice(delIdx, 1);
                }
            }
            this.isSkinOnOff[idx] = !this.isSkinOnOff[idx];
        },
        statusCheck(value, type) {
            this.onStatusCheck[type] = value;
            if(this.onStatusCheck[type] === 'y' && type === 'job') {
              this.jobExists = true;
            } else if(this.onStatusCheck[type] === 'n' && type === 'job') {
              this.jobExists = false;
              this.profileCard.job.onSaveButton = true;
            }
            if(this.onStatusCheck[type] === 'y' && type === 'child') {
              this.childrenExists = true;
            } else if(this.onStatusCheck[type] === 'n' && type === 'child') {
              this.childrenExists = false;
              this.profileCard.children.onSaveButton = true;
            }
            if(this.onStatusCheck[type] === 'y' && type === 'pet') {
              this.petExists = true;
            } else if(this.onStatusCheck[type] === 'n' && type === 'pet') {
              this.petExists = false;
              this.profileCard.pet.onSaveButton = true;
            }
        },
        checkStatus(el, type) {
            if (el.includes(this.onStatusCheck[type])) return 'on';
        },
        //성별,연령
        eitherSelect(value) {
            this.isCheck = value;
            if(value === 'm') {
              this.genderExists = true;
            } else if(value === 'w') {
              this.genderExists = false;
            } else if(value === 'y') {
              this.marry = true;
            } else if(value === 'n') {
              this.marry = false;
            }
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
              if(key !== value) {
                this.profileCard[key].on = false
              }
              if(key == 'pay' && this.isRecommendCheck) {
                this.profileCard.pay.onSaveButton = true;
              }
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
        showGenderSelectList(e) {
            const selectBtn = e.target.closest('div');
            const accordion = selectBtn.closest('.accordion-contents');
            const selectBox = selectBtn.closest('.inner-contents');
            const icon = selectBtn.querySelector('i');

            this.showSelectList(e);
            if (selectBtn.classList.contains('select-first')) {
                if (!accordion) {
                    selectBox
                        .querySelector('.list-second')
                        .classList.remove('selectOn');
                } else {
                    accordion
                        .querySelector('.list-second')
                        .classList.remove('selectOn');
                }
            } else {
                if (!accordion) {
                    selectBox
                        .querySelector('.list-first')
                        .classList.remove('selectOn');
                } else {
                    accordion
                        .querySelector('.list-first')
                        .classList.remove('selectOn');
                }
            }
        },
        showSelectList2(e) {
            
            const selectBtn = e.target.closest('ul');
            const accordion = selectBtn.closest('.accordion-contents');
            const selectBox = selectBtn.closest('.status-selectbox');
            const icon = selectBtn.querySelector('i');

            this.showSelectList(e);
            if (selectBtn.classList.contains('select-first')) {
                if (!accordion) {
                    selectBox
                        .querySelector('.list-second')
                        .classList.remove('selectOn');
                } else {
                    accordion
                        .querySelector('.list-second')
                        .classList.remove('selectOn');
                    selectBtn.offsetHeight - 3 + 'px';
                }
            } else {
                if (!accordion) {
                    selectBox
                        .querySelector('.list-first')
                        .classList.remove('selectOn');
                } else {
                    accordion
                        .querySelector('.list-first')
                        .classList.remove('selectOn');
                }
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
                    this.auth.push(this.instagramCertIdx);
                    console.log(this.auth);
                } else if (this.currentCard === 'pay') {
                    if(this.isRecommendCheck) {
                      this.expectFee.recommendFee = true;
                    } else {
                      this.expectFee.recommendFee = false;
                    }
                    if(!this.defaultFeeInput&&!this.productPriceInput&&!this.productFeeInput) {
                      this.expectFee.defaultFee = null;
                      this.expectFee.defaultFeePer = null;
                      this.expectFee.productPrice = null;
                      this.expectFee.productFee = null;
                      this.expectFee.productFeePer = null;
                    } else if(this.defaultFeeInput&&!this.productPriceInput&&!this.productFeeInput) {
                      this.expectFee.defaultFee = Number(this.defaultFeeInput+'0000');
                      let basicvalue = document.getElementById("defaultFee-selectBox");
                      if(basicvalue) {
                        this.expectFee.defaultFeePer = Number(basicvalue.options[basicvalue.selectedIndex].value);
                      } else {
                        this.expectFee.defaultFeePer = Number(this.basicValue);
                      }
                      this.expectFee.productPrice = null;
                      this.expectFee.productFee = null;
                      this.expectFee.productFeePer = null;
                    } else if(!this.defaultFeeInput&&this.productPriceInput&&this.productFeeInput) {
                      this.expectFee.defaultFee = null;
                      this.expectFee.defaultFeePer = null;
                      this.expectFee.productPrice = Number(this.productPriceInput);
                      this.expectFee.productFee = Number(this.productFeeInput+'0000');
                      let combovalue = document.getElementById("productFee-selectBox");
                      if(combovalue) {
                        this.expectFee.productFeePer = Number(combovalue.options[combovalue.selectedIndex].value);
                      } else {
                        this.expectFee.productFeePer = Number(this.comboValue)
                      }
                    } else {
                      this.expectFee.defaultFee = Number(this.defaultFeeInput+'0000');
                      let basicvalue = document.getElementById("defaultFee-selectBox");
                      if(basicvalue) {
                        this.expectFee.defaultFeePer = Number(basicvalue.options[basicvalue.selectedIndex].value);
                      } else {
                        this.expectFee.defaultFeePer = Number(this.basicValue);
                      }
                      this.expectFee.productPrice = Number(this.productPriceInput);
                      this.expectFee.productFee = Number(this.productFeeInput+'0000');
                      let combovalue = document.getElementById("productFee-selectBox");
                      if(combovalue) {
                        this.expectFee.productFeePer = Number(combovalue.options[combovalue.selectedIndex].value);
                      } else {
                        this.expectFee.productFeePer = Number(this.comboValue)
                      }
                    }
                    console.log(this.expectFee);
                } else if (this.currentCard === 'expectProduct') {
                    this.groupPurchaseList = this.groupPurchaseChoice.map((v) => v.idx);
                    console.log(this.groupPurchaseList);
                } else if (this.currentCard === 'gender') {
                    this.ageAndGender.gender = this.genderExists;
                    this.ageAndGender.age = this.ageChoice;
                    this.ageAndGender.ageGroup = this.ageGroupChoice;
                    console.log(this.ageAndGender);
                } else if (this.currentCard === 'job') {
                    this.job.exists = this.jobExists;
                    this.job.jobList[0].isCurrentJob = this.jobTenseChoice;
                    this.job.jobList[0].idx = this.jobSearchChoice;
                    console.log(this.job);
                } else if (this.currentCard === 'married') {
                    this.married = this.marry;
                    console.log(this.married);
                } else if (this.currentCard === 'children') {
                    this.children.exists = this.childrenExists;
                    this.children.childrenList[0].age = this.childrenAgeChoice;
                    this.children.childrenList[0].gender = this.childrenGenderChoice;
                    console.log(this.children);
                } else if (this.currentCard === 'pet') {
                    this.pet.exists = this.petExists;
                    this.pet.petList[0].typeIdx = this.petTypeChoice;
                    this.pet.petList[0].number = this.petNumChoice;
                    console.log(this.pet);
                } else if (this.currentCard === 'skinType') {
                    this.skin.type = this.skinChoice;
                    this.skin.trouble.push(this.troubleChoice);
                    console.log(this.skin);
                }
                this.joinDisableBtn = false;
                this.joinFinishBtn = true;
                this.nextDetailInfo(event);
            }
            return;
        },
        clearCardList() {
            for (const key in this.profileCard) {
                this.profileCard[key].on = false;
            }
        },
        joinCheck() {
            // this.clearCardList();

            // if (!this.$store.state.iccMode) {
            //     this.profileCard['finishBlock'].on = true;
            // } else {
            //     this.$store.state.welcome = true;
            //     this.$router.push('/');
            // }
            // this.$axios('post','/join/info/save', {
            //   userIdx: this.userIndex,
            //   auth: this.auth,
            //   expectFee: this.expectFee,
            //   groupPurchaseList: this.groupPurchaseList,
            //   ageAndGender: this.ageAndGender,
            //   job: this.job,
            //   married: this.married,
            //   children: this.children,
            //   pet: this.pet,
            //   skin: this.skin
            // });
            alert('end')
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