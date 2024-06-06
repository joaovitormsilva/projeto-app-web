import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {Link} from "expo-router"



export default function HistoryScreen() {
  return (
    <View style={styles.container}>



      <Text>History screen</Text>


      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }


})