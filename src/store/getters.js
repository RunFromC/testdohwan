const getters = {
    getByJoinData(store) {
        return store.join;
    },
    getByFormData(store) {
        return store.join.formData;
    },
    getProfileCard(store) {
        return store.profileCard;
    },
    getCurrentCard(store) {
        return store.currentCard;
    },
    
};

export default getters;
