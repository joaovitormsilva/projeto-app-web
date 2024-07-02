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
      <Text style={styles.title}>{quiz.name}</Text>
      <View style={styles.description}>
        <Text style={{ fontSize: 18 }}>Description:</Text>
        <Text>{quiz.description}</Text>
      </View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={navigateToQuizQuestions}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    width: '90%',
  },
  button: {
    backgroundColor: '#FCC307',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
