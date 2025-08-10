import React, { useState } from 'react';
import { Stack, router } from "expo-router";
import { View } from 'react-native';
import { BottomNavigation, TabName } from '@/src/components/BottomNavigation';
import { useStore } from '@/src/store';

export default function RootLayout() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const getCartItemCount = useStore((state) => state.getCartItemCount);

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);
    
    // Navigate to the appropriate screen
    switch(tab) {
      case 'Home':
        router.push({ pathname: '/' as any });
        break;
      case 'Cart':
        router.push({ pathname: '/cart' as any });
        break;
      case 'Orders':
        // TODO: Navigate to Orders screen when implemented
        console.log('Navigate to Orders screen');
        break;
      case 'Profile':
        // TODO: Navigate to Profile screen when implemented
        console.log('Navigate to Profile screen');
        break;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <BottomNavigation 
        activeTab={activeTab} 
        onTabPress={handleTabPress}
        cartItemCount={getCartItemCount()}
      />
    </View>
  );
}