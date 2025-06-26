import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaxiPage = ({ navigation, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchingProgress, setSearchingProgress] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  
  // Location data
  const [locationData, setLocationData] = useState({
    whereToQuery: '',
    fromLocation: '',
    toLocation: '',
    estimatedDistance: '0 km',
    estimatedTime: '0 min',
    estimatedFare: 0,
  });
  
  // Selected taxi type
  const [selectedTaxiType, setSelectedTaxiType] = useState(null);
  
  // Driver data (assigned after booking)
  const [assignedDriver, setAssignedDriver] = useState(null);

  // Popular destinations in Nassau/Bahamas
  const popularDestinations = [
    'Atlantis Paradise Island',
    'Downtown Nassau',
    'Cable Beach',
    'Lynden Pindling Airport',
    'Straw Market',
    'Fort Fincastle',
    'Paradise Island Bridge',
    'Baha Mar Resort',
    'Fish Fry Arawak Cay',
    'Queen\'s Staircase',
    'Junkanoo Beach',
    'Royal Caribbean Dock',
  ];

  // Mock driver data
  const mockDrivers = [
    {
      id: 1,
      name: 'Marcus',
      photo: '👨🏾',
      rating: 4.8,
      vehicleType: 'Regular Taxi',
      licensePlate: 'TX-4521',
      carModel: 'Toyota Corolla',
      carColor: 'White',
      phone: '(242) 555-0123',
      eta: 5,
    },
    {
      id: 2,
      name: 'Patricia',
      photo: '👩🏽',
      rating: 4.9,
      vehicleType: 'XL Taxi',
      licensePlate: 'TX-7890',
      carModel: 'Honda Pilot',
      carColor: 'Black',
      phone: '(242) 555-0456',
      eta: 3,
    },
    {
      id: 3,
      name: 'David',
      photo: '👨🏿',
      rating: 4.7,
      vehicleType: 'Regular Taxi',
      licensePlate: 'TX-2468',
      carModel: 'Nissan Sentra',
      carColor: 'Blue',
      phone: '(242) 555-0789',
      eta: 7,
    },
  ];

  // Taxi types
  const taxiTypes = [
    {
      id: 'regular',
      name: 'Regular Taxi',
      description: 'Standard sedan, up to 4 passengers',
      icon: '🚗',
      baseFare: 8,
      perKmRate: 2.5,
      capacity: '1-4 people',
      features: ['AC', 'Standard Vehicle', 'Licensed Driver'],
    },
    {
      id: 'xl',
      name: 'XL Taxi',
      description: 'Larger vehicle, up to 6-7 passengers',
      icon: '🚐',
      baseFare: 12,
      perKmRate: 3.5,
      capacity: '1-7 people',
      features: ['AC', 'More Space', 'Perfect for Groups', 'Licensed Driver'],
    },
  ];

  // Calculate estimated fare
  const calculateFare = (distance, taxiType) => {
    const distanceNum = parseFloat(distance) || 5; // Default 5km if no distance
    const type = taxiTypes.find(t => t.id === taxiType);
    if (!type) return 0;
    return Math.round(type.baseFare + (distanceNum * type.perKmRate));
  };

  // Handle location search
  const handleWhereToSubmit = () => {
    if (!locationData.whereToQuery.trim()) {
      Alert.alert('Error', 'Please enter a destination');
      return;
    }
    
    // Auto-populate from/to based on query
    setLocationData(prev => ({
      ...prev,
      fromLocation: 'Current Location',
      toLocation: prev.whereToQuery,
      estimatedDistance: `${Math.round(Math.random() * 15 + 2)} km`,
      estimatedTime: `${Math.round(Math.random() * 25 + 5)} min`,
    }));
    
    setCurrentStep(2);
  };

  // Handle location confirmation
  const handleLocationConfirm = () => {
    if (!locationData.fromLocation || !locationData.toLocation) {
      Alert.alert('Error', 'Please set both pickup and destination locations');
      return;
    }
    setCurrentStep(3);
  };

  // Handle taxi type selection
  const handleTaxiTypeSelect = (taxiType) => {
    const fare = calculateFare(locationData.estimatedDistance, taxiType.id);
    setSelectedTaxiType(taxiType);
    setLocationData(prev => ({ ...prev, estimatedFare: fare }));
  };

  // Handle booking confirmation
  const handleBookTaxi = () => {
    if (!selectedTaxiType) {
      Alert.alert('Error', 'Please select a taxi type');
      return;
    }
    
    setCurrentStep(4);
    setIsSearching(true);
    
    // Simulate searching progress
    const searchInterval = setInterval(() => {
      setSearchingProgress(prev => {
        if (prev >= 100) {
          clearInterval(searchInterval);
          setIsSearching(false);
          
          // Assign a random driver
          const availableDrivers = mockDrivers.filter(d => 
            d.vehicleType.toLowerCase().includes(selectedTaxiType.id) ||
            selectedTaxiType.id === 'regular'
          );
          const randomDriver = availableDrivers[Math.floor(Math.random() * availableDrivers.length)];
          setAssignedDriver(randomDriver);
          
          setCurrentStep(5);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Step 1: Where To Search
  const renderWhereToStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Where would you like to go?</Text>
      <Text style={styles.demoNotice}>
        🚕 DEMO MODE: No real taxi will be booked
      </Text>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where to?"
            value={locationData.whereToQuery}
            onChangeText={(text) => setLocationData(prev => ({ ...prev, whereToQuery: text }))}
            onSubmitEditing={handleWhereToSubmit}
          />
        </View>
        
        <TouchableOpacity style={styles.searchButton} onPress={handleWhereToSubmit}>
          <Text style={styles.searchButtonText}>Set Destination</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.popularDestinations}>
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        {popularDestinations.map((destination, index) => (
          <TouchableOpacity
            key={index}
            style={styles.destinationItem}
            onPress={() => {
              setLocationData(prev => ({ ...prev, whereToQuery: destination }));
              handleWhereToSubmit();
            }}
          >
            <Ionicons name="location" size={16} color="#6b7280" />
            <Text style={styles.destinationText}>{destination}</Text>
            <Ionicons name="chevron-forward" size={16} color="#6b7280" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Step 2: From/To Location Confirmation
  const renderLocationConfirmStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Confirm Your Trip</Text>
      
      <View style={styles.locationCard}>
        <View style={styles.locationRow}>
          <View style={styles.locationDot} style={[styles.locationDot, { backgroundColor: '#059669' }]} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>From</Text>
            <TouchableOpacity style={styles.locationInput}>
              <Text style={styles.locationText}>{locationData.fromLocation}</Text>
              <Ionicons name="chevron-down" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.locationLine} />

        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: '#dc2626' }]} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>To</Text>
            <TouchableOpacity style={styles.locationInput}>
              <Text style={styles.locationText}>{locationData.toLocation}</Text>
              <Ionicons name="chevron-down" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.tripEstimates}>
        <View style={styles.estimateRow}>
          <Ionicons name="car" size={20} color="#6b7280" />
          <Text style={styles.estimateText}>Distance: {locationData.estimatedDistance}</Text>
        </View>
        <View style={styles.estimateRow}>
          <Ionicons name="time" size={20} color="#6b7280" />
          <Text style={styles.estimateText}>Estimated time: {locationData.estimatedTime}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleLocationConfirm}>
        <Text style={styles.primaryButtonText}>Confirm Locations</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => setCurrentStep(1)}
      >
        <Text style={styles.secondaryButtonText}>← Change Destination</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 3: Taxi Type Selection
  const renderTaxiTypeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Choose Your Ride</Text>
      <Text style={styles.subtitle}>{locationData.fromLocation} → {locationData.toLocation}</Text>
      
      <View style={styles.taxiTypes}>
        {taxiTypes.map((taxiType) => {
          const fare = calculateFare(locationData.estimatedDistance, taxiType.id);
          const isSelected = selectedTaxiType?.id === taxiType.id;
          
          return (
            <TouchableOpacity
              key={taxiType.id}
              style={[styles.taxiTypeCard, isSelected && styles.taxiTypeCardSelected]}
              onPress={() => handleTaxiTypeSelect(taxiType)}
            >
              <View style={styles.taxiTypeHeader}>
                <Text style={styles.taxiTypeIcon}>{taxiType.icon}</Text>
                <View style={styles.taxiTypeInfo}>
                  <Text style={styles.taxiTypeName}>{taxiType.name}</Text>
                  <Text style={styles.taxiTypeDescription}>{taxiType.description}</Text>
                  <Text style={styles.taxiTypeCapacity}>{taxiType.capacity}</Text>
                </View>
                <View style={styles.taxiTypePrice}>
                  <Text style={styles.priceText}>${fare}</Text>
                  <Text style={styles.priceLabel}>estimated</Text>
                </View>
              </View>
              
              <View style={styles.taxiTypeFeatures}>
                {taxiType.features.map((feature, index) => (
                  <Text key={index} style={styles.featureTag}>{feature}</Text>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity 
        style={[styles.primaryButton, !selectedTaxiType && styles.disabledButton]} 
        onPress={handleBookTaxi}
        disabled={!selectedTaxiType}
      >
        <Text style={styles.primaryButtonText}>
          Book {selectedTaxiType?.name || 'Taxi'} - ${locationData.estimatedFare}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => setCurrentStep(2)}
      >
        <Text style={styles.secondaryButtonText}>← Back to Locations</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 4: Searching for Driver
  const renderSearchingStep = () => (
    <View style={styles.searchingContainer}>
      <ActivityIndicator size="large" color="#F59E0B" />
      <Text style={styles.searchingTitle}>Finding Your Driver...</Text>
      <Text style={styles.searchingSubtitle}>Looking for nearby {selectedTaxiType?.name.toLowerCase()}s</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${searchingProgress}%` }]} />
        </View>
        <Text style={styles.progressText}>{searchingProgress}%</Text>
      </View>

      <View style={styles.searchingInfo}>
        <Text style={styles.searchingInfoText}>📍 Searching in {locationData.fromLocation}</Text>
        <Text style={styles.searchingInfoText}>🚕 Looking for {selectedTaxiType?.name}</Text>
        <Text style={styles.searchingInfoText}>💰 Estimated fare: ${locationData.estimatedFare}</Text>
      </View>
    </View>
  );

  // Step 5: Driver Found
  const renderDriverFoundStep = () => (
    <ScrollView style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Driver Found! 🎉</Text>
      <Text style={styles.successMessage}>
        Your taxi has been booked and is on the way to pick you up.
      </Text>

      {assignedDriver && (
        <View style={styles.driverCard}>
          <View style={styles.driverHeader}>
            <Text style={styles.driverPhoto}>{assignedDriver.photo}</Text>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{assignedDriver.name}</Text>
              <Text style={styles.driverRating}>⭐ {assignedDriver.rating} rating</Text>
              <Text style={styles.driverETA}>ETA: {assignedDriver.eta} minutes</Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleTitle}>Vehicle Details</Text>
            <View style={styles.vehicleRow}>
              <Text style={styles.vehicleLabel}>Car:</Text>
              <Text style={styles.vehicleValue}>{assignedDriver.carColor} {assignedDriver.carModel}</Text>
            </View>
            <View style={styles.vehicleRow}>
              <Text style={styles.vehicleLabel}>License Plate:</Text>
              <Text style={styles.vehicleValue}>{assignedDriver.licensePlate}</Text>
            </View>
            <View style={styles.vehicleRow}>
              <Text style={styles.vehicleLabel}>Type:</Text>
              <Text style={styles.vehicleValue}>{assignedDriver.vehicleType}</Text>
            </View>
          </View>

          <View style={styles.tripSummary}>
            <Text style={styles.tripTitle}>Trip Summary</Text>
            <View style={styles.tripRow}>
              <Text style={styles.tripLabel}>From:</Text>
              <Text style={styles.tripValue}>{locationData.fromLocation}</Text>
            </View>
            <View style={styles.tripRow}>
              <Text style={styles.tripLabel}>To:</Text>
              <Text style={styles.tripValue}>{locationData.toLocation}</Text>
            </View>
            <View style={styles.tripRow}>
              <Text style={styles.tripLabel}>Distance:</Text>
              <Text style={styles.tripValue}>{locationData.estimatedDistance}</Text>
            </View>
            <View style={styles.tripRow}>
              <Text style={styles.tripLabel}>Fare:</Text>
              <Text style={[styles.tripValue, styles.fareValue]}>${locationData.estimatedFare}</Text>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={() => {
          Alert.alert(
            'Trip Completed!',
            'Thank you for using our taxi service. Have a great day!',
            [{ text: 'OK', onPress: () => setCurrentStep(1) }]
          );
        }}
      >
        <Text style={styles.primaryButtonText}>Complete Trip</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => setCurrentStep(1)}
      >
        <Text style={styles.secondaryButtonText}>Book Another Taxi</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onBack}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Taxi Service</Text>
            <Text style={styles.headerSubtitle}>Reliable transportation across The Bahamas</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.progressIndicator}>
          {[1, 2, 3, 4, 5].map((step) => (
            <View
              key={step}
              style={[
                styles.progressStep,
                currentStep >= step && styles.progressStepActive
              ]}
            >
              <Text style={[
                styles.progressStepText,
                currentStep >= step && styles.progressStepTextActive
              ]}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        {currentStep === 1 && renderWhereToStep()}
        {currentStep === 2 && renderLocationConfirmStep()}
        {currentStep === 3 && renderTaxiTypeStep()}
        {currentStep === 4 && renderSearchingStep()}
        {currentStep === 5 && renderDriverFoundStep()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#F59E0B',
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fef3c7',
    textAlign: 'center',
  },
  progressIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  progressStep: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  progressStepActive: {
    backgroundColor: '#F59E0B',
  },
  progressStepText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  progressStepTextActive: {
    color: 'white',
  },
  stepContainer: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  demoNotice: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginBottom: 30,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#1f2937',
  },
  searchButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularDestinations: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  destinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  destinationText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    marginLeft: 10,
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 5,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: '#d1d5db',
    marginLeft: 5,
    marginVertical: 10,
  },
  tripEstimates: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  estimateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  estimateText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 10,
  },
  taxiTypes: {
    marginBottom: 20,
  },
  taxiTypeCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taxiTypeCardSelected: {
    borderColor: '#F59E0B',
    backgroundColor: '#fffbeb',
  },
  taxiTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  taxiTypeIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  taxiTypeInfo: {
    flex: 1,
  },
  taxiTypeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  taxiTypeDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  taxiTypeCapacity: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  taxiTypePrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  taxiTypeFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: '#6b7280',
  },
  primaryButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  secondaryButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  searchingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  searchingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 20,
    marginBottom: 8,
  },
  searchingSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
  },
  searchingInfo: {
    alignItems: 'center',
  },
  searchingInfoText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  successMessage: {
    backgroundColor: '#f0fdf4',
    color: '#059669',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  driverCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  driverPhoto: {
    fontSize: 48,
    marginRight: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  driverRating: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  driverETA: {
    fontSize: 14,
    color: '#F59E0B',
    marginTop: 2,
    fontWeight: '600',
  },
  callButton: {
    backgroundColor: '#059669',
    padding: 12,
    borderRadius: 25,
  },
  vehicleInfo: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  vehicleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  vehicleLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  vehicleValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  tripSummary: {
    marginBottom: 20,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  tripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tripLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  tripValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  fareValue: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: 'bold',
  },
});

export default TaxiPage;