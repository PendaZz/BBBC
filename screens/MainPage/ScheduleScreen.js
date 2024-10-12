import React,{ useState, useEffect }from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../../component/Header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getMatchData = async () => {
  try {
    const response = await fetch('http://192.168.1.119:3001/match', {
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
const getTeamData = async () => {
  try {
    const response = await fetch('http://192.168.1.119:3001/team', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return [];
  }
};

const ScheduleScreen = () => {
  const navigation = useNavigation();
  const [user_id, setUser_id] = useState('');
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const matchData = await getMatchData();
      const teamData = await getTeamData();
      setTeams(teamData);

      const mergedData = matchData.map((match) => {
        const teamA = teamData.find((team) => team.Team_id === match.TeamA_id);
        const teamB = teamData.find((team) => team.Team_id === match.TeamB_id);
        return {
          ...match,
          TeamA_info: teamA,
          TeamB_info: teamB,
          date: new Date(match.date).toLocaleDateString(),
        };
      });
      setMatches(mergedData);
    };
    fetchData();
  }, []);

  useFocusEffect(() => {
    const getUserID = async () => {
        const id = await AsyncStorage.getItem('id');
        setUser_id(id);
    }
    getUserID();
    console.log(user_id);
  });
  
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
  }

//   console.log(user_id);
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>SCHEDULE</Text>
        {matches.map((match) => (
          <View key={match.game_id} style={styles.matchCard}>
            <View style={styles.teamInfoContainer}>
              <View style={styles.teamContainer}>
                <Image source={getStaticImage(match.TeamA_info.logo)} style={styles.logo} />
                <Text style={styles.teamName}>{match.TeamA_id.name}</Text>
                <Text style={[styles.teamScore, styles.digitalFont]}>{match.TeamA_score}</Text>
              </View>
              <View style={styles.vsContainer}>
                <Text style={styles.vsText}>VS</Text>
              </View>
              <View style={styles.teamContainer}>
                <Image source={getStaticImage(match.TeamB_info.logo)} style={styles.logo} />
                <Text style={styles.teamName}>{match.TeamB_id.name}</Text>
                <Text style={[styles.teamScore, styles.digitalFont]}>{match.TeamB_score}</Text>
              </View>
            </View>
            <View style={styles.matchStatusContainer}>
              <Text style={styles.matchType}>{match.type}</Text>
              <Text style={styles.matchDate}>{match.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {user_id !== null ? <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("PredictionPage")}>
        <Text style={styles.buttonText}>Prediction</Text>
      </TouchableOpacity> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    paddingVertical: 10,
    marginLeft: 10,
    marginBottom: -5,
    fontFamily: "Dharma-Gothic-Regular",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  matchCard: {
    backgroundColor: "#164CA8",
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    height: 180, // Increased height to accommodate larger score text
  },
  teamInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10, // Added marginBottom to create space between teams and match status
  },
  teamContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 60,
    resizeMode: "contain",
  },
  teamName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  teamScore: {
    fontWeight: "bold",
    fontSize: 60,
    color: "white",
    textAlign: "center",
    marginTop: 10, // Adjusted marginTop for better spacing
  },
  vsContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAB81B",
    borderRadius: 25,
    padding: 10,
    bottom: 25,
  },
  vsText: {
    fontSize: 18,
    color: "darkblue",
    fontWeight: "bold",
  },
  matchStatusContainer: {
    alignItems: "center",
    bottom: 50,
  },
  matchType: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  matchDate: {
    fontSize: 16,
    color: "white",
  },
  matchLocation: {
    fontSize: 16,
    color: "white",
  },
  buttonContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    top: 70,
  },
  buttonText: {
    color: "#164CA8",
    fontSize: 16,
    fontWeight: "bold",
  },
  digitalFont: {
    fontFamily: "PureHeartRegular", // Ensure this matches the name in the TTF file
  },
});

export default ScheduleScreen;
