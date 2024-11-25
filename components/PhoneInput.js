import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  Image,
} from "react-native";
import dropDown from '../assets/IMG/down.png';
import check from "../assets/IMG/check.png";

const countryCodes = [
  { code: "+84", country: "Vietnam" },
  { code: "+1 ", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
];

export default function PhoneInput({ phoneNumber, onPhoneChange }) {
  const [selectedCode, setSelectedCode] = useState("+84"); // Default country code
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Regex for phone number validation (can be adjusted for your needs)
  const phoneNumberRegex = /^[0-9]{10,15}$/;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setSelectedCode(item.code);
        setIsModalVisible(false);
      }}
    >
      <Text style={styles.dropdownText}>{item.code} - {item.country}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.countryCodeContainer}
          onPress={() => setIsModalVisible(true)} // Show modal on press
        >
          <Text style={styles.countryCode}>{selectedCode}</Text>
          <Image source={dropDown} style={{ width: 15, height: 15 }} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Your phone number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(text) => onPhoneChange(text.replace(/[^0-9]/g, ""))} // Use onPhoneChange
        />
        
        {phoneNumberRegex.test(phoneNumber) && (
          <Image source={check} style={styles.checkIcon} />
        )}
      </View>

      {/* Modal for country code selection */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countryCodes}
              keyExtractor={(item) => item.code}
              renderItem={renderItem}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden", // Ensures the border-radius applies to children
    backgroundColor: '#F1F0E8',
    height: 50, // Ensure the input container has a fixed height
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#F1F0E8',
    paddingHorizontal: 10,
    height: '100%', // Ensures the container takes full height of the input container
    borderRightWidth: 1, // Adds a divider between the code and the input
    borderColor: "#ccc",
  },
  countryCode: {
    fontSize: 16,
    marginRight: 5,
    color: "#333",
  },
  input: {
    flex: 1,
    height: '100%', // Full height to match the input container
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F1F0E8',
  },
  checkIcon: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 10, // Position the icon at the far right of the input field
    top: '50%', // Vertically center the icon
    transform: [{ translateY: -10 }] // Adjust for perfect centering
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 8,
    padding: 20,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
});
