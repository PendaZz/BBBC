import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../../component/Header";
import React, { useState, useEffect } from "react";


const getCoachData = async () => {
  try {
    const response = await fetch('http://192.168.1.119:3001/coach', {
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
    return [];
  }
};

const CoachCard = ({ surname, given_name, position, description, image }) => {
    const [modalVisible, setModalVisible] = useState(false);
  
    const openModal = () => {
        setModalVisible(true);
    };
  
    const closeModal = () => {
        setModalVisible(false);
    };
    
    const getStaticImage = (path) => {
        switch (path) {
          case '../../assets/img/HeadCoach.png':
            return require('../../assets/img/HeadCoach.png');
          case '../../assets/img/AssistantCoach1.png':
            return require('../../assets/img/AssistantCoach1.png');
          case '../../assets/img/AssistantCoach2.png':
            return require('../../assets/img/AssistantCoach2.png');
          default:
            return null;
        }
      };

    return (
        <View style={styles.card}>
            <Image source={getStaticImage(image)} style={styles.avatar} />
            <View style={styles.info}>
                <Text style={styles.name}>{surname} {given_name}</Text>
                <Text style={styles.title}>{position}</Text>
                {/* Button to open modal */}
                <TouchableOpacity onPress={openModal}>
                    <Text style={styles.readMore}>Read More</Text>
                </TouchableOpacity>
            </View>
            {/* Modal popup */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.overlayStyle}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{description}</Text>
                        <TouchableOpacity style={styles.buttonClose} onPress={closeModal}>
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
  };

export default function TeamScreen({ navigation }) {
const route = useRoute();

const getButtonStyle = (routeName) => [
  styles.button,
  route.name === routeName && styles.activeButton,
];

const getButtonTextStyle = (routeName) => [
  styles.buttonText,
  route.name === routeName && styles.activeButtonText,
];
const [coachData,setCoachData] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    const data = await getCoachData();
    //图片需要预处理
    setCoachData(data);
  };
  fetchData();
}, []);


return (
  <View style={styles.container}>
    <View>
      <Header />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={getButtonStyle("Roster")}
          onPress={() => navigation.navigate("Roster")}
        >
          <Text style={getButtonTextStyle("Roster")}>ROSTER</Text>
        </TouchableOpacity><TouchableOpacity
          style={getButtonStyle("Coaches")}
          onPress={() => navigation.navigate("Coaches")}
        >
          <Text style={getButtonTextStyle("Coaches")}>COACHES</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={getButtonStyle("Statistics")}
          onPress={() => navigation.navigate("Statistics")}
        >
          <Text style={getButtonTextStyle("Statistics")}>STATISTICS</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Put other content here */}
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {coachData.map((coach, index) => (
        <CoachCard key={index} {...coach} />
      ))}
    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  overlayStyle: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      justifyContent: "center",
      alignItems: "center",
  },
  modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
  },
  modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  modalText: {
      marginBottom: 16,
      textAlign: "left",
  },
  buttonClose: {
      backgroundColor: "#2196F3",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
  },
  textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
  },
  card: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
      marginLeft: 10,
      marginRight: 10,
  },
  avatar: {
      width: 200,
      height: 200,
      borderRadius: 20,
      marginRight: 10,
  },
  info: {
      flex: 1,
      justifyContent: "center",
  },
  name: {
      fontSize: 17,
      fontWeight: "bold",
      marginBottom: 4,
      fontFamily: "Nimbus-Sans-Regular",
  },
  title: {
      fontSize: 14,
      color: "gray",
      marginBottom: 4,
      fontFamily: "Nimbus-Sans-Regular",
  },
  readMore: {
      fontSize: 10,
      fontFamily: "Roc-Grotesk-Regular",
      marginTop: 5,
  },
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
