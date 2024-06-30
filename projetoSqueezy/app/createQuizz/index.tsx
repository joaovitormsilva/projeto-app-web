import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { useQuiz } from '../../scripts/QuizContext'; // Certifique-se de que o caminho do import está correto
import { useUser } from '../../scripts/UserContext'; // Certifique-se de que o caminho do import está correto

export default function CreateQuizScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [category, setCategory] = useState('');
  const [numQuestions, setNumQuestions] = useState('5');
  const [duration, setDuration] = useState('5');
  const [image, setImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { saveQuiz } = useQuiz();
  const { user } = useUser(); // Obtenha o usuário atual

  let [fontsLoaded] = useFonts({ Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FCC307" />;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveImageLocally = async () => {
    if (!image) return;
    setSaving(true);
    try {
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const directoryPath = `${FileSystem.documentDirectory}images/upload/`;
      const newPath = `${directoryPath}${filename}`;

      const dirInfo = await FileSystem.getInfoAsync(directoryPath);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
      }

      await FileSystem.copyAsync({
        from: image,
        to: newPath,
      });
      console.log('Image saved locally:', newPath);
      alert('Image saved locally!');
    } catch (error) {
      console.error('Error saving image locally:', error);
      alert('Failed to save image locally');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirm = () => {
    if (user) {
      const newQuiz = {
        id: uuid.v4() as string, // Convertendo o id para string explicitamente
        name: inputText,
        description: descriptionText,
        category,
        numQuestions: parseInt(numQuestions), // Convertendo para número, se necessário
        duration: parseInt(duration), // Convertendo para número, se necessário
        imageUri: image || undefined,
        userId: user.id, // Adicionando a propriedade userId
        questions: [] // Inicializando como um array vazio
      };
  
      saveQuiz(newQuiz, user.id).then(() => {
        router.replace({
          pathname: '../createQuestions',
          params: { quizId: newQuiz.id, numQuestions },
        });
      });
    } else {
      alert("User not found. Please log in again.");
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.boxSetQuiz]} onPress={pickImage}>
        <Text style={[styles.textThumbnail, { width: '90%', textAlign: 'left' }]}>Set Quiz Thumbnail</Text>
        <View style={styles.boxUpload}>
          <Text style={styles.textThumbnail}>Click to upload</Text>
          <Text style={[styles.textThumbnail, { fontSize: 12, color: '#9E9E9E' }]}>.svg .jpg .png etc</Text>
        </View>
      </TouchableOpacity>

      {image && (
        <View>
          <Text style={styles.successMessage}>A imagem foi carregada com sucesso!</Text>
          <TouchableOpacity style={styles.box} onPress={saveImageLocally}>
            <Text style={styles.text}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}

      {saving && <ActivityIndicator size="large" color="#FCC307" />}

      <Text style={styles.text}>Quiz Name</Text>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Quiz Name"
        placeholderTextColor="#aaa"
      />
      <Text style={styles.text}>Quiz Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={descriptionText}
        onChangeText={setDescriptionText}
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales diam ac tincidunt malesuada. In hac habitasse platea dictumst."
        placeholderTextColor="#aaa"
        multiline
        maxLength={100}
      />
      <Text style={styles.counterText}>{descriptionText.length}/100</Text>

      <Text style={styles.text}>Quiz Category</Text>
      <Picker
        selectedValue={category}
        style={[styles.picker, styles.borderOnly]}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Category 1" value="category1" />
        <Picker.Item label="Category 2" value="category2" />
        <Picker.Item label="Category 3" value="category3" />
      </Picker>

      <Text style={styles.text}>Number of Questions</Text>
      <Picker
        selectedValue={numQuestions}
        style={[styles.picker, styles.borderOnly]}
        onValueChange={(itemValue) => setNumQuestions(itemValue)}
      >
        <Picker.Item label="5" value="5" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="15" value="15" />
      </Picker>

      <Text style={styles.text}>Quiz Duration</Text>
      <Picker
        selectedValue={duration}
        style={[styles.picker, styles.borderOnly]}
        onValueChange={(itemValue) => setDuration(itemValue)}
      >
        <Picker.Item label="5 minutes" value="5" />
        <Picker.Item label="10 minutes" value="10" />
        <Picker.Item label="15 minutes" value="15" />
      </Picker>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  textThumbnail: {
    fontSize: 16,
    color: '#000',
  },
  boxSetQuiz: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  boxUpload: {
    marginTop: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  successMessage: {
    color: 'green',
    marginBottom: 8,
  },
  box: {
    backgroundColor: '#FCC307',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    width: '100%',
  },
  counterText: {
    alignSelf: 'flex-end',
    color: '#aaa',
    marginBottom: 16,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 16,
  },
  borderOnly: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  confirmButton: {
    backgroundColor: '#FCC307',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
  },
});
