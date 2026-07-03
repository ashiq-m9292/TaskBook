import React from 'react';
import { View, ToastAndroid, Keyboard, TouchableOpacity } from 'react-native';
import styles from './Styles';
import { HeaderC, ButtonC } from '../../Components/Components';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, updateTodo } from '../../Redux/Action/TodoAction';
import Icon from '@react-native-vector-icons/material-design-icons';
import { formatTime } from '../../Utility/Helper';
import DatePicker from 'react-native-date-picker';
import { cancelNotification, scheduleNotification } from '../../Components/NotifeeC';

const TodoUpdate = ({ navigation, route }: any) => {
    const { id } = route?.params;
    const { todos } = useSelector((state: any) => state.TODOS);
    // find note by id
    const todo = Array.isArray(todos) ? todos.find((item: any) => item?._id === id) : [];
    const dispatch = useDispatch<any>();
    const { colors } = useTheme();
    const [content, setContent] = React.useState(todo?.content || '');
    const [loading, setLoading] = React.useState(false);
    const [showPicker, setShowPicker] = React.useState(false);
    const [newDate, setNewDate] = React.useState<Date | null>(todo?.dueDate ? new Date(todo?.dueDate) : null);


    // update notes
    const updateTodoFunction = async () => {
        if (!content.trim() || content.trim().length === 0) {
            ToastAndroid.show('Please enter title and description', ToastAndroid.SHORT);
            return;
        };
        Keyboard.dismiss();
        setLoading(true);
        try {
            await cancelNotification(todo?._id);
            const response = await dispatch(updateTodo(id, content, newDate ? newDate : '', todo));
            if (response?.success) {
                scheduleNotification({ id: todo?._id, title: 'Please complete your todo', body: content, screen: 'Todos', todoId: todo?._id, timestamp: newDate?.getTime() || null });
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Bottom', params: { screen: 'Todos' } }],
                })
                dispatch(getTodos());
            }
        } catch (error: any) {
            ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
            return;
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 700);
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <HeaderC
                showBack={true}
                backOnPress={() => navigation.goBack()}
                title='Update Todo'
                showMenu={false}
            />
            <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
                <TextInput
                    mode='flat'
                    label='content'
                    placeholder='Enter your content'
                    multiline
                    value={content}
                    onChangeText={(text: any) => setContent(text)}
                    style={{ backgroundColor: 'transparent' }}
                    contentStyle={{ fontSize: 20, fontWeight: '700' }}
                    activeUnderlineColor='transparent'
                />
                <View style={styles.dateTimePickerContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => {
                            setShowPicker(true);
                        }}>
                            <Icon name='calendar-outline' size={30} color={colors.onBackground} />
                        </TouchableOpacity>

                    </View>
                    <Text variant='titleMedium'>{newDate ? formatTime(newDate) : 'Select Date And Time'}</Text>
                    <DatePicker
                        modal
                        open={showPicker}
                        date={newDate || new Date()}
                        mode='datetime'
                        onConfirm={(date: any) => {
                            setShowPicker(false);
                            setNewDate(date);
                        }}
                        onCancel={() => {
                            setShowPicker(false);
                        }}
                    />
                </View>
                <ButtonC
                    title='Save'
                    mode='contained'
                    loading={loading}
                    disabled={loading}
                    textColor="white"
                    buttonStyle={{ borderRadius: 8, backgroundColor: colors.primary }}
                    onPress={updateTodoFunction}
                />
            </View>

        </View>
    );
}

export default TodoUpdate;
