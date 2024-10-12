import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const getStaffData = async () => {
    try {
        const response = await fetch('http://192.168.1.119:3001/player', {
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
        console.error('There was a problem with the fetch operation:', error);
    }
}

export default function PredictionCard({ question, onSelectOption }) {

    const [options, setOptions] = React.useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const playerData = await getStaffData();
            const playerOptions = playerData
            .filter((player) => !player.position.includes('Coach'))
            .map((player) => ({
                id: player.staff_id,
                text: `${player.given_name} ${player.surname}`,
            }));
            setOptions(playerOptions);
        }
        
        fetchData();
    }, []);

    const [selectedOption, setSelectedOption] = useState(null);


    const questions = {
        text: question,
        options: options,
        correctAnswerId: 3
    };
    // console.log(questions.options);

    const handleOptionSelect = (id) => {
        setSelectedOption(id);
        onSelectOption(id);
    };

    return (
        <View style={[styles.container]}>

            <Text style={styles.questionText}>{questions.text}</Text>
            <ScrollView style={styles.dropdownContainer}>
                {questions.options.map(option => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.optionButton,
                            selectedOption === option.id && styles.selectedOptionButton
                        ]}
                        onPress={() => handleOptionSelect(option.id)}
                    >
                        <Text style={styles.optionText}>{option.text}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/* <TouchableOpacity
                style={[
                    styles.submitButton,
                    selectedOption === null && styles.disabledButton
                ]}
                onPress={handleSubmit}
                disabled={selectedOption === null}
            >
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            {submitted && (
                <Text style={styles.resultText}>
                    {selectedOption === questions.correctAnswerId ? 'Correct!' : 'Incorrect!'}
                </Text>
            )} */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 100,
        width: "90%",
        marginLeft: "5%",
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 20,
        justifyContent: "center",
        textAlign: "center",
    },
    title: {
        marginLeft: 10,
        marginTop: 0,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
    },
    dropdownContainer: {
        maxHeight: 220,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    selectedOptionButton: {
        borderColor: '#007BFF',
        backgroundColor: '#e6f2ff',
    },
    optionText: {
        fontSize: 18,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#aaa',
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
})
