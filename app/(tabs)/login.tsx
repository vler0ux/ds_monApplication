import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.112.133.249:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          mot_de_passe: motDePasse,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Connexion réussie');
        router.replace('/');
      } else {
        Alert.alert('Erreur', result.message || 'Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      Alert.alert('Erreur', 'Impossible de se connecter au serveur');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        value={motDePasse}
        onChangeText={setMotDePasse}
        style={styles.input}
      />

      <View style={styles.loginButtonContainer}>
        <Button title="Connexion" onPress={handleLogin} />
      </View>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/register')}>
        <Text style={styles.registerText}>Pas de compte ? Créez-en un</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  loginButtonContainer: {
    marginTop: 20,
    width: '100%',
  },
  separator: {
    height: 40,
  },
  registerButton: {
    backgroundColor: '#9575CD',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  registerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
