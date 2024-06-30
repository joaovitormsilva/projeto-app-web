import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GeographyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geography</Text>
      <Text style={styles.description}>Welcome to the Geography category! Here you'll find the latest updates and articles on geography.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
