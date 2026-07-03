import React, { useRef } from 'react';
import { FlatList, ToastAndroid, View, Share, BackHandler } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from './Styles';
import { HeaderC, GridCard, Loader, ListCard, CreateButton, BottomButton, TextCenter } from '../../Components/Components';
import { useDispatch, useSelector } from 'react-redux';
import { getDarkMode, handleGridMode, setDarkMode, toggleMode } from '../../Redux/Action/DarkAction';
import { deleteNotes, getNotes, pinnedNotes } from '../../Redux/Action/NotesAction';
import { singlePress } from '../../helper/SinglePress';
import { formatTime, sliceFunction, handleDarkMode, handleGridModeFunction, handleSelectAllId } from '../../Utility/Helper';
import refreshHook from '../../Hooks/Refresh';
import useSelection from '../../Hooks/Selection';
import { getProfile } from '../../Redux/Action/UserAction';


const Notes = ({ navigation }: any) => {
  const { refresh, onRefresh } = refreshHook(() => dispatch(getNotes()));
  const { selectedIds, handleSelect, setSelectedIds } = useSelection();
  const { darkMode, mode, gridMode } = useSelector((state: any) => state.DARK);
  const { user } = useSelector((state: any) => state.USER);
  const { colors } = useTheme();
  const { loading, notes } = useSelector((state: any) => state.NOTES);
  const dispatch = useDispatch<any>();
  const [showMenu, setShowMenu] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const backPressCount = useRef(0);

  // share notes data 
  const shareNotes = Array.isArray(notes) ? notes.find((item: any) => selectedIds.includes(item?._id)) : [];
  // share function
  const onShare = async ({ title, description }: any) => {
    if (selectedIds.length === 0) {
      ToastAndroid.show('Please select at least one note', ToastAndroid.SHORT);
      return
    }
    try {
      const result = await Share.share({
        message: `${title}\n\n${description}`,
      });
      setSelectedIds([]);
      dispatch(toggleMode());
      return result;
    } catch (error: any) {
      ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
      return;
    }
  };

  // toggle mode
  const handleToggleMode = () => {
    if (notes?.length === 0) return
    try {
      dispatch(toggleMode());
      setShowMenu(false);
      setSelectedIds([]);
    } catch (error: any) {
      ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
    }
  };
  // pinned function 
  const pinnedfuntion = async (id: any) => {
    if (selectedIds.length === 0) {
      ToastAndroid.show('Please select at least one note', ToastAndroid.SHORT);
      return
    }
    if (selectedIds.length > 1) {
      ToastAndroid.show('Please select only one note', ToastAndroid.SHORT);
      return
    }
    setDeleteLoading(true);
    try {
      const response = await dispatch(pinnedNotes(id));
      if (response.success) {
        setSelectedIds([]);
        dispatch(toggleMode());
        setShowMenu(false);
        dispatch(getNotes());
      }
    } catch (error) {
      console.warn(error);
      return
    } finally {
      setDeleteLoading(false);
    }
  }
  // find note by id
  const note = Array.isArray(notes) ? notes.find((item: any) => item?._id === selectedIds[0]) : [];
  // delete function
  const handleDelete = async () => {
    try {
      if (selectedIds.length === 0) {
        ToastAndroid.show('Please select at least one note', ToastAndroid.SHORT);
        return;
      }
      setDeleteLoading(true);
      const response = await dispatch(deleteNotes(selectedIds));
      if (response.success) {
        setSelectedIds([]);
        dispatch(toggleMode());
        setShowMenu(false);
      }
    } catch (error: any) {
      ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
      return;
    } finally {
      setTimeout(() => {
        setDeleteLoading(false)
      }, 700);
    }
  };

  // back handle with useEffect
  React.useEffect(() => {
    const backAction = () => {
      if (showMenu) {
        setShowMenu(false);
        return true;
      }
      if (mode) {
        handleToggleMode();
        setSelectedIds([]);
        return true;
      }
      // if there are privious screen normally go back
      if (navigation.canGoBack()) {
        return false;
      }
      // double press to exit
      if (backPressCount.current === 0) {
        backPressCount.current = 1;
        ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
        setTimeout(() => {
          backPressCount.current = 0;
        }, 2000);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [showMenu, mode]);

  // useEffect 
  React.useEffect(() => {
    dispatch(getNotes());
    dispatch(getDarkMode());
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderC
        notesLength={notes?.length}
        closeOnPress={handleToggleMode}
        title='Notes'
        showSearch={mode ? false : true}
        searchOnPress={() => navigation.navigate('Search')}
        avatarOnPress={() => navigation.navigate('AccountScreen')}
        source={{ uri: user?.picture?.url ? user?.picture?.url : 'https://i.pravatar.cc/300' }}
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        dotsOnPress={() => setShowMenu(true)}
        editOnPress={handleToggleMode}
        darkOnPress={() => {
          handleDarkMode(() => dispatch(setDarkMode()));
          setShowMenu(false);
        }}
        darkTitle={darkMode ? 'Light Mode' : 'Dark Mode'}
        gridOnPress={() => {
          handleGridModeFunction(() => dispatch(handleGridMode()));
          setShowMenu(false);
        }}
        gridTitle={gridMode ? 'List Mode' : 'Grid Mode'}
        selectAllOnPress={() => handleSelectAllId({ data: notes, setState: setSelectedIds, key: '_id' })}
        itemSelect={selectedIds?.length}
      />

      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loader
              color='red'
              size='large'
            />
          </View>
        ) : notes?.length > 0 ? (
          <FlatList
            refreshing={refresh}
            onRefresh={onRefresh}
            data={notes}
            keyExtractor={(item: any) => item._id}
            showsVerticalScrollIndicator={false}
            key={gridMode ? 'grid' : 'list'}
            numColumns={gridMode ? 2 : 1}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }: any) => (
              gridMode ? (
                <GridCard
                  onLongPress={() => {
                    handleToggleMode();
                    mode ? setSelectedIds([]) : handleSelect(item._id);
                  }}

                  gridCardOnPress={() => singlePress(() => {
                    mode ? handleSelect(item._id) : navigation.navigate('NotesUpdate', { id: item._id })
                  })}
                  title={sliceFunction(item.title, 20)}
                  description={sliceFunction(item.description, 40)}
                  time={formatTime(item?.createdAt)}
                  showBouncy={mode ? true : false}
                  isChecked={selectedIds.includes(item._id)}
                  bouncyOnPress={() => handleSelect(item._id)}
                />
              ) : (
                <ListCard
                  showPin={item?.isPinned ? true : false}
                  pinName={item?.isPinned ? 'pin' : 'pin-off'}
                  onLongPress={() => {
                    handleToggleMode();
                    mode ? setSelectedIds([]) : handleSelect(item._id);
                  }}
                  listCardOnPress={() => singlePress(() => {
                    mode ? handleSelect(item._id) : navigation.navigate('NotesUpdate', { id: item._id })
                  })}
                  title={sliceFunction(item.title, 20)}
                  description={sliceFunction(item.description, 40)}
                  time={formatTime(item?.createdAt)}
                  showBouncy={mode ? true : false}
                  isChecked={selectedIds.includes(item._id)}
                  bouncyOnPress={() => handleSelect(item._id)}
                />
              )
            )}
          />
        ) : (
          <TextCenter title='No notes found' />
        )
      }

      {/* create button */}
      {
        mode ? null : (
          <CreateButton
            createOnPress={() => singlePress(() => {
              navigation.navigate('NotesCreate')
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
            shareName='share'
            pinName={note?.isPinned ? 'pin-off' : 'pin'}
            pinOnPress={() => pinnedfuntion(selectedIds)}
            pinDisabled={deleteLoading}
            shareOnPress={() => onShare({ title: shareNotes?.title, description: shareNotes?.description })}
          />
        ) : null
      }


    </View >
  );
}

export default Notes;


