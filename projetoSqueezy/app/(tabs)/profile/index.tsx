import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo a interface para os dados do usuário
interface UserData {
  user: string;
  email: string;
  password: string;
}

export default function ProfileScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
          setUserData(JSON.parse(user));
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <View style={styles.container}>

      <View style={styles.column}>

        <View style={styles.circle}></View>
      
        <Text style={styles.labelText}>{userData.user}</Text>

        <View style={styles.row}>

          <Text style={styles.labelText}>Your Quizzes</Text>

          <TouchableOpacity style={[styles.box, styles.boxBackgroundYellow]}>
            <Text >Manage quizzes</Text>
          </TouchableOpacity>
         
        </View>


      </View>

     

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Poppins_300Light',
    marginBottom: 20,
  },
  labelText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins_300Light',
    marginBottom: 10,
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '90%',
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 8,
    alignItems: 'center',
  },
  box: {
    width: '32%',
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxBackgroundYellow: {
    backgroundColor: '#FCC307',
  },
});
