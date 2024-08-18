import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  return (
    <View>
      <Image
        style={{
          width: "100%",
          height: 500,
        }}
        source={require("../../assets/images/Plantwall.jpg")}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
          }}
        >
          NatureNest
        </Text>
        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
            color: "gray",
            marginTop: 10,
          }}
        >
          Discover a lush world of green at your fingertips. Find the perfect
          plant to brighten your space and elevate your well-being.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.button}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 17,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    marginTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  button: {
    padding: 15,
    backgroundColor: "#004721",
    borderRadius: 99,
    marginTop: "10%",
  },
});
