import React, { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import Login from './screen/Login'
import Intro from './screen/Intro';
import GetStarted from './screen/GetStarted';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Intro', () => Intro);
Navigation.registerComponent('GetStarted', () => GetStarted);

const App = () => {
  useEffect(() => {
    // Đăng ký màn hình chính khi ứng dụng được khởi động
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
