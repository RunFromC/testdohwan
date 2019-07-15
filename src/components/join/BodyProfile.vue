<template>
  <div class="article"  id="body">
    <div class="header margin-bottom-0">바디 프로필</div>
    <div class="inner-contents">
      <div class="input-wrap">
        <input type="text" data-idx="0" placeholder="키" maxlength="3" />
        <span>cm</span>
      </div>
      <div id="bodySelectbox">
        <div class="input-selectbox-wrap">
          <div class="select2">
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

          <div class="listWrap2 long">
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
          <div class="select2">
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

          <div class="listWrap2 long">
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
        <li class="save-btn">저장하기</li>
        <li class="next-btn">
          건너뛰기
          <i></i>
        </li>
      </ul>
      <button class="join-finish-btn">가입확인</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
