import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface QuizContextType {
  quizzes: Quiz[];
  saveQuiz: (quiz: Quiz, userId: string) => Promise<void>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

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

  const saveQuiz = async (quiz: Quiz, userId: string) => {
    try {
      // Verificar se o quiz já existe pelo ID
      const existingQuizIndex = quizzes.findIndex(q => q.id === quiz.id);
  
      let newQuizzes;
      if (existingQuizIndex !== -1) {
        // Se o quiz já existe, atualize-o
        newQuizzes = quizzes.map((q, index) =>
          index === existingQuizIndex ? { ...q, ...quiz } : q
        );
      } else {
        // Se não existe, adicione o novo quiz
        const newQuiz = { ...quiz, userId };
        newQuizzes = [...quizzes, newQuiz];
      }
  
      // Atualize o estado e armazene no AsyncStorage
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

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
