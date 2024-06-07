import { View, Text, StyleSheet, Alert} from 'react-native'
import React, {useState} from 'react'
import {useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function HomeScreen() {
    const navigation = useNavigation();


    useEffect(() => { 
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            console.log('onback');
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

      <View style={[styles.row, {width:'90%',justifyContent:'flex-start', marginTop:20,height:'8%'}]}>

          <View style={styles.circle}></View>
        <View style={[styles.collumn, {width:'60%', height:'100%',marginTop: 15}]}>
          

          <Text style={[{textAlign:'left',width:'90%'}]}> Hello,  </Text>
          <Text style={[{textAlign:'left', width:'90%'}]}> Name User</Text>
        </View>
      </View>
      

      <View style={[styles.collumn]}>

        <View style={styles.row}>
          <View style={[styles.box, {backgroundColor: 'powderblue'}]}>
            <Text>Create Quiz</Text>
          </View>
          <View style={[styles.box, {backgroundColor: 'skyblue'}]}>
            <Text>Join Quiz</Text>

          </View>
          <View style={[styles.box, {backgroundColor: 'steelblue'}]}>
            <Text>Achievements</Text>

          </View>
        </View>
        <View style={[styles.boxRandom, {backgroundColor:'#aaf'}]}>
            <Text>Random Quiz</Text>
        </View>
      </View>
      
      <View style={[styles.collumn, {height:'40%'}]}>
        <Text style={[styles.text,{textAlign: 'left', width:'100%'}]}> Categories</Text>

        <View style={[styles.row, {marginTop:-10}]}>
          <View style={[styles.boxCategories, {backgroundColor: 'powderblue'}]}>
          <Text>Tech</Text>

          </View>
          <View style={[styles.boxCategories, {backgroundColor: 'skyblue'}]}>
          <Text>Entertainment</Text>

          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.boxCategories, {backgroundColor: 'powderblue'}]}>
          <Text>Science</Text>

          </View>
          <View style={[styles.boxCategories, {backgroundColor: 'skyblue'}]}>
          <Text>Geography</Text>

          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.boxCategories, {backgroundColor: 'powderblue'}]}>
          <Text>History</Text>

          </View>
          <View style={[styles.boxCategories, {backgroundColor: 'skyblue'}]}>
          <Text>Sports</Text>
          </View>
        </View>


          <View style={[styles.boxSeeAll, {backgroundColor: 'skyblue'}]}>
            <Text>See all</Text>
          </View>

      </View>



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
  box:{
    width: '30%',
    height: 137,
    borderRadius: 10,

  },
  boxRandom:{
    width: '100%',
    height: 151,
    marginTop: 20,
    borderRadius: 10,
  },
  boxCategories:{
    width: '45%',
    height:  64,
    marginTop: 20,
    borderRadius: 10,
  },
  boxSeeAll:{
    width: '20%',
    height:  30,
    marginTop: 5,
    borderRadius: 10,

  },
  circle:{
    width:60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'gray'
  },
  row:{
    width:'100%',
    //height:'30%',
    flexDirection: 'row',
    //backgroundColor: '#aaa',
    justifyContent:'space-between'
  },
  collumn:{
    width: '90%',
    height: '38%',
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 8,
    //backgroundColor: '#aaa',
    alignItems:'center'
  },
  text:{
    fontSize:18
  }
})