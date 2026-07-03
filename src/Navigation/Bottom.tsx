import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@react-native-vector-icons/material-design-icons';
import * as Screens from '../Screens/Screens';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';


const Tab = createBottomTabNavigator();
const Bottom = () => {
    const { colors } = useTheme();
    const { mode } = useSelector((state: any) => state.DARK);
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.background,
                display: mode ? 'none' : 'flex'
            },
            tabBarActiveTintColor: colors.secondary
        }}
        >
            <Tab.Screen name="Notes" component={Screens.Notes}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="note-text-outline" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen name="Todos" component={Screens.Todos}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="checkbox-marked-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Bottom;
