const mutations = {
    setService(state, payload) {
        console.log(payload);
        state.service = payload.service;
    }
};

export default mutations;
