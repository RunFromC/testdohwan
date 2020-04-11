import router from '../router';

const mutations = {
    setUserListNull(state) {
        console.log('!!');

        state.userList = [];
    }
};

export default mutations;
