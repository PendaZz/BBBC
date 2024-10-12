import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import Header from "../../component/Header";
import { Ionicons } from "@expo/vector-icons"; // 导入Ionicons图标
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function MoreScreen() {
  const route = useRoute();
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const getButtonStyle = (routeName) => [
    styles.button,
    route.name === routeName && styles.activeButton,
  ];

  const getButtonTextStyle = (routeName) => [
    styles.buttonText,
    route.name === routeName && styles.activeButtonText,
  ];

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Use useFocusEffect to close the sidebar when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      setSidebarVisible(false);
    }, [])
  );

  const ProductData = [
    {
      name: "Spalding Hardwood Series Composite Indoor/Outdoor Basketball Size 7",
      image: require("../../assets/img/B-store/Spalding Hardwood Series Composite Indoor Outdoor Basketball Size 7.jpg"),
      price: "$60.00",
    },
    {
      name: "Spalding Team Marble Outdoor Basketball All Sizes",
      image: require("../../assets/img/B-store/Spalding Team Marble Outdoor Basketball All Sizes.jpg"),
      price: "$35.00",
    },
    {
      name: "Brisbane Bullets Team Logo - Outdoor Basketball",
      image: require("../../assets/img/B-store/Brisbane Bullets Team Logo - Outdoor Basketball.jpg"),
      price: "$35.00",
    },
    {
      name: "Spalding Mini Hoop",
      image: require("../../assets/img/B-store/Spalding Mini Hoop.jpg"),
      price: "$35.00",
    },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.sidebarButton} onPress={toggleSidebar}>
            <Ionicons
              name={sidebarVisible ? "close" : "menu"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          style={styles.bstoreButton}
          onPress={() => navigation.navigate("B-Store")}
        >
          <Text style={styles.bstoreButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.FeaturedText}>BASKETBALLS</Text>
        </View>

        <View style={styles.productContainer}>
          {ProductData.map((product, index) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => navigation.navigate("Product")}
              key={index}
            >
              <Image style={styles.productImage} source={product.image} />
              <Text style={styles.productText}>{product.name}</Text>
              <Text style={styles.priceText}>{product.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {sidebarVisible && (
        <View style={[styles.sidebar, { width: width * 0.4 }]}>
          {/* Sidebar content */}
          <Image
            style={styles.sidebarLogo}
            source={require("../../assets/img/B-store/Logo.jpg")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("OfficialKit")}>
            <Text style={styles.sidebarText}>OFFICIAL KIT</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Supporter")}>
            <Text style={styles.sidebarText}>SUPPORTER</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Headwear")}>
            <Text style={styles.sidebarText}>HEADWEAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Basketball")}>
            <Text
              style={[
                styles.sidebarText,
                route.name === "Basketball" && styles.activeSidebarText,
              ]}
            >
              BASKETBALLS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Accessories")}>
            <Text style={styles.sidebarText}>ACCESSORIES</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  sidebarButton: {
    position: "absolute",
    top: -23,
    right: 9,
    zIndex: 1,
  },
  productCard: {
    padding: 0,
    marginVertical: 10,
    marginHorizontal: 22,
    width: 150,
    alignItems: "center",
    overflow: "hidden",
    marginTop: 20,
    height: 250,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  productText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    bottom: 2,
    fontWeight: "bold",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
    padding: 20,
  },
  scrollView: {
    paddingBottom: 120,
  },
  sidebar: {
    position: "absolute",
    top: 125,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
  sidebarLogo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  priceText: {
    position: "absolute",
    bottom: 40,
  },
  FeaturedText: {
    fontSize: 20,
  },
  activeSidebarText: {
    color: "blue",
  },
  // 修改 bstoreButton 样式
  bstoreButton: {
    position: "absolute",
    top: 0,
    left: 20,
    backgroundColor: "#164CA8",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 3,
    zIndex: 1,
  },
  bstoreButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
