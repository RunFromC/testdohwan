// service : brands, influencer, client, market  총 4가지 서비스를 관리.
const state = {
    JSESSIONID: null,
    service: '',
    iccMode: false,
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
            manuscriptFee: {}
        }
    },
    profileCard: {
        default: {
            on: true,
            save: false,
            onSaveButton: false
        },
        sns: {
            on: false,
            save: false,
            onSaveButton: false
        },
        pay: {
            on: false,
            save: false,
            onSaveButton: false
        },
        expectProduct: {
            on: false,
            save: false,
            onSaveButton: false
        },
        area: {
            on: false,
            save: false,
            onSaveButton: false
        },
        gender: {
            on: false,
            save: false,
            onSaveButton: false
        },
        age: {
            on: false,
            save: false,
            onSaveButton: false
        },
        job: {
            on: false,
            save: false,
            onSaveButton: false
        },
        interests: {
            on: false,
            save: false,
            onSaveButton: false
        },
        married: {
            on: false,
            save: false,
            onSaveButton: false
        },
        children: {
            on: false,
            save: false,
            onSaveButton: false
        },
        pet: {
            on: false,
            save: false,
            onSaveButton: false
        },
        bodyProfile: {
            on: false,
            save: false,
            onSaveButton: false
        },
        skinType: {
            on: false,
            save: false,
            onSaveButton: false
        },
        finishBlock: {
            on: false,
            save: false,
            onSaveButton: false
        }
    },
    currentCard: 'default',
    welcome: false,
    certification: null,
    currentIndex: 0
};

export default state;
