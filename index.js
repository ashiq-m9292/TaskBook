/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import { navigationRef } from './src/Navigation/NavigationRefContainer';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    switch (type) {
        case EventType.ACTION_PRESS:
            if (detail.pressAction?.id === 'complete-todo') {
                await notifee.cancelNotification(detail.notification.id);
            }
            break;

        case EventType.PRESS:
            console.log('Notification Pressed in Background');
            const screen = detail.notification?.data.screen;
            const id = detail.notification?.data.todoId;
            if (screen) {
                navigationRef.navigate(screen, { id });
            }
            break;

        case EventType.DISMISSED:
            if (detail.pressAction?.id === 'cancel-todo') {
                await notifee.cancelNotification(detail.notification.id);
            }
            break;

        default:
            break;
    }
});


AppRegistry.registerComponent(appName, () => App);
