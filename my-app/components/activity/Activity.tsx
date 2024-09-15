import React from "react";
import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SessionCard from "./sessionCard";
import { UserContext } from "@/app/contexts/userContext";
import { useContext } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FlatList } from "react-native";

export default function Activity() {

  const user = useQuery(api.tasks.getUser, {email: "bob.johnson@example.com", enabled: true})
  if (user) {
    const topic = user.topic
    const getSessions = useQuery(api.tasks.getTutorSessions, {id: user._id})

    
    return (      
        <FlatList
        data={getSessions}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <SessionCard name= {item.studentName} lastName = {item.studentLastName} rating = {Number(item.studentsRating)} topic = {topic} location= {"Waterloo"}></SessionCard>
        )}/>)
  }

  // if (user) {
  //   const getSessions = useQuery(api.tasks.getTutorSessions, {id: user._id})

  //   return (      
  //     <ThemedView>
  //       {/* <FlatList
  //       data={getSessions}
  //       keyExtractor={(item) => item._id.toString()}
  //       renderItem={({ item }) => (
  //         <SessionCard name= {item.studentID} rating = {Number(item.studentsRating)} location= {"Waterloo"}></SessionCard>
  //       )}
  //     /> */}

  //     </ThemedView>
  // )} else {
  //   return( <ThemedView>

  //   </ThemedView>)
  // }
 }
