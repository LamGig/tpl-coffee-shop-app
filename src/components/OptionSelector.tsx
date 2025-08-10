import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Option {
  id: string;
  name: string;
  price?: number;
  available?: boolean;
}

interface OptionSelectorProps {
  title: string;
  options: Option[];
  selectedOption: string;
  onSelect: (optionId: string) => void;
  showPrice?: boolean;
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({
  title,
  options,
  selectedOption,
  onSelect,
  showPrice = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.optionsRow}>
        {options.map((option) => {
          const isSelected = option.id === selectedOption;
          const isDisabled = option.available === false;
          
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                isSelected && styles.selectedOption,
                isDisabled && styles.disabledOption,
              ]}
              onPress={() => !isDisabled && onSelect(option.id)}
              disabled={isDisabled}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText,
                  isDisabled && styles.disabledOptionText,
                ]}
              >
                {option.name}
              </Text>
              {showPrice && option.price !== undefined && (
                <Text
                  style={[
                    styles.priceText,
                    isSelected && styles.selectedPriceText,
                    isDisabled && styles.disabledOptionText,
                  ]}
                >
                  ${option.price.toFixed(2)}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#4A2B29',
    borderColor: '#4A2B29',
  },
  disabledOption: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedOptionText: {
    color: '#FFF',
  },
  disabledOptionText: {
    color: '#BDBDBD',
  },
  priceText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  selectedPriceText: {
    color: '#FFF',
  },
});