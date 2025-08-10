import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  userName: string;
  points: number;
}

export const Header: React.FC<HeaderProps> = ({ userName, points }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.greeting}>Hi, {userName}</Text>
        <Text style={styles.points}>Point: {points}</Text>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  leftSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  points: {
    fontSize: 14,
    color: '#666',
  },
  notificationButton: {
    padding: 8,
  },
});