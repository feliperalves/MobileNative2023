import { Dimensions, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    imgicon:{
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      margin: 64
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    img: {
      height: Dimensions.get("window").width * 0.8,
      width: Dimensions.get("window").width * 0.8
    }
  });
  