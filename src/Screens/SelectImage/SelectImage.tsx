import React from 'react';
import { View, StyleSheet, TouchableOpacity, ToastAndroid, PermissionsAndroid, Platform } from 'react-native';
import { useTheme, Avatar } from 'react-native-paper';
import Icon from '@react-native-vector-icons/material-design-icons';
import ButtonC from '../../Components/ButtonC';
import { ImageLibraryOptions, launchImageLibrary, Asset, launchCamera, CameraOptions } from 'react-native-image-picker';
import { getProfile, updateProfilePicture } from '../../Redux/Action/UserAction';
import { useDispatch } from 'react-redux';


const SelectImage = ({ navigation }: any) => {
    const { colors } = useTheme();
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch<any>();
    const [image, setImage] = React.useState<Asset | null>(null);

    // openImageLibrary function
    const openImageLibrary = async () => {
        try {
            const options: ImageLibraryOptions = {
                mediaType: 'photo',
                selectionLimit: 1,
                quality: 1,
            }
            const result = await launchImageLibrary(options);
            if (result.didCancel) return;
            if (result.errorCode) {
                return;
            }
            if (result.assets && result.assets.length > 0) {
                setImage(result.assets[0]);
            }
        } catch (error) {
            console.log('Error opening image library:', error);
        }
    };

    // camera permission request for android
    const requestCameraPermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs access to your camera',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    return true;
                }
                ToastAndroid.show('Camera permission denied', ToastAndroid.SHORT);
                return false;
            } catch (error) {
                console.log('Error requesting camera permission:', error);
                return false;
            }
        }
        return true;
    };

    // openCamera function
    const openCamera = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            return;
        }
        try {
            const options: CameraOptions = {
                mediaType: 'photo',
                quality: 1,
            }
            const result = await launchCamera(options);
            if (result.didCancel) return;
            if (result.errorCode) {
                return;
            }
            if (result.assets && result.assets.length > 0) {
                setImage(result.assets[0]);
            }
        } catch (error) {
            console.log('Error opening camera:', error);
        }
    };

    // update profile picture
    const updateProfile = async () => {
        if (!image) {
            ToastAndroid.show('Please select an image first', ToastAndroid.SHORT);
            return;
        }
        setLoading(true);
        try {
            const response = await dispatch(updateProfilePicture(image));
            if (response?.success) {
                setImage(null);
                navigation.goBack();
                dispatch(getProfile());
            };
        } catch (error) {
            console.log('Error creating form data:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* avatar */}
            <TouchableOpacity activeOpacity={0.7} onPress={openImageLibrary} disabled={loading}>
                <Avatar.Image
                    source={{ uri: image?.uri || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                    size={160}
                />
            </TouchableOpacity>

            {/* camera icon */}
            <TouchableOpacity activeOpacity={0.7} onPress={openCamera} disabled={loading}>
                <Icon name="camera" size={50} color={colors.onBackground} />
            </TouchableOpacity>

            {/* button to save image */}
            <ButtonC
                disabled={loading}
                loading={loading}
                title="Save"
                mode="contained"
                textColor={'white'}
                onPress={updateProfile}
                buttonStyle={{ width: '30%', alignSelf: 'center', backgroundColor: colors.secondary, borderRadius: 6 }}

            />
        </View>
    );
}

export default SelectImage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50,
    },
});

