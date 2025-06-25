import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index({ onStart }: { onStart: () => void }) {
   const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Localisation</Text>
      <Text style={styles.subtitle}>Pour commencer à te géolocaliser</Text>
        <TouchableOpacity style={styles.startButton} onPress={() => router.push('/localisation')}>
          <Text style={styles.startText}>Localisation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startButton} onPress={() => router.push('/coordonnees')}>
          <Text style={styles.startText}>Coordonnées</Text>
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
  logo: {
    width: 200,
    height: 250,
    borderRadius: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#9575CD',
    bottom: 15,
    paddingVertical:15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 8
  },
  startText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
