import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { store } from './src/Redux/Store';
import Routes from './src/Navigation/Routes';
import { StatusBar } from 'react-native';
import { lightTheme, darkTheme } from './src/Styles/Colors';
import { requestPermission, createNotificationChannel, notificationForegroundEvent } from './src/Components/NotifeeC';


const MainApp = () => {
  const { darkMode } = useSelector((state: any) => state.DARK);
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    requestPermission();
    createNotificationChannel();
    notificationForegroundEvent();
  }, []);
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const App = () => {
  return (
    <ReduxProvider store={store}>
      <MainApp />
    </ReduxProvider>
  );
}

export default App;
