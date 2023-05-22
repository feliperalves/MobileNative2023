import React from 'react';
import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer';
import { ScreenPerfil, ScreenCamera } from "../screens"
import { colors } from '../styles/colors';
import { Entypo, Ionicons } from '@expo/vector-icons';
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
    </Drawer.Navigator>
  )
}