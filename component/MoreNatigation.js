import * as React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { useRoute } from "@react-navigation/native";

export default function MoreNavi({ navi }) {

    const navigation = navi.navigation;

    const route = useRoute(); // Use useRoute to obtain current route information

    // Determine if the button is active based on the route name
    const getButtonStyle = (routeName) => [
        styles.button,
        route.name === routeName && styles.activeButton,
    ];

    const getButtonTextStyle = (routeName) => [
        styles.buttonText,
        route.name === routeName && styles.activeButtonText,
    ];

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={getButtonStyle("News")}
                onPress={() => navigation.navigate("News")}
            >
                <Text style={getButtonTextStyle("News")}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={getButtonStyle("Video")}
                onPress={() => navigation.navigate("Video")}
            >
                <Text style={getButtonTextStyle("Video")}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={getButtonStyle("B-Store")}
                onPress={() => navigation.navigate("B-Store")}
            >
                <Text style={getButtonTextStyle("B-Store")}>B-Store</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
});

