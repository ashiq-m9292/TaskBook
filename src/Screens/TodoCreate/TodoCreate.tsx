import React from 'react';
import { Keyboard, ToastAndroid, TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import { HeaderC, InputC, ButtonC } from '../../Components/Components';
import { Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { createTodo, getTodos } from '../../Redux/Action/TodoAction';
import DatePicker from 'react-native-date-picker';
import Icon from '@react-native-vector-icons/material-design-icons';
import { formatTime } from '../../Utility/Helper';
import { scheduleNotification } from '../../Components/NotifeeC';

const TodoCreate = ({ navigation }: any) => {
    const { colors } = useTheme();
    const dispatch = useDispatch<any>();
    const [content, setContent] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [showPicker, setShowPicker] = React.useState(false);
    const [newDate, setNewDate] = React.useState<Date | null>(null);

    const createTodoFunction = async () => {
        Keyboard.dismiss();
        if (!content.trim()) {
            ToastAndroid.show('Please enter todo', ToastAndroid.SHORT);
            return;
        }
        setLoading(true);
        try {
            const response = await dispatch(createTodo(content, newDate ? newDate : ''));
            if (response?.success) {
                scheduleNotification({ id: response?.todo?._id, title: 'Please complete your todo', body: response?.todo?.content, screen: 'TodoUpdate', todoId: response?.todo?._id, timestamp: newDate?.getTime() || null });
                setContent('');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Bottom', params: { screen: 'Todos' } }],
                })
                dispatch(getTodos());
            }
        } catch (error: any) {
            ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
            return
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 700);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <HeaderC
                showBack={true}
                backOnPress={() => navigation.goBack()}
                title='Create Todo'
                showMenu={false}
            />
            <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
                <InputC
                    label='content'
                    placeholder='Enter your title'
                    mode='outlined'
                    vaule={content}
                    onChangeText={(text: any) => setContent(text)}
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
                        mode='datetime'
                        date={newDate || new Date()}
                        onConfirm={(selectedDate) => {
                            setShowPicker(false);
                            setNewDate(selectedDate);
                        }}
                        onCancel={() => {
                            setShowPicker(false)
                        }}
                    />
                </View>
                <ButtonC
                    title='create'
                    mode='contained'
                    loading={loading}
                    disabled={loading}
                    textColor="white"
                    buttonStyle={{ borderRadius: 8, backgroundColor: colors.primary }}
                    onPress={createTodoFunction}
                />
            </View>
        </View>
    );
}

export default TodoCreate;
