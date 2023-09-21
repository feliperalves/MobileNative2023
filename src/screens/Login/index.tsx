import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { ComponentButtonInterface } from "../../components";
import { LoginTypes } from "../../navigations/login.navigation";
import { useAuth } from "../../hooks/auth";
import { IAuthenticate } from "../../services/data/User";
import { AxiosError } from "axios";
import { setISODay } from "date-fns";

export interface IErrorApi {
  errors: {
    rule: string;
    field: string;
    message: string;
  }[];
}

export function Login({ navigation }: LoginTypes) {
  const { signIn } = useAuth();
  const [data, setData] = useState<IAuthenticate>();
  const [isLoading, setIsLoading] = useState(true);

  async function handleSignIn() {
    try {
      setIsLoading(true);
      if (data?.email && data.password) {
        await signIn(data);
      } else {
        Alert.alert("Preencha todos os campos!");
        setIsLoading(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      const message = err.response?.data as string;
      Alert.alert(message);
      setIsLoading(false);
    }
  }

  function handleChange(item: IAuthenticate) {
    setData({ ...data, ...item });
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.title}>Login</Text>
        <View style={styles.formRow}>
          <MaterialIcons name="email" style={styles.icon} />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor={colors.primary}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(i) => handleChange({ email: i })}
          />
        </View>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
        <View style={styles.formRow}>
          <Fontisto name="key" style={styles.icon} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor={colors.primary}
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(i) => handleChange({ password: i })}
          />
        </View>
      </KeyboardAvoidingView>
    
      <ComponentButtonInterface
        title="Cadastrar"
        type="secondary"
        onPressI={() => navigation.navigate("Cadastrar")}
      />
      <ComponentButtonInterface
        title="Entrar"
        type="secondary"
        onPressI={handleSignIn}
      />
    </View>
  );
}
