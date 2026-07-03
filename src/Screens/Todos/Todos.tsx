import React from 'react';
import { SectionList, ToastAndroid, View } from 'react-native';
import styles from './Styles';
import { Text, useTheme } from 'react-native-paper';
import { BottomButton, CreateButton, HeaderC, Loader, TodoList, TextCenter } from '../../Components/Components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodos, todoHideFunction, toggleCompletedTodo } from '../../Redux/Action/TodoAction';
import { singlePress } from '../../helper/SinglePress';
import { toggleMode } from '../../Redux/Action/DarkAction';
import { formatTime, handleSelectAllId } from '../../Utility/Helper';
import useSelection from '../../Hooks/Selection';
import refreshHook from '../../Hooks/Refresh';
import { cancelNotification } from '../../Components/NotifeeC';
import { getProfile } from '../../Redux/Action/UserAction';

const Todos = ({ navigation }: any) => {
  const { colors } = useTheme();
  const { mode } = useSelector((state: any) => state.DARK);
  const { user } = useSelector((state: any) => state.USER);
  const { onRefresh, refresh } = refreshHook(() => dispatch(getTodos()));
  const { selectedIds, handleSelect, setSelectedIds } = useSelection();
  const { loading, todos, todoHide } = useSelector((state: any) => state.TODOS);
  const dispatch = useDispatch<any>();
  const [showMenu, setShowMenu] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const sectionTodoList: Array<{ title: string; data: any[]; }> = [
    {
      title: 'Todos',
      data: Array.isArray(todos) ? todos.filter((todo: any) => !todo?.isCompleted) : [],
    },
    {
      title: 'Completed',
      data: todoHide ? [] : Array.isArray(todos) ? todos.filter((todo: any) => todo?.isCompleted) : [],
    },
  ].filter((section) => section.data.length > 0);

  // todo delete function
  const handleDelete = async () => {
    try {
      if (selectedIds.length === 0) {
        ToastAndroid.show('Please select at least one note', ToastAndroid.SHORT);
        return;
      }
      setDeleteLoading(true);
      const response = await dispatch(deleteTodo(selectedIds));
      if (response.success) {
        await cancelNotification(selectedIds);
        setSelectedIds([]);
        dispatch(toggleMode());
        setShowMenu(false);
      }
    } catch (error: any) {
      ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
    } finally {
      setTimeout(() => {
        setDeleteLoading(false)
      }, 700);
    }
  };
  // complete or incomplete toggle function
  const handleToggle = async (id: any) => {
    try {
      const response = await dispatch(toggleCompletedTodo(id));
      if (response?.success) {
        dispatch(getTodos());
      };
    } catch (error: any) {
      ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
      return
    }
  }
  // handle mode
  const handleToggleMode = () => {
    if (todos?.length === 0) return
    try {
      dispatch(toggleMode());
      setShowMenu(false);
      setSelectedIds([]);
    } catch (error: any) {
      ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
    }
  };  // hide completed function
  const todoHideToggleFunction = () => {
    try {
      dispatch(todoHideFunction());
      setShowMenu(false);
    } catch (error: any) {
      ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
    }
  }
  // show expired date 
  const isExpired = (dueDate: any) => {
    if (!dueDate) return false;
    const currentDate = new Date();
    const dueDateTime = new Date(dueDate).getTime();
    return currentDate.getTime() > dueDateTime;
  }
  // isCompleted true or false handle function
  const isCompleted = (todo: any) => {
    return todo?.isCompleted === true;
  }
  // useEffect
  React.useEffect(() => {
    dispatch(getTodos());
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderC
        title='Todos'
        notesLength={todos?.length}
        avatarOnPress={() => navigation.navigate('AccountScreen')}
        source={{ uri: user?.picture?.url ? user?.picture?.url : 'https://i.pravatar.cc/300' }}
        closeOnPress={handleToggleMode}
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        dotsOnPress={() => setShowMenu(true)}
        editOnPress={handleToggleMode}
        itemSelect={selectedIds?.length}
        selectAllOnPress={() => handleSelectAllId({ data: todos, setState: setSelectedIds, key: '_id' })}
        darkTitle={todoHide ? 'show completed' : 'hide completed'}
        darkOnPress={todoHideToggleFunction}
        gridTitle="settings"
      />

      {/* section list */}
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loader color={colors.primary} size='large' />
          </View>
        ) : todos?.length > 0 ? (
          <SectionList
            refreshing={refresh}
            onRefresh={onRefresh}
            sections={sectionTodoList}
            renderSectionHeader={({ section }: any) => {
              if (section?.title === 'Todos') {
                return null
              }
              return (
                <View style={{ marginTop: 6, marginLeft: 10 }}>
                  <Text variant='titleMedium'>{section?.title}</Text>
                </View>
              )
            }}
            renderItem={({ item, index }: any) => (
              <TodoList
                key={index}
                containerOnPress={() => mode ? handleSelect(item?._id) : navigation.navigate('TodoUpdate', { id: item?._id })}
                showLeftBouncy={mode ? false : true}
                isChecked={isCompleted(item)}
                bouncyOnPress={() => handleToggle(item?._id)}
                showRightBouncy={mode ? true : false}
                rightIsChecked={selectedIds.includes(item?._id)}
                rightBouncyOnPress={() => handleSelect(item?._id)}
                content={item?.content}
                showDateTime={item?.dueDate === null ? false : true}
                dateTime={formatTime(item?.dueDate)}
                style={{ color: isExpired(item?.dueDate) && !isCompleted(item) ? 'red' : 'green' }}
              />
            )}
          />
        ) : (
          <TextCenter title='No todos found' />
        )
      }

      {/* create button */}
      {
        mode ? null : (
          <CreateButton
            createOnPress={() => singlePress(() => {
              navigation.navigate('TodoCreate');
            })}
          />
        )
      }

      {/* bottom button */}
      {
        mode ? (
          <BottomButton
            deleteOnPress={handleDelete}
            disabled={deleteLoading}
          />
        ) : null
      }

    </View>
  );
}

export default Todos;
