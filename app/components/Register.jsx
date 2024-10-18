import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authInitialized, db } from '../../configs/FirebaseConfig';
import {doc, setDoc, getDoc} from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import LoadingIndicator from './LoadingIndicator';

export default function Index() {
  const [isSignUp, setIsSignUp] = useState(false);

  return isSignUp ? (
    <SignUp onToggle={() => setIsSignUp(false)} />
  ) : (
    <SignIn onToggle={() => setIsSignUp(true)} />
  );
}

function SignIn({ onToggle }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }
    
    setLoading(true);
  
    signInWithEmailAndPassword(authInitialized, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
  
        // Fetch user's name and other details from Firestore using user's UID
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userName = userData.name;
          
          // Hide the loading indicator
          setLoading(false);
          
          // Alert and navigate using the fetched username
          Alert.alert("Sign-In Successful", `Welcome ${userName}`);
          navigation.navigate('MainPage', { username: userName });
        } else {
          // Handle case where user document does not exist
          setLoading(false);
          Alert.alert("Error", "User data not found");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false); // Hide the loading indicator on error
        Alert.alert("Error", errorMessage);
        console.error("Error signing in:", errorCode, errorMessage);
      });
  };  

  if(loading){
    return(
      <LoadingIndicator/>
    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onToggle}>
        <Text style={styles.toggleText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

// registering new user

function SignUp({ onToggle }) {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const validateInputs = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !phoneNumber.trim() || !address.trim()) {
      Alert.alert("Error", "All fields are required");
      return false;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    // Simple phone number validation (10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSignUp = () => {
    if (!validateInputs()) return;

    createUserWithEmailAndPassword(authInitialized, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: name.trim(),
          email: email.trim(),
          phoneNumber: phoneNumber.trim(),
          address: address.trim(),
          createdAt: new Date(),
        });

        Alert.alert("Sign-Up Successful", `Welcome ${name}`);
        navigation.navigate('MainPage', { username: name });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
        console.error("Error signing up:", error.code, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Sign Up</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onToggle}>
          <Text style={styles.toggleText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    fontSize: 16,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#004721",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  toggleText: {
    color: "#004721",
    fontSize: 16,
  },
});
