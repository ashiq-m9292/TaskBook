import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from '../Screens/Screens';
import Bottom from './Bottom';

const Stack = createNativeStackNavigator();
const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Bottom" component={Bottom} />
            <Stack.Screen name="NotesCreate" component={Screens.NotesCreate} />
            <Stack.Screen name="NotesUpdate" component={Screens.NotesUpdate} />
            <Stack.Screen name="Search" component={Screens.Search} />
            <Stack.Screen name="TodoCreate" component={Screens.TodoCreate} />
            <Stack.Screen name="TodoUpdate" component={Screens.TodoUpdate} />
            <Stack.Screen name="AccountScreen" component={Screens.AccountScreen} />
            <Stack.Screen name="SelectImage" component={Screens.SelectImage} />
        </Stack.Navigator>
    );
}

export default MainStack;
