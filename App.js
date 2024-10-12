import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Font from "expo-font";
import MainContainer from "./screens/MainContainer";


function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    async function loadFonts() {
        await Font.loadAsync({
            "Dharma-Gothic-Regular": require("./assets/fonts/DharmaGothicC-Regular.ttf"),
            "Roc-Grotesk-Regular": require("./assets/fonts/Rocgroteskwide-regular.otf"),
            "Pure-Heart-Regular": require("./assets/fonts/PureHeartRegular.ttf"),
            "Nimbus-Sans-Regular": require("./assets/fonts/NimbusSanL-Reg.otf"),
        });
        setFontsLoaded(true);
    }

    useEffect(() => {
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return <MainContainer />;
}

export default App;
