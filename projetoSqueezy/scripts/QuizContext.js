import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const storedQuizzes = await AsyncStorage.getItem('quizzes');
        if (storedQuizzes) {
          setQuizzes(JSON.parse(storedQuizzes));
        }
      } catch (error) {
        console.error('Failed to load quizzes from storage:', error);
      }
    };
    loadQuizzes();
  }, []);

  const saveQuiz = async (quiz) => {
    try {
      const newQuizzes = [...quizzes, quiz];
      setQuizzes(newQuizzes);
      await AsyncStorage.setItem('quizzes', JSON.stringify(newQuizzes));
    } catch (error) {
      console.error('Failed to save quiz:', error);
    }
  };

  return (
    <QuizContext.Provider value={{ quizzes, saveQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
