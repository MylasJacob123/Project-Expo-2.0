import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [message, setMessage] = useState("Happy Birthday!");
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#000000");
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const changeFontSize = (type) => {
    setFontSize((prevSize) =>
      type === "increase" ? prevSize + 2 : Math.max(12, prevSize - 2)
    );
  };

  const changeTextColor = (color) => {
    setTextColor(color);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Birthday Card Creator</Text>

      <View style={styles.card}>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        )}
        <Text style={[styles.cardText, { fontSize, color: textColor }]}>
          {message}
        </Text>
      </View>

      <View style={styles.editCard}>
        <TextInput
          style={styles.input}
          placeholder="Enter birthday message"
          value={message}
          onChangeText={setMessage}
        />

        <View style={styles.row}>
          <Button
            title="Increase Font"
            onPress={() => changeFontSize("increase")}
          />
          <Button
            title="Decrease Font"
            onPress={() => changeFontSize("decrease")}
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => changeTextColor("#000000")}
            style={[styles.colorBox, { backgroundColor: "#000000" }]}
          />
          <TouchableOpacity
            onPress={() => changeTextColor("#FF6347")}
            style={[styles.colorBox, { backgroundColor: "#FF6347" }]}
          />
          <TouchableOpacity
            onPress={() => changeTextColor("#4682B4")}
            style={[styles.colorBox, { backgroundColor: "#4682B4" }]}
          />
          <TouchableOpacity
            onPress={() => changeTextColor("#32CD32")}
            style={[styles.colorBox, { backgroundColor: "#32CD32" }]}
          />
        </View>

        <View style={styles.buttonRow}>
          <Button title="Choose Image" onPress={pickImage} />
          <Button
            title="Reset Card"
            color="red"
            onPress={() => {
              setSelectedImage(null);
              setMessage("Happy Birthday!");
              setFontSize(24);
              setTextColor("#000000");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    height: 300,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
  },
  cardText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  editCard: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
