import { View, Text, StyleSheet, Alert} from 'react-native'
import React from 'react'
import {Link, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import type {NativeStackScreenProps} from "@react-navigation/native-stack";

export default function HomeScreen() {
    const navigation = useNavigation();

    useEffect(() => { 
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            console.log('onback');
            // Do your stuff here

            
            Alert.alert(
                "Deseja sair do app?",
                undefined,
                [
                  { text: "Não", style: 'cancel', onPress: () => { } },
                  {
                    text: "Sim",
                    style: 'destructive',
                    onPress: () => navigation.dispatch(e.data.action),
                  },
                ]
              );
        });
    });


  return (
    <View style={styles.container}>
      <Text> TELA HOME DO APP  </Text>
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