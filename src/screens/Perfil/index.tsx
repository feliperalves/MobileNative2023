import { View, Text } from "react-native";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabTypes } from "../../navigations/tab.navigation";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../services/data/Push";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";
import { ComponentLoading } from "../../components";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function Perfil({ navigation }: TabTypes) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  function handleVoltar() {
    const login = navigation.getParent();
    login?.goBack();
  }
  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);
  useEffect(() => {
    async function fetchToken() {
      const token = await registerForPushNotificationsAsync();
      console.log;
    }
    fetchToken();
  }, []);

  return (
    <>
      {isLoading ? (
        <ComponentLoading />
      ) : (
        <View style={styles.container}>
          <Text>Perfil</Text>
          <TouchableOpacity onPress={handleVoltar}>
            <Text>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
