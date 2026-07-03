import React from 'react';
import { View, ToastAndroid, Keyboard } from 'react-native';
import styles from './Styles';
import { HeaderC, ButtonC } from '../../Components/Components';
import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotes } from '../../Redux/Action/NotesAction';

const NotesUpdate = ({ navigation, route }: any) => {
  const { id } = route?.params;
  const { notes } = useSelector((state: any) => state.NOTES);
  // find note by id
  const note = Array.isArray(notes) ? notes.find((item: any) => item?._id === id) : [];
  const dispatch = useDispatch<any>();
  const { colors } = useTheme();
  const [title, setTitle] = React.useState(note?.title);
  const [description, setDescription] = React.useState(note?.description);
  const [loading, setLoading] = React.useState(false);


  // update notes
  const updateNotesFunction = async () => {
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
      const response = await dispatch(updateNotes(id, title, description, note));
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
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderC
        showBack={true}
        backOnPress={() => navigation.goBack()}
        title='Update Notes'
        showMenu={false}
      />
      <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
        <TextInput
          mode='flat'
          label='title'
          placeholder='Enter your title'
          multiline
          value={title}
          onChangeText={setTitle}
          style={{ backgroundColor: 'transparent' }}
          contentStyle={{ fontSize: 20, fontWeight: '700' }}
          activeUnderlineColor='transparent'
        />
        <TextInput
          mode='flat'
          label='Description'
          placeholder='Enter your description'
          multiline
          value={description}
          onChangeText={setDescription}
          style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}
          activeUnderlineColor='transparent'
        />
        <ButtonC
          title='Save'
          mode='contained'
          loading={loading}
          disabled={loading}
          textColor="white"
          buttonStyle={{ borderRadius: 8, backgroundColor: colors.primary }}
          onPress={updateNotesFunction}
        />
      </View>

    </View>
  );
}

export default NotesUpdate;
