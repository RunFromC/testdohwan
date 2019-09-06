<template>
    <ul class="status-selectbox">
        <li class="select-box clearfix" id="jobTense">
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
                <i></i>
            </li>
            </ul>
            <ul class="list-second listContents" v-if="jobKindList">
            <li v-for="(list,index) in jobList" :key="index" @click="isText($event,index)">{{list.name}}</li>
            </ul>
            <ul class="list-second listContents" v-else>
            <li v-for="(list,index) in jobSearchList" :key="index" @click="isText($event,index)">
                <HighlightColorText :result="list.name" :keyword="jobSearchDefault" />
            </li>
            </ul>
        </li>
        <li class="status-btn clearfix">
            <ul>
            <li class="status-add" v-if="addJobBtn" @click="addJob">
                <a href="#">+</a>
            </li>
            <li class="status-remove" v-else @click="removeJob">
                <a href="#">-</a>
            </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import HighlightColorText from '../components/HighlightColorText';

export default {
    name: 'plusContentsJob',
    props: {
        num: Number,
        idx: Number,
        isCurrentJob: Boolean,
        name: String,
    },
    components: {
        HighlightColorText
    },
    data() {
        return {
            jobDefault: '현 직업',
            jobSearchDefault: '',
            jobKindList: true,
            jobSearchList: [],
            addJobBtn: true,
            jobTenseChoice: true,
            value: null,
        }
    },
    computed: {
        ...mapGetters({
            jobList: 'getJobList',
            tempSelectJobList: 'getTempSelectJobList'
        })
    },
    mounted() {
        this.jobSearchDefault = this.name;
        this.jobDefault = this.isCurrentJob ? '현 직업' : '전 직업';
    },
    methods: {
        ...mapMutations(['setTempSelectJobList']),
        addJob() {
            this.$emit("add");
            this.addJobBtn = false;
        },
        removeJob() {
            this.$emit("remove", {
                index: this.num,
            });
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
        isText(e, idx) {
            let text = e.target.innerText;
            if(e.target.closest('#jobTense, #m-jobTense')) {
                this.jobDefault = text;
                if(text == '현 직업') {
                  this.jobTenseChoice = true;
                } else {
                  this.jobTenseChoice = false;
                }
            } else if(e.target.closest('#jobSearchSelect', '#m-jobSearchSelect')) {
                const same = this.tempSelectJobList.findIndex(v => v.name === text);
                if(same > -1) {
                    alert('같은 직업은 선택할 수 없습니다.');
                    return;
                }
                this.jobSearchDefault = text;
                if (this.jobKindList) {
                    this.value = this.jobList[idx]; 
                } else {
                    this.value = this.jobSearchList[idx];   
                }
            } 
        },
    },
    watch: {
        tempSelectJobList: function(val, old) {
            if(val.length === 1 || val.length - 1 === this.num) {
                this.addJobBtn = true;
            }
        },
        jobTenseChoice: function (val, old) {
            let payload = {
                index: this.num,
                value: {
                    idx: this.idx,
                    isCurrentJob: val,
                    name: this.jobSearchDefault
                }
            }
            this.setTempSelectJobList(payload);
        },
        value: function (val, old) {
            let payload = {
                index: this.num,
                value: {
                    idx: val.idx,
                    isCurrentJob: this.isCurrentJob,
                    name: val.name
                }
            }
            this.setTempSelectJobList(payload);
        }
    }
}
</script>