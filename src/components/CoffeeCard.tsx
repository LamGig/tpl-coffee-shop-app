import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Coffee } from '@/src/types';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - 60) / 2;

interface CoffeeCardProps {
  coffee: Coffee;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (coffee: Coffee) => void;
  onPress: (coffee: Coffee) => void;
}

export const CoffeeCard: React.FC<CoffeeCardProps> = ({ 
  coffee, 
  onToggleFavorite, 
  onAddToCart,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(coffee)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: coffee.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(coffee.id)}
        >
          <Ionicons 
            name={coffee.isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={coffee.isFavorite ? "#FF4B4B" : "#FFF"} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => onAddToCart(coffee)}
        >
          <Ionicons name="add" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{coffee.name}</Text>
        <Text style={styles.price}>${coffee.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: cardWidth * 0.9,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A2B29',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    paddingTop: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A2B29',
  },
});