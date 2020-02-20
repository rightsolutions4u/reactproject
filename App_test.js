import React from 'react';
import { StyleSheet, Text, View ,StatusBar,Image, TouchableOpacity} from 'react-native';
import logo from './assets/logo.jpg';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
//import { createStackNavigator, createAppContainer } from "react-navigation";




export default function App () {

  
    let [selectedImage, setSelectedImage] = React.useState(null);
 // picking an image
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    setSelectedImage({ localUri: pickerResult.uri });
  };
// sharing the image
let openShareDialogAsync = async () => {
  if (!(await Sharing.isAvailableAsync())) {
    alert(`Uh oh, sharing isn't available on your platform`);
    return;
  }

  Sharing.shareAsync(selectedImage.localUri);
};
  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />

        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
 
  //render(); {
return (

  <View style={styles.container}>
      <AppContainer />
    <Image source={logo}   style={styles.logo} />
    <Text style={styles.instructions} >
    To share a photo from your phone with a friend, just press the button below!
    </Text>
    <TouchableOpacity
      onPress={openImagePickerAsync}  style={styles.button}>
      <Text style={styles.buttonText}>Pick a photo</Text>
    </TouchableOpacity>
  </View>
      );
       // }
}//defult func
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  About: {
    screen: AboutScreen
  },
  Services: {
    screen: Servicesscreen
  }
 } );
const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  }, 
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  }
});
