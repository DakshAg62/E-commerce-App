import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addToCart, incrementQuantity, decrementQuantity } from '../cartSlice';
import Header from '../components/Header';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log('-------->', data);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products.');
        Alert.alert(
          'Error',
          'Failed to load products. Please try again later.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = item => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    navigation.navigate('Cart');
  };

  const handleIncrement = id => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = id => {
    dispatch(decrementQuantity(id));
  };

  const cartItems = useSelector(state => state.cart.items);

  const renderProduct = ({ item }) => {
    const existingCartItem = cartItems.find(
      cartItem => cartItem.id === item.id,
    );
    const quantity = existingCartItem ? existingCartItem.quantity : 0;

    const truncatedTitle =
      item.title.length > 20
        ? item.title.substring(0, 20) + '...'
        : item.title;

    return (
      <View style={styles.card}>
        <View>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>⭐ {item.rating.rate} </Text>
            <Text style={styles.ratingCount}>({item.rating.count})</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.productTitle}>{truncatedTitle}</Text>
        </View>
        <Text style={styles.productPrice}>₹{item.price.toFixed(2)}</Text>
        {quantity > 0 ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => handleDecrement(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => handleIncrement(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.addButtonText}>Add to Bag</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Flipkart" />
      <Text style={styles.title}>Suggested For You!</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'left',
    marginLeft: 20,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxWidth: '50%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'relative',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain',
    marginBottom: 10,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 3,
    borderRadius: 2,
    zIndex: 1,
  },
  ratingText: {
    fontSize: 12,
    color: '#ff9800',
    fontWeight: 'bold',
  },
  ratingCount: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginVertical: 0,
    textAlign: 'left',
    maxHeight: 20
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    textAlign: 'left',
  },
  loadingIndicator: {
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 2,
    alignSelf: 'center',
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: 'center',
    width: '100%',
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 10,
  },
});

export default HomeScreen;
