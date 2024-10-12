import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    Modal,
} from "react-native";
import Header from "../../component/Header";
import { useFocusEffect } from "@react-navigation/native";
import MoreNavi from "../../component/MoreNatigation";

const getNearestMatch = async () => {
    try {
        const response = await fetch('http://192.168.1.119:3001/nearest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        // console.log(data);
        return data;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export default function PredictionScreen({ navigation }) {

    const [upcoming, setUpcoming] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const upcomingData = await getNearestMatch();
            setUpcoming(upcomingData);
        };
        fetchData();
        console.log(upcoming);
    }, []);

    const getStaticImage = (path) => {
        switch (path) {
          case '../../assets/img/TeamLogo/BBBC.png':
            return require('../../assets/img/TeamLogo/BBBC.png');
          case '../../assets/img/TeamLogo/Cairns Taipans NEG.png':
            return require('../../assets/img/TeamLogo/Cairns Taipans NEG.png');
          case '../../assets/img/TeamLogo/Adelaide 36ers.png':
            return require('../../assets/img/TeamLogo/Adelaide 36ers.png');
          case '../../assets/img/TeamLogo/Melbourne.png':
            return require('../../assets/img/TeamLogo/Melbourne.png');
          case '../../assets/img/TeamLogo/Illawarra Hawks.png':
            return require('../../assets/img/TeamLogo/Illawarra Hawks.png');
          case '../../assets/img/TeamLogo/Kings.png':
            return require('../../assets/img/TeamLogo/Kings.png');
          case '../../assets/img/TeamLogo/Tasmania JackJumpers.png':
            return require('../../assets/img/TeamLogo/Tasmania JackJumpers.png');
          default:
            return null;
        }
    };

    const upcomingMatch = [
        {
            id: upcoming.game_id,
            team1: {
              name: upcoming.TeamA_name,
              logo: getStaticImage(upcoming.TeamA_logo),
              score: '',
            },
            team2: {
              name: upcoming.TeamB_name,
              logo: getStaticImage(upcoming.TeamB_logo),
              score: '',
            },
            date: upcoming.date,
            arena: upcoming.arena,
            matchType: upcoming.matchType,
            question1: upcoming.question1_id,
            question2: upcoming.question2_id,
            question3: upcoming.question3_id,
            question4: upcoming.question4_id,
        },
    ]; 
    const [modalVisible, setModalVisible] = useState(false);
    
    const [points, setPoints] = useState(0); // 示例点数值
    useFocusEffect(() => {
        const getPoints = async () => {
            const reward = await AsyncStorage.getItem('point');
            setPoints(reward);
        };
        getPoints();
    })
    

    const liveMatch = [];
    const handleLive = () => {
        if (liveMatch.length === 0) {
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
            }, 1500);
        }
    };

    const handleUpcoming = (match) => {
        navigation.navigate("UpcomingPredict", { match, navigation })
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/img/TicketBackground.jpeg")}
                style={styles.backgroundImage}
            />
            <Header />
            
            {/* 显示点数 */}
            <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>Your Points: {points}</Text>
            </View>
            
            {/* Put other content here */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity style={styles.bstoreButton} onPress={() => navigation.navigate("Schedule")}>
                    <Text style={styles.bstoreButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLive}>
                    <Text style={styles.text}>Live Match Predict</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.button} onPress={() => handleUpcoming(upcomingMatch)}>
                    <Text style={styles.text}>Upcoming Match Predict</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>There is no Live Match now!</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        paddingTop: 70,
        paddingBottom: 120,
        marginTop:20,
    },
    backgroundImage: {
        flex: 1,
        position: "absolute",
        width: "110%",
        minHeight: "100%",
        opacity: 0.1,
        resizeMode: "cover",
        marginTop: 125, 
    },
    separator: {
        height: 50,
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        flex: 1,
        marginLeft: "10%",
        height: 130,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#164CA8",
    },
    text: {
        fontSize: 35,
        color: 'white',
        fontWeight: "bold",
        fontFamily: "Pure-Heart-Regular",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
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
    pointsContainer: {
        position: "absolute",
        top: 10,
        right: 20,
        backgroundColor: "#164CA8",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 3,
        zIndex: 1,
    },
    pointsText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        top:80,
    },
});

