import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { useUser } from '../../../scripts/UserContext';
import { useQuiz, Quiz } from '../../../scripts/QuizContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, loadUser, selectedImage, setSelectedImage  } = useUser();
  const { quizzes } = useQuiz();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const images = [
    require('../../../assets/images/fairy.png'),
    require('../../../assets/images/ninja.png'),
    require('../../../assets/images/pumpkin.png'),
  ];

  const selectImage = (image: any) => {
    setSelectedImage(image);
  };
  
  useEffect(() => {
    const loadUserData = async () => {
      await loadUser();
      setLoading(false);
    };

    loadUserData();
  }, []);

  const userQuizzes = quizzes.filter((quiz: Quiz) => quiz.userId === user.id);

  return (
    <View style={styles.container}>
       <View style={styles.container}>
      <View style={styles.column}>
       <TouchableOpacity style={styles.circle} onPress={() => setModalVisible(true)}>
        {selectedImage && <Image source={selectedImage} style={styles.profileImage} />}
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      />

        <Text style={styles.labelText}>{user.username}</Text>
        <View style={styles.row}>


          <Text style={styles.labelText}>Your Quizzes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {userQuizzes.length > 0 ? (
            userQuizzes.map((quiz: Quiz) => (
              <TouchableOpacity
                key={quiz.id}
                style={[styles.box, styles.boxBackgroundYellow]}
                onPress={() => {
                  router.push({
                    pathname: '/quizJogavel',
                    params: { quizId: quiz.id },
                  });
                }}
              >
                <Text>{quiz.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noQuizzesText}>No quizzes found.</Text>
          )}
        </>
      )}
          </View>
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
  column: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  labelText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  row: {
    width: '100%',
    paddingHorizontal: 20,
  },
  box: {
    width: '100%',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxBackgroundYellow: {
    backgroundColor: '#FCC307',
  },
  noQuizzesText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
