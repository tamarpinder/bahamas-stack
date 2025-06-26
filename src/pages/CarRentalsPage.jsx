import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const CarRentalsPage = ({ navigation, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showPickupTimePicker, setShowPickupTimePicker] = useState(false);
  const [showDropoffDatePicker, setShowDropoffDatePicker] = useState(false);
  const [showDropoffTimePicker, setShowDropoffTimePicker] = useState(false);
  const [showIslandDropdown, setShowIslandDropdown] = useState(false);
  
  // Search form data
  const [searchData, setSearchData] = useState({
    island: '',
    pickupDate: new Date(),
    pickupTime: new Date(),
    dropoffDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    dropoffTime: new Date(),
  });
  
  // Selected vendor and vehicle data
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    licenseNumber: '',
    paymentMethod: 'RBC Account',
  });

  // Bahamas islands
  const bahamasIslands = [
    'Nassau', 'Freeport', 'Exuma', 'Eleuthera', 'Andros', 
    'Cat Island', 'Long Island', 'Abaco', 'Bimini', 'Inagua'
  ];

  // Mock vendor data
  const mockVendors = [
    {
      id: 1,
      name: 'Island Wheels',
      logo: '🚗',
      rating: 4.8,
      carsAvailable: true,
      avgCostPerDay: 45,
      totalCars: 12,
      description: 'Family-owned business since 2015',
    },
    {
      id: 2,
      name: 'Paradise Auto',
      logo: '🚙',
      rating: 4.6,
      carsAvailable: true,
      avgCostPerDay: 55,
      totalCars: 8,
      description: 'Premium vehicles and excellent service',
    },
    {
      id: 3,
      name: 'Bahama Rides',
      logo: '🚐',
      rating: 4.4,
      carsAvailable: false,
      avgCostPerDay: 38,
      totalCars: 6,
      description: 'Budget-friendly local car rental',
    },
    {
      id: 4,
      name: 'Tropic Motors',
      logo: '🏎️',
      rating: 4.9,
      carsAvailable: true,
      avgCostPerDay: 65,
      totalCars: 15,
      description: 'Luxury and sports car specialists',
    },
    {
      id: 5,
      name: 'Coral Coast Rentals',
      logo: '🚕',
      rating: 4.3,
      carsAvailable: true,
      avgCostPerDay: 42,
      totalCars: 9,
      description: 'Reliable transportation solutions',
    },
  ];

  // Mock vehicle categories and cars
  const vehicleCategories = {
    compact: [
      {
        id: 1,
        name: 'Nissan Versa',
        capacity: 5,
        rating: 4.2,
        costPerDay: 35,
        features: ['AC', 'Bluetooth', 'Fuel Efficient'],
        image: '🚗',
      },
      {
        id: 2,
        name: 'Toyota Yaris',
        capacity: 5,
        rating: 4.4,
        costPerDay: 38,
        features: ['AC', 'USB Ports', 'Backup Camera'],
        image: '🚗',
      },
      {
        id: 3,
        name: 'Honda Fit',
        capacity: 5,
        rating: 4.3,
        costPerDay: 40,
        features: ['AC', 'Keyless Entry', 'Good Mileage'],
        image: '🚗',
      },
    ],
    suv: [
      {
        id: 4,
        name: 'Toyota RAV4',
        capacity: 7,
        rating: 4.6,
        costPerDay: 65,
        features: ['4WD', 'AC', 'Spacious', 'Bluetooth'],
        image: '🚙',
      },
      {
        id: 5,
        name: 'Nissan Pathfinder',
        capacity: 8,
        rating: 4.5,
        costPerDay: 70,
        features: ['4WD', 'AC', 'Navigation', 'Premium Sound'],
        image: '🚙',
      },
      {
        id: 6,
        name: 'Ford Explorer',
        capacity: 7,
        rating: 4.4,
        costPerDay: 68,
        features: ['4WD', 'AC', 'Leather Seats', 'Sunroof'],
        image: '🚙',
      },
    ],
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const validateSearchForm = () => {
    if (!searchData.island.trim()) {
      Alert.alert('Error', 'Please select an island');
      return false;
    }
    if (searchData.pickupDate >= searchData.dropoffDate) {
      Alert.alert('Error', 'Drop-off date must be after pickup date');
      return false;
    }
    return true;
  };

  const handleSearchVendors = () => {
    if (validateSearchForm()) {
      setCurrentStep(2);
    }
  };

  const handleSelectVendor = (vendor) => {
    if (!vendor.carsAvailable) {
      Alert.alert('Sorry', 'This vendor has no cars available for your selected dates');
      return;
    }
    setSelectedVendor(vendor);
    setCurrentStep(3);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentStep(4);
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentStep(5);
  };

  const calculateTotalDays = () => {
    const diffTime = Math.abs(searchData.dropoffDate - searchData.pickupDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalCost = () => {
    if (!selectedVehicle) return 0;
    return selectedVehicle.costPerDay * calculateTotalDays();
  };

  // Step 1: Search Form
  const renderSearchStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Find Car Rentals</Text>
      <Text style={styles.demoNotice}>
        🚗 DEMO MODE: No real bookings will be made
      </Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Select Island</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowIslandDropdown(!showIslandDropdown)}
        >
          <Text style={[styles.dropdownText, !searchData.island && styles.placeholderText]}>
            {searchData.island || 'Choose your destination island'}
          </Text>
          <Text style={styles.dropdownArrow}>{showIslandDropdown ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {showIslandDropdown && (
          <View style={styles.dropdown}>
            {bahamasIslands.map((island, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setSearchData(prev => ({ ...prev, island }));
                  setShowIslandDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{island}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.dateTimeRow}>
        <View style={styles.dateTimeColumn}>
          <Text style={styles.label}>Pickup Date</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowPickupDatePicker(true)}
          >
            <Text style={styles.dateTimeText}>
              {searchData.pickupDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.dateTimeColumn}>
          <Text style={styles.label}>Pickup Time</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowPickupTimePicker(true)}
          >
            <Text style={styles.dateTimeText}>
              {formatTime(searchData.pickupTime)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dateTimeRow}>
        <View style={styles.dateTimeColumn}>
          <Text style={styles.label}>Drop-off Date</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDropoffDatePicker(true)}
          >
            <Text style={styles.dateTimeText}>
              {searchData.dropoffDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.dateTimeColumn}>
          <Text style={styles.label}>Drop-off Time</Text>
          <TouchableOpacity
            style={styles.dateTimeButton}
            onPress={() => setShowDropoffTimePicker(true)}
          >
            <Text style={styles.dateTimeText}>
              {formatTime(searchData.dropoffTime)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSearchVendors}>
        <Text style={styles.primaryButtonText}>Search Car Rentals 🚗</Text>
      </TouchableOpacity>

      {/* Date/Time Pickers */}
      {showPickupDatePicker && (
        <DateTimePicker
          value={searchData.pickupDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPickupDatePicker(false);
            if (selectedDate) {
              setSearchData(prev => ({ ...prev, pickupDate: selectedDate }));
            }
          }}
          minimumDate={new Date()}
        />
      )}

      {showPickupTimePicker && (
        <DateTimePicker
          value={searchData.pickupTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowPickupTimePicker(false);
            if (selectedTime) {
              setSearchData(prev => ({ ...prev, pickupTime: selectedTime }));
            }
          }}
        />
      )}

      {showDropoffDatePicker && (
        <DateTimePicker
          value={searchData.dropoffDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDropoffDatePicker(false);
            if (selectedDate) {
              setSearchData(prev => ({ ...prev, dropoffDate: selectedDate }));
            }
          }}
          minimumDate={searchData.pickupDate}
        />
      )}

      {showDropoffTimePicker && (
        <DateTimePicker
          value={searchData.dropoffTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowDropoffTimePicker(false);
            if (selectedTime) {
              setSearchData(prev => ({ ...prev, dropoffTime: selectedTime }));
            }
          }}
        />
      )}
    </View>
  );

  // Step 2: Vendor Selection
  const renderVendorSelectionStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Available Vendors in {searchData.island}</Text>
      <Text style={styles.subtitle}>
        {formatDate(searchData.pickupDate)} - {formatDate(searchData.dropoffDate)}
      </Text>
      
      <ScrollView style={styles.vendorsList}>
        {mockVendors.map((vendor) => (
          <TouchableOpacity
            key={vendor.id}
            style={[
              styles.vendorCard,
              !vendor.carsAvailable && styles.vendorCardDisabled
            ]}
            onPress={() => handleSelectVendor(vendor)}
          >
            <View style={styles.vendorHeader}>
              <Text style={styles.vendorLogo}>{vendor.logo}</Text>
              <View style={styles.vendorInfo}>
                <Text style={styles.vendorName}>{vendor.name}</Text>
                <Text style={styles.vendorDescription}>{vendor.description}</Text>
              </View>
              <View style={styles.vendorPrice}>
                <Text style={styles.priceText}>${vendor.avgCostPerDay}</Text>
                <Text style={styles.priceLabel}>avg/day</Text>
              </View>
            </View>
            
            <View style={styles.vendorDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Rating:</Text>
                <Text style={styles.detailValue}>⭐ {vendor.rating}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Cars Available:</Text>
                <Text style={[
                  styles.detailValue, 
                  vendor.carsAvailable ? styles.available : styles.unavailable
                ]}>
                  {vendor.carsAvailable ? `Yes (${vendor.totalCars} cars)` : 'No cars available'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => setCurrentStep(1)}
      >
        <Text style={styles.secondaryButtonText}>← Back to Search</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 3: Category Selection
  const renderCategorySelectionStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Choose Vehicle Category</Text>
      <Text style={styles.subtitle}>Available from {selectedVendor?.name}</Text>
      
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => handleSelectCategory('compact')}
        >
          <Text style={styles.categoryIcon}>🚗</Text>
          <Text style={styles.categoryTitle}>Compact Cars</Text>
          <Text style={styles.categoryDescription}>
            Fuel efficient, perfect for city driving
          </Text>
          <Text style={styles.categoryPrice}>From $35/day</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => handleSelectCategory('suv')}
        >
          <Text style={styles.categoryIcon}>🚙</Text>
          <Text style={styles.categoryTitle}>SUVs</Text>
          <Text style={styles.categoryDescription}>
            Spacious, great for families and groups
          </Text>
          <Text style={styles.categoryPrice}>From $65/day</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => setCurrentStep(2)}
      >
        <Text style={styles.secondaryButtonText}>← Back to Vendors</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 4: Vehicle Selection
  const renderVehicleSelectionStep = () => {
    const vehicles = vehicleCategories[selectedCategory] || [];
    const categoryTitle = selectedCategory === 'compact' ? 'Compact Cars' : 'SUVs';

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>{categoryTitle}</Text>
        <Text style={styles.subtitle}>Available from {selectedVendor?.name}</Text>
        
        <ScrollView style={styles.vehiclesList}>
          {vehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={styles.vehicleCard}
              onPress={() => handleSelectVehicle(vehicle)}
            >
              <View style={styles.vehicleHeader}>
                <Text style={styles.vehicleImage}>{vehicle.image}</Text>
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleName}>{vehicle.name}</Text>
                  <Text style={styles.vehicleCapacity}>👥 {vehicle.capacity} people</Text>
                  <Text style={styles.vehicleRating}>⭐ {vehicle.rating}</Text>
                </View>
                <View style={styles.vehiclePrice}>
                  <Text style={styles.priceText}>${vehicle.costPerDay}</Text>
                  <Text style={styles.priceLabel}>per day</Text>
                </View>
              </View>
              
              <View style={styles.vehicleFeatures}>
                {vehicle.features.map((feature, index) => (
                  <Text key={index} style={styles.featureTag}>{feature}</Text>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => setCurrentStep(3)}
        >
          <Text style={styles.secondaryButtonText}>← Back to Categories</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Step 5: Booking Confirmation (Mock Transaction)
  const renderBookingConfirmationStep = () => {
    const totalDays = calculateTotalDays();
    const totalCost = calculateTotalCost();

    return (
      <ScrollView style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Booking Confirmed! ✅</Text>
        <Text style={styles.successMessage}>
          Your car rental has been successfully booked. Please arrive at the pickup location on time.
        </Text>

        <View style={styles.confirmationCard}>
          <Text style={styles.confirmationTitle}>Rental Details</Text>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Vendor:</Text>
            <Text style={styles.confirmationValue}>{selectedVendor?.name}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Vehicle:</Text>
            <Text style={styles.confirmationValue}>{selectedVehicle?.name}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Location:</Text>
            <Text style={styles.confirmationValue}>{searchData.island}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Pickup:</Text>
            <Text style={styles.confirmationValue}>
              {formatDate(searchData.pickupDate)} at {formatTime(searchData.pickupTime)}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Drop-off:</Text>
            <Text style={styles.confirmationValue}>
              {formatDate(searchData.dropoffDate)} at {formatTime(searchData.dropoffTime)}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Duration:</Text>
            <Text style={styles.confirmationValue}>{totalDays} days</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Total Cost:</Text>
            <Text style={[styles.confirmationValue, styles.totalCost]}>${totalCost}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Reference:</Text>
            <Text style={styles.confirmationValue}>CR{Date.now().toString().slice(-6)}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => {
            Alert.alert(
              'Thank You!',
              'Your rental confirmation has been saved. Have a safe trip!',
              [{ text: 'OK', onPress: () => setCurrentStep(1) }]
            );
          }}
        >
          <Text style={styles.primaryButtonText}>Save Confirmation 💾</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => setCurrentStep(1)}
        >
          <Text style={styles.secondaryButtonText}>Book Another Rental</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

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
            <Text style={styles.headerTitle}>Car Rentals</Text>
            <Text style={styles.headerSubtitle}>Explore The Bahamas with local vendors</Text>
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

        {currentStep === 1 && renderSearchStep()}
        {currentStep === 2 && renderVendorSelectionStep()}
        {currentStep === 3 && renderCategorySelectionStep()}
        {currentStep === 4 && renderVehicleSelectionStep()}
        {currentStep === 5 && renderBookingConfirmationStep()}
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
    backgroundColor: '#059669',
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
    color: '#e8f0fe',
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
    backgroundColor: '#059669',
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#d1d5db',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  placeholderText: {
    color: '#9ca3af',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginTop: 5,
    maxHeight: 200,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#374151',
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateTimeColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  dateTimeButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  dateTimeText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#059669',
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
  vendorsList: {
    flex: 1,
    marginBottom: 20,
  },
  vendorCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vendorCardDisabled: {
    opacity: 0.6,
  },
  vendorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  vendorLogo: {
    fontSize: 32,
    marginRight: 15,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  vendorDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  vendorPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  vendorDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  available: {
    color: '#059669',
  },
  unavailable: {
    color: '#dc2626',
  },
  categoryContainer: {
    gap: 20,
    marginBottom: 30,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 10,
  },
  categoryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  vehiclesList: {
    flex: 1,
    marginBottom: 20,
  },
  vehicleCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  vehicleImage: {
    fontSize: 32,
    marginRight: 15,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  vehicleCapacity: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  vehicleRating: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  vehiclePrice: {
    alignItems: 'flex-end',
  },
  vehicleFeatures: {
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
  successMessage: {
    backgroundColor: '#f0fdf4',
    color: '#059669',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  confirmationCard: {
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
  confirmationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  confirmationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  confirmationLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  confirmationValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  totalCost: {
    fontSize: 18,
    color: '#059669',
    fontWeight: 'bold',
  },
});

export default CarRentalsPage;