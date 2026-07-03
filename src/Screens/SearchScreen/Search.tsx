import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ToastAndroid, Keyboard } from 'react-native';
import { useTheme, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { searchNotesFunction } from '../../Redux/Action/NotesAction';
import { ListCard } from '../../Components/Components';
import { formatTime, sliceFunction } from '../../Utility/Helper';
import { singlePress } from '../../helper/SinglePress';

const Search = ({ navigation }: any) => {
    const { colors } = useTheme();
    const { loading, searchNotes } = useSelector((state: any) => state.NOTES);
    const [search, setSearch] = React.useState('');
    const dispatch = useDispatch<any>();

    // handle search 
    const handleSearch = async () => {
        Keyboard.dismiss();
        try {
            const query = search.trim()
            if (!query || query === '') {
                ToastAndroid.show('Please enter something', ToastAndroid.SHORT);
                return
            }
            const response = await dispatch(searchNotesFunction(query));
            if (response?.success) {
                setSearch('')
            }
        } catch (error: any) {
            ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
            return
        }
    };
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* header  */}
            <View style={styles.headerContainer}>
                <TextInput
                    label={'search note'}
                    placeholder='search note'
                    mode='outlined'
                    style={{ backgroundColor: colors.background, width: '80%' }}
                    activeUnderlineColor='transparent'
                    outlineStyle={{ borderRadius: 16 }}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    onSubmitEditing={handleSearch}
                    autoFocus
                />
                <TouchableOpacity style={{ width: '16%' }} onPress={handleSearch}>
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>

            {/* body  */}
            {
                loading ? (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                ) : search.trim() === '' && searchNotes?.length > 0 ? (
                    <FlatList
                        data={searchNotes}
                        renderItem={({ item }) => (
                            <ListCard
                                showPin={item?.isPinned ? true : false}
                                pinName={item?.isPinned ? 'pin' : 'pin-off'}
                                listCardOnPress={() => singlePress(() => {
                                    navigation.navigate('NotesUpdate', { id: item._id })
                                })}
                                title={sliceFunction(item.title, 20)}
                                description={sliceFunction(item.description, 40)}
                                time={formatTime(item?.createdAt)}
                            />
                        )}
                    />
                ) : (
                    <View>
                        <Text> No Search notes</Text>
                    </View>
                )
            }
        </View>
    );
}

export default Search;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: 'green',
        elevation: 1
    }
});
