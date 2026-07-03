import { combineReducers } from "redux";
import userAuthReducer from "./Reducer/UserReducer";
import darkModeReducer from "./Reducer/DarkReducer";
import notesReducer from "./Reducer/NotesReducer";
import todoReducer from "./Reducer/TodoReducer";


export const rootReducer = combineReducers({
    USER: userAuthReducer,
    DARK: darkModeReducer,
    NOTES: notesReducer,
    TODOS: todoReducer
});