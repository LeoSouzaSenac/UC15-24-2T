import React, { useRef, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Carregando permissões...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permissão para câmera negada</Text>
        <Button title="Permitir acesso" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData?.uri);
    }
  };

  const toggleCamera = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      {!photo ? (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.controls}>
            <Button title="Trocar" onPress={toggleCamera} />
            <Button title="Foto" onPress={takePhoto} />
          </View>
        </CameraView>
      ) : (
        <View style={styles.preview}>
          <Image source={{ uri: photo }} style={styles.image} />
          <Button title="Tirar outra" onPress={() => setPhoto(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1, justifyContent: "flex-end" },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
  },
  preview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  image: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
