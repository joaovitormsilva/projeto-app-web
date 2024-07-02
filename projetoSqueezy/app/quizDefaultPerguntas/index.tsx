import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuiz, Quiz } from '../../scripts/QuizContext'; // Importe as interfaces corretas

export default function QuizDefaultPerguntasScreen() {
  const { quizId } = useLocalSearchParams();
  const { quizzes, defaultQuizzes } = useQuiz();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = () => {
      if (typeof quizId === 'string') {
        const foundQuiz = findQuizById(quizId);
        setQuiz(foundQuiz);
      }
      setLoading(false);
    };

    loadQuiz();
  }, [quizId, quizzes, defaultQuizzes]);

  const findQuizById = (id: string): Quiz | null => {
    // Procura nos quizzes padrão
    let foundQuiz = defaultQuizzes.find((q: Quiz) => q.id === id);

    // Se não encontrado nos quizzes padrão, procura nos quizzes criados pelo usuário
    if (!foundQuiz) {
      foundQuiz = quizzes.find((q: Quiz) => q.id === id);
    }

    return foundQuiz || null;
  };

  const handleAnswer = (isCorrect: boolean) => {
    setScore(prevScore => prevScore + (isCorrect ? 1 : 0));

    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      alert(`Quiz completed! Your score is ${score}/${quiz?.questions.length}`);
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
      <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}</Text>

      <View style={styles.questionContainer}>
         <Text style={styles.title}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.buttonContainer}>
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
        backgroundColor: '#F8FAF4',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
      },
      questionNumber: {
        position: 'absolute',
        top: 30,
        left: '10%',
        fontSize: 20,
        color: '#000',
        fontFamily: 'Poppins_300Light',
      },
      questionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins_300Light',
        marginBottom: '70%',
      },
      buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
      },
      button: {
        backgroundColor: '#05203C', // Cor dos botões
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        width: '100%', // Largura dos botões
      },
      buttonText: {
        color: '#F8FAF4', // Cor do texto dentro dos botões
        fontSize: 16,
        fontFamily: 'Poppins_300Light',
      },
      errorText: {
        color: 'red',
        fontSize: 16,
      },
  });
  