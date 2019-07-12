// service : brands, influencer, client, market  총 4가지 서비스를 관리.
const state = {
    service: '',
    isQuestionTab: true,
    join: {
        termIndex: 1,
        formData: {
            termsOfUse: false,
            termsOfIMS: false,
            sns: {
                facebook: false,
                instagram: false,
                youtube: false,
                naver: false,
                twiter: false
            },
            manuscriptFee: {
                
            }

        }
    }
};

export default state;
