import { Navigation } from 'react-native-navigation';
import App from './App'; // Giả sử bạn đã có App.js

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setDefaultOptions({
    topBar: {
      visible: false,  // Ẩn header (top bar) cho tất cả màn hình
    },
  });
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'com.myApp.WelcomeScreen',
              
             }
           }
         ]
       }
     }
  });
});
