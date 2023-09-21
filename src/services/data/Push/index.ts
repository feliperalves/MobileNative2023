import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';
import Constants from 'expo-constants';
import { apiUser } from '../';
export interface IExtra {
    eas: {
        projectID: string
    }
}

export async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert('Falha ao obter o token para envio de mensagens Push!');
        }
        const extra = Constants.expoConfig?.extra as IExtra
        token = (await Notifications.getExpoPushTokenAsync({
            projectId: extra.eas.projectID,
        }));
        await apiUser.updateToken(token.data)
    } else {
        Alert.alert('Você deve usar um dispostivo físico para receber notificações Push!');
    }

    return token;
}