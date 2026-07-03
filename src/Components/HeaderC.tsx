import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Menu, Text, useTheme } from 'react-native-paper';
import Icon from '@react-native-vector-icons/material-design-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const HeaderC = ({ showBack, showSearch, searchOnPress, backOnPress, avatarOnPress, source, title, selectAllOnPress, closeOnPress, notesLength, showMenu, dotsOnPress, visible, onDismiss, editOnPress, darkOnPress, darkTitle, gridOnPress, gridTitle, itemSelect }: any) => {
    const { colors } = useTheme();
    const { mode } = useSelector((state: any) => state.DARK);
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {showBack === true ? (
                <TouchableOpacity onPress={backOnPress}>
                    <Icon name='arrow-left' size={30} color={colors.onBackground} />
                </TouchableOpacity>
            ) : mode === true ? (
                <TouchableOpacity onPress={selectAllOnPress}>
                    <Text variant='titleLarge'>SelectAll</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={avatarOnPress}>
                    <Avatar.Image
                        size={50}
                        source={source}
                    />
                </TouchableOpacity>
            )
            }
            {
                mode === true ? (
                    <Text variant='titleLarge'>{itemSelect}</Text>
                ) : (
                    <View style={styles.centerText}>
                        <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>{title}</Text>
                        <Text variant='titleMedium'>{notesLength}</Text>
                    </View>
                )
            }
            {
                showMenu === false ? null
                    : mode === true ? (
                        <TouchableOpacity onPress={closeOnPress}>
                            <Icon
                                name='close'
                                size={30}
                                color={colors.onBackground}
                            />
                        </TouchableOpacity>
                    ) : (
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                {showSearch ? (
                                    <TouchableOpacity onPress={searchOnPress}>
                                        <Icon name='magnify' size={30} color={colors.onBackground} />
                                    </TouchableOpacity>) : null
                                }
                                <Menu
                                    visible={visible}
                                    onDismiss={onDismiss}
                                    anchor={
                                        <TouchableOpacity onPress={dotsOnPress}>
                                            <Icon name='dots-vertical' size={30} color={colors.onBackground} />
                                        </TouchableOpacity>
                                    }
                                >
                                    <Menu.Item onPress={editOnPress} title='Edit' />
                                    <Menu.Item onPress={darkOnPress} title={darkTitle} />
                                    <Menu.Item onPress={gridOnPress} title={gridTitle} />
                                </Menu>
                            </View>
                        </>
                    )
            }
        </View>
    );
}

export default HeaderC;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(20),
        paddingHorizontal: scale(10),
        borderBottomWidth: 0.2,
    },
    centerText: {
        alignItems: 'center',
    }
});
