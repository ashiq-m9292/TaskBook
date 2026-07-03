import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';
import { useTheme } from 'react-native-paper';

const CreateButton = ({ createOnPress }: any) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: colors.secondary }]} onPress={createOnPress} activeOpacity={0.6}>
            <Icon name='plus' size={30} color='black' />
        </TouchableOpacity>
    );
}

export default CreateButton;


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        right: 30,
        borderRadius: 40,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    }
});