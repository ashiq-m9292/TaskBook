import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from '@react-native-vector-icons/material-design-icons';

const GridCard = ({ pinName, showPin, title, description, time, listCardOnPress, showBouncy, isChecked, bouncyOnPress, onLongPress }: any) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity activeOpacity={0.6} style={[styles.conatainer, { backgroundColor: colors.background }]} onPress={listCardOnPress} onLongPress={onLongPress}>
            {showPin ? (
                <Icon name={pinName} size={24} color={colors.onBackground} />
            ) : null}
            <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
                <Text variant='titleMedium' style={{ fontWeight: 'bold' }}>{title}</Text>
                <Text variant='titleSmall'>{description}</Text>
                <Text variant='titleSmall'>{time}</Text>
            </View>
            <View>
                {showBouncy && (
                    <BouncyCheckbox
                        size={25}
                        fillColor='green'
                        isChecked={isChecked}
                        onPress={bouncyOnPress}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
}

export default GridCard;


const styles = StyleSheet.create({
    conatainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: moderateScale(30),
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: moderateScale(10),
        margin: moderateScale(8),
        padding: moderateScale(10),
    },
    contentContainer: {
        flex: 1,
        gap: moderateScale(10),
    },
});
