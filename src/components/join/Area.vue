<template>
  <div class="article" id="area">
    <div class="header margin-bottom-0">주 활동 지역</div>
    <div class="inner-contents">
      <MapSvg class="area-map" />
      <div class="input-search-wrap">
        <input type="text" maxlength="8" placeholder="지역검색" />
        <i></i>
      </div>

      <div class="input-selectbox-wrap">
        <div class="select">
          <span>상세지역</span>
          <i></i>
        </div>

        <div class="listWrap">
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
