import React, { useState } from "react";
import { View, TextInput, Alert, Image, TouchableOpacity, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Header from "../../component/Header";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async (type) => {
    if (!username || !password || !confirmPassword || !email) {
      Alert.alert("Error", "All fields are required");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Invalid email format");
      return;
    }
  
    const url = `http://192.168.1.119:3001/register`; // Replace with your actual backend address
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });
  
      // Check if the response status is not OK
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
  
      const data = await response.json();
      setMessage(data.message); // Show the message returned from the server
  
      if (data.message === "Username already exists") {
        Alert.alert("Error", "Username already exists");
        return;
      }
  
      if (data.message === "User registered successfully" || data.message === "Logged in!") {
        // Clear inputs on successful registration or login
        Alert.alert("Success", data.message);
        navigation.navigate("Login");
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
      } else {
        // Clear inputs even if login or registration is unsuccessful
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.message);
      // Clear inputs on error
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setEmail('');
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >        
    <Header /><Image
          source={require("../../assets/img/TicketBackground.jpeg")}
          style={styles.backgroundImage}
        />
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.formContainer}>
          <Text style={styles.text}>Sign Up</Text>
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
              placeholder="Email"
              placeholderTextColor="black"
              value={email}
              onChangeText={setEmail}
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
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="black"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              returnKeyType="done"
              blurOnSubmit={true} 
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleAuth('register')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupLink}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* {message ? <Text style={styles.message}>{message}</Text> : null} */}
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
