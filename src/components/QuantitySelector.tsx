import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity = 99,
}) => {
  const canDecrease = quantity > minQuantity;
  const canIncrease = quantity < maxQuantity;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !canDecrease && styles.buttonDisabled]}
        onPress={onDecrease}
        disabled={!canDecrease}
      >
        <Ionicons 
          name="remove" 
          size={20} 
          color={canDecrease ? '#4A2B29' : '#BDBDBD'} 
        />
      </TouchableOpacity>
      
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      
      <TouchableOpacity
        style={[styles.button, !canIncrease && styles.buttonDisabled]}
        onPress={onIncrease}
        disabled={!canIncrease}
      >
        <Ionicons 
          name="add" 
          size={20} 
          color={canIncrease ? '#4A2B29' : '#BDBDBD'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingVertical: 4,
    paddingHorizontal: 4,
    alignSelf: 'flex-start',
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#F5F5F5',
  },
  quantityContainer: {
    paddingHorizontal: 20,
    minWidth: 40,
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});