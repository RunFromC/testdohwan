<template>
  <div class="loginBg">
    <div class="card_wrap" id="findWrap">
      <div class="contents type1">
        <a href="#" class="icon-questions"></a>
        <a href="/" class="icon-back-btn"></a>
        <div class="top">
          <div class="container">
            <div class="title">비밀번호 변경</div>
            <div class="tabBtnWrap">
              <a href="#">아이디</a>
              <a href="#" class="on">비밀번호</a>
            </div>

            <div class="tab">
              <div class="inputArea">
                <div id="changePw">
                  <div class="inputWrapper">
                    <input
                      id="password"
                      class="input-text"
                      type="password"
                      placeholder="새 비밀번호"
                      maxlength="20"
                    />
                    <i class="icon-eye"></i>
                  </div>

                  <div class="inputWrapper">
                    <input
                      id="passwordCheck"
                      class="input-text"
                      type="password"
                      placeholder="새 비밀번호 확인"
                      maxlength="20"
                    />
                    <i class="icon-eye"></i>
                  </div>
                </div>
              </div>
              <div class="wrong-msg">
                <span>비밀번호가 일치하지 않습니다.</span>
              </div>
              <a href="#" id="changePassword">변경하기</a>
            </div>
          </div>
        </div>

        <div class="bottom">
          <a href="#" class="go_bigbird_btn">
            <img src="../assets/img/market_under.png" alt="빅버드i 둘러보기" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/scss/login/findIdPw.scss';
export default {};
</script>

<style>
</style>
