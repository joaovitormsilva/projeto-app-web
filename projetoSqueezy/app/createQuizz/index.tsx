import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { useQuiz } from '../../scripts/QuizContext';
import { useUser } from '../../scripts/UserContext';
import { FontAwesome } from '@expo/vector-icons';  // Import FontAwesome

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
  const { user } = useUser();

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
        id: uuid.v4() as string,
        name: inputText,
        description: descriptionText,
        category,
        numQuestions: parseInt(numQuestions),
        duration: parseInt(duration),
        imageUri: image || undefined,
        userId: user.id,
        questions: []
      };

      saveQuiz(newQuiz, user.id).then(() => {
        router.replace({
          pathname: '../createQuestions',
          params: { quizId: newQuiz.id, numQuestions, duration },  // Passa o parâmetro duration
        });
      });
    } else {
      alert("User not found. Please log in again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={[styles.boxSetQuiz]} onPress={pickImage}>
        <Text style={[styles.textThumbnail, { width: '100%', textAlign: 'left' }]}>Set Quiz Thumbnail</Text>
        <View style={styles.boxUpload}>
          <FontAwesome name="arrow-circle-up" size={24} color="#fff" />
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
        placeholder="Write a description for your quiz..."
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
        <Picker.Item label="Tech" value="tech" />
        <Picker.Item label="Science" value="Science" />
        <Picker.Item label="History" value="history" />
        <Picker.Item label="Entertainment" value="entertainment" />
        <Picker.Item label="Geography" value="geography" />
        <Picker.Item label="Sports" value="sports" />
        <Picker.Item label="Others" value="others" />
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
        <Text style={styles.confirmButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textThumbnail: {
    fontSize: 16,
    color: '#fff',
  },
  boxSetQuiz: {
    width:'100%',
    backgroundColor:'#05203C',
    borderColor: '#05203C',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  boxUpload: {
    width:'100%',
    marginTop: 8,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    borderStyle:'dotted',
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
    marginBottom: 8,
    alignSelf: 'flex-start',
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
    backgroundColor: '#05203C',
    padding: 16,
    paddingHorizontal: 64,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
