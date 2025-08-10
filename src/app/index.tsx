import { CategoryFilter } from '@/src/components/CategoryFilter';
import { CoffeeCard } from '@/src/components/CoffeeCard';
import { Header } from '@/src/components/Header';
import { PromotionalBanner } from '@/src/components/PromotionalBanner';
import { StoreSelector } from '@/src/components/StoreSelector';
import { useStore } from '@/src/store';
import { CategoryFilter as CategoryType, Coffee, Promotion } from '@/src/types';
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const mockCoffees: Coffee[] = [
  {
    id: '1',
    name: 'Ice Caffe Latte',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
  },
  {
    id: '2',
    name: 'Espresso',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
  },
  {
    id: '3',
    name: 'Cold Brew',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400',
  },
  {
    id: '4',
    name: 'Cappuccino',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
  },
  {
    id: '5',
    name: 'Mango Smoothie',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400',
  },
  {
    id: '6',
    name: 'Green Tea Latte',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1749280447307-31a68eb38673?w=400',
  },
  {
    id: '7',
    name: 'Chocolate Cake',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
  },
  {
    id: '8',
    name: 'Cheesecake',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1635327173758-85badf17f995?w=400',
  },
  {
    id: '9',
    name: 'Red Velvet Cake',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400',
  },
];

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Discover Your Perfect Brew!',
    discount: '30% OFF',
    subtitle: 'Limited Offer!',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
  },
  {
    id: '2',
    title: 'Morning Special',
    discount: 'Buy 1 Get 1',
    subtitle: 'Before 10 AM',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
  },
];

const categories: CategoryType[] = ['All', 'Smoothies', 'Coffee', 'Tea', 'Cake'];

export default function HomeScreen() {
  const { 
    user, 
    selectedStore, 
    stores, 
    setSelectedStore, 
    addToCart,
    toggleFavorite,
    favorites
  } = useStore();
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Coffee');

  const filteredCoffees = useMemo(() => {
    if (selectedCategory === 'All') return mockCoffees;
    
    return mockCoffees.filter(coffee => {
      if (selectedCategory === 'Coffee') {
        return ['Ice Caffe Latte', 'Espresso', 'Cold Brew', 'Cappuccino'].includes(coffee.name);
      }
      if (selectedCategory === 'Smoothies') {
        return coffee.name.includes('Smoothie');
      }
      if (selectedCategory === 'Tea') {
        return coffee.name.includes('Tea');
      }
      if (selectedCategory === 'Cake') {
        return coffee.name.includes('Cake') || coffee.name.includes('Cheesecake');
      }
      return false;
    });
  }, [selectedCategory]);

  const coffeesWithFavorites = filteredCoffees.map(coffee => ({
    ...coffee,
    isFavorite: favorites.includes(coffee.id),
  }));

  const handleCoffeePress = (coffee: Coffee) => {
    console.log('Navigate to coffee detail:', coffee);
  };

  const handleSeeAllCoffee = () => {
    console.log('Navigate to full menu');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View style={styles.stickyHeader}>
          <Header userName={user.name} points={user.points} />
        </View>
        
        <StoreSelector
          selectedStore={selectedStore}
          stores={stores}
          onSelectStore={setSelectedStore}
        />
        
        <PromotionalBanner promotions={promotions} />
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Coffee For Today</Text>
          <TouchableOpacity onPress={handleSeeAllCoffee}>
            <Text style={styles.seeAll}>See All Coffee →</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.coffeeGrid}>
          {coffeesWithFavorites.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              onPress={handleCoffeePress}
            />
          ))}
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  stickyHeader: {
    backgroundColor: '#FFF',
    zIndex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#4A2B29',
    fontWeight: '500',
  },
  coffeeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  bottomPadding: {
    height: 20,
  },
});