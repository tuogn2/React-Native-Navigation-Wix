import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import TopSection from '../components/TopSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';

export default function ConfirmOTP(props) {
  const {phoneNumber, user, IsSignUp} = props; // Nhận các tham số từ `props`
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(60); // Đếm ngược 60 giây
  const timerRef = useRef();

  // Tham chiếu các input OTP
  const otpRefs = useRef([]);

  // Xử lý thay đổi OTP
  const handleOtpChange = (text, index) => {
    if (/[^0-9]/.test(text)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < 4) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = index => {
    if (!otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (timer === 0) return;

    timerRef.current = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timer]);

  // Xử lý điều hướng khi đăng ký
  const handleSignUp = async () => {
    const token = otp.join(''); // Join the OTP array into a string
    if (token.length === 5) {
      // Check if the token has exactly 5 characters
      await AsyncStorage.setItem('token', token); // Store the token
      Navigation.push(props.componentId, {
        component: {
          name: 'Home',
        },
      });
    } else {
      // Optionally, show an alert or some message if the token is not 5 digits
      alert('Token must be exactly 5 digits long.');
    }
  };

  const handleSignIn = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === user.otp) {
      console.log('OTP matched');
      await AsyncStorage.setItem('token', user.token);
      Navigation.push(props.componentId, {
        component: {
          name: 'Home',
        },
      });
    } else {
      Alert.alert('Error', 'Incorrect OTP. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <TopSection componentId={props.componentId} />
          <View style={styles.loginform}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                Xác minh OTP
              </Text>
              <Text style={{fontSize: 16.5, fontWeight: '200'}}>
                Nhập mã OTP gửi đến {phoneNumber}
              </Text>
            </View>

            {/* Trường nhập OTP */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={input => {
                    otpRefs.current[index] = input;
                  }}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={text => handleOtpChange(text, index)}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      handleBackspace(index);
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={1}
                />
              ))}
            </View>

            {/* Điều kiện nút tùy thuộc vào IsSignUp */}
            {IsSignUp ? (
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={handleSignUp}>
                <Text style={{color: 'white', fontSize: 20}}>Sign Up</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={handleSignIn}>
                <Text style={{color: 'white', fontSize: 20}}>Sign In</Text>
              </TouchableOpacity>
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                flex: 1,
              }}>
              <Text style={{fontSize: 16.5, fontWeight: '200'}}>
                Resend OTP in
              </Text>
              <Text
                style={{
                  fontSize: 16.5,
                  fontWeight: '500',
                  marginLeft: 5,
                  color: timer <= 10 ? 'red' : 'black',
                }}>
                {timer}s
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3fbf9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginform: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  buttonLogin: {
    backgroundColor: '#1ECC78',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#DCE7F9',
  },
});
