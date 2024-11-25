import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';  
import logo from '../assets/IMG/Logo.png';  

export default function Intro() {
  useEffect(() => {
    const timer = setTimeout(() => {
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'GetStarted',
                },
              },
            ],
          },
        },
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
