<template>
    <div class="loginBg">
        <div class="card_wrap" id="loginPage">
            <div class="contents type1 open" id="loginTab" v-if="!onQuestionTab">
                <a href="#" class="icon-questions" @click.prevent="toggleQuestionTab(true)"></a>
                <div class="top">
                    <div class="titleWrap">
                        <div class="imgWrap">
                            <img
                                src="../assets/img/pick_big.png"
                                alt="bigbird"
                                v-if="!this.$store.state.iccMode"
                            />
                            <span v-else style="font-size: 30px; color: #4bd897">ICC</span>
                        </div>

                        <div
                            class="text"
                            v-if="this.$store.state.welcome = false"
                        >보다 정교한, 나만의 인플루언서 선택</div>
                        <div class="text" v-else>파트너가 되어 반갑습니다</div>
                    </div>
                    <div class="loginBox">
                        <div class="tab2">
                            <div class="toggleBtnWrap">
                                <a href="#" v-if="!this.$store.state.iccMode">빅버드 ID 로그인</a>
                                <a href="#" v-else>로그인/회원가입</a>
                            </div>
                            <form action="/?service=client" method="get" id="loginForm">
                                <input class="input-text" type="text" placeholder="아이디" />
                                <input class="input-text" type="password" placeholder="비밀번호" />
                                <input class="input-button" type="submit" value="로그인" />
                                <div class="box">
                                    <div class="checkBoxWrap">
                                        <input type="checkbox" class="input-check-box" />
                                        <i></i>
                                        <span>로그인 유지</span>
                                    </div>

                                    <router-link
                                        to="/find?service=client"
                                        class="idPwFindBtn"
                                    >아이디/비밀번호 찾기</router-link>
                                </div>

                                <router-link to="/client/join" class="join_btn">광고주 회원가입 ></router-link>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <a href="#" class="go_bigbird_btn" v-if="!this.$store.state.iccMode">
                        <img src="../assets/img/client_login_butt.png" alt="Pick - 둘러보기" />
                    </a>
                    <a href="#" class="go_bigbird_btn" v-else>
                        <span
                            style="font-size: 16px; color: #4bd897; text-transform: uppercase;"
                        >icc 둘러보기</span>
                    </a>
                </div>
            </div>

            <questionTab v-else @close="toggleQuestionTab" />
        </div>
    </div>
</template>

<script>
import questionTab from '../components/QuestionTab';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Home',
    data() {
        return {
            welcome: false,
            onLoginForm: false,
            onQuestionTab: false
        };
    },
    computed: {
        checkOnLoginForm() {
            return this.onLoginForm ? 'open' : '';
        },
        ...mapState(['service', 'isQuestionTab'])
    },
    components: {
        questionTab
    },
    methods: {
        ...mapMutations(['setService']),
        changeLoginType() {
            this.onLoginForm = !this.onLoginForm;
        },
        toggleQuestionTab(isQuestion) {
            this.$store.commit('setToggleType', {
                type: isQuestion
            });
            this.onQuestionTab = !this.onQuestionTab;
        }
    },
    mounted() {
        const path = this.$router.currentRoute.path;
        this.setService({ path: path });
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/index_client.scss';
</style>
