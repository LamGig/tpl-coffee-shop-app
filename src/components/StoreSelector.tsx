import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Store } from '@/src/types';

interface StoreSelectorProps {
  selectedStore: Store;
  stores: Store[];
  onSelectStore: (store: Store) => void;
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({ 
  selectedStore, 
  stores, 
  onSelectStore 
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectStore = (store: Store) => {
    onSelectStore(store);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.container} 
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.storeInfo}>
          <Text style={styles.label}>Choose the Store</Text>
          <View style={styles.storeDetails}>
            <Text style={styles.storeName}>{selectedStore.name}</Text>
            <Ionicons name="chevron-down" size={20} color="#333" />
          </View>
        </View>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Store</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
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
                  onPress={() => handleSelectStore(item)}
                >
                  <Text style={styles.storeItemName}>{item.name}</Text>
                  <Text style={styles.storeItemAddress}>{item.address}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  storeInfo: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  storeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginRight: 4,
    flex: 1,
  },
  orderButton: {
    backgroundColor: '#4A2B29',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  orderButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
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
});