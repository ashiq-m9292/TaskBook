import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';
import { useTheme } from 'react-native-paper';

const BottomButton = ({shareName, shareOnPress, shareDisabled, deleteOnPress, pinName, pinOnPress, pinDisabled, disabled }: any) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <TouchableOpacity onPress={shareOnPress} disabled={shareDisabled}>
                <Icon name={shareName} size={30} color={colors.onBackground} />
            </TouchableOpacity >
            <TouchableOpacity onPress={deleteOnPress} disabled={disabled}>
                <Icon name='delete' size={30} color={colors.onBackground} />
            </TouchableOpacity>
            <TouchableOpacity onPress={pinOnPress} disabled={pinDisabled}>
                <Icon name={pinName} size={30} color={colors.onBackground} />
            </TouchableOpacity>
        </View>
    );
}

export default BottomButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 26,
        paddingHorizontal: 20,
        borderTopWidth: 0.2,
    }
});
