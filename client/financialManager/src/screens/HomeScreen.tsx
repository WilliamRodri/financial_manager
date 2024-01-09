import * as React from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

function HomePage({ navigation }: any) {

  return (
    <SafeAreaView style={styles.container}>

      <Image
        source={require('../assets/logo/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={[styles.button, styles.buttonLogin]}
        onPress={() => navigation.navigate('Login')}
        >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonRegister]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Registrar-se</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 50,
    marginTop: 200
  },
  button: {
    width: 268,
    height: 46,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  buttonLogin: {
    backgroundColor: '#090937'
  },
  buttonRegister: {
    backgroundColor: '#232265'
  },
});

export default HomePage;
