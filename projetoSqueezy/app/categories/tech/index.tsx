// TechScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuiz, Quiz } from '../../../scripts/QuizContext'; // Ajuste o caminho conforme necessário
import { useRouter } from 'expo-router'; // Ajuste o caminho conforme necessário
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';

export default function TechScreen() {
  const { defaultQuizzes } = useQuiz();
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_900Black_Italic,
  });

  // Filtrar os quizzes pela categoria 'Tech'
  const quizzes = defaultQuizzes.filter(quiz => quiz.category === 'Tech');

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      {quizzes.length > 0 ? (
        <FlatList
          data={quizzes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.quizContainer}
              onPress={() => {
                router.push({
                  pathname: '/quizJogavel', // Caminho para a tela de quiz jogável
                  params: { quizId: item.id }, // Passando o ID do quiz como parâmetro
                });
              }}
            >
              <Text style={styles.quizName}>{item.name}</Text>
              <Text style={styles.quizDescription}>{item.description}</Text>
              <Text style={styles.quizMeta}>Questions: {item.numQuestions}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noQuizzesText}>No quizzes available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF4',
    padding: 20,
    justifyContent: 'center',
  },
  quizContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center', // Centraliza o elemento horizontalmente
  },
  quizName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Poppins_300Light',

  },
  quizDescription: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Poppins_300Light',
  },
  quizMeta: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins_300Light',
  },
  noQuizzesText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
