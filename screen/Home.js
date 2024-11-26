import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation } from 'react-native-navigation';

// Sample data for the stores
const stores = [
  {
    id: '1',
    name: 'Coffee House',
    address: '644 Lô Gá, P. 15, Q. 11, HCM',
    owner: 'Trịnh Quốc Doanh',
  },
  {
    id: '2',
    name: 'Trà sữa Gongcha Bình Tân',
    address: '385 Đường số 7, Bình Trị Đông B',
    owner: 'Trịnh Quốc Doanh',
  },
];

const Home = ({ componentId }) => {

  const renderStoreItem = ({ item }) => (
    <View style={styles.storeCard}>
      <View style={styles.storeDetails}>
        <View style={styles.textContainer}>
          <Text style={styles.storeName}>{item.name}</Text>
          <Text style={styles.storeAddress}>{item.address}</Text>
          <Text style={styles.storeOwner}>{item.owner}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert('Navigating to store details')}
      >
        <Text style={styles.buttonText}>Chọn</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          console.log('Token retrieved:', token);
          return token;
        }
        return null;
      } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
      }
    };

    getToken();
  }, []);

  // Xóa token từ AsyncStorage
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Navigation.push(componentId, {
        component: {
          name: 'Intro', // Navigate to the Intro screen
        },
      });
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  // Navigate to the Intro screen
  const goToIntro = () => {
    Navigation.push(componentId, {
      component: {
        name: 'Intro', // Replace with the actual name of your Intro screen
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Chọn cửa hàng</Text>
      <FlatList
        data={stores}
        renderItem={renderStoreItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.storeList}
      />
      {/* Nút xóa token */}
      <TouchableOpacity style={styles.removeTokenButton} onPress={removeToken}>
        <Text style={styles.removeTokenButtonText}>Xóa Token</Text>
      </TouchableOpacity>
      {/* Nút chuyển về trang Intro */}
      <TouchableOpacity style={styles.goToIntroButton} onPress={goToIntro}>
        <Text style={styles.goToIntroButtonText}>Go to Intro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3fbf9',
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  storeList: {
    marginTop: 10,
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  storeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storeAddress: {
    fontSize: 14,
    color: '#555',
  },
  storeOwner: {
    fontSize: 12,
    color: '#888',
  },
  button: {
    backgroundColor: '#1ECC78',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  removeTokenButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 10, 
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  removeTokenButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  goToIntroButton: {
    backgroundColor: '#4C9BFF',
    paddingVertical: 10, 
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  goToIntroButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Home;
