import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
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
      <Text style={styles.headerText}>Profile</Text>
      <Text style={styles.labelText}>Username: {userData.user}</Text>
      <Text style={styles.labelText}>Email: {userData.email}</Text>
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
});
