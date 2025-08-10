import { OrderCard } from '@/src/components/OrderCard';
import { OrderTabs } from '@/src/components/OrderTabs';
import { Order, OrderStatus } from '@/src/types/order';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const mockOrders: Order[] = [
  {
    id: '1',
    name: 'Café Bombón',
    location: 'Sanctuary Brew',
    status: 'active',
    deliveryStatus: 'Sit In',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
    rating: true,
  },
  {
    id: '2',
    name: 'Café Bombón',
    location: 'Sanctuary Brew',
    status: 'active',
    deliveryStatus: 'Sit In',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
    rating: true,
  },
  {
    id: '3',
    name: 'Café Bombón',
    location: 'Sanctuary Brew',
    status: 'active',
    deliveryStatus: 'Sit In',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
    rating: true,
  },
  {
    id: '4',
    name: 'Café Bombón',
    location: 'Sanctuary Brew',
    status: 'completed',
    deliveryStatus: 'To Go',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
    rating: true,
  },
  {
    id: '5',
    name: 'Café Bombón',
    location: 'Sanctuary Brew',
    status: 'completed',
    deliveryStatus: 'To Go',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
    rating: true,
  },
  {
    id: '6',
    name: 'Café Bombón',
    location: 'Sanctuary Brew',
    status: 'completed',
    deliveryStatus: 'To Go',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
    rating: true,
  },
  {
    id: '7',
    name: 'Café Bombón',
    location: 'Sanctuary Brew',
    status: 'cancelled',
    deliveryStatus: 'To Go',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
    rating: true,
  },
  {
    id: '8',
    name: 'Café Bombón',
    location: 'Sanctuary Brew',
    status: 'cancelled',
    deliveryStatus: 'To Go',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
    rating: true,
  },
  {
    id: '9',
    name: 'Café Bombón',
    location: 'Sanctuary Brew',
    status: 'cancelled',
    deliveryStatus: 'To Go',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
    rating: true,
  },
];

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<OrderStatus>('active');

  const filteredOrders = mockOrders.filter(order => order.status === activeTab);

  const handleCancel = (orderId: string) => {
    console.log('Cancel order:', orderId);
  };

  const handleNavigate = (orderId: string) => {
    console.log('Navigate to order:', orderId);
  };

  const handleReorder = (orderId: string) => {
    console.log('Reorder:', orderId);
  };

  const handleEReceipt = (orderId: string) => {
    console.log('View e-receipt:', orderId);
  };

  return (
    <SafeAreaView style={[styles.container]} edges={['left', 'right', 'top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ordersList}>
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onCancel={handleCancel}
              onNavigate={handleNavigate}
              onReorder={handleReorder}
              onEReceipt={handleEReceipt}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A2B29',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  ordersList: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});