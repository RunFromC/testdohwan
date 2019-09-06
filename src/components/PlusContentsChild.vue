<template>
    <ul class="status-selectbox" id="addChildren">
        <li class="select-box clearfix" id="childAge">
            <ul class="select-first select-btn" @click.prevent="showSelectList2">
            <li>
                <span>{{childAgeDefault}}</span>
                <i></i>
            </li>
            </ul>
            <ul class="list-first listContents">
            <li v-for="(item,index) in childrenAgeList" @click="isText($event,index)" :key="index">{{item.age}}</li>
            </ul>
        </li>

        <li class="select-box big clearfix" id="childGender">
            <ul class="select-second select-btn" @click.prevent="showSelectList2">
            <li>
                <span>{{childGenderDefault}}</span>
                <i></i>
            </li>
            </ul>
            <ul class="list-second listContents">
            <li @click="isText($event)">남자</li>
            <li @click="isText($event)">여자</li>
            </ul>
        </li>
        <li class="status-btn clearfix">
            <ul>
            <li class="status-add" v-if="addChildBtn" @click="addChild">
                <a href="#">+</a>
            </li>
            <li class="status-remove" v-else @click="removeChild">
                <a href="#"></a>
            </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'plusContentsChild',
    props: {
        num: Number,
        age: Number,
        gender: Boolean,
        ageName: String,
        genderName: String
    },
    data() {
        return {
            childAgeDefault: '연령',
            childGenderDefault: '성별',
            addChildBtn: true,
            childrenAgeChoice: null,
            childrenGenderChoice: null
        }
    },
    computed: {
        ...mapGetters({
            childrenAgeList: 'getChildrenAgeList',
            tempSelectChildrenList: 'getTempSelectChildrenList'
        })
    },
    mounted() {
        // 연령
        this.childAgeDefault = this.ageName === '' ? '연령' : this.ageName;
        this.childrenAgeChoice = this.age;
        // 성별
        this.childrenGenderChoice = this.gender;
        this.childGenderDefault = this.genderName === '' ? '성별' : this.genderName;
    },
    methods: {
        ...mapMutations(['setTempSelectChildrenList']),
        addChild() {
            this.$emit("add");
            this.addChildBtn = false;
        },
        removeChild() {
            this.$emit("remove", {
                index: this.num,
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
            if(e.target.closest('#childAge, #m-childAge')) {
                this.childAgeDefault = text;
                this.childrenAgeChoice = this.childrenAgeList[idx].idx;
            } else if (e.target.closest('#childGender, #m-childGender')) {
                this.childGenderDefault = text;
                if(text == '남자') {
                  this.childrenGenderChoice = true;
                } else {
                  this.childrenGenderChoice = false;
                }
            }
        }
    },
    watch: {
        tempSelectChildrenList: function(val, old) {
            if(val.length === 1 || val.length - 1 === this.num) {
                this.addChildBtn = true;
            }
        },
        childrenAgeChoice: function(val, old) {
            let payload = {
                index: this.num,
                value: {
                    age: val,
                    gender: this.childrenGenderChoice,
                    ageName: this.childAgeDefault,
                    genderName: this.childGenderDefault
                }
            }
            this.setTempSelectChildrenList(payload);
        },
        childrenGenderChoice: function(val, old) {
            let payload = {
                index: this.num,
                value: {
                    age: this.childrenAgeChoice,
                    gender: this.childrenGenderChoice,
                    ageName: this.childAgeDefault,
                    genderName: this.childGenderDefault
                }
            }
            this.setTempSelectChildrenList(payload);
        }
    }
}
</script>