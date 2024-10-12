import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/img/Logo.png")}
        resizeMode="cover"
        style={styles.logoImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#164CA8",
    height:125,
  },
  logoImage: {
    width: 100,
    height: 110,
    marginLeft: 10,
    marginTop:25,
  },
  headerImage: {
    width: 300,
    height: 110,
  },
});

export default Header;
