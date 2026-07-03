import {
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,
    GET_TODOS_FAIL,
    TODO_UPDATE_SUCCESS,
    TODO_DELETE_SUCCESS,
    TODO_CREATE_SUCCESS,
    TODO_COMPLETE_SUCCESS,
    TODO_HIDE_SUCCESS,
} from '../Constant';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

// get todo
export const getTodos = () => async (dispatch: any) => {
    try {
        dispatch({ type: GET_TODOS_REQUEST });
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v2/todos/getalltodos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_TODOS_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: GET_TODOS_SUCCESS, payload: data.todos });
        return { success: true };
    } catch (error: any) {
        dispatch({ type: GET_TODOS_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// create todo
export const createTodo = (content: any, dueDate: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v2/todos/createtodo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ content, dueDate }),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_TODOS_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: TODO_CREATE_SUCCESS, payload: data.todos });
        ToastAndroid.show('Todo added successfully', ToastAndroid.SHORT);
        return {
            success: true,
            todo: data.todos
        };
    } catch (error: any) {
        dispatch({ type: GET_TODOS_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// update todo
export const updateTodo = (id: string, content: any, dueDate: any, oldTodo: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const updateTodo: any = {};
        if (content !== oldTodo) {
            updateTodo.content = content;
        }
        if (dueDate !== oldTodo) {
            updateTodo.dueDate = dueDate;
        }
        const response = await fetch(`${BASE_URL}/api/v2/todos/updatetodo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updateTodo),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_TODOS_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: TODO_UPDATE_SUCCESS, payload: data.todos });
        ToastAndroid.show('Todo updated successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: GET_TODOS_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// delete todo
export const deleteTodo = (ids: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v2/todos/deletetodos`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ ids }),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_TODOS_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: TODO_DELETE_SUCCESS, payload: data.todos });
        ToastAndroid.show('Todo deleted successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: GET_TODOS_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// toggle todo mode
export const toggleCompletedTodo = (id: any) => async (dispatch: any) => {
    try {
        const token = AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        };
        const response = await fetch(`${BASE_URL}/api/v2/todos/toggletodo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_TODOS_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: TODO_COMPLETE_SUCCESS, payload: data.todo });
        // ToastAndroid.show('Todo completed successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// hide function 
export const todoHideFunction = () => async (dispatch: any) => {
    dispatch({ type: TODO_HIDE_SUCCESS });
};