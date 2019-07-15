<template>
  <div class="article" id="interests">
    <div class="header margin-bottom-0">관심사</div>
    <div class="inner-contents">
      <div class="input-selectbox-wrap" id="interestsSelect">
        <div class="select">
          <span>관심사 선택</span>
          <i></i>
        </div>

        <div class="listWrap long">
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
