// app/(tabs)/profile.tsx
import React from "react";
import { StyleSheet } from "react-native";
import Profile from "@/components/profile/Profile";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function ProfileScreen() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Profile</ThemedText>
      </ThemedView>
      <Profile />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 80,
    paddingLeft: 32,
    paddingBottom: 8,
  },
});
