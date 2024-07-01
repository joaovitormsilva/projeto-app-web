import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuiz } from '../../scripts/QuizContext'; // Certifique-se de que o caminho do import está correto

interface Quiz {
  id: string;
  name: string;
  description: string;
  category: string;
  numQuestions: number;
  duration: number;
  imageUri?: string;
  userId: string;
}

export default function QuizJogavelScreen() {
  const { quizId } = useLocalSearchParams();
  const { quizzes } = useQuiz();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadQuiz = () => {
      const foundQuiz = quizzes.find((q: Quiz) => q.id === quizId);
      setQuiz(foundQuiz || null);
      setLoading(false);
    };

    loadQuiz();
  }, [quizId, quizzes]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!quiz) {
    return <Text style={styles.errorText}>Quiz not found.</Text>;
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
        onPress={() => {
          router.push({
            pathname: '/quizJogavelPerguntas',
            params: { quizId: quiz.id, numQuestions: quiz.numQuestions },
          });
        }}
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
