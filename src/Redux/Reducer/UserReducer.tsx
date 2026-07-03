import {
    USER_SIGNUP_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_PROFILE_SUCCESS,
    USER_PICTURE_UPDATE_SUCCESS
} from '../Constant';

const initialState = {
    token: null,
    userToken: null,
    loading: true,
    user: null,
    darkMode: false,
    error: null,
};


const userAuthReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: action.payload.token,
                userToken: action.payload.userToken
            };
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case USER_SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload,
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: null,
                userToken: null
            };
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                userToken: action.payload.userToken,
                error: null
            };
        case USER_PICTURE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null
            };
        default:
            return state;
    }
}

export default userAuthReducer;