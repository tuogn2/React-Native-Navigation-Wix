import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Navigation } from "react-native-navigation";

import img1 from "../assets/IMG/pic1.png";
import img2 from "../assets/IMG/pic2.png";
import img3 from "../assets/IMG/pic3.png";
import img4 from "../assets/IMG/pic4.png";
import img5 from "../assets/IMG/pic5.png";
import img6 from "../assets/IMG/pic6.png";
import img7 from "../assets/IMG/pic7.png";

const { width: screenWidth } = Dimensions.get("window");

const GetStarted = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Dữ liệu slide
  const slides = [
    { id: "1", image: img1, text: "Chấm công qua GPS, Wifi, QR Code tích hợp sâu với AI" },
    { id: "2", image: img2, text: "Đăng ký Ca làm, Xếp ca làm tự động" },
    { id: "3", image: img3, text: "Giao việc, quản lý công việc, quy trình và tiến độ" },
    { id: "4", image: img4, text: "Ứng lương, nhận phiếu lương và tiền lương hàng tháng" },
    { id: "5", image: img5, text: "Số hóa 100% giấy tờ trong doanh nghiệp" },
    { id: "6", image: img6, text: "Quản lý các thông báo, bản tin nội bộ" },
    { id: "7", image: img7, text: "Quản lý vị trí nhân viên trên bản đồ số" },
  ];

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <View style={{ paddingHorizontal: 30 }}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <FlatList
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          onScroll={handleScroll}
          style={{ paddingTop: 50 }}
        />
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => Navigation.push(props.componentId, { component: { name: "Login" } })}
        >
          <Text style={{ color: "#1ECC78" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonJoin}
          onPress={() => Navigation.push(props.componentId, { component: { name: "SignUp" } })}
        >
          <Text style={{ color: "white" }}>Join Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginBottom: 80,
  },
  text: {
    fontSize: 23.5,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#1ECC78",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLogin: {
    borderColor: "#1ECC78",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: "center",
    width: "40%",
    marginRight: 10,
  },
  buttonJoin: {
    backgroundColor: "#28A745",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    width: "40%",
    alignItems: "center",
  },
});

export default GetStarted;
