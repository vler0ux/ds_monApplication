// services/auth.ts
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

type AuthResult = {
  success: boolean;
  token?: string;
};

export async function loginWithEmail(email: string, password: string): Promise<AuthResult> {
  // Simulation
  if (email === 'test@dev.fr' && password === '1234') {
    const token = 'fake-jwt-token';
    await SecureStore.setItemAsync('token', token);
    return { success: true, token };
  }
  return { success: false };
}

export async function biometricAuth(): Promise<AuthResult> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const savedToken = await SecureStore.getItemAsync('token');

  if (!hasHardware || supportedTypes.length === 0 || !savedToken) return { success: false };

  const { success } = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authentifiez-vous avec biométrie',
    fallbackLabel: 'Mot de passe',
  });

  return success ? { success: true, token: savedToken } : { success: false };
}
