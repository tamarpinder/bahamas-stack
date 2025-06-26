import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  Image,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const InterIslandFlightsPage = ({ navigation, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  
  // Search form data
  const [searchData, setSearchData] = useState({
    destination: '',
    departureDate: new Date(),
    departureTime: new Date(),
  });
  
  // Selected flight data
  const [selectedFlight, setSelectedFlight] = useState(null);
  
  // Passenger information
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    paymentMethod: 'RBC Account',
  });

  // Mock flight data - sorted by cost (cheapest first)
  const mockFlights = [
    {
      id: 5,
      company: 'Nassau Express',
      logo: '🏝️',
      cost: 95,
      rating: 4.2,
      cutOffTime: '45 minutes',
      boardingTime: '04:30 PM',
      availableSeats: 22,
      flightNumber: 'NE678',
      gate: 'B4',
    },
    {
      id: 3,
      company: 'Pineapple Air',
      logo: '🍍',
      cost: 120,
      rating: 4.3,
      cutOffTime: '60 minutes',
      boardingTime: '12:45 PM',
      availableSeats: 25,
      flightNumber: 'PA789',
      gate: 'C1',
    },
    {
      id: 1,
      company: 'Golden Wings Charter',
      logo: '✈️',
      cost: 150,
      rating: 4.5,
      cutOffTime: '45 minutes',
      boardingTime: '08:30 AM',
      availableSeats: 18,
      flightNumber: 'GW324',
      gate: 'A3',
    },
    {
      id: 6,
      company: 'Island Hopper',
      logo: '🌴',
      cost: 165,
      rating: 4.6,
      cutOffTime: '35 minutes',
      boardingTime: '06:10 PM',
      availableSeats: 15,
      flightNumber: 'IH901',
      gate: 'C3',
    },
    {
      id: 2,
      company: 'Southern Air',
      logo: '🛩️',
      cost: 180,
      rating: 4.7,
      cutOffTime: '30 minutes',
      boardingTime: '10:15 AM',
      availableSeats: 12,
      flightNumber: 'SA156',
      gate: 'B2',
    },
    {
      id: 4,
      company: 'Flamingo Airways',
      logo: '🦩',
      cost: 200,
      rating: 4.8,
      cutOffTime: '30 minutes',
      boardingTime: '02:20 PM',
      availableSeats: 8,
      flightNumber: 'FA442',
      gate: 'A1',
    },
  ];

  const bahamasDestinations = [
    'Nassau', 'Freeport', 'Exuma', 'Eleuthera', 'Andros', 
    'Cat Island', 'Long Island', 'Abaco', 'Bimini', 'Inagua'
  ];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSearchData(prev => ({ ...prev, departureDate: selectedDate }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setSearchData(prev => ({ ...prev, departureTime: selectedTime }));
    }
  };

  const validateSearchForm = () => {
    if (!searchData.destination.trim()) {
      Alert.alert('Error', 'Please enter a destination');
      return false;
    }
    return true;
  };

  const validatePassengerForm = () => {
    const { firstName, lastName, phone, email } = passengerInfo;
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
      Alert.alert('Error', 'Please fill in all passenger information fields');
      return false;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSearchFlights = () => {
    if (validateSearchForm()) {
      setCurrentStep(2);
    }
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setCurrentStep(3);
  };

  const handleBookFlight = () => {
    if (validatePassengerForm()) {
      setCurrentStep(4);
    }
  };

  const generateBookingReference = () => {
    return 'BH' + Math.random().toString(36).substr(2, 6).toUpperCase();
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

  // Step 1: Flight Search Page
  const renderSearchStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Search Inter-Island Flights</Text>
      <Text style={styles.demoNotice}>
        🚨 DEMO MODE: No real bookings will be made
      </Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Where To</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDestinationDropdown(!showDestinationDropdown)}
        >
          <Text style={[styles.dropdownText, !searchData.destination && styles.placeholderText]}>
            {searchData.destination || 'Select destination island'}
          </Text>
          <Text style={styles.dropdownArrow}>{showDestinationDropdown ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {showDestinationDropdown && (
          <View style={styles.dropdown}>
            {bahamasDestinations.map((dest, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setSearchData(prev => ({ ...prev, destination: dest }));
                  setShowDestinationDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{dest}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Departure Date</Text>
        <TouchableOpacity
          style={styles.dateTimeButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateTimeText}>{formatDate(searchData.departureDate)}</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Select your preferred departure date</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Departure Time</Text>
        <TouchableOpacity
          style={styles.dateTimeButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dateTimeText}>{formatTime(searchData.departureTime)}</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Choose your preferred departure time</Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSearchFlights}>
        <Text style={styles.primaryButtonText}>Search Flights ✈️</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={searchData.departureDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={searchData.departureTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );

  // Step 2: Flight Selection Page
  const renderFlightSelectionStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Available Flights to {searchData.destination}</Text>
      <Text style={styles.subtitle}>{formatDate(searchData.departureDate)}</Text>
      
      <ScrollView style={styles.flightsList}>
        {mockFlights.map((flight) => (
          <TouchableOpacity
            key={flight.id}
            style={styles.flightCard}
            onPress={() => handleSelectFlight(flight)}
          >
            <View style={styles.flightHeader}>
              <Text style={styles.flightLogo}>{flight.logo}</Text>
              <View style={styles.flightInfo}>
                <Text style={styles.companyName}>{flight.company}</Text>
                <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
              </View>
              <View style={styles.flightPrice}>
                <Text style={styles.priceText}>${flight.cost}</Text>
                <Text style={styles.priceLabel}>One-way</Text>
              </View>
            </View>
            
            <View style={styles.flightDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Rating:</Text>
                <Text style={styles.detailValue}>⭐ {flight.rating}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Cut-off:</Text>
                <Text style={styles.detailValue}>{flight.cutOffTime} before</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Boarding:</Text>
                <Text style={styles.detailValue}>{flight.boardingTime}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Available:</Text>
                <Text style={styles.detailValue}>{flight.availableSeats} seats</Text>
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

  // Step 3: Booking Confirmation Page
  const renderBookingConfirmationStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Booking Confirmation</Text>
      
      {selectedFlight && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Flight Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Airline:</Text>
            <Text style={styles.summaryValue}>{selectedFlight.company}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Flight:</Text>
            <Text style={styles.summaryValue}>{selectedFlight.flightNumber}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Route:</Text>
            <Text style={styles.summaryValue}>Nassau → {searchData.destination}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date:</Text>
            <Text style={styles.summaryValue}>{formatDate(searchData.departureDate)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Boarding:</Text>
            <Text style={styles.summaryValue}>{selectedFlight.boardingTime}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cost:</Text>
            <Text style={styles.summaryValue}>${selectedFlight.cost}</Text>
          </View>
        </View>
      )}

      <View style={styles.passengerForm}>
        <Text style={styles.formTitle}>Passenger Information</Text>
        
        <View style={styles.formRow}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="First Name"
              value={passengerInfo.firstName}
              onChangeText={(text) => setPassengerInfo(prev => ({ ...prev, firstName: text }))}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              value={passengerInfo.lastName}
              onChangeText={(text) => setPassengerInfo(prev => ({ ...prev, lastName: text }))}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder="(242) 000-0000"
            value={passengerInfo.phone}
            onChangeText={(text) => setPassengerInfo(prev => ({ ...prev, phone: text }))}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            placeholder="your.email@example.com"
            value={passengerInfo.email}
            onChangeText={(text) => setPassengerInfo(prev => ({ ...prev, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                passengerInfo.paymentMethod === 'RBC Account' && styles.paymentOptionSelected
              ]}
              onPress={() => setPassengerInfo(prev => ({ ...prev, paymentMethod: 'RBC Account' }))}
            >
              <Text style={styles.paymentOptionText}>RBC Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                passengerInfo.paymentMethod === 'Visa Debit' && styles.paymentOptionSelected
              ]}
              onPress={() => setPassengerInfo(prev => ({ ...prev, paymentMethod: 'Visa Debit' }))}
            >
              <Text style={styles.paymentOptionText}>Visa Debit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalText}>Total Cost: ${selectedFlight?.cost || 0}</Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleBookFlight}>
        <Text style={styles.primaryButtonText}>Book Flight 🎫</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => setCurrentStep(2)}
      >
        <Text style={styles.secondaryButtonText}>← Back to Flight Selection</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 4: Boarding Pass Page
  const renderBoardingPassStep = () => {
    const bookingRef = generateBookingReference();
    const seatNumber = `${Math.floor(Math.random() * 20) + 1}${'ABCDEF'[Math.floor(Math.random() * 6)]}`;
    
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Booking Confirmed! ✅</Text>
        <Text style={styles.successMessage}>
          Your flight has been successfully booked. Please arrive at the airport at least {selectedFlight?.cutOffTime} before boarding time.
        </Text>

        <View style={styles.boardingPass}>
          <View style={styles.boardingPassHeader}>
            <Text style={styles.boardingPassTitle}>BOARDING PASS</Text>
            <Text style={styles.bookingReference}>Ref: {bookingRef}</Text>
          </View>

          <View style={styles.passengerSection}>
            <Text style={styles.passengerName}>
              {passengerInfo.firstName.toUpperCase()} {passengerInfo.lastName.toUpperCase()}
            </Text>
          </View>

          <View style={styles.flightDetailsSection}>
            <View style={styles.flightDetailRow}>
              <View style={styles.flightDetailItem}>
                <Text style={styles.flightDetailLabel}>FROM</Text>
                <Text style={styles.flightDetailValue}>NASSAU</Text>
                <Text style={styles.flightDetailCode}>NAS</Text>
              </View>
              <Text style={styles.flightDetailArrow}>→</Text>
              <View style={styles.flightDetailItem}>
                <Text style={styles.flightDetailLabel}>TO</Text>
                <Text style={styles.flightDetailValue}>{searchData.destination.toUpperCase()}</Text>
                <Text style={styles.flightDetailCode}>{searchData.destination.substr(0, 3).toUpperCase()}</Text>
              </View>
            </View>

            <View style={styles.flightInfoGrid}>
              <View style={styles.flightInfoItem}>
                <Text style={styles.flightInfoLabel}>FLIGHT</Text>
                <Text style={styles.flightInfoValue}>{selectedFlight?.flightNumber}</Text>
              </View>
              <View style={styles.flightInfoItem}>
                <Text style={styles.flightInfoLabel}>DATE</Text>
                <Text style={styles.flightInfoValue}>
                  {searchData.departureDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </Text>
              </View>
              <View style={styles.flightInfoItem}>
                <Text style={styles.flightInfoLabel}>BOARDING</Text>
                <Text style={styles.flightInfoValue}>{selectedFlight?.boardingTime}</Text>
              </View>
              <View style={styles.flightInfoItem}>
                <Text style={styles.flightInfoLabel}>GATE</Text>
                <Text style={styles.flightInfoValue}>{selectedFlight?.gate}</Text>
              </View>
              <View style={styles.flightInfoItem}>
                <Text style={styles.flightInfoLabel}>SEAT</Text>
                <Text style={styles.flightInfoValue}>{seatNumber}</Text>
              </View>
            </View>
          </View>

          <View style={styles.qrCodeSection}>
            <View style={styles.qrCodePlaceholder}>
              <Text style={styles.qrCodeText}>QR CODE</Text>
              <Text style={styles.qrCodeSubtext}>Scan at gate</Text>
            </View>
          </View>

          <View style={styles.boardingPassFooter}>
            <Text style={styles.footerText}>
              Please arrive at gate {selectedFlight?.gate} at least {selectedFlight?.cutOffTime} before boarding time
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => {
            Alert.alert(
              'Thank You!',
              'Your boarding pass has been saved. Have a safe flight!',
              [{ text: 'OK', onPress: () => setCurrentStep(1) }]
            );
          }}
        >
          <Text style={styles.primaryButtonText}>Save Boarding Pass 💾</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => setCurrentStep(1)}
        >
          <Text style={styles.secondaryButtonText}>Book Another Flight</Text>
        </TouchableOpacity>
      </View>
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
            <Text style={styles.headerTitle}>Inter-Island Flights</Text>
            <Text style={styles.headerSubtitle}>Explore the beautiful Bahamas islands</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.progressIndicator}>
          {[1, 2, 3, 4].map((step) => (
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
        {currentStep === 2 && renderFlightSelectionStep()}
        {currentStep === 3 && renderBookingConfirmationStep()}
        {currentStep === 4 && renderBoardingPassStep()}
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
    backgroundColor: '#2c5aa0',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  progressStepActive: {
    backgroundColor: '#2c5aa0',
  },
  progressStepText: {
    fontSize: 16,
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
  inputContainer: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  destinationScroll: {
    marginTop: 10,
  },
  destinationChip: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  destinationText: {
    color: '#2c5aa0',
    fontWeight: '500',
  },
  dateTimeButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#374151',
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
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 5,
  },
  primaryButton: {
    backgroundColor: '#2c5aa0',
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
  flightsList: {
    flex: 1,
    marginBottom: 20,
  },
  flightCard: {
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
  flightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  flightLogo: {
    fontSize: 32,
    marginRight: 15,
  },
  flightInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  flightNumber: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  flightPrice: {
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
  flightDetails: {
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
  summaryCard: {
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },
  passengerForm: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOption: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentOptionSelected: {
    backgroundColor: '#e0e7ff',
    borderColor: '#2c5aa0',
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  totalSection: {
    backgroundColor: '#f0fdf4',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
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
  boardingPass: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  boardingPassHeader: {
    backgroundColor: '#2c5aa0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  boardingPassTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  bookingReference: {
    fontSize: 14,
    color: '#e8f0fe',
  },
  passengerSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  passengerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  flightDetailsSection: {
    padding: 20,
  },
  flightDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  flightDetailItem: {
    alignItems: 'center',
  },
  flightDetailLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 5,
  },
  flightDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  flightDetailCode: {
    fontSize: 12,
    color: '#6b7280',
  },
  flightDetailArrow: {
    fontSize: 24,
    color: '#2c5aa0',
    fontWeight: 'bold',
  },
  flightInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flightInfoItem: {
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
  },
  flightInfoLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 5,
  },
  flightInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  qrCodeSection: {
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  qrCodePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
  },
  qrCodeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  qrCodeSubtext: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 2,
  },
  boardingPassFooter: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default InterIslandFlightsPage;