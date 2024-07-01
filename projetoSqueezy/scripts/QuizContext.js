// QuizContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultQuizzes } from './defaultQuizzes';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [defaultQuizzesState, setDefaultQuizzesState] = useState([]);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const storedQuizzes = await AsyncStorage.getItem('quizzes');
        if (storedQuizzes) {
          setQuizzes(JSON.parse(storedQuizzes));
        }

        setDefaultQuizzesState(defaultQuizzes);
      } catch (error) {
        console.error('Failed to load quizzes from storage:', error);
      }
    };

    loadQuizzes();
  }, []);

  const saveQuiz = async (quiz, userId, isDefault = false) => {
    try {
      const newQuiz = { ...quiz, userId };
      if (isDefault) {
        const newDefaultQuizzes = [...defaultQuizzesState, newQuiz];
        setDefaultQuizzesState(newDefaultQuizzes);
        await AsyncStorage.setItem('defaultQuizzes', JSON.stringify(newDefaultQuizzes));
      } else {
        const newQuizzes = [...quizzes, newQuiz];
        setQuizzes(newQuizzes);
        await AsyncStorage.setItem('quizzes', JSON.stringify(newQuizzes));
      }
    } catch (error) {
      console.error('Failed to save quiz:', error);
    }
  };

  return (
    <QuizContext.Provider value={{ quizzes, defaultQuizzes: defaultQuizzesState, saveQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
