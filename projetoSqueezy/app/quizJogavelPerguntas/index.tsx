import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuiz } from '../../scripts/QuizContext';

export interface Question {
  id: string;
  questionText: string;
  options: { id: string; text: string; correct: boolean }[];
}

export interface Quiz {
  id: string;
  name: string;
  description: string;
  category: string;
  numQuestions: number;
  duration: number;
  imageUri?: string;
  userId: string;
  questions: Question[];
}

export default function QuizJogavelPerguntasScreen() {
  const { quizId, numQuestions } = useLocalSearchParams();
  const { quizzes } = useQuiz();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = () => {
      const foundQuiz = quizzes.find((q) => q.id === quizId);
      setQuiz(foundQuiz || null);
      setLoading(false);
    };

    loadQuiz();
  }, [quizId, quizzes]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const numQuestionsInt = parseInt(numQuestions as string, 10);
    if (currentQuestionIndex < numQuestionsInt - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz completed! Your score is ${score + (isCorrect ? 1 : 0)}/${numQuestionsInt}`);
      // Navegar para a tela de resultados ou outra lógica aqui
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!quiz) {
    return <Text style={styles.errorText}>Quiz not found.</Text>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <Text style={styles.errorText}>Question not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentQuestion.questionText}</Text>
      {currentQuestion.options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={styles.button}
          onPress={() => handleAnswer(option.correct)}
        >
          <Text style={styles.buttonText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
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
    height: '100%'
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FCC307',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
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
