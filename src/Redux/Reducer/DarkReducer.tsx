import {
    DARK_MODE_SUCCESS,
    DARK_MODE_FAIL,
    GET_DARK_MODE,
    SELECTED_MODE,
    GRID_MODE_SUCCESS
} from '../Constant';


const initialState = {
    darkMode: false,
    mode: false,
    gridMode: false,
    error: null,
};

const darkModeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case DARK_MODE_SUCCESS:
            return {
                ...state,
                darkMode: action.payload,
            };
        case DARK_MODE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case GET_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload,
            };
        case SELECTED_MODE:
            return {
                ...state,
                mode: !state.mode
            };
        case GRID_MODE_SUCCESS:
            return {
                ...state,
                gridMode: !state.gridMode
            };
        default:
            return state;
    }
}

export default darkModeReducer;