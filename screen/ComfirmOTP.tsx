import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import TopSection from "../components/TopSection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConfirmOTP({ navigation, route }) {
  const { phoneNumber, user, IsSignUp } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(60); // Start countdown at 60 seconds
  const timerRef = useRef();

  // Create references for the OTP inputs using useRef
  const otpRefs = useRef([]);

  // Handle OTP change, ensuring only digits and exactly 5 digits are entered
  const handleOtpChange = (text, index) => {
    if (/[^0-9]/.test(text)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < 4) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (!otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (timer === 0) return;

    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timer]);

  
  const handleSignUp = async () => {
      navigation.navigate("Home");
    
  };
  
  const handleSignIn = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === user.otp) {
      await AsyncStorage.setItem("token", user.token);
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Incorrect OTP. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopSection />
      <View style={styles.loginform}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Xác minh OTP</Text>
          <Text style={{ fontSize: 16.5, fontWeight: 200 }}>
            Nhập mã OTP gửi đến {phoneNumber}
          </Text>
        </View>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(input) => {
                otpRefs.current[index] = input;
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index); // Focus on previous input if backspace is pressed
                }
              }}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        {/* Conditional button text depending on the IsSignUp flag */}
        {IsSignUp ? (
          <TouchableOpacity style={styles.buttonLogin} onPress={handleSignUp}>
            <Text style={{ color: "white", fontSize: 20 }}>Sign Up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonLogin} onPress={handleSignIn}>
            <Text style={{ color: "white", fontSize: 20 }}>Sign In</Text>
          </TouchableOpacity>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 16.5, fontWeight: "200" }}>
            Resend OTP in
          </Text>
          <Text
            style={{
              fontSize: 16.5,
              fontWeight: "500",
              marginLeft: 5,
              color: timer <= 10 ? "red" : "black", // Change color when time is less than or equal to 10 seconds
            }}
          >
            {timer}s
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3fbf9",
    justifyContent: "center",
    alignItems: "center",
  },
  loginform: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  buttonLogin: {
    backgroundColor: "#1ECC78",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#DCE7F9",
  },
});
