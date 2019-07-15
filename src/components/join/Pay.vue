<template>
  <div class="article" id="pay">
    <div class="header margin-bottom-0">희망 원고료</div>
    <div class="inner-contents">
      <div class="recommend-checkbox">
        <div class="uncheck">
          <span>빅버드 추천을 받을게요</span>
          <i></i>
        </div>
        <div class="checked none">
          <i></i>
          <span>빅버드 추천을 받을게요</span>
        </div>
        <i class="icon-questions-mark"></i>
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
        <i class="icon-questions-mark" data-type="0"></i>
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
        <i class="icon-questions-mark" data-type="1"></i>
      </div>
    </div>
    <div class="button-wrap">
      <ul>
        <li class="back-btn">
          <i></i>뒤로가기
        </li>
        <li class="save-btn">저장하기</li>
        <li class="next-btn">
          건너뛰기
          <i></i>
        </li>
      </ul>
      <button class="join-finish-btn">가입확인</button>
    </div>
    <div class="pay-text-wrap none" id="Paytext1">
      <div class="paytext">원고료 산정방식?1</div>
      <div class="paytext2">
        희망원고료의 최소 퍼센트 범위를 지정해주시면
        고객사 매칭에 도움이 될 거에요.희망원고료의
        희망원고료의 최소 퍼센트 범위를 지정해주시면
        고객사 매칭에 도움이 될 거에요.
      </div>
      <div class="closeBtn">
        <a href="#">
          <img src="~@/assets/img/x_botton.png" alt="닫기버튼" />
        </a>
      </div>
    </div>
    <div class="pay-text-wrap none" id="Paytext2">
      <div class="paytext">원고료 산정방식?2</div>
      <div class="paytext2">
        희망원고료의 최소 퍼센트 범위를 지정해주시면
        고객사 매칭에 도움이 될 거에요.희망원고료의
        희망원고료의 최소 퍼센트 범위를 지정해주시면
        고객사 매칭에 도움이 될 거에요.
      </div>
      <div class="closeBtn">
        <a href="#">
          <img src="~@/assets/img/x_botton.png" alt="닫기버튼" />
        </a>
      </div>
    </div>
    <div class="pay-text-wrap none" id="Paytext3">
      <div class="paytext">협찬제품이 있을 때 원고료 산정방식!3</div>
      <div class="paytext2">
        희망원고료의 최소 퍼센트 범위를 지정해주시면
        고객사 매칭에 도움이 될 거에요.희망원고료의
        희망원고료의 최소 퍼센트 범위를 지정해주시면
        고객사 매칭에 도움이 될 거에요.
      </div>
      <div class="closeBtn">
        <a href="#">
          <img src="~@/assets/img/x_botton.png" alt="닫기버튼" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
