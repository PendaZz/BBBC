import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert,Image,TouchableOpacity,handleLogin,KeyboardAvoidingView,Platform,ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../../component/Header";

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.119:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        await AsyncStorage.setItem("id", String(data.user.user_id));
        await AsyncStorage.setItem("point", String(data.user.reward));
        console.log("User ID and reward point stored in AsyncStorage");
  
        // Read the id after storing it
        const storedId = await AsyncStorage.getItem("id");
        console.log("Stored ID:", storedId);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />
      <Image
        source={require("../../assets/img/TicketBackground.jpeg")}
        style={styles.backgroundImage}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.text}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="black"
              value={username}
              onChangeText={setUsername}
              returnKeyType="done"
              blurOnSubmit={true} 
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
              blurOnSubmit={true} 
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleLogin('login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input: {
    width: 250,
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  message: {
    color: 'red',
    fontSize: 18,
    margin: 20,
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    width: "110%",
    minHeight: "100%",
    opacity: 0.1,
    resizeMode: "cover",
  },
  text: {
    fontSize: 150,
    color: 'black',
    fontFamily: "Dharma-Gothic-Regular",
  },
  inputContainer: {
    top: 100,
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  button: {
    top: 100,
    backgroundColor: '#007bff',
    width: 300,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    top: 110,
    flexDirection: 'row',
  },
  signupText: {
    color: 'black',
    fontSize: 16,
  },
  signupLink: {
    color: 'blue',
    fontSize: 16,
    marginLeft: 5,
  }
});

export default LoginScreen;
