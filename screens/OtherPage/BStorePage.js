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
import MoreNavi from "../../component/MoreNatigation";

const { width } = Dimensions.get("window");

export default function MoreScreen() {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Use useFocusEffect to close the sidebar when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      setSidebarVisible(false);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header />
      <View>
        <MoreNavi navi={{ navigation }} />
        <TouchableOpacity style={styles.sidebarButton} onPress={toggleSidebar}>
          <Ionicons
            name={sidebarVisible ? "close" : "menu"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.FeaturedText}>FEATURED PRODUCTS</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.imageContainer}
        >
          {/* Insert 6 images here */}
          <View style={styles.imageTextContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/img/B-store/Brisbane Bullets 2023 24 DC Jersey.jpg")}
            />
            <Text style={styles.imageText}>
              Brisbane Bullets 2023/24 DC Jersey - Sobey
            </Text>
            <Text style={styles.priceText}>from $40.00</Text>
          </View>
          <View style={styles.imageTextContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/img/B-store/Brisbane Sports Water Bottle.jpg")}
            />
            <Text style={styles.imageText}>Brisbane Sports Water Bottle</Text>
            <Text style={styles.priceText}>$12.00</Text>
          </View>
          <View style={styles.imageTextContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/img/B-store/Brisbane Bullets New Era Official Team Colours Snapback Cap.jpg")}
            />
            <Text style={styles.imageText}>
              Brisbane Bullets New Era Offcial Team Colours Snapback Cap
            </Text>
            <Text style={styles.priceText}>$60.00</Text>
          </View>
          <View style={styles.imageTextContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/img/B-store/Brisbane Bullets Team Logo - Outdoor Basketball.jpg")}
            />
            <Text style={styles.imageText}>
              Brisbane Bullets Team Logo Outdoor Basketball
            </Text>
            <Text style={styles.priceText}>$35.00</Text>
          </View>
          <View style={styles.imageTextContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/img/B-store/Navy White Logo Snapback.jpg")}
            />
            <Text style={styles.imageText}>Navy/White Logo Snapback</Text>
            <Text style={styles.priceText}>$40.00</Text>
          </View>
          <View style={styles.imageTextContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/img/B-store/Black White Logo Snapback.jpg")}
            />
            <Text style={styles.imageText}>Black/White Logo Snapback</Text>
            <Text style={styles.priceText}>$40.00</Text>
          </View>

          {/* Add more images and text as needed */}
        </ScrollView>

        <View style={styles.categoryContainer}>
          {/* 第一行 */}
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => navigation.navigate("OfficialKit")}
            >
              <Image
                style={styles.categoryImage}
                source={require("../../assets/img/B-store/OFFICIALKIT.jpg")}
              />
              <Text style={styles.categoryText}>OFFICIAL KIT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => navigation.navigate("Headwear")}
            >
              <Image
                style={styles.categoryImage}
                source={require("../../assets/img/B-store/HEADWEAR.jpg")}
              />
              <Text style={styles.categoryText}>HEADWEAR</Text>
            </TouchableOpacity>
          </View>
          {/* 第二行 */}
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => navigation.navigate("Supporter")}
            >
              <Image
                style={styles.categoryImage}
                source={require("../../assets/img/B-store/SUPPORTER.jpg")}
              />
              <Text style={styles.categoryText}>SUPPORTER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => navigation.navigate("Accessories")}
            >
              <Image
                style={styles.categoryImage}
                source={require("../../assets/img/B-store/ACCESSORIES.jpg")}
              />
              <Text style={styles.categoryText}>ACCESSORIES</Text>
            </TouchableOpacity>
          </View>
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
            <Text style={styles.sidebarText}>BASKETBALLS</Text>
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
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    margin: 5,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: "Nimbus-Sans-Regular",
    textAlign: "center",
    color: "gray",
  },
  activeButton: {
    borderColor: "gray",
    borderBottomWidth: 1,
  },
  activeButtonText: {
    fontSize: 14,
    color: "black",
  },
  scrollViewContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    paddingVertical: 10,
    height: 200,
    marginLeft: 15,
  },
  imageTextContainer: {
    alignItems: "center",
    marginRight: 20,
    marginBottom: 60,
    width: 130,
  },
  image: {
    width: 120,
    height: 120,
    marginHorizontal: 5,
  },
  imageText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    marginRight: 5,
    fontFamily: "Nimbus-Sans-Regular",
    flexWrap: "wrap", // 允许文本换行
    lineHeight: 16, // 设置行高以增加文本间的间距
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
  sidebarButton: {
    position: "absolute",
    top: -23,
    right: 9,
    zIndex: 1,
  },
  sidebarLogo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  categoryCard: {
    padding: 0,
    margin: 10,
    width: 150,
    alignItems: "center",
    overflow: "hidden",
  },
  categoryImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  categoryText: {
    marginTop: 5,
    textAlign: "center",
    bottom: 2,
    fontWeight: "bold",
    fontFamily: "Dharma-Gothic-Regular",
    fontSize: 35,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  priceText: {
    marginTop: 5,
    fontWeight: "bold",
    fontFamily: "Nimbus-Sans-Regular",
  },
  FeaturedText: {
    fontFamily: "Dharma-Gothic-Regular",
    fontSize: 50,
    textAlign: "center",
    color: "black",
    marginTop: 5,
    fontWeight: "bold",
  },
});
