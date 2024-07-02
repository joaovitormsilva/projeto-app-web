import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { useUser } from '../../../scripts/UserContext';
import { useQuiz, Quiz } from '../../../scripts/QuizContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, loadUser, selectedImage, setSelectedImage } = useUser();
  const { quizzes } = useQuiz();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const images = [
    require('../../../assets/images/fairy.png'),
    require('../../../assets/images/ninja.png'),
    require('../../../assets/images/pumpkin.png'),
  ];

  const selectImage = (image) => {
    setSelectedImage(image);
    setModalVisible(false);
  };

  useEffect(() => {
    const loadUserData = async () => {
      await loadUser();
      setLoading(false);
    };

    loadUserData();
  }, []);

  const userQuizzes = quizzes.filter((quiz) => quiz.userId === user.id);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle} onPress={() => setModalVisible(true)}>
        {selectedImage && <Image source={selectedImage} style={styles.profileImage} />}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Choose your avatar</Text>
          <View style={styles.imageRow}>
            {images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => selectImage(image)}>
                <Image source={image} style={styles.modalImage} />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Text style={styles.username}>{user?.username}</Text>
      <Text style={styles.sectionTitle}>Your Quizzes</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        <>
          {userQuizzes.length > 0 ? (
            userQuizzes.map((quiz) => (
              <TouchableOpacity
                key={quiz.id}
                style={[styles.quizBox, styles.boxBackgroundYellow]}
                onPress={() => {
                  router.push({
                    pathname: '/quizJogavel',
                    params: { quizId: quiz.id },
                  });
                }}
              >
                <Text style={styles.quizName}>{quiz.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noQuizzesText}>No quizzes found.</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  quizBox: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxBackgroundYellow: {
    backgroundColor: '#FCC307',
  },
  quizName: {
    color: '#F8FAF4',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins_300Light',
  },
  noQuizzesText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});
