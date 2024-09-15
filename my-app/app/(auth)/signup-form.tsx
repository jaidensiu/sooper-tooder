import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { RadioButton, TouchableRipple } from "react-native-paper";
import SignupForm from "@/components/auth/SignupForm";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserContext } from '../contexts/userContext';



export default function SignupFormScreen() {
  const router = useRouter();
  const context = useContext(UserContext);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('18');
  const [gender, setGender] = useState('Male');
  const [userType, setUserType] = useState<'student' | 'tutor'>('student');

  interface SignUpData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    age: number;
    gender: string;
    userType: string;
    password: string;
  }
  if (!context) {
    throw new Error('UserProfile must be used within a UserProvider');
  }
  const { userID, setUserID } = context;
  const createUser = useMutation(api.tasks.createNewUser);

  const handleSignUp = async ({
    firstName,
    lastName,
    phoneNumber,
    email,
    age,
    gender,
    userType,
    password
  }: SignUpData) => {
    console.log(
      "Signup with:",
      name,
      phoneNumber,
      email,
      age,
      gender,
      userType,
      password
    );
    try {
      const result = await createUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        type: userType,
        age: BigInt(age),
        topic: "temporary",
        sessionHistory: [],
        overallRating: BigInt(0),
        password: password
      });
      setUserID(result);  // Save the result to the state
      console.log('User created:', result);
      // Navigate to the appropriate home screen based on user type
      if (userType === "student") {
        router.replace({
          pathname: "../onboarding/choose-subject",
          params: {
            user: JSON.stringify({
              name,
              phoneNumber,
              email,
              age,
              gender,
              userType,
            }),
          }, // TODO: Fix user interface
        });
      } else {
        router.replace({
          pathname: "../onboarding/choose-subject" as const,
          params: {
            user: JSON.stringify({
              name,
              phoneNumber,
              email,
              age,
              gender,
              userType,
            }),
          },
      });
    }}
    catch (error) {
      console.error('Error creating user:', error);

    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignupForm onSignUp={handleSignUp} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
