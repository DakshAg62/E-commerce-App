import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import userIcon from '../images/user.png';
import shoppingBagIcon from '../images/shopping-bag.png';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={userIcon} style={styles.iconImage} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Cart')}>
        <Image source={shoppingBagIcon} style={styles.iconImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  iconContainer: {
    padding: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});

export default Header;