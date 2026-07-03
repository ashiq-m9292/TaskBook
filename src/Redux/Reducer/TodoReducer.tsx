import {
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,
    GET_TODOS_FAIL,
    TODO_UPDATE_SUCCESS,
    TODO_DELETE_SUCCESS,
    TODO_CREATE_SUCCESS,
    TODO_COMPLETE_SUCCESS,
    TODO_HIDE_SUCCESS
} from '../Constant';


const initialState = {
    todos: [],
    loading: false,
    error: null,
    todoHide: false
};


const todoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_TODOS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case GET_TODOS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                todos: action.payload,
            }
        case GET_TODOS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case TODO_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                todos: action.payload,
            }
        case TODO_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                todos: action.payload,
            }
        case TODO_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                todos: action.payload,
            }
        case TODO_COMPLETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                todos: action.payload,
            };
        case TODO_HIDE_SUCCESS:
            return {
                ...state,
                loaidng: false,
                todoHide: !state.todoHide,
            };
        default:
            return state;
    }
};

export default todoReducer;