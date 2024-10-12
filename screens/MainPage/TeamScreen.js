import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Header from "../../component/Header";


const getPlayerData = async () => {
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
    return [];
  }
};
const getStaticImage = (path) => {
  switch (path) {
    case '../../assets/img/Player/Chris Smith.jpg':
      return require('../../assets/img/Player/Chris Smith.jpg');
    case '../../assets/img/Player/Gabe Hadley.jpg':
      return require('../../assets/img/Player/Gabe Hadley.jpg');
    case '../../assets/img/Player/Isaac White.jpg':
      return require('../../assets/img/Player/Isaac White.jpg');
    case '../../assets/img/Player/Mitch Norton.jpg':
      return require('../../assets/img/Player/Mitch Norton.jpg');
    case '../../assets/img/Player/Nathan Sobey.jpg':
      return require('../../assets/img/Player/Nathan Sobey.jpg');
    case '../../assets/img/Player/Sam McDaniel.jpg':
      return require('../../assets/img/Player/Sam McDaniel.jpg');
    case '../../assets/img/Player/Shannon Scott.jpg':
      return require('../../assets/img/Player/Shannon Scott.jpg');
    case '../../assets/img/Player/Tristan Devers.jpg':
      return require('../../assets/img/Player/Tristan Devers.jpg');
    case '../../assets/img/Player/Josh Bannan.jpg':
      return require('../../assets/img/Player/Josh Bannan.jpg');
    case '../../assets/img/Player/DJ Mitchell.jpg':
      return require('../../assets/img/Player/DJ Mitchell.jpg');
    case '../../assets/img/Player/Casey Prather.jpg':
      return require('../../assets/img/Player/Casey Prather.jpg');
    case '../../assets/img/Player/Matthew Johns.jpg':
      return require('../../assets/img/Player/Matthew Johns.jpg');
    case '../../assets/img/Player/Aron Baynes.jpg':
      return require('../../assets/img/Player/Aron Baynes.jpg');
    case '../../assets/img/Player/Rocco Zikarsky.jpg':
      return require('../../assets/img/Player/Rocco Zikarsky.jpg');
    case '../../assets/img/Player/Tyrell Harrison.jpg':
      return require('../../assets/img/Player/Tyrell Harrison.jpg');
    default:
      return null;
  }
}
const PlayerCard = ({ givenname, surname, position, description, image }) => {
  const [modalVisible, setModalVisible] = useState(false);


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.position}>{position}</Text>
          <Text style={styles.name}>{givenname}</Text>
          <Text style={styles.name}>{surname}</Text>
          <TouchableOpacity onPress={openModal}>
            <Text style={styles.readMore}>Read Biography</Text>
          </TouchableOpacity>
        </View>
        <Image source={getStaticImage(image)} style={styles.avatar} />
        <ImageBackground
          source={require("../../assets/img/Orange.jpg")}
          style={styles.orange}
        />
        <ImageBackground
          source={require("../../assets/img/playerbackground.jpg")}
          style={styles.backgroundImage}
        />
      </View>

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
  const [PlayerData,setPlayerData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlayerData();
      //图片需要预处理
      setPlayerData(data);
    };
    fetchData();
  }, []);
  
  const getButtonStyle = (routeName) => [
    styles.button,
    route.name === routeName && styles.activeButton,
  ];

  const getButtonTextStyle = (routeName) => [
    styles.buttonText,
    route.name === routeName && styles.activeButtonText,
  ];
  const renderPlayerGroup = (position, title) => (
    <View style={styles.playerGroup} key={position}>
      <Text style={styles.groupTitle}>{title}</Text>
      <ScrollView contentContainerStyle={styles.playerGroupContent}>
        {PlayerData.filter((player) => player.position === position).map(
          (player, index) => (
            <PlayerCard key={index} {...player} />
          )
        )}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={getButtonStyle("Roster")}
          onPress={() => navigation.navigate("Roster")}
        >
          <Text style={getButtonTextStyle("Roster")}>ROSTER</Text>
        </TouchableOpacity>
        <TouchableOpacity
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

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderPlayerGroup("Guard", "Guard")}
        {renderPlayerGroup("Forward", "Forward")}
        {renderPlayerGroup("Power Forward", "Power Forward")}
        {renderPlayerGroup("Center", "Center")}
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
  cardContainer: {
    marginBottom: 20,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    right: -95,
    bottom: 0,
    resizeMode: "cover",
    justifyContent: "center",
    zIndex: -1, // 将 zIndex 设置为较低的值，以确保位于其他内容的后面
    bottom: 0,
    width: "40%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: -5,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 10,
    overflow: "hidden", // 添加 overflow 属性以隐藏超出部分
    width: "auto",
    height: 105,
    marginTop: 5,
  },
  avatar: {
    width: 90,
    height: 100,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    left: 20,
  },
  position: {
    color: "gray",
    bottom: 10,
    left: 7,
    fontSize: 12,
    fontFamily: "Nimbus-Sans-Regular",
  },
  readMore: {
    fontFamily: "Roc-Grotesk-Regular",
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
    textAlign: "justify", // 尝试将文本左右对齐
    marginLeft: 22, // 调整左边距以适应布局
    marginRight: 22, // 调整右边距以适应布局
    top: 5,
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
    textAlign: "center",
    color: "gray",
    fontFamily: "Nimbus-Sans-Regular",
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
    marginTop: -21,
   
  },
  orange: {
    position: "absolute",
    top: 0,
    bottom: 0,
    resizeMode: "cover",
    justifyContent: "center",
    bottom: 0,
    width: "12%",
  },
  groupTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: "Roc-Grotesk-Regular",
  },
});
