import { Order } from '@/src/types/order';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OrderCardProps {
  order: Order;
  onCancel?: (orderId: string) => void;
  onNavigate?: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
  onEReceipt?: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onCancel,
  onNavigate,
  onReorder,
  onEReceipt,
}) => {
  const isActive = order.status === 'active';
  const isCompleted = order.status === 'completed';
  const isCancelled = order.status === 'cancelled';

  const renderButtons = () => {
    if (isActive) {
      return (
        <>
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => onCancel?.(order.id)}
          >
            <Text style={styles.buttonOutlineText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonFilled}
            onPress={() => onNavigate?.(order.id)}
          >
            <Text style={styles.buttonFilledText}>Receipt</Text>
          </TouchableOpacity>
        </>
      );
    }

    if (isCompleted) {
      return (
        <>
          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => onReorder?.(order.id)}
          >
            <Text style={styles.buttonOutlineText}>Re-Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonFilled}
            onPress={() => onEReceipt?.(order.id)}
          >
            <Text style={styles.buttonFilledText}>Receipt</Text>
          </TouchableOpacity>
        </>
      );
    }

    if (isCancelled) {
      return (
        <TouchableOpacity
          style={[styles.buttonFilled, styles.buttonFullWidth]}
          onPress={() => onReorder?.(order.id)}
        >
          <Text style={styles.buttonFilledText}>Re-Order</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: order.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{order.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#999" />
            <Text style={styles.location}>{order.location}</Text>
          </View>
          <Text style={[
            styles.deliveryStatus,
            isCompleted && styles.deliveryStatusCompleted,
            isCancelled && styles.deliveryStatusCancelled,
          ]}>
            {isCompleted || isCancelled ? 'To Go' : order.deliveryStatus}
          </Text>
        </View>
        {order.rating && (
          <TouchableOpacity style={styles.starButton}>
            <Text style={styles.starText}>Star</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.buttonContainer}>{renderButtons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#999',
    marginLeft: 4,
  },
  deliveryStatus: {
    fontSize: 12,
    color: '#FF9800',
    fontStyle: 'italic',
  },
  deliveryStatusCompleted: {
    color: '#4CAF50',
  },
  deliveryStatusCancelled: {
    color: '#F44336',
  },
  starButton: {
    padding: 4,
  },
  starText: {
    fontSize: 12,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonFilled: {
    flex: 1,
    backgroundColor: '#4A2B29',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonFilledText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonFullWidth: {
    flex: 1,
  },
});