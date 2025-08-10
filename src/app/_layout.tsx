import React, { useState } from 'react';
import { Stack } from "expo-router";
import { View } from 'react-native';
import { BottomNavigation, TabName } from '@/src/components/BottomNavigation';
import { useStore } from '@/src/store';

export default function RootLayout() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const getCartItemCount = useStore((state) => state.getCartItemCount);

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);
    console.log(`Navigate to ${tab} screen`);
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