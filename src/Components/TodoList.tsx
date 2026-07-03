import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Text } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';


const TodoList = ({ containerOnPress, isChecked, bouncyOnPress, content, style, showDateTime, dateTime, showLeftBouncy, showRightBouncy, rightIsChecked, rightBouncyOnPress }: any) => {
    return (
        <TouchableOpacity onPress={containerOnPress} activeOpacity={0.6} style={styles.container}>
            {showLeftBouncy && <BouncyCheckbox size={25} fillColor='green' isChecked={isChecked} onPress={bouncyOnPress} style={styles.leftBouncy} />}
            <View style={styles.contentContainer}>
                <Text variant='titleMedium'>{content}</Text>
                {showDateTime && <Text variant='titleSmall' style={style}>{dateTime}</Text>}
            </View>
            {showRightBouncy && <BouncyCheckbox size={25} fillColor='green' isChecked={rightIsChecked} onPress={rightBouncyOnPress} style={styles.rightBouncy} />}
        </TouchableOpacity>
    );
}

export default TodoList;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: moderateScale(10),
        margin: moderateScale(8),
        padding: moderateScale(10),
        minHeight: moderateScale(60),
    },
    contentContainer: {
        width: '80%',
        gap: moderateScale(6),
    },
    leftBouncy: {
        width: '14%',
    },
    rightBouncy: {
        width: '14%',
        marginLeft: moderateScale(20),
    }

});