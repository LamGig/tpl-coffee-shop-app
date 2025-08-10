import { CategoryFilter as CategoryType } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

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
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const getCategoryIcon = (category: CategoryType) => {
    switch (category) {
      case 'All':
        return 'grid-outline';
      case 'Smoothies':
        return 'ice-cream-outline';
      case 'Coffee':
        return 'cafe-outline';
      case 'Tea':
        return 'leaf-outline';
      case 'Cake':
        return 'restaurant-outline';
      default:
        return 'grid-outline';
    }
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollPosition = contentOffset.x;
    const maxScroll = contentSize.width - layoutMeasurement.width;
    
    setShowLeftGradient(scrollPosition > 10);
    setShowRightGradient(scrollPosition < maxScroll - 10);
  };

  return (
    <View style={styles.wrapper}>
      {showLeftGradient && (
        <View style={[styles.gradient, styles.leftGradient]} pointerEvents="none" />
      )}
      {showRightGradient && (
        <View style={[styles.gradient, styles.rightGradient]} pointerEvents="none">
          <Text style={styles.scrollHint}>→</Text>
        </View>
      )}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 15,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 30,
    zIndex: 1,
    pointerEvents: 'none',
  },
  leftGradient: {
    left: 0,
    backgroundColor: 'rgba(250,250,250,0.95)',
  },
  rightGradient: {
    right: 0,
    backgroundColor: 'rgba(250,250,250,0.95)',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  scrollHint: {
    fontSize: 18,
    color: '#999',
    fontWeight: 'bold',
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