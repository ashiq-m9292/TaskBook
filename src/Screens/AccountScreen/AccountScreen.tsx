import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import { useTheme, Text, Avatar } from 'react-native-paper';
import { HeaderC, ButtonC, DividerC } from '../../Components/Components';
import { formatTime } from '../../Utility/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, logout } from '../../Redux/Action/UserAction';

const AccountScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const { user } = useSelector((state: any) => state.USER);
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = React.useState(false);

  // logout function
  const logoutUser = async () => {
    setLoading(true);
    try {
      const response = await dispatch(logout());
      if (response?.success) {
        setTimeout(() => {
          setLoading(false)
        }, 300);
      }
    } catch (error) {
      return error;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  // useEffect
  React.useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <View style={[styles.Container, { backgroundColor: colors.background }]}>
      {/* header */}
      <HeaderC
        backAction="true"
        onBackPress={() => navigation.goBack()}
        title="Account"
        showBack={true}
        backOnPress={() => navigation.goBack()}
        showMenu={false}
      />

      {/* body container */}
      <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
        {/* avatar container */}
        <View style={[styles.avatarContainer, { backgroundColor: colors.background }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('SelectImage')}>
            <Avatar.Image source={{ uri: user?.picture?.url ? user?.picture?.url : 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} size={80} />
          </TouchableOpacity>
          <Text variant='titleMedium' style={{ alignSelf: 'center', color: colors.onBackground, fontWeight: 'bold' }}>{user ? user?.email : '...'}</Text>
        </View>

        {/* user details */}
        <View style={[styles.infoContainer, { backgroundColor: colors.background }]}>
          <Text variant='titleLarge' style={{ alignSelf: 'center', color: colors.onBackground, fontWeight: 'bold' }}>Details </Text>
          <DividerC />
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>name: {user ? user?.name : '...'} </Text>
          <DividerC />
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>email: {user ? user?.email : '...'}</Text>
          <DividerC />
          <Text variant='titleMedium' style={{ fontWeight: 'bold', color: colors.onBackground }}>createdAt: {user ? formatTime(user?.createdAt) : '...'}</Text>
          <DividerC />
        </View>

        {/* logout button */}
        <ButtonC
          loading={loading}
          disabled={loading}
          title="Logout"
          mode="contained"
          textColor={'white'}
          onPress={logoutUser}
          buttonStyle={{ width: '30%', alignSelf: 'center', backgroundColor: colors.secondary, borderRadius: 6 }}
        />

      </View>

    </View>
  );
}

export default AccountScreen;
