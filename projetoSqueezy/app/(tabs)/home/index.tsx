import { View, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';

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

  const categoryImages: { [key: string]: any } = {
    Tech: require('../../../assets/images/c1.png'),
    Entertainment: require('../../../assets/images/c2.png'),
    Science: require('../../../assets/images/c3.png'),
    Geography: require('../../../assets/images/c4.png'),
    History: require('../../../assets/images/c5.png'),
    Sports: require('../../../assets/images/c6.png'),
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        
        <View style={[styles.row, styles.headerRow]}>
          <View style={styles.circle}></View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Hello,</Text>
            <Text style={styles.headerText}>Name User</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.row}>

            <TouchableOpacity style={styles.touchable} onPress={() => router.push('/createQuizz')} accessibilityLabel="Create Quiz">
            <ImageBackground source={require('../../../assets/images/box1.png')} style={styles.box} imageStyle={styles.image}>
                <Text style={styles.linkText}>Create Quiz</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchable}>
            <ImageBackground source={require('../../../assets/images/box2.png')} style={styles.box} imageStyle={styles.image}>
                <Text style={styles.linkText}>Join Quiz</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchable}>
            <ImageBackground source={require('../../../assets/images/box3.png')} style={styles.box} imageStyle={styles.image}>
                <Text style={styles.linkText}>Achievements</Text>
              </ImageBackground>
            </TouchableOpacity>

          </View>
          <TouchableOpacity style={styles.touchable}>
          <ImageBackground source={require('../../../assets/images/random.png')} style={styles.boxRandom} imageStyle={styles.image}>
              <Text style={styles.linkTextRandom}>Random Quiz</Text>
              <Text style={styles.linkText}>Don't know where to start?</Text>
              <Text style={styles.linkText}>Let us help you!</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={[styles.column, styles.categoriesContainer]}>
          <Text style={[styles.text, styles.categoriesText]}>Categories</Text>
          <View style={styles.categoriesGrid}>
              {Object.keys(categoryImages).map((category, index) => (
                <TouchableOpacity key={index} style={styles.touchable}>
                  <ImageBackground source={categoryImages[category]} style={styles.boxCategories} imageStyle={styles.image}>
                  <Text style={styles.linkText}>{category}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={[styles.boxSeeAll, styles.boxBackgroundSeeAll]}>
              <Text style={styles.linkText}>See all</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  innerContainer: {
    maxWidth: '90%',
    maxHeight: '90%',
  },
  headerRow: {
    width: '90%',
    justifyContent: 'flex-start',
    marginTop: '10%',
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
    marginTop: 5,
    marginLeft: 10,
  },
  headerText: {
    textAlign: 'left',
    width: '90%',
    fontSize: 14,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  box: {
    width: 100,
    height: 137,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 8,
  },
  boxRandom: {
    width: '100%',
    height: 151,
    marginTop: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCategories: {
    width: '100%',
    height: 64,
    marginTop: 5,
    marginRight: 32,
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
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
    shadowOpacity: 0.25,
  },
  linkTextRandom: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
    textShadowColor: '#1E1E1E',
    textShadowOffset: { width: 1, height: 2 },
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
  touchable: {
    marginBottom: 10,
  },
  categoriesText: {
    textAlign: 'left',
    width: '100%',
  },
  image: {
    borderRadius: 10,
  },
  boxBackgroundSeeAll: {
    backgroundColor: 'skyblue',
  },
});
