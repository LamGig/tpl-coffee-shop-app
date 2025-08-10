import React from 'react';
import { 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryFilter as CategoryType } from '@/src/types';

interface CategoryFilterProps {
  categories: CategoryType[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  const getCategoryIcon = (category: CategoryType) => {
    switch (category) {
      case 'All':
        return 'grid-outline';
      case 'Smoothies':
        return 'ice-cream-outline';
      case 'Coffee Based':
        return 'cafe-outline';
      case 'Tea':
        return 'leaf-outline';
      default:
        return 'grid-outline';
    }
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isSelected = category === selectedCategory;
        return (
          <TouchableOpacity
            key={category}
            style={[styles.filterButton, isSelected && styles.filterButtonActive]}
            onPress={() => onSelectCategory(category)}
          >
            <Ionicons 
              name={getCategoryIcon(category) as any} 
              size={20} 
              color={isSelected ? '#FFF' : '#666'} 
            />
            <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#4A2B29',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFF',
  },
});