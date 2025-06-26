import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VehicleInspectionPage({ onBack }) {
  const [step, setStep] = useState('form');
  const [inspectionData, setInspectionData] = useState({
    licensePlate: '',
    vehicleType: 'Private',
    inspectionType: 'Annual',
    inspectionFee: '75.00',
    paymentMethod: 'bank-account'
  });
  const [errors, setErrors] = useState({});

  const vehicleTypes = ['Private', 'Taxi', 'Commercial', 'Motorcycle'];
  const inspectionTypes = ['Annual', 'Transfer'];
  const inspectionFees = {
    'Private-Annual': '75.00',
    'Private-Transfer': '75.00',
    'Taxi-Annual': '85.00',
    'Taxi-Transfer': '85.00',
    'Commercial-Annual': '95.00',
    'Commercial-Transfer': '95.00',
    'Motorcycle-Annual': '50.00',
    'Motorcycle-Transfer': '50.00'
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!inspectionData.licensePlate || inspectionData.licensePlate.length < 3) {
      newErrors.licensePlate = 'Please enter a valid license plate number';
    }
    
    if (!inspectionData.vehicleType) {
      newErrors.vehicleType = 'Please select a vehicle type';
    }
    
    if (!inspectionData.inspectionType) {
      newErrors.inspectionType = 'Please select an inspection type';
    }
    
    if (!inspectionData.inspectionFee || parseFloat(inspectionData.inspectionFee) <= 0) {
      newErrors.inspectionFee = 'Please enter a valid inspection fee';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    let updatedData = { ...inspectionData, [field]: value };
    
    // Update inspection fee when vehicle type or inspection type changes
    if (field === 'vehicleType' || field === 'inspectionType') {
      const feeKey = `${field === 'vehicleType' ? value : inspectionData.vehicleType}-${field === 'inspectionType' ? value : inspectionData.inspectionType}`;
      updatedData.inspectionFee = inspectionFees[feeKey] || '75.00';
    }
    
    setInspectionData(updatedData);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContinue = () => {
    if (validateForm()) {
      setStep('confirm');
    }
  };

  const handleInspection = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const renderForm = () => (
    <ScrollView style={styles.content}>
      <View style={styles.card}>
        <View style={styles.serviceHeader}>
          <View style={styles.serviceIcon}>
            <Ionicons name="search" size={32} color="#059669" />
          </View>
          <View>
            <Text style={styles.serviceTitle}>Vehicle Inspection</Text>
            <Text style={styles.serviceSubtitle}>Schedule vehicle safety inspection</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>License Plate Number</Text>
            <TextInput
              style={[styles.fieldInput, errors.licensePlate && styles.errorInput]}
              value={inspectionData.licensePlate}
              onChangeText={(value) => handleInputChange('licensePlate', value.toUpperCase())}
              placeholder="Enter license plate number"
              autoCapitalize="characters"
            />
            {errors.licensePlate && (
              <Text style={styles.errorText}>{errors.licensePlate}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Vehicle Type</Text>
            {vehicleTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionButton,
                  inspectionData.vehicleType === type && styles.selectedOption
                ]}
                onPress={() => handleInputChange('vehicleType', type)}
              >
                <Text style={[
                  styles.optionText,
                  inspectionData.vehicleType === type && styles.selectedOptionText
                ]}>
                  {type}
                </Text>
                {inspectionData.vehicleType === type && (
                  <Ionicons name="checkmark-circle" size={20} color="#059669" />
                )}
              </TouchableOpacity>
            ))}
            {errors.vehicleType && (
              <Text style={styles.errorText}>{errors.vehicleType}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Inspection Type</Text>
            {inspectionTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.optionButton,
                  inspectionData.inspectionType === type && styles.selectedOption
                ]}
                onPress={() => handleInputChange('inspectionType', type)}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionText,
                    inspectionData.inspectionType === type && styles.selectedOptionText
                  ]}>
                    {type} Inspection
                  </Text>
                  <Text style={styles.optionSubtext}>
                    {type === 'Annual' ? 'Required yearly inspection' : 'Inspection for vehicle transfer'}
                  </Text>
                </View>
                {inspectionData.inspectionType === type && (
                  <Ionicons name="checkmark-circle" size={20} color="#059669" />
                )}
              </TouchableOpacity>
            ))}
            {errors.inspectionType && (
              <Text style={styles.errorText}>{errors.inspectionType}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Inspection Fee (BSD)</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={[styles.amountInput, errors.inspectionFee && styles.errorInput]}
                value={inspectionData.inspectionFee}
                onChangeText={(value) => handleInputChange('inspectionFee', value)}
                placeholder="75.00"
                keyboardType="decimal-pad"
                editable={false}
              />
            </View>
            {errors.inspectionFee && (
              <Text style={styles.errorText}>{errors.inspectionFee}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Payment Method</Text>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                inspectionData.paymentMethod === 'bank-account' && styles.selectedPaymentMethod
              ]}
              onPress={() => handleInputChange('paymentMethod', 'bank-account')}
            >
              <Ionicons name="business" size={24} color="#6B7280" />
              <View style={styles.paymentMethodText}>
                <Text style={styles.paymentMethodTitle}>Royal Bank of Canada</Text>
                <Text style={styles.paymentMethodSubtitle}>Account ending in 4567</Text>
              </View>
              {inspectionData.paymentMethod === 'bank-account' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethod,
                inspectionData.paymentMethod === 'debit-card' && styles.selectedPaymentMethod
              ]}
              onPress={() => handleInputChange('paymentMethod', 'debit-card')}
            >
              <Ionicons name="card" size={24} color="#6B7280" />
              <View style={styles.paymentMethodText}>
                <Text style={styles.paymentMethodTitle}>Debit Card</Text>
                <Text style={styles.paymentMethodSubtitle}>Visa ending in 8901</Text>
              </View>
              {inspectionData.paymentMethod === 'debit-card' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderConfirmation = () => (
    <ScrollView style={styles.content}>
      <View style={styles.card}>
        <Text style={styles.confirmationTitle}>Confirm Inspection</Text>
        
        <View style={styles.confirmationDetails}>
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Service</Text>
            <Text style={styles.confirmationValue}>Vehicle Inspection</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>License Plate</Text>
            <Text style={styles.confirmationValue}>{inspectionData.licensePlate}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Vehicle Type</Text>
            <Text style={styles.confirmationValue}>{inspectionData.vehicleType}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Inspection Type</Text>
            <Text style={styles.confirmationValue}>{inspectionData.inspectionType} Inspection</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Inspection Fee</Text>
            <Text style={[styles.confirmationValue, styles.amountText]}>
              ${parseFloat(inspectionData.inspectionFee).toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Payment Method</Text>
            <Text style={styles.confirmationValue}>
              {inspectionData.paymentMethod === 'bank-account' ? 'RBC Account' : 'Visa Debit'}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Processing Fee</Text>
            <Text style={[styles.confirmationValue, styles.freeText]}>FREE</Text>
          </View>
        </View>

        <View style={styles.demoNotice}>
          <Text style={styles.demoNoticeText}>
            <Text style={styles.demoNoticeTitle}>Note:</Text> This is a demo transaction. No real inspection will be scheduled or fees charged.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleInspection}>
        <Text style={styles.buttonText}>Pay ${parseFloat(inspectionData.inspectionFee).toFixed(2)}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep('form')}>
        <Text style={styles.secondaryButtonText}>Back to Edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderProcessing = () => (
    <View style={styles.processingContainer}>
      <ActivityIndicator size="large" color="#059669" />
      <Text style={styles.processingTitle}>Processing Inspection</Text>
      <Text style={styles.processingSubtitle}>Please wait while we schedule your vehicle inspection...</Text>
    </View>
  );

  const renderSuccess = () => (
    <ScrollView style={styles.content}>
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={40} color="#10B981" />
        </View>
        <Text style={styles.successTitle}>Inspection Scheduled!</Text>
        <Text style={styles.successSubtitle}>Your vehicle inspection has been scheduled successfully</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.transactionDetailsTitle}>Inspection Details</Text>
        
        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Reference Number</Text>
            <Text style={styles.transactionValue}>RTD{Date.now().toString().slice(-6)}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>License Plate</Text>
            <Text style={styles.transactionValue}>{inspectionData.licensePlate}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Vehicle Type</Text>
            <Text style={styles.transactionValue}>{inspectionData.vehicleType}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Inspection Type</Text>
            <Text style={styles.transactionValue}>{inspectionData.inspectionType} Inspection</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Fee Paid</Text>
            <Text style={styles.transactionValue}>${parseFloat(inspectionData.inspectionFee).toFixed(2)}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Date & Time</Text>
            <Text style={styles.transactionValue}>{new Date().toLocaleString()}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Status</Text>
            <Text style={[styles.transactionValue, styles.statusCompleted]}>Scheduled</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onBack}>
        <Text style={styles.buttonText}>Back to Dashboard</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => {
          setStep('form');
          setInspectionData({ 
            licensePlate: '', 
            vehicleType: 'Private', 
            inspectionType: 'Annual', 
            inspectionFee: '75.00', 
            paymentMethod: 'bank-account' 
          });
          setErrors({});
        }}
      >
        <Text style={styles.secondaryButtonText}>Schedule Another Inspection</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const getHeaderTitle = () => {
    switch (step) {
      case 'form': return 'Vehicle Inspection';
      case 'confirm': return 'Confirm Inspection';
      case 'processing': return 'Processing';
      case 'success': return 'Inspection Scheduled';
      default: return 'Vehicle Inspection';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
        <View style={{ width: 24 }} />
      </View>

      {step === 'form' && renderForm()}
      {step === 'confirm' && renderConfirmation()}
      {step === 'processing' && renderProcessing()}
      {step === 'success' && renderSuccess()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  serviceIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#D1FAE5',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  serviceSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  form: {
    gap: 20,
  },
  field: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  fieldInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    fontSize: 16,
  },
  errorInput: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    borderColor: '#059669',
    backgroundColor: '#D1FAE5',
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  selectedOptionText: {
    color: '#059669',
  },
  optionSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingLeft: 16,
    backgroundColor: '#F9FAFB',
  },
  currencySymbol: {
    color: '#6B7280',
    fontSize: 16,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 0,
    backgroundColor: '#F9FAFB',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedPaymentMethod: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  paymentMethodText: {
    flex: 1,
    marginLeft: 12,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  paymentMethodSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  primaryButton: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  confirmationDetails: {
    marginBottom: 24,
  },
  confirmationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  confirmationLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  confirmationValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  amountText: {
    fontSize: 20,
  },
  freeText: {
    color: '#10B981',
  },
  demoNotice: {
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  demoNoticeText: {
    fontSize: 14,
    color: '#1E40AF',
  },
  demoNoticeTitle: {
    fontWeight: '500',
  },
  processingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  processingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 24,
    marginBottom: 8,
  },
  processingSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#D1FAE5',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  transactionDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  transactionDetails: {
    gap: 12,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  statusCompleted: {
    color: '#10B981',
  },
});