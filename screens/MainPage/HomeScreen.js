import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";
import Header from "../../component/Header";

export default function HomeScreen({ navigation }) {
    // Fetch Back-End API here (Not ready !!!!!!!!!!!!!!!!!!!!!!!!)
    // Home Page Latest match data
    /*const [latestMatchData, setLatestMatchData] = React.useState([]);
    const latestMatchUrl = "";
    useEffect(() => {
        fetch(latestMatchUrl)
        .then(response => response.json())
        .then(data => {
            setLatestMatchData(data);
        })
        .catch(error => {
            console.error('Error fetching get latest match:', error);
        });
    }, []);

    // Home Page News data
    const [newsData, setNewsData] = React.useState([]);
    const newsUrl = "";
    useEffect(() => {
        fetch(newsUrl)
        .then(response => response.json())
        .then(data => {
            setNewsData(data);
        })
        .catch(error => {
            console.error('Error fetching get news:', error);
        });
    }, []);
    */

  // Open different platform links for the NBL App
  const handleAdPress = () => {
    const url =
      Platform.OS === "ios"
        ? "itms-apps://itunes.apple.com/app/id1046278655"
        : "https://play.google.com/store/apps/details?id=com.yinzcam.nbl.league&hl=en_AU&gl=US";
    Linking.openURL(url);
  };
  // Open social media links
  const handleSocialMediaPress = (url) => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>LATEST MATCH</Text>
      {/* Match score boxes */}
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalScrollContainer}>
    <Image source={require('../../assets/img/Temp/match2.jpg')} style={styles.matchScoreBox} />
    <Image source={require('../../assets/img/Temp/match2.jpg')} style={styles.matchScoreBox} />
    <Image source={require('../../assets/img/Temp/match2.jpg')} style={styles.matchScoreBox} />
    <Image source={require('../../assets/img/Temp/match2.jpg')} style={styles.matchScoreBox} />
    {/* Add more images as needed */}
  </ScrollView>

        <Text style={styles.title}>NEWS</Text>
        <View style={styles.newsContainer}>
          {/* First row of news boxes */}
          <View style={styles.newsRow}>
          <Image source={require('../../assets/img/Temp/1.jpg')} style={styles.newsBox} />
          <Image source={require('../../assets/img/Temp/2.jpg')} style={styles.newsBox} />
          </View>
          {/* Second row of news boxes */}
          <View style={styles.newsRow}>
          <Image source={require('../../assets/img/Temp/3.jpg')} style={styles.newsBox} />
          <Image source={require('../../assets/img/Temp/4.jpg')} style={styles.newsBox} />
          </View>
        </View>

        <TouchableOpacity onPress={handleAdPress}>
          <Image
            source={require("../../assets/img/ad.jpg")}
            style={styles.advertisement}
          />
        </TouchableOpacity>

        <Text style={styles.title}>SOCIAL MEDIA</Text>
        <View style={styles.horizontalContainer}>
          <TouchableOpacity
            onPress={() =>
              handleSocialMediaPress(
                "https://www.instagram.com/brisbanebullets/"
              )
            }
          >
            <Image
              source={require("../../assets/img/IgIcon.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleSocialMediaPress(
                "https://www.facebook.com/BrisbaneBullets/"
              )
            }
          >
            <Image
              source={require("../../assets/img/FacebookIcon.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleSocialMediaPress("https://twitter.com/BrisbaneBullets")
            }
          >
            <Image
              source={require("../../assets/img/TwitterIcon.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleSocialMediaPress(
                "https://www.youtube.com/channel/UCJaGGZG2kamXywgks_xWx0A"
              )
            }
          >
            <Image
              source={require("../../assets/img/YoutubeIcon.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>PARTNERS</Text>
        <View style={styles.horizontalContainer}>
          <TouchableOpacity
            onPress={() =>
              handleSocialMediaPress("https://www.carnival.com.au/")
            }
          >
            <Image
              source={require("../../assets/img/Partner1.jpg")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialMediaPress("https://hostplus.com.au/")}
          >
            <Image
              source={require("../../assets/img/Partner2.jpg")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleSocialMediaPress("https://twitter.com/BrisbaneBullets")
            }
          >
            <Image
              source={require("../../assets/img/Partner3.jpg")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleSocialMediaPress("https://allpropertiesgroup.com.au/")
            }
          >
            <Image
              source={require("../../assets/img/Partner4.jpg")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialMediaPress("https://www.csq.org.au/")}
          >
            <Image
              source={require("../../assets/img/Partner5.jpg")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleSocialMediaPress("https://www.polyflor.com.au/")
            }
          >
            <Image
              source={require("../../assets/img/Partner6.jpg")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  advertisement: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: -70,
    marginTop: -80,
  },
  container: {
    justifyContent: "space-around",
    flex: 1,
  },
  socialIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 35,
    paddingVertical: 10,
    marginLeft: 10,
    marginBottom: -5,
    fontFamily: "Dharma-Gothic-Regular",
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  matchScoreBox: {
    height: 100,
    width: 180, // Adjust as needed
    backgroundColor: "white", // Background color of the border
    marginBottom: -15,
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    borderRadius: 10, // Add rounded corners
  },
  newsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  newsRow: {
    flexDirection: "row",
    paddingHorizontal: 10,  // 維持左右兩邊的間隔
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
  },
  newsBox: {
    height: 160,
    width: 180,
    marginLeft: 5,
    marginHorizontal: 8,  // 新增水平間隔
    borderRadius: 10,
    margin: 5, // Adjust spacing between news items
    flex: 1,

  },
  horizontalScrollContainer: {
    height: 110,
    flexDirection: 'row',
    paddingLeft: 10, 
    marginBottom: -10, 
    // 你可以根据需要添加更多样式
  },
  });

