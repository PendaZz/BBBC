import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Main");
        }, 5000);
    }, [navigation]);

    useEffect(() => {
        const resetAsyncStorage = async () => {
          try {
            // Clear AsyncStorage
            await AsyncStorage.clear();
            // Set the flag so it won't reset on subsequent launches
            await AsyncStorage.setItem('isFirstLaunch', 'false');
            
          } catch (error) {
            console.error('Failed to reset AsyncStorage:', error);
          }
        };
    
        resetAsyncStorage();
      }, [1]);

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/img/Storybase.jpg")}
                style={styles.backgroundImage}
            />
            <Image
                source={require("../assets/img/Logo.png")}
                style={styles.overlayImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    overlayImage: {
        position: "absolute",
        width: 200, 
        height: 200, 
        zIndex: 1, // 确保覆盖在背景图片上方
        resizeMode: "contain", // 根据需要调整图片的适应方式
    },
});

export default SplashScreen;
