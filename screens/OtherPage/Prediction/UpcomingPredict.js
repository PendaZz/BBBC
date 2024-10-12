import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button } from "react-native";
import Header from "../../../component/Header";
import PredictionCard from "../../../component/Prediction/PredictionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchQuestions = async () => {
    try {
        const response = await fetch('http://192.168.1.119:3001/question', {
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

const submitPrediction = async (user_id, game_id, answers) => {
    try {
        const response = await fetch('http://192.168.1.119:3001/submitPredict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id,
                game_id,
                answer1: answers[0],
                answer2: answers[1],
                answer3: answers[2],
                answer4: answers[3],
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log(data.message); // Handle success response
    } catch (error) {
        console.error('Error submitting prediction:', error);
    }
};


export default function UpcomingPredict({ route, navigation }) {
    const { match } = route.params;
    const currentDate = new Date();
    const comingGames = match.filter((match) => new Date(match.date) >= currentDate);

    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [answer, setAnswer] = useState([]);
    const [user_id, setUser_id] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const questionData = await fetchQuestions();
            // console.log(questionData);
            // console.log("Match ID:", match[0].id);

            // 提取 match 中的所有 question_id
            const questionIds = comingGames.reduce((acc, game) => {
                acc.push(game.question1, game.question2, game.question3, game.question4);
                return acc;
            }, []);

            // 在 questionData 中查找匹配的 question_id
            const matchedQuestions = questionData.filter(question => questionIds.includes(question.question_id));

            // 更新 questions 状态
            setQuestions(matchedQuestions);

            const id = await AsyncStorage.getItem('id');
            setUser_id(id);
        }
        fetchData();
    }, []);

    // console.log(user_id)

    const handleOptionSelect = (questionId, optionId) => {
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleSubmit = () => {
        console.log("Selected Options:", selectedOptions);
        if (Object.keys(selectedOptions).length < 4) {
            alert("Please select all four options.");
            return;
        }
        setAnswer(Object.values(selectedOptions))
    };
    // console.log(typeof answer[0])
    useEffect(() => {
        // try {
            if (answer.length === 4) {
                const response = submitPrediction(user_id, match[0].id, answer);
                console.log(response);
            }
            alert("Form submitted!");
        // } catch (error) {
        //   alert('Error submitting prediction:', error);
        // }
      }, [answer]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.replace('SomeScreen')}>Replace</Button>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require("../../../assets/img/TicketBackground.jpeg")}
                style={styles.backgroundImage}
            />
            <Header />
            <View style={styles.scrollViewWrapper}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity style={styles.bstoreButton} onPress={() => navigation.navigate("PredictionPage")}>
                    <Text style={styles.bstoreButtonText}>Back</Text>
                </TouchableOpacity>
                    <View style={styles.comingGamesContainer}>
                        <Text style={styles.sectionTitle}>Upcoming Games</Text>
                        {comingGames.map((match) => (
                            <View key={match.id} style={styles.matchContainer}>
                                <View style={styles.matchInfo}>
                                    <Text style={styles.matchType}>{match.id} {match.matchType}</Text>
                                    <View style={styles.imageContainer}>
                                        <Image source={match.team1.logo} style={styles.teamLogo} />
                                        <Text style={styles.vsText}>VS</Text>
                                        <Image source={match.team2.logo} style={styles.teamLogo} />
                                    </View>
                                    <Text style={styles.arena}>{match.arena}</Text>
                                    <Text style={styles.date}>{match.date}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.predictionContainer}>
                        {questions.map((question, key) => (
                            <PredictionCard 
                                key={key} 
                                question={question.question}
                                onSelectOption={(optionId) => handleOptionSelect(question.question_id, optionId)}
                            />
                        ))}
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.1,
        resizeMode: "cover",
    },
    scrollViewWrapper: {
        flex: 1,
        flexDirection: "column-reverse",
        marginTop:10,
    },
    scrollViewContent: {
        paddingVertical: 20,
    },
    comingGamesContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },
    matchContainer: {
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    matchInfo: {
        alignItems: "center",
    },
    teamLogo: {
        height: 60,
        width: 60,
        marginHorizontal: 10,
    },
    vsText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginHorizontal: 10,
    },
    imageContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    matchType: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#666",
        marginBottom: 5,
    },
    arena: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    date: {
        fontSize: 14,
        color: "#999",
        marginTop: 5,
    },
    predictionContainer: {
        paddingHorizontal: 20,
    },
    submitButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    submitButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
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
});
