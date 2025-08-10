import React, { useEffect, useState } from 'react';
import { Stack, router, usePathname } from "expo-router";
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNavigation, TabName } from '@/src/components/BottomNavigation';
import { useStore } from '@/src/store';

export default function RootLayout() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const getCartItemCount = useStore((state) => state.getCartItemCount);
  const pathname = usePathname();

  // Update active tab based on current route
  useEffect(() => {
    if (pathname === '/' || pathname.startsWith('/details')) {
      setActiveTab('Home');
    } else if (pathname === '/cart') {
      setActiveTab('Cart');
    } else if (pathname === '/orders') {
      setActiveTab('Orders');
    } else if (pathname === '/profile') {
      setActiveTab('Profile');
    }
  }, [pathname]);

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
        router.push({ pathname: '/orders' as any });
        break;
      case 'Profile':
        router.push({ pathname: '/profile' as any });
        break;
    }
  };

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}