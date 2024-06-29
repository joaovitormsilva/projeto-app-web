import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';

export default function CategoriesScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const categories = [
    { name: 'Tech', image: require('../../assets/images/react-logo.png') },
    { name: 'Entertainment', image: require('../../assets/images/react-logo.png') },
    { name: 'Science', image: require('../../assets/images/react-logo.png') },
    { name: 'Geography', image: require('../../assets/images/react-logo.png') },
    { name: 'History', image: require('../../assets/images/react-logo.png') },
    { name: 'Sports', image: require('../../assets/images/react-logo.png') },
    { name: 'Other', image: require('../../assets/images/react-logo.png') },

  ];

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryContainer}>
          <Image source={category.image} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '80%',
  },
  categoryImage: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  categoryText: {
    color: '#05203C',
    fontSize: 18,
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
  },
});
