const mutations = {
    setService(state, payload) {
        console.log(payload);
        const path = payload.path;
        let service = 'brands';

        if (path.includes('influencer')) {
            service = 'influencer';
        } else if (path.includes('client')) {
            service = 'client';
        } else if (path.includes('market')) {
            service = 'market';
        }

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
        console.log(payload);
        state.currentCard = payload.currentCard;
    },
    setIccMode(state, bool) {
        state.iccMode = bool;
    }
};

export default mutations;
