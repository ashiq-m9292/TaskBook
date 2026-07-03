import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";


export const lightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        background: '#fff',
        primary: '#3f51b5',
        secondary: '#009688',
        error: '#f44336',
        onBackground: '#000000',
    },
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        background: '#333333',
        primary: '#3f51b5',
        secondary: '#009688',
        error: '#f44336',
        onBackground: '#ffffff',
    },
};