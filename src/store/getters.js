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
    getCurrentIndex(store) {
        return store.currentIndex.currentIndex;
    },
    getJobList(store) {
        return store.jobList;
    },
    getTempSelectJobList(store) {
        return store.tempSelectJobList;
    },
    getChildrenAgeList(store) {
        return store.childrenAgeList;
    },
    getTempSelectChildrenList(store) {
        return store.tempSelectChildrenList;
    },
    getPetList(store) {
        return store.petList;
    },
    getTempSelectPetList(store) {
        return store.tempSelectPetList;
    },
    getUserIndex(store) {
        return store.userIndex;
    }
};

export default getters;
