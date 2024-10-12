import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Button, Dimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Header from "../../component/Header";
import { PieChart } from "react-native-chart-kit";


const getStatistics = async () => {
    try {
        const response = await fetch('http://192.168.1.119:3001/statistics', {
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

const PlayerCard = ({ player, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(player)}>
        <View style={styles.card}>
            <Image source={getStaticImage(player.image)} style={styles.image} />
            <Text style={styles.name}>{player.name}</Text>
            <Text style={styles.stat}>{player.points} Points</Text>
        </View>
        </TouchableOpacity>
    );
};

export default function StatisticsPage({ navigation }) {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [statistics, setStatistics] = useState([]);

  const getButtonStyle = (routeName) => [
    styles.button,
    route.name === routeName && styles.activeButton,
  ];

  const getButtonTextStyle = (routeName) => [
    styles.buttonText,
    route.name === routeName && styles.activeButtonText,
  ];

  const getPlayerStats = (player) => [
    { name: "PPG", population: parseFloat(player.PPG), color: "rgba(131, 167, 234, 1)", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "APG", population: parseFloat(player.APG), color: "#F00", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "RPG", population: parseFloat(player.RPG), color: "rgb(0, 0, 255)", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "FG%", population: parseFloat(player["FG%"]), color: "#50C878", legendFontColor: "#7F7F7F", legendFontSize: 15 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStatistics();
      const sortedData = {
        Top_5_Points: data.sort((a, b) => b.points - a.points).slice(0, 5),
        Top_5_Assists: data.sort((a, b) => b.APG - a.APG).slice(0, 5),
        Top_5_Rebounds: data.sort((a, b) => b.RPG - a.RPG).slice(0, 5),
        Top_5_Blocks: data.sort((a, b) => b.blocks - a.blocks).slice(0, 5),
      };
      setStatistics(sortedData);
    };
    fetchData();
  }, [])

    // console.log(statistics);
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
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* // Team Statistics OverView Board, Need update */}
        <View style={styles.statOverviewContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statOverviewText}>STANDING</Text>
            <Text style={styles.statOverviewValue}>7th</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statOverviewText}>WINS</Text>
            <Text style={styles.statOverviewValue}>13</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statOverviewText}>LOSSES</Text>
            <Text style={styles.statOverviewValue}>15</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statOverviewText}>PPG</Text>
            <Text style={styles.statOverviewValue}>90.44</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statOverviewText}>RPG</Text>
            <Text style={styles.statOverviewValue}>0</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statOverviewText}>APG</Text>
            <Text style={styles.statOverviewValue}>0</Text>
          </View>
        </View>
        {Object.entries(statistics).map(([statType, statPlayers]) => (
          <View style={styles.statSection} key={statType}>
            <Text style={styles.statHeader}>{statType}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {statPlayers.map((player, index) => (
                <PlayerCard key={index} player={player} onPress={(player) => {
                  setSelectedPlayer(player);
                  setModalVisible(true);
                }} />
              ))}
            </ScrollView>
          </View>
        ))}
        <View style={styles.glossaryContainer}>
          <Text style={styles.glossaryHeader}>Glossary</Text>
          <View style={styles.glossaryContent}>
            <View style={styles.glossaryColumn}>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>GP</Text> Games Played</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>RPG</Text> Average Rebounds per game</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>3PA</Text> Three-point Field Goals Attempted</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>FTA</Text> Free Throws Attempted</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>APG</Text> Assists per game</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>TPG</Text> Turnovers per game</Text>
            </View>
            <View style={styles.glossaryColumn}>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>PPG</Text> Points Per Game</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>FGM</Text> Field Goals Made</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>3PM</Text> Three-point Field Goals Made</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>FTM</Text> Free Throws Made</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>BPG</Text> Blocks per game</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>F</Text> Fouls</Text>
            </View>
            <View style={styles.glossaryColumn}>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>FGA</Text> Field Goals Attempted</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>FG%</Text> Field Goals Percentage</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>3P%</Text> Three-point Field Goals Percentage</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>FT%</Text> Free Throws Percentage</Text>
              <Text style={styles.glossaryItem}><Text style={styles.glossaryItemLabel}>SPG</Text> Steals per game</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedPlayer && (
              <>
                <Image source={getStaticImage(selectedPlayer.image)} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedPlayer.name}</Text>
                <Text style={styles.modalPosition}>{selectedPlayer.position}</Text>
                <View style={styles.modalStats}>
                  <Text style={styles.modalStat}>PPG: {selectedPlayer.PPG}</Text>
                  <Text style={styles.modalStat}>APG: {selectedPlayer.APG}</Text>
                  <Text style={styles.modalStat}>RPG: {selectedPlayer.RPG}</Text>
                  <Text style={styles.modalStat}>FG%: {selectedPlayer["FG%"]}</Text>
                </View>
                <PieChart
                  data={getPlayerStats(selectedPlayer)}
                  width={Dimensions.get('window').width * 0.8}
                  height={220}
                  chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#ffa726"
                    }
                  }}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  paddingLeft={"15"}
                  absolute
                  style={{
                    marginVertical: 8,
                    borderRadius: 16
                  }}
                />
                <Button onPress={() => setModalVisible(!modalVisible)} title="Close" />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  statOverviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  statItem: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 5,
  },
  statOverviewText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  statOverviewValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  statSection: {
    marginTop: 10,
  },
  statHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
  },
  card: {
    width: 120,
    marginTop: -10,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#fab81b'
  },
  image: {
    width: 70,
    height: 90,
    borderRadius: 5,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  stat: {
    fontSize: 12,
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
    fontSize: 13,
    color: "black",
    fontFamily: "Nimbus-Sans-Regular",
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalStats: {
    marginVertical: 10,
  },
  modalStat: {
    fontSize: 20,
    marginBottom: 5,
  },
  modalName: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24, // Increased font size
    fontWeight: "bold", // Bold font
  },

  modalPosition: {
    marginTop: -20,
    textAlign: "center",
    fontSize: 20, // Increased font size
    fontWeight: "bold", // Bold font
  },
  glossaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  glossaryHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  glossaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  glossaryColumn: {
    width: '30%',
  },
  glossaryItem: {
    fontSize: 13,
    marginBottom: 5,
  },
  glossaryItemLabel: {
    fontWeight: 'bold',
  },
});

