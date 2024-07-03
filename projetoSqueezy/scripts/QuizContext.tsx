// QuizContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultQuizzes } from './defaultQuizzes';

export interface Question {
  id?: string;  // Tornar opcional
  question?: string;  // Altere `questionText` para `question`
  questionText?: string; // Mantenha `questionText` opcional para compatibilidade
  options: { id?: string; text?: string; correct?: boolean }[] | string[]; // Permitir `options` ser um array de strings
  correctAnswer?: number; // Adicionar `correctAnswer` opcional
}

export interface Quiz {
  id: string;
  name: string;
  description: string;
  category: string;
  numQuestions: number;
  duration: number;
  imageUri?: string;
  userId?: string;  // Tornar userId opcional
  questions: Question[];
}

interface QuizContextType {
  quizzes: Quiz[];
  defaultQuizzes: Quiz[];
  saveQuiz: (quiz: Quiz, userId: string, isDefault?: boolean) => Promise<void>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [defaultQuizzesState, setDefaultQuizzesState] = useState<Quiz[]>(defaultQuizzes);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const storedQuizzes = await AsyncStorage.getItem('quizzes');
        if (storedQuizzes) {
          setQuizzes(JSON.parse(storedQuizzes));
        }

        const storedDefaultQuizzes = await AsyncStorage.getItem('defaultQuizzes');
        if (storedDefaultQuizzes) {
          setDefaultQuizzesState(JSON.parse(storedDefaultQuizzes));
        } else {
          setDefaultQuizzesState(defaultQuizzes);
        }
      } catch (error) {
        console.error('Failed to load quizzes from storage:', error);
      }
    };
    loadQuizzes();
  }, []);

  const saveQuiz = async (quiz: Quiz, userId: string, isDefault = false) => {
    try {
      const newQuiz = { ...quiz, userId };
      if (isDefault) {
        const existingQuizIndex = defaultQuizzesState.findIndex(q => q.id === quiz.id);

        let newDefaultQuizzes;
        if (existingQuizIndex !== -1) {
          newDefaultQuizzes = defaultQuizzesState.map((q, index) =>
            index === existingQuizIndex ? { ...q, ...quiz } : q
          );
        } else {
          newDefaultQuizzes = [...defaultQuizzesState, newQuiz];
        }

        setDefaultQuizzesState(newDefaultQuizzes);
        await AsyncStorage.setItem('defaultQuizzes', JSON.stringify(newDefaultQuizzes));
      } else {
        const existingQuizIndex = quizzes.findIndex(q => q.id === quiz.id);

        let newQuizzes;
        if (existingQuizIndex !== -1) {
          newQuizzes = quizzes.map((q, index) =>
            index === existingQuizIndex ? { ...q, ...quiz } : q
          );
        } else {
          newQuizzes = [...quizzes, newQuiz];
        }

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

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
