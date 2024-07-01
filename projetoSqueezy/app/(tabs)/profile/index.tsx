import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useUser } from '../../../scripts/UserContext'; // Atualize o caminho conforme necessário
import { useQuiz } from '../../../scripts/QuizContext'; // Atualize o caminho conforme necessário
import { useRouter } from 'expo-router'; // Importação para navegação

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

export default function ProfileScreen() {
  const { user, loadUser } = useUser(); // Acessando o usuário através do contexto e a função de carregar o usuário
  const { quizzes } = useQuiz(); // Acessando quizzes através do contexto
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Instância do roteador

  useEffect(() => {
    const loadUserData = async () => {
      await loadUser(); // Carregar os dados do usuário
      setLoading(false);
    };

    loadUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (!user) {
    return <Text style={styles.errorText}>Failed to load user data.</Text>;
  }

  const userQuizzes = quizzes.filter((quiz: Quiz) => quiz.userId === user.id); // Filtrando quizzes pelo usuário logado

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.circle}></View>
        <Text style={styles.labelText}>{user.username}</Text>
        <View style={styles.row}>
          <Text style={styles.labelText}>Your Quizzes</Text>
          {userQuizzes.length > 0 ? (
            userQuizzes.map((quiz: Quiz) => (
              <TouchableOpacity
                key={quiz.id}
                style={[styles.box, styles.boxBackgroundYellow]}
                onPress={() => {
                  router.push({
                    pathname: '/quizJogavel', // Caminho para a tela de quiz jogável
                    params: { quizId: quiz.id }, // Passando o ID do quiz como parâmetro
                  });
                }}
              >
                <Text>{quiz.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noQuizzesText}>No quizzes found.</Text>
          )}
        </View>
      </View>
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
  column: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  labelText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  row: {
    width: '100%',
    paddingHorizontal: 20,
  },
  box: {
    width: '100%',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxBackgroundYellow: {
    backgroundColor: '#FCC307',
  },
  noQuizzesText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
