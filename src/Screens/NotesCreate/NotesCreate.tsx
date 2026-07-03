import React from 'react';
import { Keyboard, ToastAndroid, View } from 'react-native';
import styles from './Styles';
import { HeaderC, InputC, ButtonC } from '../../Components/Components';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { createNotes } from '../../Redux/Action/NotesAction';

const NotesCreate = ({ navigation }: any) => {
  const { colors } = useTheme();
  const dispatch = useDispatch<any>();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // create notes
  const createNotesFunction = async () => {
    if (!title.trim() && !description.trim()) {
      ToastAndroid.show('Please enter title and description', ToastAndroid.SHORT);
      return;
    };
    if (title.trim().length === 0 && description.trim().length === 0) {
      ToastAndroid.show('Please enter title and description', ToastAndroid.SHORT);
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await dispatch(createNotes(title, description));
      if (response?.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Bottom' }],
        })
      }
    } catch (error: any) {
      ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
      return;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderC
        showBack={true}
        backOnPress={() => navigation.goBack()}
        title='Create Notes'
        showMenu={false}
      />
      <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
        <InputC
          label='title'
          placeholder='Enter your title'
          mode='outlined'
          vaule={title}
          onChangeText={setTitle}
        />
        <InputC
          label='Description'
          placeholder='Enter your description'
          mode='outlined'
          vaule={description}
          onChangeText={setDescription}
          multiline
        />
        <ButtonC
          title='Save'
          mode='contained'
          loading={loading}
          disabled={loading}
          textColor="white"
          buttonStyle={{ borderRadius: 8, backgroundColor: colors.primary }}
          onPress={createNotesFunction}
        />
      </View>
    </View>
  );
}

export default NotesCreate;
