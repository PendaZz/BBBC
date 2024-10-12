import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import SplashScreen from "./SplashScreen";
import HomeScreen from "./MainPage/HomeScreen";
import ScheduleScreen from "./MainPage/ScheduleScreen";
import MoreScreen from "./MainPage/MoreScreen";
import TeamScreen from "./MainPage/TeamScreen";
import TicketScreen from "./MainPage/TicketScreen";
import CoachPage from "./OtherPage/CoachPage";
import StatisticsPage from "./OtherPage/StatisticsPage";
import BStorePage from "./OtherPage/BStorePage";
import PredictionPage from "./OtherPage/PredictionPage";
import VideoPage from "./OtherPage/VideoPage";
import OfficialKit from "./OtherPage/OfficialKit";
import Supporter from "./OtherPage/Supporter";
import Headwear from "./OtherPage/Headwear";
import Accessories from "./OtherPage/Accessories";
import Basketball from "./OtherPage/Basketball";
import Product from "./OtherPage/Product";
import LoginScreen from './MainPage/LoginScreen';
import UpcomingPredict from "./OtherPage/Prediction/UpcomingPredict";
import PointsLeaderboard from "./OtherPage/PointsLeaderboard"
import AssistsLeaderboard from "./OtherPage/AssistsLeaderboard"
import BlocksLeaderboard from "./OtherPage/BlocksLeaderboard"
import ReboundsLeaderboard from "./OtherPage/ReboundsLeaderboard"
import SignUp from "./OtherPage/SignUp"

// Screen names
const homeName = "Home";
const scheduleName = "Schedule";
const moreName = "More";
const teamName = "Team";
const ticketName = "Ticket";
const loginName = "Login";
const signupName = "SignUp";
const predictionPageName = "PredictionPage"
const officialKitName="OfficialKit"
const basketballName="Basketball"
const headwearName="Headwear"
const supporterName="Supporter"
const accessoriesName="Accessories"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ gestureEnabled: false }}>
                <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="Main"
                component={MainTabNavigator}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="Product"
                component={Product}
                options={{ headerShown: false, gestureEnabled: true }} // 在主页中启用手势
                />
                <Stack.Screen
                name="UpcomingPredict"
                component={UpcomingPredict}
                options={{ headerShown: false, gestureEnabled: true }} // 在主页中启用手势
                />       
                <Stack.Screen
                name="PointsLeaderboard"
                component={PointsLeaderboard}
                options={{ headerShown: false, gestureEnabled: true }} // 在主页中启用手势
                />
                <Stack.Screen
                name="AssistsLeaderboard"
                component={AssistsLeaderboard}
                options={{ headerShown: false, gestureEnabled: true }} // 在主页中启用手势
                />
                <Stack.Screen
                name="BlocksLeaderboard"
                component={BlocksLeaderboard}
                options={{ headerShown: false, gestureEnabled: true }} // 在主页中启用手势
                />
                <Stack.Screen
                name="ReboundsLeaderboard"
                component={ReboundsLeaderboard}
                options={{ headerShown: false, gestureEnabled: true }} // 在主页中启用手势
                />
            </Stack.Navigator>
            
        </NavigationContainer>
    );
}

function MoreNavigator() {
    return (
        <Tab.Navigator
            tabBar={() => null}
        >
            <Tab.Screen
                name="News"
                component={MoreScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Video"
                component={VideoPage}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="B-Store"
                component={BStorePage}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}

function TeamNavigator() {
    return (
        <Tab.Navigator
            tabBar={() => null} // 隐藏底部选项卡
        >
            <Tab.Screen
                name="Roster"
                component={TeamScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Coaches"
                component={CoachPage}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Statistics"
                component={StatisticsPage}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}

function MainTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                headerShown: false, // 隐藏顶部导航栏
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === homeName) {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === scheduleName) {
                        iconName = focused ? "calendar" : "calendar-outline";
                    } else if (route.name === moreName) {
                        iconName = focused
                            ? "ellipsis-horizontal"
                            : "ellipsis-horizontal-outline";
                    } else if (route.name === teamName) {
                        iconName = focused ? "people" : "people-outline";
                    } else if (route.name === ticketName) {
                        iconName = focused ? "ticket" : "ticket-outline";
                    } else if (route.name === loginName) {
                        iconName = focused ? "person" : "person-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#FAB81B",
                tabBarInactiveTintColor: "#E1E1E2",
                tabBarLabelStyle: { paddingBottom: 0, fontSize: 10 },
                tabBarStyle: [{ display: "flex", backgroundColor: "#164CA8" }, null],
            })}
        >
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={scheduleName} component={ScheduleScreen} />
            <Tab.Screen name={moreName} component={MoreNavigator} />
            <Tab.Screen name={teamName} component={TeamNavigator} />
            <Tab.Screen name={ticketName} component={TicketScreen} />
            <Tab.Screen name={loginName} component={LoginScreen} />
            <Tab.Screen
                name={signupName}
                component={SignUp}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false
                }}
            />
            <Tab.Screen
                name={predictionPageName}
                component={PredictionPage}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false
                }}
            />
            <Tab.Screen
                name={officialKitName}
                component={OfficialKit}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false
                }}
            />
            <Tab.Screen
                name={supporterName}
                component={Supporter}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false
                }}
            />
            <Tab.Screen
                name={accessoriesName}
                component={Accessories}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false
                }}
            />
            <Tab.Screen
                name={basketballName}
                component={Basketball}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false
                }}
            />
            <Tab.Screen
                name={headwearName}
                component={Headwear}
                options={{
                    tabBarButton: () => null,
                    tabBarVisible: false
                }}
            />
        </Tab.Navigator>
    );
}

export default MainContainer;
