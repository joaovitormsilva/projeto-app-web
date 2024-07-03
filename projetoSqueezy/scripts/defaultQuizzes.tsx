// defaultQuizzes.ts
import { Question as QuizContextQuestion, Quiz as QuizContextQuiz } from './QuizContext';

export interface Question extends QuizContextQuestion {
  question: string;  // Altere `questionText` para `question`
  options: string[]; // Mantenha `options` como string[]
  correctAnswer: number; // Adicione `correctAnswer`
}

export interface Quiz extends Omit<QuizContextQuiz, 'questions'> {
  questions: Question[];
}

export const defaultQuizzes: Quiz[] = [
  {
    id: '1',
    name: 'Tech Quiz',
    description: 'Test your tech knowledge.',
    category: 'Tech',
    numQuestions: 5,
    duration: 5,
    questions: [
      {
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Process Unit', 'Control Processing Unit'],
        correctAnswer: 0,
      },
      {
        question: 'What is HTML?',
        options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Tool Markup Language'],
        correctAnswer: 0,
      },
      {
        question: 'What is CSS used for?',
        options: ['Adding styles to web pages', 'Structuring web pages', 'Creating server-side logic', 'Connecting to databases'],
        correctAnswer: 0,
      },
      {
        question: 'Which company developed JavaScript?',
        options: ['Netscape', 'Microsoft', 'Google', 'IBM'],
        correctAnswer: 0,
      },
      {
        question: 'What is React?',
        options: ['A JavaScript library for building user interfaces', 'A programming language', 'A database', 'An operating system'],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: '2',
    name: 'Actors',
    description: 'Test your knowledge about famous actors.',
    category: 'Entertainment',
    numQuestions: 5,
    duration: 5,
    questions: [
      {
        question: 'Who played the role of Iron Man in Marvel movies?',
        options: ['Chris Hemsworth', 'Chris Evans', 'Robert Downey Jr.', 'Mark Ruffalo'],
        correctAnswer: 2,
      },
      {
        question: 'Which actor starred in the movie "Forrest Gump"?',
        options: ['Tom Hanks', 'Brad Pitt', 'Leonardo DiCaprio', 'Johnny Depp'],
        correctAnswer: 0,
      },
      {
        question: 'Who played the character of Captain Jack Sparrow in "Pirates of the Caribbean"?',
        options: ['Orlando Bloom', 'Johnny Depp', 'Tom Cruise', 'Brad Pitt'],
        correctAnswer: 1,
      },
      {
        question: 'Which actress starred in the movie "La La Land"?',
        options: ['Meryl Streep', 'Emma Stone', 'Jennifer Lawrence', 'Scarlett Johansson'],
        correctAnswer: 1,
      },
      {
        question: 'Who is known for the role of Walter White in "Breaking Bad"?',
        options: ['Bryan Cranston', 'Aaron Paul', 'Jonathan Banks', 'Bob Odenkirk'],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: '3',
    name: 'Video Games Quiz',
    description: 'Test your knowledge about video games.',
    category: 'Entertainment',
    numQuestions: 5,
    duration: 5,
    questions: [
      {
        question: 'Which game is known as "The Legend of Zelda: Breath of the Wild"?',
        options: ['Super Mario Odyssey', 'The Legend of Zelda: Breath of the Wild', 'Animal Crossing: New Horizons', 'Pokémon Sword and Shield'],
        correctAnswer: 1,
      },
      {
        question: 'In which game do players build and explore worlds made of blocks?',
        options: ['Fortnite', 'Minecraft', 'Roblox', 'Terraria'],
        correctAnswer: 1,
      },
      {
        question: 'Which game series features the character Master Chief?',
        options: ['Halo', 'Call of Duty', 'Gears of War', 'Mass Effect'],
        correctAnswer: 0,
      },
      {
        question: 'What is the best-selling video game of all time?',
        options: ['Tetris', 'Minecraft', 'Grand Theft Auto V', 'Super Mario Bros.'],
        correctAnswer: 1,
      },
      {
        question: 'Which game involves capturing creatures in a Poké Ball?',
        options: ['Final Fantasy', 'World of Warcraft', 'Pokémon', 'League of Legends'],
        correctAnswer: 2,
      },
    ],
  },
  // Adicione mais quizzes padrão aqui...
];
