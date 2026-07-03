import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const TextCenter = ({ title }: any) => {
    const {colors} = useTheme();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
            <Text variant='titleMedium' style={{ color: colors.onBackground, fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
}

export default TextCenter;
