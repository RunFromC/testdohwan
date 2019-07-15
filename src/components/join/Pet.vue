<template>
  <div class="article" id="pet">
    <div class="header margin-bottom-0">반려동물</div>
    <div class="inner-contents">
      <div id="petSelectedContainer" class="selected-container none"></div>

      <div id="petSelectContainer">
        <div class="input-selectbox-wrap">
          <div class="select">
            <span>동물 종류</span>
            <i></i>
          </div>

          <div class="listWrap">
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

          <div class="listWrap">
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
        <li class="save-btn on">저장하기</li>
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
