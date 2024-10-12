import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native"; // 导入 useRoute
import Header from "../../component/Header";
import MoreNavi from "../../component/MoreNatigation";
import { WebView } from 'react-native-webview';

export default function VideoPage({ navigation }) {
    const route = useRoute(); // Use useRoute to obtain current route information

    const [videoUrl, setVideoUrl] = useState([]);

    const getVideoUrl = async () => {
        try {
            const response = await fetch('http://192.168.1.119:3001/video', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchVideoUrl = async () => {
            const data = await getVideoUrl();
            setVideoUrl(data);
        };
        fetchVideoUrl();
    },[]);

    console.log(videoUrl);

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
        <View style={styles.container}>
            <Header />
            <MoreNavi navi={{ navigation }} />

            {/* Put other content here */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.videoTitle}>VIDEOS</Text>
                {videoUrl.map((video, index) => (
                    <View key={index} style={styles.cardContainer}>
                        <WebView
                            source={{ uri: video.url }}
                            style={styles.webView}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 120,
    },
    videoTitle: {
        fontFamily: "Dharma-Gothic-Regular",
        fontSize: 35,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'left',
        paddingHorizontal: 20,
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginVertical: 20,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        overflow: "hidden", // 添加 overflow 属性以隐藏超出部分

    },
    cardTitle: {
        fontSize: 16,
        margin: 10,
    },
    webView: {
        flex: 1,
        aspectRatio: 16 / 9, // To maintain aspect ratio of the video
    },
});
