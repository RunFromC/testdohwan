<template>
    <ul class="status-selectbox">
        <li class="select-box clearfix" id="petType">
            <ul class="select-first select-btn" @click.prevent="showSelectList2">
            <li>
                <span>{{petTypeDefault}}</span>
                <i></i>
            </li>
            </ul>
            <ul class="list-first listContents">
            <li v-for="(item,index) in petList" @click="isText($event,index)" :key="index">{{item.typeName}}</li>
            </ul>
        </li>
        <li class="select-box big clearfix" id="petDigit">
            <ul class="select-second select-btn" @click.prevent="showSelectList2">
            <li>
                <span>{{petDigitDefault}}</span>
                <i></i>
            </li>
            </ul>
            <ul class="list-second listContents">
            <li @click="isText($event)">1마리</li>
            <li @click="isText($event)">2마리</li>
            <li @click="isText($event)">3마리</li>
            <li @click="isText($event)">4마리 이상</li>
            </ul>
        </li>
        <li class="status-btn clearfix">
            <ul>
            <li class="status-add" v-if="addPetBtn" @click="addPet">
                <a href="#">+</a>
            </li>
            <li class="status-remove" v-else @click="removePet">
                <a href="#">-</a>
            </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'plusContentsPet',
    props: {
        num: Number,
        typeIdx: Number,
        number: Number,
        typeIdxName: String,
        numberName: String
    },
    data() {
        return {
            petTypeDefault: '동물종류',
            petDigitDefault: '몇마리',
            addPetBtn: true,
            petTypeChoice: null,
            petNumChoice: null
        }
    },
    computed: {
        ...mapGetters({
            petList: 'getPetList',
            tempSelectPetList: 'getTempSelectPetList'
        })
    },
    mounted() {
        // 동물종류
        this.petTypeChoice = this.typeIdx;
        this.petTypeDefault = this.typeIdxName === '' ? '동물종류' : this.typeIdxName;
        // 마리
        this.petDigitDefault = this.number;
        this.petDigitDefault = this.numberName === '' ? '몇마리' : this.numberName;
    },
    methods: {
        ...mapMutations(['setTempSelectPetList']),
        addPet() {
            this.$emit("add");
            this.addPetBtn = false;
        },
        removePet() {
            this.$emit("remove", {
                index: this.num,
            })
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
            if(e.target.closest('#petType, #m-petType')) {
                this.petTypeDefault = text;
                this.petTypeChoice = this.petList[idx].ptNum;
            } else if (e.target.closest('#petDigit, #m-petDigit')) {
                this.petDigitDefault = text;
                if(text == '1마리') {
                  this.petNumChoice = 1;
                } else if(text == '2마리') {
                  this.petNumChoice = 2;
                } else if(text == '3마리') {
                  this.petNumChoice = 3;
                } else {  
                  this.petNumChoice = 4;
                }
            }
        }
    },
    watch: {
        tempSelectPetList: function(val, old) {
            if(val.length === 1 || val.length - 1 === this.num) {
                this.addPetBtn = true;
            }
        },
        petTypeChoice: function(val, old) {
            let payload = {
                index: this.num,
                value: {
                    typeIdx: val,
                    number: this.petNumChoice,
                    typeIdxName: this.petTypeDefault,
                    numberName: this.petDigitDefault
                }
            }
            this.setTempSelectPetList(payload)
        },
        petNumChoice: function(val, old) {
            let payload = {
                index: this.num,
                value: {
                    typeIdx: this.petTypeChoice,
                    number: this.petNumChoice,
                    typeIdxName: this.petTypeDefault,
                    numberName: this.petDigitDefault
                }
            }
            this.setTempSelectPetList(payload)
        }
    }
}
</script>