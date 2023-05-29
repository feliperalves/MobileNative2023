import {styles} from "./styles";
import { Camera, CameraCapturedPicture, CameraType, FaceDetectionResult} from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ComponentButtonInterface, ComponentButtonTakePicture} from "../../components";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FaceDetector from 'expo-face-detector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";

interface IPhoto{
  height: string
  uri: string
  width: string
}
export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions()
  const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>()
  const ref = useRef<Camera>(null)
  const [takePhoto, setTakePhoto ]= useState(false)
  const [permissionQrCode, requestPermissionQrCode] = BarCodeScanner.usePermissions();
  const [scanned, setScanned] = useState(false);
  const [face, setFace] = useState<FaceDetector.FaceFeature>()
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(data);
  };


  if (!permissionCamera) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionCamera.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos de permissão para acessar a câmera!!!</Text>
        <Button onPress={requestPermissionCamera} title="grant permission" />
      </View>
    );
  }
  if (!permissionMedia) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionMedia.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos de permissão para acessar a câmera!</Text>
        <Button onPress={requestPermissionMedia} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if (ref.current) {
        const picture = await ref.current.takePictureAsync()
        console.log(picture)
        setPhoto(picture)
        setTakePhoto(true)
    }
  }

  async function savePhoto() {
    const asset = await MediaLibrary.createAssetAsync(photo!.uri)
    MediaLibrary.createAlbumAsync("Images", asset, false)
    Alert.alert("Imagem salva com sucesso!")
  }

  async function pickImage() {
    const result= await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.canceled) {
      setPhoto(result.assets[0])
    }
  }

  return (
    <View style={styles.container}>
        {!takePhoto ? (
          <>
            <ComponentButtonInterface title='Inverter' type='secondary' onPressI={toggleCameraType} />
            <Camera style={styles.camera} type={type} ref={ref}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />
            <ComponentButtonInterface title='Tirar Foto' type='secondary' onPressI={takePicture}/>  
          </>
        ) : (
          <>
            <ComponentButtonInterface title='Salvar Imagem' type='secondary' onPressI={savePhoto}/>
            <ComponentButtonInterface title='Abrir Imagem' type='secondary' onPressI={pickImage}/>
            <ComponentButtonInterface title='Voltar' type='secondary' onPressI={takePicture}/>
            {photo && photo.uri && (
                <Image source={{ uri: photo.uri }} style={styles.img} />
            )}  
          </>
        )}
    </View>
    );
  }