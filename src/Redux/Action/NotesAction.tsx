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
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';


// create address
export const createNotes = (title: string, description: string) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v2/notes/createnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_NOTES_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: NOTES_CREATE_SUCCESS, payload: data.notes });
        ToastAndroid.show('Address added successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: GET_NOTES_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// get user address
export const getNotes = () => async (dispatch: any) => {
    try {
        dispatch({ type: GET_NOTES_REQUEST });
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v2/notes/getallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_NOTES_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: GET_NOTES_SUCCESS, payload: data.notes });
        return { success: true };
    } catch (error: any) {
        dispatch({ type: GET_NOTES_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// update address
export const updateNotes = (id: string, title: string, description: string, oldNotes: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const updateNote: any = {};
        if (title !== oldNotes.title) updateNote.title = title;
        if (description !== oldNotes.description) updateNote.description = description;
        const response = await fetch(`${BASE_URL}/api/v2/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updateNote),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_NOTES_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: NOTES_UPDATE_SUCCESS, payload: data.notes });
        ToastAndroid.show('Address updated successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: GET_NOTES_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// delete address
export const deleteNotes = (ids: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v2/notes/deletenotes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ ids }),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_NOTES_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: NOTES_DELETE_SUCCESS, payload: data.notes });
        ToastAndroid.show('Address deleted successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: GET_NOTES_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// pinned function
export const pinnedNotes = (id: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v2/notes/pinnednotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_NOTES_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: PINNED_NOTES_SUCCESS, payload: data.notes });
        ToastAndroid.show('Pinned successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: GET_NOTES_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// search api function
export const searchNotesFunction = (search: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        const response = await fetch(`${BASE_URL}/api/v2/notes/searchnotes?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: GET_NOTES_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: NOTES_SEARCH_SUCCESS, payload: data.notes });
        return { success: true };
    } catch (error: any) {
        dispatch({ type: GET_NOTES_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};