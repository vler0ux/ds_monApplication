import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index({ onStart }: { onStart: () => void }) {
   const router = useRouter();
  return (
    <View style={styles.container}>
     

      <Text style={styles.title}>Bienvenue sur Localisation</Text>
      <Text style={styles.subtitle}>Tu es prêt(e) à désamorcer les consignes? </Text>

      <TouchableOpacity style={styles.startButton} onPress={() => router.push('/localisation')}>
        <Text style={styles.startText}>Commencer</Text>
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
    backgroundColor: '#e63946',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  startText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
