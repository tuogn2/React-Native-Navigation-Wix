import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';  
import AsyncStorage from '@react-native-async-storage/async-storage';  // Make sure to import AsyncStorage
import logo from '../assets/IMG/Logo.png';  

export default function Intro() {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // If token exists, navigate to Home
          Navigation.setRoot({
            root: {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Home',  // Replace 'Home' with the name of your home screen
                    },
                  },
                ],
              },
            },
          });
        } else {
          // If no token, navigate to GetStarted
          Navigation.setRoot({
            root: {
              stack: {
                children: [
                  {
                    component: {
                      name: 'GetStarted',  // Replace 'GetStarted' with the name of your get started screen
                    },
                  },
                ],
              },
            },
          });
        }
      } catch (error) {
        console.error('Error checking token: ', error);
      }
    };

    // Run the check on component mount
    checkToken();
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
