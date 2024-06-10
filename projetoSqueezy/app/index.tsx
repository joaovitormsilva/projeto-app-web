import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic } from '@expo-google-fonts/poppins';

export default function SquizzyScreen() {
  const router = useRouter();
  let [fontsLoaded] = useFonts({ Poppins_100Thin, Poppins_300Light, Poppins_900Black_Italic });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FCC307" />;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/SquizzyLogo3.png')} style={styles.reactLogo} />
   <Text style={styles.text}>Your favorite quiz app</Text>
      <Text style={styles.text}>Create an account to start squizzying!</Text>

      <TouchableOpacity
        style={[styles.box, styles.boxCreateAccount, { marginBottom: '10%', marginTop: '20%' }]}
        onPress={() => router.push('/CreateAccount')}
        accessibilityLabel="Create Account"
      >
        <Text style={[styles.text, styles.linkText]}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Already have an account?</Text>

      <TouchableOpacity
        style={[styles.box, styles.boxSignIn]}
        onPress={() => router.push('/SignIn')}
        accessibilityLabel="Sign In"
      >
        <Text style={[styles.text, styles.linkText]}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '65%',
    height: 50, // Ajuste a altura conforme necessário
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#05203C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_300Light',
    textAlign: 'center',
  },
  linkText: {
    color: '#05203C',
  },
  boxCreateAccount: {
    backgroundColor: '#FCC307',
  },
  boxSignIn: {
    backgroundColor: '#FFFFFF',
  },
  reactLogo: {
    height: '40%',
    width: '70%',
    resizeMode: 'contain',
  },
});