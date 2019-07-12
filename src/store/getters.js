const getters = {
    getByJoinData(store) {
        return store.join;
    },
    getByFormData(store) {
        return store.join.formData;
    }
};

export default getters;
