import {
    GET_NOTES_REQUEST,
    GET_NOTES_SUCCESS,
    GET_NOTES_FAIL,
    NOTES_UPDATE_SUCCESS,
    NOTES_DELETE_SUCCESS,
    NOTES_CREATE_SUCCESS,
    PINNED_NOTES_SUCCESS,
    NOTES_SEARCH_SUCCESS
} from '../Constant';


const initialState = {
    notes: [],
    searchNotes: [],
    loading: false,
    error: null,
};

const notesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_NOTES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                notes: action.payload,
            }
        case GET_NOTES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case NOTES_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                notes: action.payload,
            }
        case NOTES_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                notes: action.payload,
            }
        case NOTES_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                notes: action.payload,
            };
        case PINNED_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                notes: action.payload,
            };
        case NOTES_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                searchNotes: action.payload,
            }
        default:
            return state;
    }
}

export default notesReducer