import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuiz, Quiz } from '../../scripts/QuizContext'; // Ajuste o caminho conforme necessário

export default function QuizJogavelScreen() {
  const { quizId } = useLocalSearchParams();
  const { defaultQuizzes, quizzes } = useQuiz();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadQuiz = () => {
      // Verificar nos quizzes padrão
      let foundQuiz = defaultQuizzes.find((q: Quiz) => q.id === quizId);
      
      // Se não encontrado nos quizzes padrão, verificar nos quizzes criados pelo usuário
      if (!foundQuiz) {
        foundQuiz = quizzes.find((q: Quiz) => q.id === quizId);
      }
      
      setQuiz(foundQuiz || null);
      setLoading(false);
    };

    loadQuiz();
  }, [quizId, defaultQuizzes, quizzes]);

  const navigateToQuizQuestions = () => {
    if (!quiz) return;

    if (quiz.userId) {
      // Quiz criado pelo usuário, navegar para QuizJogavelPerguntasScreen
      router.push({
        pathname: '/quizJogavelPerguntas',
        params: { quizId: quiz.id, numQuestions: quiz.numQuestions.toString() },
      });
    } else {
      // Quiz padrão, navegar para QuizDefaultPerguntasScreen
      router.push({
        pathname: '/quizDefaultPerguntas',
        params: { quizId: quiz.id },
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!quiz) {
    return <Text style={styles.errorText}>Quiz not found jogavel.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{quiz.name}</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.descriptionText}>{quiz.description}</Text>
        <Text style={styles.questionsText}>Questions: {quiz.numQuestions}</Text>
      </View>
      <View style={styles.titleBox}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={navigateToQuizQuestions}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8FAF4',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  titleBox: {
    height: '20%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#05203C',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Poppins_300Light',
  },
  description: {
    marginBottom: 24,
    width: '80%',
    height: '50%',
    justifyContent: 'center',
  },
  descriptionTitle: {
    color: '#000',
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
    marginBottom: 20,
  },
  questionsText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
    color: '#A1A1A1',
  },
  button: {
    backgroundColor: '#FCC307',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',

  },
  buttonText: {
    color: '#F8FAF4',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Poppins_300Light',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
