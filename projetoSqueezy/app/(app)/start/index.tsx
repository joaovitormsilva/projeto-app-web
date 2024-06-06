import { View, Text, Alert } from 'react-native'
import React from 'react'

import { useNavigation } from 'expo-router'
import { useEffect } from 'react'
import type {NativeStackScreenProps} from "@react-navigation/native-stack";

export default function CreateAccount() {
  const navigation = useNavigation();

  useEffect(() =>{
    navigation.addListener('beforeRemove', (e) =>{
      e.preventDefault();
      console.log('onback');
      Alert.alert(
          'Changes lost',
          'QUER SAIR DO APP?',
          [
            {text: "Cancel", style: 'cancel', onPress: () =>{}},
            {text: "Yes",
              style: 'destructive', 
              onPress: () => navigation.dispatch(e.data.action),
            }
          ]
      )
     // navigation.dispatch(e.data.action);
    })
  })


  return (
    <View>
      <Text>Criar conta (PASTA APP/START) </Text>
    </View>
  )
}