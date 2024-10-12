import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; // 导入 useRoute 和 useNavigation
import Header from "../../component/Header";

export default function MoreScreen() {
  const route = useRoute();
  const navigation = useNavigation(); // 使用 useNavigation hook 获取 navigation 对象
  const [quantity, setQuantity] = useState(1); // 定义状态来存储用户输入的数量
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const ProductData = [
    {
      name: "Your Product Name",
      image: require("../../assets/img/B-store/Product.webp"),
      price: "$100.00",
      description: "Description of this product...",
    },
  ];

  const handleAddToCart = () => {
    // 在这里执行将商品添加到购物车的操作
    console.log(`Adding ${quantity} items to cart`);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
  <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // 按下按钮时调用 navigation.goBack() 方法
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
        </View>

        <View style={styles.productContainer}>
          {ProductData.map((product, index) => (
            <View key={index}>
              <Image
                style={styles.productImage}
                source={product.image}
              />
              <Text style={styles.productText}>{product.name}</Text>
              <Text style={styles.priceText}>{product.price}</Text>
              <View style={styles.inputContainer}>
              <TextInput
                  style={[styles.input, { backgroundColor: 'white' }]}
                  placeholder="0"
                  onChangeText={(text) =>
                      setQuantity(parseInt(text) || 0)
                  } 
                  keyboardType="numeric"
              />
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={handleAddToCart}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.priceDescription}>{product.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImage: {
    width: 400,
    height: 300,
    borderRadius: 5,
    marginBottom:15,
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
    marginTop:30,
  },
  scrollView: {
    paddingBottom: 120,
  },
  priceText: {
    fontWeight: "bold",
    textAlign: "center",
    
  },

  priceDescription:{
    marginTop:10,
    fontSize:15,
  },
   backButton: {
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
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    left:260,
    bottom:1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    height:30,
    width: 45,
  
  },
  addToCartButton: {
    backgroundColor: "#164CA8",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },

});
