import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { useQuiz } from '../../scripts/QuizContext'; // Certifique-se de que o caminho do import está correto

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
    const newQuiz = {
      id: uuid.v4(),
      name: inputText,
      description: descriptionText,
      category,
      numQuestions,
      duration,
      imageUri: image || undefined,
    };

    saveQuiz(newQuiz);

    router.replace({
      pathname: '../createQuestions',
      params: { numQuestions },
    });
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
  box: {
    width: '65%',
    height: 50,
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCC307',
  },
  boxSetQuiz: {
    width: '90%',
    height: '18%',
    borderRadius: 8,
    backgroundColor: '#05203C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxUpload: {
    width: '90%',
    height: '63%',
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  textThumbnail: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#05203C',
    fontSize: 14,
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
    width: '90%',
  },
  input: {
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'black',
  },
  picker: {
    height: 40,
    width: '90%',
    marginBottom: 20,
  },
  borderOnly: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  successMessage: {
    color: '#00FF00',
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'Poppins_300Light',
  },
  counterText: {
    width: '90%',
    textAlign: 'right',
    color: '#aaa',
    fontSize: 12,
    marginBottom: 10,
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
