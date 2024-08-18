import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, ScrollView, Button } from "react-native";
import Searchbar from "../components/Seachbar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCart } from "./CartContext";

const plants = [
  {
    name: "Peace Lily Plant",
    price: "₹278",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Snake Plant",
    price: "₹350",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Spider Plant",
    price: "₹299",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Pothos Plant",
    price: "₹250",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Aloe Vera Plant",
    price: "₹320",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Rubber Plant",
    price: "₹450",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Boston Fern",
    price: "₹380",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Chinese Evergreen",
    price: "₹300",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "ZZ Plant",
    price: "₹399",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Golden Pothos",
    price: "₹280",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Philodendron Heartleaf",
    price: "₹340",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Dracaena Marginata",
    price: "₹420",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Fiddle Leaf Fig",
    price: "₹599",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Monstera Deliciosa",
    price: "₹480",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Calathea Orbifolia",
    price: "₹360",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "African Violet",
    price: "₹220",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Chinese Money Plant",
    price: "₹295",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Bonsai Tree",
    price: "₹650",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Succulent Assortment",
    price: "₹330",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Orchid",
    price: "₹400",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  // Add more plants as needed
];

export default function Store({username}) {
  const { addToCart } = useCart();
  const currentDay = new Date().toLocaleString("en-in", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleString("en-in", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/profile.jpeg")}
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.userName}>{username}</Text>
        </View>
        <View>
          <Text style={styles.welcomeText}>{currentTime}</Text>
          <Text style={styles.userName}>{currentDay}</Text>
        </View>
      </View>

      {/* Searchbar (non-scrollable part) */}
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Scrollable content starts after Searchbar */}
      <View style={{ flex: 1 }}>  
      <FlatList
        data={filteredPlants}
        numColumns={2}
        ListHeaderComponent={() => (
          <View style={styles.content}>
            {/* Discount Card */}
            <View style={styles.discountCard}>
              <Text style={styles.discountText}>
                Get discount prices up to 85%
              </Text>
              <Text style={styles.discountSubText}>
                Claim vouchers every week and get free shipping
              </Text>
              <Image
                source={require("../../assets/images/icon.jpg")}
                style={styles.discountImage}
              />
            </View>

            {/* Section Title */}
            <Text style={styles.sectionTitle}>Popular Plants</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.plantCard}>
            <Image source={item.image} style={styles.plantImage} />
            <Text style={styles.plantName}>{item.name}</Text>
            <Text style={styles.plantPrice}>{item.price}</Text>
            <View style={{flexDirection: 'row', gap: 8}}>
            <TouchableOpacity style={styles.buyButton}><Text style={{color: '#fff'}}  onPress={() => addToCart(item)}>Add To Cart</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buyButton}><Text style={{color: '#fff'}} >Buy Now</Text></TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={<Text style={styles.plantName}> Sorry no plants found</Text>}
        contentContainerStyle={styles.listContent}
      />
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
    paddingHorizontal: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  welcomeText: {
    fontSize: 16,
    color: "#333",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    paddingHorizontal: 20,
  },
  discountCard: {
    marginTop: 20,
    backgroundColor: "#E0FFE5",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  discountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  discountSubText: {
    fontSize: 14,
    color: "#666",
  },
  discountImage: {
    marginTop: 10,
    width: 100,
    height: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  plantCard: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
  },
  plantImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  plantName: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
  },
  plantPrice: {
    fontSize: 16,
    color: "#666",
  },
  listContent: {
    paddingBottom: 80,
  },
  buyButton:{
    backgroundColor:"green",
    padding:5,
    borderRadius: 5,
  }
});

