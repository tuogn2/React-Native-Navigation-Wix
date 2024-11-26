import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, TextInput,Image } from "react-native";
import PhoneInput from "../components/PhoneInput";
import TopSection from "../components/TopSection"; // Import component TopSection
import { Navigation } from "react-native-navigation"; // Import Wix Navigation
import people from '../assets/IMG/People.png'

export default function SignUp(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState(""); // Thêm state cho tên
 
  const handlePhone = (inputPhone) => {
    setPhoneNumber(inputPhone); // Cập nhật state phoneNumber
  };

  const handleName = (inputName) => {
    setName(inputName); // Cập nhật state name khi nhập
  };

  const handleSignUp = () => {
    if (phoneNumber && name) { 
      Navigation.push(props.componentId, {
        component: {
          name: 'ConfirmOTP', 
          passProps: {
            phoneNumber: phoneNumber,
            IsSignUp: true
          },
        }
      });
    } else {
      alert("Vui lòng điền đầy đủ thông tin.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopSection />
      <View style={styles.loginform}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sign Up</Text>
          <Text style={{ fontSize: 16.5, fontWeight: "200" }}>
            Hãy cho chúng tôi biết về bạn
          </Text>
        </View>

        {/* Name Input Section */}
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
           <Image source={people} style={{width:24,height:24}}/>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={name} // Sử dụng name thay vì email
            onChangeText={handleName} // Cập nhật state name khi nhập
            autoCapitalize="none"
          />
        </View>

        {/* Phone Input Section */}
        <PhoneInput phoneNumber={phoneNumber} onPhoneChange={handlePhone} />

        {/* SignUp Button */}
        <TouchableOpacity style={styles.buttonLogin} onPress={handleSignUp}>
          <Text style={{ color: "white", fontSize: 20 }}>Sign up</Text>
        </TouchableOpacity>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor:'#F1F0E8',
  },
  iconContainer: {
    paddingRight: 20,
    backgroundColor:'#F1F0E8',
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor:'#F1F0E8',
  },
  buttonLogin: {
    backgroundColor: "#1ECC78",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
