import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useUser } from '../../../scripts/UserContext'; // Certifique-se de que o caminho do import está correto
import { useQuiz } from '../../../scripts/QuizContext'; // Certifique-se de que o caminho do import está correto

export default function ProfileScreen() {
  const { user } = useUser(); // Acessando o usuário através do contexto
  const { quizzes } = useQuiz(); // Acessando quizzes através do contexto

  if (!user) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.circle}></View>
        <Text style={styles.labelText}>{user.email}</Text> {/* Exemplo de acesso a dados do usuário */}
        <View style={styles.row}>
          <Text style={styles.labelText}>Your Quizzes</Text>
          {quizzes.map((quiz: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
            <TouchableOpacity
              key={quiz.id}
              style={[styles.box, styles.boxBackgroundYellow]}
              onPress={() => {
                // Adicione aqui a navegação para a tela de gerenciamento do quiz específico
              }}
            >
              <Text>{quiz.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Poppins_300Light',
    marginBottom: 20,
  },
  labelText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins_300Light',
    marginBottom: 10,
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '90%',
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: 8,
    alignItems: 'center',
  },
  box: {
    width: '32%',
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxBackgroundYellow: {
    backgroundColor: '#FCC307',
  },
});
