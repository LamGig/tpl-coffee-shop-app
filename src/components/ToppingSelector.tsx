import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Topping } from '@/src/types';

interface ToppingSelectorProps {
  toppings: Topping[];
  selectedToppings: string[];
  onToggleTopping: (toppingId: string) => void;
}

export const ToppingSelector: React.FC<ToppingSelectorProps> = ({
  toppings,
  selectedToppings,
  onToggleTopping,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Topping <Text style={styles.optional}>(Optional)</Text></Text>
      <View style={styles.toppingsList}>
        {toppings.map((topping) => {
          const isSelected = selectedToppings.includes(topping.id);
          
          return (
            <TouchableOpacity
              key={topping.id}
              style={styles.toppingItem}
              onPress={() => onToggleTopping(topping.id)}
              activeOpacity={0.7}
            >
              <View style={styles.toppingInfo}>
                <Text style={styles.toppingName}>{topping.name}</Text>
                <Text style={styles.toppingPrice}>+${topping.price.toFixed(2)}</Text>
              </View>
              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color="#FFF" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optional: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999',
  },
  toppingsList: {
    gap: 12,
  },
  toppingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  toppingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  toppingName: {
    fontSize: 14,
    color: '#333',
  },
  toppingPrice: {
    fontSize: 14,
    color: '#666',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4A2B29',
    borderColor: '#4A2B29',
  },
});