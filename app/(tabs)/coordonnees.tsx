// app/affichage.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Affichage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fetch('http://10.112.133.249:3000/api/coords');
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error('Erreur lors du fetch :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Chargement des coordonnées...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📍 Historique des localisations</Text>

        {data.length === 0 ? (
          <Text style={styles.empty}>Aucune donnée reçue.</Text>
        ) : (
          data.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.coord}>
                <Text style={styles.label}>Latitude : </Text>{item.latitude}
              </Text>
              <Text style={styles.coord}>
                <Text style={styles.label}>Longitude : </Text>{item.longitude}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 20,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  coord: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
});
