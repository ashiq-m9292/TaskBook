import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const GridCard = ({ title, description, time, gridCardOnPress, isChecked, bouncyOnPress, showBouncy, onLongPress }: any) => {
  const { colors } = useTheme();


  return (
    <TouchableOpacity style={[styles.conatainer, { backgroundColor: colors.background }]} activeOpacity={0.6} onPress={gridCardOnPress} onLongPress={onLongPress}>
      <View style={styles.contentContaine}>
        <Text variant='titleMedium' style={{ fontWeight: 'bold' }}>{title}</Text>
        <Text variant='titleSmall'>{description}</Text>
        <Text variant='titleSmall'>{time}</Text>
      </View>
      <View style={styles.rightContainer}>
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
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: moderateScale(10),
    margin: moderateScale(3),
    padding: moderateScale(6),
    maxWidth: '48%',
  },
  contentContaine: {
    flex: 1,
    paddingRight: moderateScale(10),
    maxWidth: '70%',
  },
  rightContainer: {
    maxWidth: '20%',
    alignSelf: 'flex-end',
  }
});
