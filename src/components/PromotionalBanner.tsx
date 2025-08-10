import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { Promotion } from '@/src/types';

const { width: screenWidth } = Dimensions.get('window');

interface PromotionalBannerProps {
  promotions: Promotion[];
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ promotions }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (screenWidth - 40));
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {promotions.map((promotion) => (
          <View key={promotion.id} style={styles.bannerCard}>
            <View style={styles.bannerContent}>
              <Text style={styles.title}>{promotion.title}</Text>
              {promotion.discount && (
                <Text style={styles.discount}>{promotion.discount}</Text>
              )}
              <Text style={styles.subtitle}>{promotion.subtitle}</Text>
            </View>
            <Image 
              source={{ uri: promotion.image }} 
              style={styles.bannerImage}
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>
      
      {promotions.length > 1 && (
        <View style={styles.pagination}>
          {promotions.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  scrollContent: {
    paddingRight: 20,
  },
  bannerCard: {
    width: screenWidth - 40,
    height: 160,
    backgroundColor: '#F5E6D3',
    borderRadius: 16,
    padding: 20,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  discount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A2B29',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  bannerImage: {
    width: 120,
    height: 120,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#4A2B29',
    width: 20,
  },
});