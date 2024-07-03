import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ImageBackground, Dimensions } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';


const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);



  const categories = [
    { name: 'Tech', route: '/categories/tech', color: '#FCC307', icon: require('../../../assets/images/techvector.png') },
    { name: 'Entertainment', route: '/categories/entertainment', color: '#4FDB38', icon: require('../../../assets/images/entertainmentvector.png') },
    { name: 'Science', route: '/categories/science', color: '#05203C', icon: require('../../../assets/images/sciencevector.png') },
    { name: 'Geography', route: '/categories/geography', color: '#FCC307', icon: require('../../../assets/images/geographyvector.png') },
    { name: 'History', route: '/categories/history', color: '#4FDB38', icon: require('../../../assets/images/historyvector.png') },
    { name: 'Sports', route: '/categories/sports', color: '#05203C', icon: require('../../../assets/images/sportsvector.png') },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem('user');
        if (userDataJson) {
          const userData = JSON.parse(userDataJson);
          setUserName(userData.username);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>

        <View style={[styles.headerTextContainer, { marginLeft: 10 }]}>
          <Text style={styles.headerText}>Hello, {userName}</Text>
        </View>
      </View>

      <View style={styles.column}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.box, styles.createQuizBox]}
            onPress={() => router.push('/createQuizz')}
            accessibilityLabel="Create Quiz"
          >
            <ImageBackground source={require('../../../assets/images/box1.png')} style={styles.fistLineImageBackground}>
              <Text style={[styles.linkText, styles.bottomAlignedText]}>Create Quiz</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, styles.createQuizBox]}
            accessibilityLabel="Join Quiz"
          >
            <ImageBackground source={require('../../../assets/images/box2.png')} style={styles.fistLineImageBackground}>
              <Text style={[styles.linkText, styles.bottomAlignedText]}>Join Quiz</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, styles.createQuizBox]}
            accessibilityLabel="Achievements"
          >
            <ImageBackground source={require('../../../assets/images/box3.png')} style={styles.fistLineImageBackground}>
              <Text style={[styles.linkText, styles.bottomAlignedText]}>Achievements</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.boxRandom}>
          <ImageBackground source={require('../../../assets/images/random.png')} style={styles.randomBackground}>
            <View style={styles.randomContent}>
              <View style={styles.yellowBox}>
                <Text style={styles.linkText}>Random Quiz</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={[styles.column, styles.categoriesContainer]}>
        <Text style={styles.categoryTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
<<<<<<< HEAD
          {['Tech', 'Entertainment', 'Science', 'Geography', 'History', 'Sports'].map((category, index) => (
            <View key={index} style={[styles.boxCategories, index % 3 === 0 ? styles.categoryBackground1 : index % 3 === 1 ? styles.categoryBackground2 : styles.categoryBackground3]}>
              <Text style={styles.linkText}>{category}</Text>
            </View>
=======
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.boxCategories,
                { backgroundColor: category.color },
                index % 2 === 0 ? styles.categoryBackground1 : styles.categoryBackground2,
              ]}
              onPress={() => router.push(category.route)}
            >
              <Image source={category.icon} style={styles.categoryIcon} />
              <Text style={styles.linkText}>{category.name}</Text>
            </TouchableOpacity>
>>>>>>> 351d62ebc6db294101860fc2bd25d03be701d1ee
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.boxSeeAll]}
        onPress={() => router.push('/categories')}
        accessibilityLabel="All Categories"
      >
        <Text style={styles.linkText}>See all</Text>
      </TouchableOpacity>
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
    marginTop: 10,
    height: '8%',
  },
<<<<<<< HEAD
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
=======


>>>>>>> 351d62ebc6db294101860fc2bd25d03be701d1ee
  headerText: {
    marginTop: '7%',
    fontWeight: 'bold',
    color: '#05203C',
    fontSize: 20,
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
    width: '90%',
    fontSize: 14,
    color: 'black',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
        alignItems: 'center',

  },
  column: {
    width: '90%',
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 8,
    alignItems: 'center',
  },
  box: {
    width: '33%',
    height: 137,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // Para alinhar ícone e texto na mesma linha
    paddingHorizontal: 5, // Espaçamento horizontal entre ícone e texto
  },
  createQuizBox: {
    position: 'relative', // Garante que o posicionamento da imagem de fundo seja relativo ao contêiner
  },
  fistLineImageBackground: {
    width: '100%', // Ocupa toda a largura da caixa
    height: '100%', // Ocupa toda a altura da caixa
    justifyContent: 'flex-end', // Alinha o texto no fundo da caixa
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden', // Para garantir que o borderRadius funcione corretamente
  },
  randomBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden', // Para garantir que o borderRadius funcione corretamente
  },
  randomContent: {
    width: '80%',
    height: '80%',
    backgroundColor: '#FCC307',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  yellowBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxRandom: {
    width: '97.5%',
    height: 130,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCategories: {
    width: '46%',
    height: 64,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'left',
    alignItems: 'center',
    flexDirection: 'row', // Para alinhar ícone e texto na mesma linha
    paddingHorizontal: 10, // Espaçamento horizontal entre ícone e texto
  },
  boxSeeAll: {
    width: '30%',
    height: 40,
    backgroundColor: '#05203C',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
<<<<<<< HEAD
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
=======
    categoriesContainer: {
      height: '36%',
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    categoryTitle: {
      textAlign: 'left',
      color: '#05203C',
      fontSize: 16,
      fontFamily: 'Poppins_300Light',
      fontWeight: 'bold', // Defina o peso da fonte conforme necessário
    },
    linkText: {
      fontSize: 14,
      color: '#F8FAF4',
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Poppins_300Light',
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
      marginLeft: 0,
    },
    bottomAlignedText: {
      position: 'absolute',
      bottom: 10, // Ajusta a distância do texto ao fundo da caixa
    },
    categoryIcon: {
      width: 30, // Largura do ícone
      height: 30, // Altura do ícone
      marginRight: '5%', // Espaçamento à direita do ícone
    },
  });


>>>>>>> 351d62ebc6db294101860fc2bd25d03be701d1ee
