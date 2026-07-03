import React from 'react';
import { View } from 'react-native';
import { Loader } from '../../Components/Components';

const Splash = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loader
                color='red'
                size='large'
            />

        </View>
    );
}

export default Splash;
