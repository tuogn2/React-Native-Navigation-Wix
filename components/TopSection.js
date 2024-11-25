// TopSection.js
import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import cancel from "../assets/IMG/Cancel.png";
import dropDown from "../assets/IMG/down.png";
import VN from "../assets/IMG/VN.png";
import logo from "../assets/IMG/logologin.png";
import bg1 from "../assets/IMG/bg1.png";
import bg2 from "../assets/IMG/bg2.png";
// import { useNavigation } from "@react-navigation/native";
const TopSection = () => {
  // const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* <TouchableOpacity  onPress={()=>navigation.navigate('GetStarted')} > */}
        <TouchableOpacity  >
          <Image source={cancel} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconsRow}>
          <Image source={dropDown} style={styles.icon} resizeMode="contain" />
          <Image source={VN} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={bg1} style={styles.bg1} resizeMode="contain" />
        <Image source={bg2} style={styles.bg2} resizeMode="contain" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  topContainer: {
    position: "absolute",
    top: 25,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 2,
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 150,
    height: 150,
    zIndex: 2,
  },
  bg1: {
    position: "absolute",
    bottom: -1,
    right: -15,
    width: 150,
    height: 300,
    zIndex: 1,
  },
  bg2: {
    position: "absolute",
    top: -20,
    left: -10,
    width: 150,
    height: 300,
    zIndex: 0,

  },
});

export default TopSection;
