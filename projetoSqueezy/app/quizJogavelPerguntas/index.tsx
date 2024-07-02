import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuiz, Quiz, Question } from '../../scripts/QuizContext'; // Importe as interfaces corretas

export default function QuizJogavelPerguntasScreen() {
  const { quizId } = useLocalSearchParams();
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
    if (currentQuestionIndex < quiz!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz completed! Your score is ${score + (isCorrect ? 1 : 0)}/${quiz!.questions.length}`);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentQuestion.questionText}</Text>

      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index.toString()} // Use index.toString() como key, pois não há garantia de que option.id seja uma string
          style={styles.button}
          onPress={() => handleAnswer(getCorrectness(option))}
        >
          <Text style={styles.buttonText}>{getOptionText(option)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const getCorrectness = (option: string | { id?: string; text?: string; correct?: boolean }) => {
  if (typeof option === 'string') {
    return false; // Considerar todas as opções de string como incorretas
  }
  return !!option.correct; // Converte para booleano (true ou false)
};

const getOptionText = (option: string | { id?: string; text?: string; correct?: boolean }) => {
  if (typeof option === 'string') {
    return option; // Retorna a string diretamente
  }
  return option.text || ''; // Retorna o texto da opção, ou uma string vazia se não houver texto
};

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
