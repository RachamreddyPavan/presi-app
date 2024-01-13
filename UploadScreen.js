import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const uploadImg = require("../assets/upload_image.png");
const url = "http://localhost:8800/api"; // Make sure this matches your server address

const UploadScreen = () => {
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState([]);

  const [user, setUser] = useState({
    profilePicture: require("../assets/steve.png"),
    username: 'JohnDoe',
    userId: "abcde123",
    email: 'john.doe@example.com',
    section: '8CSE13',
    club: 'Rotract',
    followers: [],
    followings: [],
  });

  const pickImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImages([...images, response.uri]);
      }
    });
  };

  const handleUploadPost = async () => {
    const formData = new FormData();

    // Append post data
    formData.append('desc', caption);
    formData.append('userId', user.userId);

    // Append each image separately
    images.forEach((uri, index) => {
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const formDataImage = {
        uri,
        type: image/${fileType},
        name: image_${index}.${fileType},
      };
      formData.append('images', formDataImage);
    });

    try {
      const res = await axios.post(${url}/posts/create, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#182F63", gap: 40 }}>
      <Text style={{ fontSize: 34, fontWeight: '700', color: "white" }}>Upload Posts</Text>
      <View style={{ backgroundColor: "white", borderRadius: 10, width: "90%", gap: 20, padding: 20 }}>
        <TextInput
          placeholder="Enter caption..."
          onChangeText={(text) => setCaption(text)}
          value={caption}
          multiline
          style={{ width: "100%", height: 130, borderColor: 'gray', borderWidth: 1, marginVertical: 10, padding: 10, fontSize: 16, borderRadius: 10 }}
        />
        <ScrollView horizontal>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={{ width: 100, height: 100, marginVertical: 10, marginRight: 10 }} />
          ))}
        </ScrollView>
        <View style={{ gap: 10, flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={uploadImg} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "#3081D0", borderRadius: 20, padding: 10, paddingHorizontal: 30 }} onPress={handleUploadPost}>
            <Text style={{ fontWeight: '700', color: "white" }}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadScreen;