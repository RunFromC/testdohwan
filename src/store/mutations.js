import router from '../router';

const mutations = {
    setService(state, payload) {
        // console.log(path);
        let service = payload.service ? payload.service : 'client';

        // if (path.includes('influencer')) {
        //     service = 'influencer';
        // } else if (path.includes('client')) {
        //     service = 'client';
        // } else if (path.includes('market')) {
        //     service = 'market';
        // }

        state.service = service;
        localStorage.setItem('service', service);
    },
    setLocalService(state) {
        state.service = localStorage.getItem('service');
    },
    setToggleType(state, payload) {
        state.isQuestionTab = payload.type;
    },
    setTermIndex(state, payload) {
        state.join.termIndex = payload.index;
    },
    setTerms(state, payload) {
        state.join.formData[payload.key] = payload.isChecked;
    },
    setCurrentCard(state, payload) {
        state.currentCard = payload.currentCard;
    },
    setIccMode(state, bool) {
        state.iccMode = bool;
    },
    setCertification(state, data) {
        state.certification = data;
    },
    setCurrentIndex(state, data) {
        state.currentIndex = data;
    },
    setJsessionId(state, data) {
        state.JSESSIONID = data;
    },
    setJobList(state, data) {
        state.jobList = data;
    },
    setTempSelectJobList(state, payload) {
        state.tempSelectJobList.splice(payload.index, 1, payload.value);
    },
    setAddTempSelectJobList(state) {
        if(state.tempSelectJobList.length < 5) {
            state.tempSelectJobList.push({
                idx: null,
                isCurrentJob: true,
                name: ''
            });
        }
    },
    removeTempSelectJobList(state, index) {
        state.tempSelectJobList.splice(index, 1);
    },
    setChildrenAgeList(state, data) {
        state.childrenAgeList = data;
    },
    setTempSelectChildrenList(state, payload) {
        state.tempSelectChildrenList.splice(payload.index, 1, payload.value);
    },
    setAddTempSelectChildrenList(state) {
        if(state.tempSelectChildrenList.length < 5) {
            state.tempSelectChildrenList.push({
                age: null,
                gender: null,
                ageName: '',
                genderName: ''
            });
        }
    },
    removeTempSelectChildrenList(state, index) {
        state.tempSelectChildrenList.splice(index, 1);
    },
    setPetList(state, data) {
        state.petList = data;
    },
    setTempSelectPetList(state, payload) {
        state.tempSelectPetList.splice(payload.index, 1, payload.value);
    },
    setAddTempSelectPetList(state) {
        if(state.tempSelectPetList.length < 5) {
            state.tempSelectPetList.push({
                typeIdx: null,
                number: null,
                typeIdxName: '',
                numberName: ''
            });
        }
    },
    removeTempSelectPetList(state, index) {
        state.tempSelectPetList.splice(index, 1);
    },
    setUserIndex(state, data) {
        state.userIndex = data;
    }
};

export default mutations;
