import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';

export default function CategoriesScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const categories = [
    { name: 'Tech', image: require('../../assets/images/techvector.png'), route: '/categories/tech' },
    { name: 'Entertainment', image: require('../../assets/images/entertainmentvector.png'), route: '/categories/entertainment' },
    { name: 'Science', image: require('../../assets/images/sciencevector.png'), route: '/categories/science' },
    { name: 'Geography', image: require('../../assets/images/geographyvector.png'), route: '/categories/geography' },
    { name: 'History', image: require('../../assets/images/historyvector.png'), route: '/categories/history' },
    { name: 'Sports', image: require('../../assets/images/sportsvector.png'), route: '/categories/sports' },
    { name: 'Others', image: require('../../assets/images/quizvector.png'), route: '/categories/others' },
  ];

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  const getCategoryBackgroundColor = (index) => {
    const colors = ['#FCC307', '#4FDB38', '#05203C'];
    return colors[index % colors.length];
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.categoryContainer, { backgroundColor: getCategoryBackgroundColor(index) }]}
          onPress={() => router.push(category.route)} // Navegar para a rota correspondente
        >
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
    backgroundColor: '#F8FAF4',
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
    borderRadius: 5,
    width: '80%',
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginLeft: '5%',
    marginRight: '10%',
  },
  categoryText: {

    color: '#F8FAF4',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
  },
});
