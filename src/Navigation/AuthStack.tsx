import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from '../Screens/Screens';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name="Login" component={Screens.Login} />
            <Stack.Screen name="Signup" component={Screens.Signup} />
        </Stack.Navigator>
    );
}

export default AuthStack;
