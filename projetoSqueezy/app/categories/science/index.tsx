import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScienceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Science</Text>
      <Text style={styles.description}>Welcome to the Science category! Here you'll find the latest updates and articles on science.</Text>
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
