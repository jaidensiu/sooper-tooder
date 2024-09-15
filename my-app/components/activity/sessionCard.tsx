import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { User } from "@/types/User";

// don't have bio, gender, image, location

interface SessionCardProps  {
    name: string;
    rating: number;
    location: string;
  }

const SessionCard: React.FC<SessionCardProps> = ({
  name,
  rating,
  location
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: pressed ? "#e6ffe6" : "white" },
      ]}
      onPress={toggleExpand}
    >
      {({ pressed }) => (
        <>
          <View style={styles.topRow}>
            <View style={styles.infoContainer}>
                <ThemedText style={styles.topicContainer}>Mathematics</ThemedText>
                <View style = {styles.namesContainer}>
                  <ThemedText style={styles.name}>{name}</ThemedText>
                  <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <AntDesign
                      key={star}
                      name={star <= rating ? "star" : "staro"}
                      size={16}
                      color="#FFD700"
                    />))}
                </View>
                </View>
                <ThemedText style={styles.location}>{`Location: ${location}`}</ThemedText>
            </View>

            <AntDesign
              name={expanded ? "up" : "down"}
              size={24}
              color="#888"
              style={styles.expandIcon}
            />
          </View>
          {/* {expanded && (
            <View style={styles.expandedContent}>
              <ThemedText style={styles.aboutMe}>{aboutMe}</ThemedText>
            </View>
          )} */}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    marginLeft: 8,
    fontSize: 12,
  },
  namesContainer: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  topicContainer: {
    borderColor: '#0081FB',
    color: '#0081FB',
    borderWidth: 2,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 14
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  expandIcon: {
    marginLeft: "auto",
  },
  expandedContent: {
    marginTop: 12,
  },
  aboutMe: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
  },
});

export default SessionCard;
