import { useCoffeeStore } from '@/src/store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { cart, updateCartItemQuantity, removeFromCart, getCartTotal, selectedStore, stores, setSelectedStore } = useCoffeeStore();
  const [orderType, setOrderType] = useState<'Sit In' | 'To Go'>('Sit In');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number; type: 'percentage' | 'fixed' } | null>(null);

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

  const validateVoucher = (code: string) => {
    // Sample voucher codes - in real app, this would validate against a backend
    const vouchers: { [key: string]: { discount: number; type: 'percentage' | 'fixed' } } = {
      'COFFEE10': { discount: 10, type: 'percentage' },
      'SAVE5': { discount: 5, type: 'fixed' },
      'WELCOME20': { discount: 20, type: 'percentage' },
      'FREESHIP': { discount: 3, type: 'fixed' },
      'SUMMER15': { discount: 15, type: 'percentage' },
    };

    const upperCode = code.toUpperCase().trim();
    if (vouchers[upperCode]) {
      return { code: upperCode, ...vouchers[upperCode] };
    }
    return null;
  };

  const handleApplyVoucher = () => {
    const voucher = validateVoucher(voucherCode);
    if (voucher) {
      setAppliedVoucher(voucher);
      setShowVoucherModal(false);
      Alert.alert('Success', `Voucher "${voucher.code}" applied successfully!`);
    } else {
      Alert.alert('Invalid Voucher', 'The voucher code you entered is not valid.');
    }
  };

  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;
    const subtotal = getCartTotal();
    
    if (appliedVoucher.type === 'percentage') {
      return (subtotal * appliedVoucher.discount) / 100;
    } else {
      return Math.min(appliedVoucher.discount, subtotal);
    }
  };

  const getFinalTotal = () => {
    return Math.max(0, getCartTotal() - calculateDiscount());
  };

  return (
    <SafeAreaView style={[styles.container]} edges={['left', 'right', 'top']}>
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
          onPress={() => setShowLocationPicker(true)}
        >
          <View style={styles.locationIcon}>
            <Ionicons name="business" size={20} color="#666" />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Take your order at</Text>
            <Text style={styles.locationName}>{selectedStore.name}</Text>
            <Text style={styles.locationAddress}>{selectedStore.address}</Text>
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
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => setShowVoucherModal(true)}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="pricetag-outline" size={20} color={appliedVoucher ? '#C4914D' : '#666'} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                {appliedVoucher ? `${appliedVoucher.code} Applied` : 'Voucher'}
              </Text>
              <Text style={styles.optionSubtitle}>
                {appliedVoucher 
                  ? `${appliedVoucher.discount}${appliedVoucher.type === 'percentage' ? '%' : '$'} discount`
                  : 'Tap to enter discount code'}
              </Text>
            </View>
            {appliedVoucher ? (
              <TouchableOpacity onPress={() => setAppliedVoucher(null)}>
                <Ionicons name="close-circle" size={20} color="#C4914D" />
              </TouchableOpacity>
            ) : (
              <Ionicons name="chevron-forward" size={20} color="#666" />
            )}
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => Alert.alert('Demo App', 'This is a test app - no payment will be processed.')}
          >
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
              <Text style={styles.paymentLabel}>Subtotal</Text>
              <Text style={styles.paymentValue}>${getCartTotal().toFixed(2)}</Text>
            </View>
            {appliedVoucher && (
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>
                  Discount ({appliedVoucher.code})
                </Text>
                <Text style={[styles.paymentValue, { color: '#C4914D' }]}>
                  -${calculateDiscount().toFixed(2)}
                </Text>
              </View>
            )}
            <View style={[styles.paymentRow, { borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 12, marginTop: 8 }]}>
              <Text style={[styles.paymentLabel, { fontWeight: '600' }]}>Total</Text>
              <Text style={[styles.paymentValue, { fontSize: 18 }]}>${getFinalTotal().toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Store Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLocationPicker}
        onRequestClose={() => setShowLocationPicker(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLocationPicker(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Store</Text>
              <TouchableOpacity onPress={() => setShowLocationPicker(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={stores}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.storeItem,
                    item.id === selectedStore.id && styles.selectedStoreItem
                  ]}
                  onPress={() => {
                    setSelectedStore(item);
                    setShowLocationPicker(false);
                  }}
                >
                  <Text style={styles.storeItemName}>{item.name}</Text>
                  <Text style={styles.storeItemAddress}>{item.address}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Voucher Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showVoucherModal}
        onRequestClose={() => setShowVoucherModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowVoucherModal(false)}
        >
          <TouchableOpacity 
            style={styles.voucherModalContent}
            activeOpacity={1}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enter Voucher Code</Text>
              <TouchableOpacity onPress={() => setShowVoucherModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.voucherInputContainer}>
              <TextInput
                style={styles.voucherInput}
                placeholder="Enter voucher code"
                value={voucherCode}
                onChangeText={setVoucherCode}
                autoCapitalize="characters"
                placeholderTextColor="#999"
              />
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={handleApplyVoucher}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.voucherHints}>
              <Text style={styles.hintTitle}>Available Vouchers (Demo):</Text>
              <Text style={styles.hintItem}>• COFFEE10 - 10% off</Text>
              <Text style={styles.hintItem}>• SAVE5 - $5 off</Text>
              <Text style={styles.hintItem}>• WELCOME20 - 20% off</Text>
              <Text style={styles.hintItem}>• SUMMER15 - 15% off</Text>
              <Text style={styles.hintItem}>• FREESHIP - $3 off</Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Bottom Payment Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalAmount}>${getFinalTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={() => Alert.alert('Demo App', 'This is a test app; no payment will be processed.')}
        >
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  storeItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedStoreItem: {
    backgroundColor: '#F5F5F5',
  },
  storeItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  storeItemAddress: {
    fontSize: 14,
    color: '#666',
  },
  voucherModalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  voucherInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  voucherInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#6B4423',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  voucherHints: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  hintTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  hintItem: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    paddingLeft: 10,
  },
});