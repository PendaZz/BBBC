import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Linking,
    Platform,
} from "react-native";
import Header from "../../component/Header";

export default function TicketScreen() {
    // Open the Ticketek website
        const handlePressTicketek = () => {
            Linking.openURL("https://premier.ticketek.com.au/shows/genre.aspx?c=2053");
        };

    // Open the Crowd Canvas App link in the app store
    const handlePressCrowdCanvas = () => {
        // Detect the device platform
        const url =
        Platform.OS === "ios"
            ? "itms-apps://itunes.apple.com/app/id1526770094"
            : "https://play.google.com/store/apps/details?id=com.crowdcanvas.pixelplayer&hl=en_SG&pli=1";
        Linking.openURL(url);
    };
    return (
        <View style={styles.container}>
            <Header />
            <Image
                source={require("../../assets/img/TicketBackground.jpeg")}
                style={styles.backgroundImage}
                />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Ticketek text and logo */}
                <Text style={styles.title}>Get Your Ticket</Text>
                <TouchableOpacity onPress={handlePressTicketek}>
                    <Image
                        source={require("../../assets/img/Ticketek.jpg")}
                        style={styles.logo}
                    />
                </TouchableOpacity>

                {/* Crowd Canvas text and logo */}
                <Text style={styles.title}>Enjoy Our Game</Text>
                <TouchableOpacity onPress={handlePressCrowdCanvas}>
                    <Image
                        source={require("../../assets/img/CrowdCanvas.jpg")}
                        style={styles.logo}
                    />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        width: "100%",
    },
    scrollContent: {
        alignItems: "center",
        paddingTop: 30,
    },
    backgroundImage: {
        flex: 1,
        position: "absolute",
        width: "110%",
        minHeight: "100%",
        opacity: 0.1,
        resizeMode: "cover",
        marginTop:125, 
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: -30,
        fontFamily: "Pure-Heart-Regular",
    },
    logo: {
        width: 280,
        height: 280,
        resizeMode: "contain",
        marginTop: -20,
    },
});
