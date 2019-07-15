<template>
  <div class="article"  id="children">
    <div class="header margin-bottom-0">자녀관계</div>
    <div class="inner-contents">
      <div id="childrenSelectedContainer" class="selected-container none"></div>

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

      <div id="childrenInfoWrap" class="select-container"></div>

      <button class="addBtnWrap">+</button>
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
