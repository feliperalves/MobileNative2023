import React from 'react';
import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer';
import { ScreenPerfil, ScreenCamera, ScreenCarro } from "../screens"
import { colors } from '../styles/colors';
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
type DrawerParamList = {
  Perfil: undefined;
  Camera: undefined;
}
type DrawerScreenNavigation = DrawerNavigationProp <DrawerParamList, "Perfil">
export type DrawerTypes = {
  navigation: DrawerScreenNavigation
}

export function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Perfil" component={ScreenPerfil}
        options={{
          drawerIcon: () => (
            <Ionicons name = 'person' color={colors.white} size={24} />
          )
        }}
      />
      <Drawer.Screen name = "Camera" component={ScreenCamera} 
        options={{
          drawerIcon: () => (
            <Entypo name="camera" color = {colors.white} size={24}/> 
          ),
        }}
      />
      <Drawer.Screen name = "Acelerometro" component={ScreenCarro} 
        options={{
          drawerIcon: () => (
            <AntDesign name="car" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}