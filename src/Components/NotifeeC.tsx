import notifee, { AndroidImportance, AndroidStyle, AuthorizationStatus, EventType, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { navigationRef } from '../Navigation/NavigationRefContainer';

// request permission
export const requestPermission = async () => {
    try {
        const settings = await notifee.requestPermission();
        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
            console.log('permission granted');
        } else {
            console.log('permission denied');
        }
    } catch (error) {
        console.log(error);
    }

}

// create channel 
export const createNotificationChannel = async () => {
    try {
        await notifee.createChannel({
            id: 'todo-channel',
            name: 'todo-reminders',
            importance: AndroidImportance.HIGH,
            sound: 'default',
            vibration: true,
        })
    } catch (error) {
        console.log(error);
    }

}

// show notification
export const showNotification = async ({ title, body, screen, id }: any) => {
    try {
        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId: 'todo-channel',
                // smallIcon: 'ic_launcher',
                // largeIcon: 'ic_launcher',
                // color: 'red',
                // style: {
                //     type: AndroidStyle.BIGTEXT,
                //     title: 'ye title hai esko change kar sakte hain',
                //     text: ' esme kitna bhi long text dikha sakte hain Notification Body lorem1000 ipsum dolor sit amet consectetur adipisicing elit. Quos, officiis.'
                // }
                pressAction: {
                    id: 'default',
                },
                actions: [
                    {
                        title: 'complete',
                        pressAction: {
                            id: 'complete-todo',
                        }
                    },
                    {
                        title: 'Snooze',
                        pressAction: {
                            id: 'snooze-todo',
                        }
                    }
                ]

            },
            data: {
                id,
                screen
            }
        })
        console.log('notification shown');
    } catch (error) {
        console.log(error);
    }

}

// notification foreground event
export const notificationForegroundEvent = () => {
    try {
        notifee.onForegroundEvent(async ({ type, detail }: any) => {
            switch (type) {
                case EventType.PRESS:
                    const screen = detail.notification?.data.screen;
                    const id = detail.notification?.data.todoId;
                    if (screen) {
                        navigationRef.navigate(screen, { id });
                    }
                    break;
                case EventType.ACTION_PRESS:
                    if (detail.pressAction?.id === 'complete-todo') {
                        console.log('Notification Action Pressed in Foreground');
                        await notifee.cancelNotification(detail.notification.id);
                    }
                    break;
                case EventType.DISMISSED:
                    if (detail.pressAction?.id === 'cancel-todo') {
                        console.log('Notification Dismissed in Foreground');
                        await notifee.cancelNotification(detail.notification.id);
                    }
                    break;
                default:
                    break;
            }
        })
    } catch (error) {
        console.log(error);
    }
};

// schedule trigger function
export const scheduleNotification = async ({ id, title, body, screen, todoId, timestamp }: any) => {
    try {
        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp,
            alarmManager: true
        };
        await notifee.createTriggerNotification({
            id,
            title,
            body,
            data: {
                screen,
                todoId,
            },
            android: {
                channelId: 'todo-channel',
                pressAction: {
                    id: 'default',
                },
                actions: [
                    {
                        title: 'complete',
                        pressAction: {
                            id: 'complete-todo',
                        }
                    },
                    {
                        title: 'Cancel',
                        pressAction: {
                            id: 'cancel-todo',
                        }
                    }
                ],
                largeIcon: 'ic_launcher',
            },
        }, trigger)
    } catch (error) {
        console.log('error in trigger function', error);
    }
};

// cancel notification
export const cancelNotification = async (ids: any[]) => {
    try {
        await Promise.all(ids.map((id: any) => notifee.cancelNotification(id)));
    } catch (error) {
        console.log(error);
    }
}