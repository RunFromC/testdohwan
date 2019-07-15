<template>
  <div class="article"  id="age">
    <div class="header margin-bottom-0">연령</div>
    <div class="inner-contents">
      <div class="input-selectbox-wrap" id="ageGeneration">
        <div class="select">
          <span>10대</span>
          <i></i>
        </div>

        <div class="listWrap">
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
        <div class="select">
          <span>초반</span>
          <i></i>
        </div>

        <div class="listWrap">
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
