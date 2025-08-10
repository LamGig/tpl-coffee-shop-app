import { useCoffeeStore } from '@/src/store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CartScreen() {
  const { cart, updateCartItemQuantity, removeFromCart, getCartTotal } = useCoffeeStore();
  const [orderType, setOrderType] = useState<'Sit In' | 'To Go'>('Sit In');
  const [storeLocation] = useState('Brew Sanctuary');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  const handleQuantityChange = (itemId: string, change: number) => {
    const item = cart.find(i => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateCartItemQuantity(itemId, newQuantity);
      } else if (newQuantity === 0) {
        removeFromCart(itemId);
      }
    }
  };

  const calculateItemTotal = (item: any) => {
    let total = item.coffee.price;
    
    // Add size price if applicable
    if (item.options.size && item.options.size !== 'Medium') {
      total += item.options.size === 'Large' ? 0.50 : 0;
    }
    
    // Add toppings price
    if (item.options.toppings && item.options.toppings.length > 0) {
      total += item.options.toppings.length * 0.50;
    }
    
    return total * item.quantity;
  };

  const formatOptions = (options: any) => {
    const parts = [];
    if (options.size && options.size !== 'Medium') {
      parts.push(`Size (${options.size})`);
    }
    if (options.toppings && options.toppings.length > 0) {
      parts.push(`${options.toppings.join(', ')}`);
    }
    return parts;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Type Selector */}
        <View style={styles.orderTypeContainer}>
          <TouchableOpacity
            style={[styles.orderTypeButton, orderType === 'Sit In' && styles.orderTypeActive]}
            onPress={() => setOrderType('Sit In')}
          >
            <View style={styles.orderTypeIcon}>
              <Ionicons name="restaurant" size={20} color={orderType === 'Sit In' ? '#fff' : '#666'} />
            </View>
            <Text style={[styles.orderTypeText, orderType === 'Sit In' && styles.orderTypeTextActive]}>
              Sit In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.orderTypeButton, orderType === 'To Go' && styles.orderTypeActive]}
            onPress={() => setOrderType('To Go')}
          >
            <View style={styles.orderTypeIcon}>
              <Ionicons name="bag-handle" size={20} color={orderType === 'To Go' ? '#fff' : '#666'} />
            </View>
            <Text style={[styles.orderTypeText, orderType === 'To Go' && styles.orderTypeTextActive]}>
              To Go
            </Text>
          </TouchableOpacity>
        </View>

        {/* Store Location */}
        <TouchableOpacity 
          style={styles.locationContainer}
          onPress={() => setShowLocationPicker(!showLocationPicker)}
        >
          <View style={styles.locationIcon}>
            <Ionicons name="business" size={20} color="#666" />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Take your order at</Text>
            <Text style={styles.locationName}>{storeLocation}</Text>
            <Text style={styles.locationAddress}>Jl. Cikuray No. 12, Tarogong Kaler</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>

        {/* Your Order Section */}
        <View style={styles.orderSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Order</Text>
            <TouchableOpacity onPress={() => router.push({ pathname: '/' as any })}>
              <Text style={styles.addMoreText}>Add more +</Text>
            </TouchableOpacity>
          </View>

          {cart.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={{ uri: item.coffee.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.coffee.name}</Text>
                <Text style={styles.itemDescription}>{item.coffee.description}</Text>
                
                <View style={styles.itemOptions}>
                  <Text style={styles.optionText}>Base Price</Text>
                  <Text style={styles.optionPrice}>${item.coffee.price.toFixed(2)}</Text>
                </View>
                
                {formatOptions(item.options).map((option, index) => (
                  <View key={index} style={styles.itemOptions}>
                    <Text style={styles.optionText}>{option}</Text>
                    <Text style={styles.optionPrice}>+ $0.50</Text>
                  </View>
                ))}
                
                <View style={styles.itemFooter}>
                  <Text style={styles.totalPrice}>
                    Total Price : ${calculateItemTotal(item).toFixed(2)}
                  </Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, -1)}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="remove" size={18} color="#666" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, 1)}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="add" size={18} color="#666" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.noteContainer}>
                  <Ionicons name="document-text-outline" size={16} color="#999" />
                  <TextInput
                    style={styles.noteInput}
                    placeholder="Order Note"
                    value={notes[item.id] || ''}
                    onChangeText={(text) => setNotes({ ...notes, [item.id]: text })}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Discount Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discount</Text>
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIcon}>
              <Ionicons name="pricetag-outline" size={20} color="#666" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Voucher</Text>
              <Text style={styles.optionSubtitle}>Click to select voucher</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIcon}>
              <Ionicons name="card-outline" size={20} color="#666" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Choose Payment</Text>
              <Text style={styles.optionSubtitle}>Choose your payment method</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.paymentDetails}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Grand Subtotal</Text>
              <Text style={styles.paymentValue}>${getCartTotal().toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Payment Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalAmount}>${getCartTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay Now</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  orderTypeContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  orderTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    gap: 8,
  },
  orderTypeActive: {
    backgroundColor: '#6B4423',
  },
  orderTypeIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  orderTypeTextActive: {
    color: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 20,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 12,
    color: '#666',
  },
  orderSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  addMoreText: {
    fontSize: 14,
    color: '#C4914D',
    fontWeight: '500',
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  itemOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#666',
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  totalPrice: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  quantityButton: {
    padding: 6,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  editButton: {
    marginLeft: 12,
    padding: 4,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  noteInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  paymentDetails: {
    marginTop: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bottomPadding: {
    height: 100,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 30,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B4423',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    gap: 8,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});