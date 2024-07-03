import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {Link} from "expo-router"



export default function RankingScreen() {
  return (
    <View style={styles.container}>



      <Text>RankingScreen</Text>
      <Text style={styles.text}>This feature has not been implemented yet.</Text>


      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    color: '#000',
  },


})