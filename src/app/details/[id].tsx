import { OptionSelector } from '@/src/components/OptionSelector';
import { QuantitySelector } from '@/src/components/QuantitySelector';
import { ToppingSelector } from '@/src/components/ToppingSelector';
import { useStore } from '@/src/store';
import { CartItemOptions } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const defaultCoffeeData = {
  temperatures: [
    { id: 'cold', name: 'Cold', available: true },
    { id: 'hot', name: 'Hot', available: true },
  ],
  sizes: [
    { id: 'small', name: 'Small', price: 5.50 },
    { id: 'medium', name: 'Medium', price: 6.50 },
    { id: 'large', name: 'Large', price: 7.50 },
  ],
  sugarLevels: [
    { id: 'normal', name: 'Normal' },
    { id: 'less', name: 'Less' },
    { id: 'no-sugar', name: 'No Sugar' },
  ],
  toppings: [
    { id: 'cinnamon', name: 'Cinnamon Sprinkle', price: 0.50 },
    { id: 'whipped-cream', name: 'Whipped Cream', price: 0.50 },
    { id: 'chocolate', name: 'Chocolate Shavings', price: 0.50 },
  ],
};

export default function CoffeeDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { addToCartWithOptions, toggleFavorite, favorites, getCoffeeById } = useStore();
  
  const coffee = useMemo(() => {
    const baseData = getCoffeeById(id as string);
    if (!baseData) return null;
    
    return {
      ...baseData,
      description: baseData.description || 'A delicious coffee drink prepared with care.',
      temperatures: baseData.temperatures || defaultCoffeeData.temperatures,
      sizes: baseData.sizes || defaultCoffeeData.sizes,
      sugarLevels: baseData.sugarLevels || defaultCoffeeData.sugarLevels,
      toppings: baseData.toppings || defaultCoffeeData.toppings,
    };
  }, [id, getCoffeeById]);

  const [selectedTemperature, setSelectedTemperature] = useState('hot');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedSugar, setSelectedSugar] = useState('normal');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const isFavorite = favorites.includes(id as string);

  const calculateTotal = useMemo(() => {
    if (!coffee) return 0;
    
    const sizePrice = coffee.sizes?.find(s => s.id === selectedSize)?.price || coffee.price;
    const toppingsPrice = selectedToppings.reduce((total, toppingId) => {
      const topping = coffee.toppings?.find(t => t.id === toppingId);
      return total + (topping?.price || 0);
    }, 0);
    
    return (sizePrice + toppingsPrice) * quantity;
  }, [coffee, selectedSize, selectedToppings, quantity]);

  const handleToggleTopping = (toppingId: string) => {
    setSelectedToppings(prev =>
      prev.includes(toppingId)
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAddToCart = () => {
    if (!coffee) return;
    
    const options: CartItemOptions = {
      temperature: selectedTemperature,
      size: selectedSize,
      sugarLevel: selectedSugar,
      toppings: selectedToppings,
      quantity,
    };
    
    addToCartWithOptions(coffee, options);
    router.push({ pathname: '/cart' as any });
  };

  if (!coffee) {
    return (
      <SafeAreaView style={[styles.safeArea]} edges={['left', 'right', 'top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Coffee not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea]} edges={['left', 'right', 'top']}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: coffee.image }} style={styles.image} />
        
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(coffee.id)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "#FF4B4B" : "#333"} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.name}>{coffee.name}</Text>
          <Text style={styles.basePrice}>${coffee.sizes?.find(s => s.id === selectedSize)?.price.toFixed(2) || coffee.price.toFixed(2)}</Text>
        </View>
        
        <Text style={styles.description}>{coffee.description}</Text>
        
        {coffee.temperatures && (
          <OptionSelector
            title="Available in"
            options={coffee.temperatures}
            selectedOption={selectedTemperature}
            onSelect={setSelectedTemperature}
          />
        )}
        
        {coffee.sizes && (
          <OptionSelector
            title="Size"
            options={coffee.sizes}
            selectedOption={selectedSize}
            onSelect={setSelectedSize}
            showPrice={true}
          />
        )}
        
        {coffee.sugarLevels && (
          <OptionSelector
            title="Sugar Level"
            options={coffee.sugarLevels}
            selectedOption={selectedSugar}
            onSelect={setSelectedSugar}
          />
        )}
        
        {coffee.toppings && coffee.toppings.length > 0 && (
          <ToppingSelector
            toppings={coffee.toppings}
            selectedToppings={selectedToppings}
            onToggleTopping={handleToggleTopping}
          />
        )}
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
      
      <View style={styles.bottomContainer}>
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity(q => q + 1)}
          onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
        />
        
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to cart</Text>
          <View style={styles.divider} />
          <Text style={styles.totalText}>${calculateTotal.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 70,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  basePrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A2B29',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  bottomSpacer: {
    height: 100,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 16,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4A2B29',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});