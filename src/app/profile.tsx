import { useStore } from '@/src/store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const { user } = useStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert('Demo App', 'Logout feature coming soon!');
  };

  const menuItems = [
    {
      id: 'orders',
      title: 'Order History',
      subtitle: 'View your past orders',
      icon: 'receipt-outline',
      onPress: () => Alert.alert('Demo App', 'Order history feature coming soon!')
    },
    {
      id: 'favorites',
      title: 'Favorites',
      subtitle: 'Your favorite items',
      icon: 'heart-outline',
      onPress: () => Alert.alert('Demo App', 'Favorites management coming soon!')
    },
    {
      id: 'addresses',
      title: 'Delivery Addresses',
      subtitle: 'Manage your addresses',
      icon: 'location-outline',
      onPress: () => Alert.alert('Demo App', 'Address management coming soon!')
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      subtitle: 'Manage payment options',
      icon: 'card-outline',
      onPress: () => Alert.alert('Demo App', 'Payment methods coming soon!')
    },
    {
      id: 'rewards',
      title: 'Rewards & Points',
      subtitle: `You have ${user.points} points`,
      icon: 'gift-outline',
      onPress: () => Alert.alert('Demo App', 'Rewards program coming soon!')
    },
  ];

  const settingsItems = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      icon: 'notifications-outline',
      hasSwitch: true,
      value: notificationsEnabled,
      onValueChange: setNotificationsEnabled,
    },
    {
      id: 'location',
      title: 'Location Services',
      icon: 'location-outline',
      hasSwitch: true,
      value: locationEnabled,
      onValueChange: setLocationEnabled,
    },
    {
      id: 'biometrics',
      title: 'Biometric Login',
      icon: 'finger-print',
      hasSwitch: true,
      value: biometricsEnabled,
      onValueChange: setBiometricsEnabled,
    },
  ];

  const supportItems = [
    {
      id: 'help',
      title: 'Help Center',
      icon: 'help-circle-outline',
      onPress: () => Alert.alert('Demo App', 'Help center coming soon!')
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      icon: 'document-text-outline',
      onPress: () => Alert.alert('Demo App', 'Terms & conditions coming soon!')
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: 'shield-checkmark-outline',
      onPress: () => Alert.alert('Demo App', 'Privacy policy coming soon!')
    },
    {
      id: 'about',
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => Alert.alert('Demo App', 'Version 1.0.0\nBuilt with Expo & React Native')
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>user@example.com</Text>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsCardContent}>
            <View style={styles.pointsInfo}>
              <Text style={styles.pointsLabel}>Available Points</Text>
              <Text style={styles.pointsValue}>{user.points}</Text>
            </View>
            <View style={styles.pointsDivider} />
            <View style={styles.pointsInfo}>
              <Text style={styles.pointsLabel}>Member Since</Text>
              <Text style={styles.memberSince}>Jan 2024</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemIcon}>
                <Ionicons name={item.icon as any} size={22} color="#666" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemIcon}>
                <Ionicons name={item.icon as any} size={22} color="#666" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              {item.hasSwitch && (
                <Switch
                  value={item.value}
                  onValueChange={item.onValueChange}
                  trackColor={{ false: '#E0E0E0', true: '#C4914D' }}
                  thumbColor={item.value ? '#fff' : '#f4f3f4'}
                />
              )}
            </View>
          ))}
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {supportItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemIcon}>
                <Ionicons name={item.icon as any} size={22} color="#666" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6B4423',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  editProfileButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6B4423',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B4423',
  },
  pointsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'linear-gradient(135deg, #6B4423 0%, #C4914D 100%)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  pointsCardContent: {
    flexDirection: 'row',
    backgroundColor: '#6B4423',
    padding: 20,
  },
  pointsInfo: {
    flex: 1,
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  memberSince: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  pointsDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF4444',
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4444',
  },
  bottomPadding: {
    height: 20,
  },
});