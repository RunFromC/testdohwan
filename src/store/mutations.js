const mutations = {
    setService(state, payload) {
        console.log(payload);
        const path = payload.path;
        if (path.includes('influencer')) {
            state.service = 'influencer';
        } else if (path.includes('client')) {
            state.service = 'client';
        } else if (path.includes('market')) {
            state.service = 'market';
        } else {
            state.service = 'brands';
        }
    },
    setToggleType(state, payload) {
        state.isQuestionTab = payload.type;
    },
    setTermIndex(state, payload) {
        state.join.termIndex = payload.index;
    },
    setTerms(state, payload) {
        console.log();
        state.join.formData[payload.key] = payload.isChecked;
    }
};

export default mutations;
