import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission refusée pour accéder à la localisation.');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);

    // Envoi à l'API Express
    try {
      const response = await fetch('http://10.112.133.249:3000/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        }),
      });

      const data = await response.json();
      console.log('Réponse API :', data);
    } catch (error) {
      console.error('Erreur envoi API :', error);
    }
  })();
}, []);


  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Chargement de la localisation...</Text>
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      </View>
    );
  }

  const { latitude, longitude } = location.coords;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title="Vous êtes ici"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   top: 50,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  map: {
    flex: 1,
  },
  error: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
});
