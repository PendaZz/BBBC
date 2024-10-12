import * as React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Modal,
    TouchableOpacity
} from "react-native";
import Header from "../../component/Header";
import MoreNavi from "../../component/MoreNatigation";

export default function NewsScreen({ navigation }) {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedNews, setSelectedNews] = React.useState('');
    const [imageSources] = React.useState([
        require('../../assets/img/News/1.jpg'),
        require('../../assets/img/News/2.jpg'),
        require('../../assets/img/News/3.jpg'),
    ]);

    const [newsTitles] = React.useState([
        "Tohi Smith-Milner signs on for NBL25",
        "Bullets Off Season Wrap - April 16",
        "Brisbane Bullets welcome Deng Adel"
    ])

    const openModal = (news) => {
        setSelectedNews(news);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const descriptions = [
        "The Brisbane Bullets are pleased to announce the signing of Tohi Smith-Milner for 2024/25 NBL season, with a team option in the second year.\n\nThe 205cm forward joins the Bullets with vast international and NBL experience and will bring his toughness and versatility to Brisbane in NBL25.\n\nSmith-Milner grew up in Auckland and began his NBL career with Melbourne United in the 2015/16 season. He spent five seasons at United and was a part of the NBL championship winning team in 2018 alongside Casey Prather and Justin Schueller. He also played at South-East Melbourne Phoenix and Adelaide 36ers, amassing 141 career NBL games.\n\nSmith-Milner has represented New Zealand at multiple World Championships, the Commonwealth Games and made the all-tournament team at the Asia Cup in 2022.\n\nHe is currently playing for the Wellington Saints in the NZNBL where he is averaging 19.5ppg and 9 rpg, including 30 points (8/11 3PM) and 12 rebounds at the weekend.\n\nBrisbane Bullets Hostplus Head Coach Justin Schueller welcomed Smith-Milner to the Bullets.\n\n“Tohi is an athlete with huge potential that we believe is ready to have an impact in this league,” Schueller said.\n\n“His ability to space and stretch the floor with his shooting, IQ and versatility makes him a key piece to our roster build.” \n\n“Tohi has championship experience, and we look forward to what he will provide our program this season.”\n\nTohi is looking forward to joining Brisbane ahead of NBL25.\n\n“I’m really excited for this coming season. It will be great to join the Bullets and reconnect with some of the boys I’ve played with before as well as Justin who I’ve been coached by at United in the NBL as well as Kilsyth in the NBL1,” Smith-Milner said.\n\n“I’m ready to come in and be able to make an impact wherever possible.”\n\nSmith-Milner joins Josh Bannan, Tyrell Harrison, Sam McDaniel, Mitch Norton, Casey Prather, Isaac White, Rocco Zikarsky and Deng Adel on the Bullets roster for NBL25.",
        "",
        "",
    ];

    return (
        <View style={styles.container}>
            <Header />
            <MoreNavi navi={{ navigation }} />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.newsTitle}>NEWS</Text>
                {descriptions.map((description, index) => (
                    <View key={index} style={styles.cardContainer}>
                        <TouchableOpacity onPress={() => openModal(description)}>
                            <Image style={styles.cardImage} source={imageSources[index]} />
                        </TouchableOpacity>
                        <Text style={styles.cardTitle}>{newsTitles[index]}</Text>
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.overlayStyle}>
                    <View style={styles.modalView}>
                        <ScrollView>
                            <Image style={styles.cardImage} source={require('../../assets/img/News/1.jpg')} />
                            <Text style={styles.modalText}>{selectedNews}</Text>
                        </ScrollView>
                        <TouchableOpacity style={styles.buttonClose} onPress={closeModal}>
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    newsTitle: {
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'left',
        paddingHorizontal: 20,
        fontFamily: "Dharma-Gothic-Regular",
        fontSize: 35,
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
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cardTitle: {
        fontSize: 16,
        margin: 10,
    },
    overlayStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop:130
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'left',
        marginTop: 20
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20, // Added margin to separate from the modal text
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
