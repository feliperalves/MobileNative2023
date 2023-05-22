import {styles} from "./styles";
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ComponentButtonInterface, ComponentButtonTakePicture} from "../../components";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IPhoto{
  height: string
  uri: string
  width: string
}
export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>();
  const ref = useRef<Camera>(null);
  const [takePhoto, setTakePhoto] = useState(false)

  if (!permissionCamera) {
    // As permissões da câmera ainda estão carregando
    return <View />;
  }

  if (!permissionCamera.granted) {
    // As permissões da câmera ainda não foram concedidas
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos de sua permissão para acessar a câmera</Text>
        <Button onPress={requestPermissionCamera} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if(ref.current) {
      const picture = await ref.current.takePictureAsync()
      console.log(picture)
      setPhoto(picture)
    }
  }

  async function savePhoto() {
    const asset = await MediaLibrary.createAssetAsync(photo!.uri)
    MediaLibrary.createAlbumAsync("Images", asset, false)
    Alert.alert("!Imagem salva com sucesso!")
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setPhoto(result.assets[0])
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref} >
        <TouchableOpacity onPress={toggleCameraType} >
            <MaterialCommunityIcons style = {styles.imgicon} name="camera-flip" size={24} color="black" />
        </TouchableOpacity>
        <ComponentButtonTakePicture onPress={takePicture} />
      </Camera>
      {photo && photo.uri && (
        <Image source={{ uri: photo.uri }} style={styles.img} />
      )}
      <ComponentButtonInterface title='Salvar imagem' type='secondary' onPressI={savePhoto} />
      <ComponentButtonInterface title='Abrir imagem' type='secondary' onPressI={pickImage} />
    </View>
  );
}