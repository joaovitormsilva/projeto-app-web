import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function CreateQuestionsScreen() {
  const router = useRouter();
  const { numQuestions } = useLocalSearchParams();
  
  // Garantir que numQuestions é uma string e fornecer um valor padrão se for undefined
  const questionsCount = parseInt(numQuestions as string) || 5;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>(Array(questionsCount).fill(''));
  const [options, setOptions] = useState<string[][]>(Array(questionsCount).fill(Array(5).fill('')));
  const [correctAnswers, setCorrectAnswers] = useState<(number | null)[]>(Array(questionsCount).fill(null));

  const handleQuestionChange = (text: string) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex] = text;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (text: string, optionIndex: number) => {
    const newOptions = [...options];
    newOptions[currentQuestionIndex][optionIndex] = text;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (optionIndex: number) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[currentQuestionIndex] = optionIndex;
    setCorrectAnswers(newCorrectAnswers);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentOptions = options[currentQuestionIndex];
    const currentCorrectAnswer = correctAnswers[currentQuestionIndex];

    if (!currentQuestion || currentOptions.includes('') || currentCorrectAnswer === null) {
      Alert.alert('Incomplete Question', 'Please complete the question and all options, and select the correct answer before proceeding.');
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Navegar para a tela de conclusão do quiz
      router.push('/finishQuiz');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Question {currentQuestionIndex + 1}</Text>
      
      <TextInput
        style={styles.input}
        value={questions[currentQuestionIndex]}
        onChangeText={handleQuestionChange}
        placeholder={`Enter question ${currentQuestionIndex + 1}`}
        placeholderTextColor="#aaa"
      />

      {options[currentQuestionIndex].map((option: string, index: number) => (
        <View key={index} style={styles.optionContainer}>
          <TextInput
            style={[styles.input, styles.optionInput]}
            value={option}
            onChangeText={(text) => handleOptionChange(text, index)}
            placeholder={`Option ${index + 1}`}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={[
              styles.correctButton,
              correctAnswers[currentQuestionIndex] === index && styles.correctButtonSelected
            ]}
            onPress={() => handleCorrectAnswerChange(index)}
          >
            <Text style={styles.correctButtonText}>
              {correctAnswers[currentQuestionIndex] === index ? 'Correct' : 'Select'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.confirmButton} onPress={handleNextQuestion}>
        <Text style={styles.confirmButtonText}>
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#05203C',
    fontSize: 18,
    fontFamily: 'Poppins_300Light',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'black',
    height: 40,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  optionInput: {
    flex: 1,
    marginRight: 10,
  },
  correctButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  correctButtonSelected: {
    backgroundColor: '#05203C',
  },
  correctButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins_300Light',
  },
  confirmButton: {
    width: '90%',
    height: 50,
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05203C',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins_300Light',
  },
});
