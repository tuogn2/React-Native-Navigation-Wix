import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import PhoneInput from "../components/PhoneInput";
import TopSection from "../components/TopSection"; // Import the new TopSection component
// import { useNavigation } from "@react-navigation/native"; // Dùng để điều hướng trong các màn hình
import { Navigation } from "react-native-navigation";
export default function Login(props) {
  const [phoneNumber, setPhoneNumber] = useState("0123456789");
  // const navigation = useNavigation();

  const handlePhone = (inputPhone) => {
    setPhoneNumber(inputPhone); // Cập nhật số điện thoại
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://api.jsonbin.io/v3/b/673ee20dacd3cb34a8ac1f92", {
        method: "GET",
        headers: {
          "X-Master-Key": "$2a$10$HM7iOBAiPLJcA4WYTjF04.cnCBtHNCo7GaZCWruQ27Kl4I/x.sowu", 
        },
      });
      const data = await response.json();
      const user = data.record.users.find((user) => user.phone === phoneNumber);
      
      if (user) {
        Navigation.push(props.componentId, {
          component: {
            name: "ConfirmOTP",
            passProps: {
                phoneNumber: phoneNumber,
                user: user,
            },
          },
        });

      } else {
        Alert.alert("Error", "Phone number not found");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopSection />
      <View style={styles.loginform}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Login</Text>
          <Text style={{ fontSize: 16.5, fontWeight: "normal" }}> {/* Đã sửa thành "normal" */}
            Hello, so glad you're back
          </Text>
        </View>
        <PhoneInput phoneNumber={phoneNumber} onPhoneChange={handlePhone} />
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={handleLogin} 
        >
          <Text style={{ color: "white", fontSize: 20 }}>Sign in</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
            flex: 1,
          }}
        >
          <Text style={{ fontSize: 16.5, fontWeight: "normal" }}> {/* Đã sửa thành "normal" */}
            Sign in with 
          </Text>
          <Text
            style={{
              fontSize: 16.5,
              fontWeight: "500",
              marginLeft: 5,
            }}
          >
            Azure AD
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
});
