import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, ScrollView, Button } from "react-native";
import Searchbar from "../components/Seachbar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { useCart } from "./CartContext";

const plants = [
  {
    name: "Peace Lily Plant",
    price: "₹278",
    originalPrice: "₹350",
    discount: "21%",
    image: require("../../assets/plants/Peace Lily Plant.png"),
  },
  {
    name: "Snake Plant",
    price: "₹350",
    originalPrice: "₹430",
    discount: "19%",
    image: require("../../assets/plants/snakeplant.jpg"),
  },
  {
    name: "Spider Plant",
    price: "₹299",
    originalPrice: "₹400",
    discount: "25%",
    image: require("../../assets/plants/spiderplant.jpg"),
  },
  {
    name: "Pothos Plant",
    price: "₹250",
    originalPrice: "₹320",
    discount: "22%",
    image: require("../../assets/plants/pothosplant.jpg"),
  },
  {
    name: "Aloe Vera Plant",
    price: "₹320",
    originalPrice: "₹400",
    discount: "20%",
    image: require("../../assets/plants/aloveraplant.jpg"),
  },
  {
    name: "Rubber Plant",
    price: "₹450",
    originalPrice: "₹600",
    discount: "25%",
    image: require("../../assets/plants/rubberplant.jpg"),
  },
  {
    name: "Boston Fern",
    price: "₹380",
    originalPrice: "₹520",
    discount: "27%",
    image: require("../../assets/plants/bostonfern.jpg"),
  },
  {
    name: "Chinese Evergreen",
    price: "₹300",
    originalPrice: "₹390",
    discount: "23%",
    image: require("../../assets/plants/chineseevergreen.jpg"),
  },
  {
    name: "ZZ Plant",
    price: "₹399",
    originalPrice: "₹520",
    discount: "23%",
    image: require("../../assets/plants/zzplant.jpg"),
  },
  {
    name: "Golden Pothos",
    price: "₹280",
    originalPrice: "₹400",
    discount: "30%",
    image: require("../../assets/plants/goldenpothos.jpg"),
  },
  {
    name: "Philodendron Heartleaf",
    price: "₹340",
    originalPrice: "₹450",
    discount: "24%",
    image: require("../../assets/plants/philodendronheartleaf.jpg"),
  },
  {
    name: "Dracaena Marginata",
    price: "₹420",
    originalPrice: "₹520",
    discount: "19%",
    image: require("../../assets/plants/dracaenamarginata.png"),
  },
  {
    name: "Fiddle Leaf Fig",
    price: "₹599",
    originalPrice: "₹850",
    discount: "30%",
    image: require("../../assets/plants/fiddleleaffig.jpg"),
  },
  {
    name: "Monstera Deliciosa",
    price: "₹480",
    originalPrice: "₹600",
    discount: "20%",
    image: require("../../assets/plants/monsteradelicios.jpg"),
  },
  {
    name: "Calathea Triostar",
    price: "₹360",
    originalPrice: "₹480",
    discount: "25%",
    image: require("../../assets/plants/calatheatriostar.jpg"),
  },
  {
    name: "Dwarf Schefflera",
    price: "₹250",
    originalPrice: "₹340",
    discount: "26%",
    image: require("../../assets/plants/dwarfschefflera.jpg"),
  },
  {
    name: "Pilea Plant",
    price: "₹305",
    originalPrice: "₹400",
    discount: "24%",
    image: require("../../assets/plants/pileaplant.jpg"),
  },
  {
    name: "Bonsai Tree",
    price: "₹650",
    originalPrice: "₹950",
    discount: "32%",
    image: require("../../assets/plants/bonsaitree.jpg"),
  },
  {
    name: "Orchid",
    price: "₹400",
    originalPrice: "₹580",
    discount: "31%",
    image: require("../../assets/plants/orchid.jpg"),
  },
];

export default function Store({username}) {
  const { addToCart } = useCart();
  const navigation = useNavigation();
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
                Get discount prices up to 35%
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
            
            {/* Discount Badge */}
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount} OFF</Text>
            </View>
        
            {/* Price Section */}
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>{item.originalPrice}</Text>
              <Text style={styles.plantPrice}>{item.price}</Text>
            </View>
            
            {/* Buttons */}
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={{ color: "#fff" }} onPress={() => addToCart(item)}>Add To Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buyButton}>
                <Text onPress={()=> { addToCart(item), navigation.navigate('Cart')}} style={{ color: "#fff" }}>Buy Now</Text>
              </TouchableOpacity>
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
    position: "relative", // For discount badge positioning
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
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 8, // To add spacing between prices
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through", // To strike-through original price
  },
  plantPrice: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 80,
  },
});

