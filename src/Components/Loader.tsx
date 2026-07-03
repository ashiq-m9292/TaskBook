import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

const Loader = ({ color, size }: any) => {
    return (
        <ActivityIndicator
            animating={true}
            color={color}
            size={size}
        />
    );
}

export default Loader;
