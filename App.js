import React, { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import Login from './screen/Login'
import Intro from './screen/Intro';
import GetStarted from './screen/GetStarted';
import ConfirmOTP from './screen/ComfirmOTP';
import SignUp from './screen/SignUp';
import Home from './screen/Home';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Intro', () => Intro);
Navigation.registerComponent('GetStarted', () => GetStarted);
Navigation.registerComponent('ConfirmOTP', () => ConfirmOTP);
Navigation.registerComponent('SignUp', () => SignUp);
Navigation.registerComponent('Home', () => Home);


const App = () => {
  useEffect(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Intro',
              },
            },
          ],
        },
      },
    });
  }, []);

  return null;
};

export default App;
