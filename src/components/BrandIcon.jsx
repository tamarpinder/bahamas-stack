import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

// Brand Icon Component with fallback
const BrandIcon = ({ size = 64, style, showFallback = true }) => {
  // Try to load the actual brand icon, fallback to placeholder
  let iconSource;
  
  try {
    // Using your actual brand icon
    iconSource = require('../assets/icons/brand-icon.png');
  } catch (error) {
    // Fallback if image doesn't exist
    console.log('Brand icon not found, using fallback');
    iconSource = { uri: `https://via.placeholder.com/${size}x${size}/3B82F6/white?text=BS` };
  }

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image 
        source={iconSource} 
        style={[styles.icon, { width: size * 0.8, height: size * 0.8 }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
  },
  icon: {
    // Icon takes up 80% of container for better visibility
  },
});

export default BrandIcon;