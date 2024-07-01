import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Alert.alert(
        'Deseja sair do app?',
        undefined,
        [
          { text: 'Não', style: 'cancel', onPress: () => {} },
          {
            text: 'Sim',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return () => {
      navigation.removeListener('beforeRemove', beforeRemoveListener);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      
      <View style={[styles.row, styles.headerRow]}>
        <View style={styles.circle}></View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Hello,</Text>
          <Text style={styles.headerText}>Name User</Text>
        </View>
      </View>

      <View style={styles.column}>
        <View style={styles.row}>

          <TouchableOpacity 
            style={[styles.box, styles.boxBackground1]}
            onPress={() => router.push('/createQuizz')}
            accessibilityLabel="Create Quiz"
          >
           
            <Text style={styles.linkText}>Create Quiz</Text>
           
          </TouchableOpacity>

          <TouchableOpacity style={[styles.box, styles.boxBackground2]}>
            <Text style={styles.linkText}>Join Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.box, styles.boxBackground3]}>
            <Text style={styles.linkText}>Achievements</Text>
          </TouchableOpacity>
          
        </View>
        <TouchableOpacity style={[styles.boxRandom, styles.boxBackgroundRandom]}>
          <Text style={styles.linkText}>Random Quiz</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.column, styles.categoriesContainer]}>
        <Text style={[styles.text, styles.categoriesText]}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {['Tech', 'Entertainment', 'Science', 'Geography', 'History', 'Sports'].map((category, index) => (
            <View key={index} style={[styles.boxCategories, index % 3 === 0 ? styles.categoryBackground1 : index % 3 === 1 ? styles.categoryBackground2 : styles.categoryBackground3]}>
              <Text style={styles.linkText}>{category}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={[styles.boxSeeAll, styles.boxBackgroundSeeAll]}>
          <Text style={styles.linkText}>See all</Text>
        </TouchableOpacity>
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
  headerRow: {
    width: '90%',
    justifyContent: 'flex-start',
    marginTop: 20,
    height: '8%',
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  headerTextContainer: {
    width: '60%',
    height: '100%',
    marginTop: 10,
    marginLeft: 10,
  },
  headerText: {
    textAlign: 'left',
    width: '90%',
    fontSize: 14,
    color: 'black',
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
    width: '30%',
    height: 137,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxRandom: {
    width: '100%',
    height: 151,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCategories: {
    width: '45%',
    height: 64,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxSeeAll: {
    width: '20%',
    height: 30,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    height: '40%',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textShadowColor: '#1E1E1E',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 4,
    textAlign: 'center',
    shadowOpacity: 0.25,
  },
  fullAreaLink: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesText: {
    textAlign: 'left',
    width: '100%',
  },
  boxBackground1: {
    backgroundColor: '#FCC307',
  },
  boxBackground2: {
    backgroundColor: '#05203C',
  },
  boxBackground3: {
    backgroundColor: '#4FDB38',
  },
  boxBackgroundRandom: {
    backgroundColor: '#FCC307',
  },
  boxBackgroundSeeAll: {
    backgroundColor: 'skyblue',
  },
  categoryBackground1: {
    backgroundColor: '#FCC307',
  },
  categoryBackground2: {
    backgroundColor: '#05203C',
  },
  categoryBackground3: {
    backgroundColor: '#4FDB38',
  },
});
