import { useState, useEffect, useRef } from "react";

// useState  - Guarda valores que mudam no App
// useEffect  - Executa código quando a tela carrega
// useRef  - Cria referência para acessar a câmera

import { View, Button, Image, Text, StyleSheet } from "react-native";
import { CameraView, Camera } from "expo-camera"; // Importação da câmera
import * as Notifications from "expo-notifications"; // Importação das notificações

// Define como a notificação aparece no celular
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Mostra notificação
    shouldPlaySound: true, // Toca som
    shouldSetBadge: true, // Muda número no ícone do app
    shouldShowBanner: true, // Mostra banner
    shouldShowList: true, // Aparece na lista de notificações
  }),
});


// Tela principal do App
export default function Index() {

  // Estados que controlam o comportamento da tela

  // Se tem permissão
  const [hasPermission, setHasPermission] = useState<boolean | null>(null); 
  // Considera (TRUE (permitido) / FALSE (negado) / NULL (não se sabe))

  // Se tem foto
  const [photo, setPhoto] = useState<string | null>(null); 
  // Considera (STRING (caminho da imagem) / NULL (nenhuma foto tirada))

  const cameraRef = useRef<CameraView | null>(null); 
  // Referência para acessar a câmera e tirar a foto


  // Roda automaticamente quando abre o app
  useEffect(() => {
    (async () => {
      // Pede permissão para a câmera
      const cameraPermission = await Camera.requestCameraPermissionsAsync();

      // Pede permissão para as notificações
      await Notifications.requestPermissionsAsync();

      // Se permitido libera
      setHasPermission(cameraPermission.status === "granted");
    })();
  }, []);

  // Roda quando o botão é clicado (tirar a foto)
  const takePhoto = async () => {
    // Garante que a câmera existe
    if (cameraRef.current) {

      // Tira a foto (retorna URI - caminho da imagem)
      const result = await cameraRef.current.takePictureAsync();

      // Salva a URI (caminho) da imagem
      setPhoto(result.uri);

      // Dispara a notificação
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Foto registrada 📸",
          body: "Sua foto foi salva com sucesso!",
        },
        trigger: null,
      });
    }
  };

  // Permissões
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Pedindo permissões...</Text>
      </View>
    );
  }

  // Sem acesso (caso negada)
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sem acesso à câmera</Text>
      </View>
    );
  }


  // (SE NÃO TEM FOTO) mostrar câmera / (SE TEM FOTO) mostrar imagem
  return (
    <View style={styles.container}>

      {!photo ? (
        <>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
          />

          <Button
            title="Tirar Foto"
            color="#ffa600"
            onPress={takePhoto}
          />
        </>
      ) : (
        <>
          <Image
            source={{ uri: photo }}
            style={styles.camera}
          />

          <Button
            title="Tirar Outra Foto"
            color="#ffa600"
            onPress={() => setPhoto(null)}
          />
        </>
      )}

    </View>
  );
}

// Estilos
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  camera: {
    width: "100%",
    height: 600,
    marginBottom: 20,
    overflow: "hidden",
  },

  text: {
    color: "#fff",
  },

});