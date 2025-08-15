import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type TabName = 'Home' | 'Cart' | 'Feed' | 'Orders' | 'Profile';

interface BottomNavigationProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
  cartItemCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabPress,
  cartItemCount = 0
}) => {
  const tabs: { name: TabName; icon: string; activeIcon: string }[] = [
    { name: 'Home',   icon: 'home-outline',   activeIcon: 'home' },
    { name: 'Cart',   icon: 'cart-outline',   activeIcon: 'cart' },

    // NEW: Feed ở giữa Cart & Orders
    // (icon/activeIcon đặt giá trị tạm để thỏa type; phần render bên dưới custom riêng)
    { name: 'Feed',   icon: 'ellipse-outline', activeIcon: 'ellipse' },

    { name: 'Orders', icon: 'receipt-outline', activeIcon: 'receipt' },
    { name: 'Profile',icon: 'person-outline',  activeIcon: 'person' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;

        // NEW: render riêng cho Feed (icon tròn)
        if (tab.name === 'Feed') {
          return (
            <TouchableOpacity
              key="Feed"
              style={styles.tab}
              onPress={() => onTabPress('Feed')}
              activeOpacity={0.85}
            >
              <View style={styles.feedWrap}>
                <View
                  style={[
                    styles.feedCircle,
                    { backgroundColor: isActive ? '#6D4C41' : '#4E342E' },
                  ]}
                >
                  <Ionicons
                    name="cafe"
                    size={22}
                    color={isActive ? '#FFFFFF' : '#FFFFFFCC'}
                  />
                </View>
                <Text
                  style={[
                    styles.tabText,
                    { color: isActive ? '#4A2B29' : '#6B6B6B' },
                    isActive && styles.tabTextActive,
                  ]}
                >
                  Feed
                </Text>
              </View>
            </TouchableOpacity>
          );
        }

        // Giữ nguyên render cũ cho các tab còn lại
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabPress(tab.name)}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={(isActive ? tab.activeIcon : tab.icon) as any}
                size={24}
                color={isActive ? '#4A2B29' : '#999'}
              />
              {tab.name === 'Cart' && cartItemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItemCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 20,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#FF4B4B',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabText: {
    fontSize: 11,
    color: '#999',
  },
  tabTextActive: {
    color: '#4A2B29',
    fontWeight: '500',
  },

  // NEW: style cho Feed
  feedWrap: { alignItems: 'center' },
  feedCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    // đổ bóng nhẹ
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});
