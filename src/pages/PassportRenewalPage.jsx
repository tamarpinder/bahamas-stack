import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PassportRenewalPage({ onBack }) {
  const [step, setStep] = useState('form');
  const [renewalData, setRenewalData] = useState({
    currentPassportNumber: '',
    fullName: '',
    expirationDate: '',
    renewalReason: 'expiring',
    email: '',
    phone: '',
    paymentMethod: 'rbc'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!renewalData.currentPassportNumber.trim()) {
      newErrors.currentPassportNumber = 'Please enter your current passport number';
    }
    
    if (!renewalData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    
    if (!renewalData.expirationDate.trim()) {
      newErrors.expirationDate = 'Please enter the expiration date';
    }
    
    if (!renewalData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!renewalData.phone || renewalData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setRenewalData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContinue = () => {
    if (validateForm()) {
      setStep('confirm');
    }
  };

  const handleSubmit = () => {
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
            <Ionicons name="refresh" size={32} color="#7C3AED" />
          </View>
          <View>
            <Text style={styles.serviceTitle}>Passport Renewal</Text>
            <Text style={styles.serviceSubtitle}>Renew your existing Bahamas passport</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Current Passport Number</Text>
            <TextInput
              style={[styles.fieldInput, errors.currentPassportNumber && styles.errorInput]}
              value={renewalData.currentPassportNumber}
              onChangeText={(value) => handleInputChange('currentPassportNumber', value)}
              placeholder="Enter your current passport number"
              autoCapitalize="characters"
            />
            {errors.currentPassportNumber && (
              <Text style={styles.errorText}>{errors.currentPassportNumber}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={[styles.fieldInput, errors.fullName && styles.errorInput]}
              value={renewalData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              placeholder="Enter your full name as it appears on passport"
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Current Passport Expiration Date</Text>
            <TextInput
              style={[styles.fieldInput, errors.expirationDate && styles.errorInput]}
              value={renewalData.expirationDate}
              onChangeText={(value) => handleInputChange('expirationDate', value)}
              placeholder="MM/DD/YYYY"
            />
            {errors.expirationDate && (
              <Text style={styles.errorText}>{errors.expirationDate}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <TextInput
              style={[styles.fieldInput, errors.email && styles.errorInput]}
              value={renewalData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email address"
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <TextInput
              style={[styles.fieldInput, errors.phone && styles.errorInput]}
              value={renewalData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Renewal Reason</Text>
            <TouchableOpacity
              style={[
                styles.reasonOption,
                renewalData.renewalReason === 'expiring' && styles.selectedReasonOption
              ]}
              onPress={() => handleInputChange('renewalReason', 'expiring')}
            >
              <Ionicons name="calendar" size={24} color="#6B7280" />
              <View style={styles.reasonOptionText}>
                <Text style={styles.reasonOptionTitle}>Expiring Soon</Text>
                <Text style={styles.reasonOptionSubtitle}>Passport expires within 6 months</Text>
              </View>
              {renewalData.renewalReason === 'expiring' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C3AED" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.reasonOption,
                renewalData.renewalReason === 'expired' && styles.selectedReasonOption
              ]}
              onPress={() => handleInputChange('renewalReason', 'expired')}
            >
              <Ionicons name="alert-circle" size={24} color="#6B7280" />
              <View style={styles.reasonOptionText}>
                <Text style={styles.reasonOptionTitle}>Already Expired</Text>
                <Text style={styles.reasonOptionSubtitle}>Passport has already expired</Text>
              </View>
              {renewalData.renewalReason === 'expired' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C3AED" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.reasonOption,
                renewalData.renewalReason === 'damaged' && styles.selectedReasonOption
              ]}
              onPress={() => handleInputChange('renewalReason', 'damaged')}
            >
              <Ionicons name="warning" size={24} color="#6B7280" />
              <View style={styles.reasonOptionText}>
                <Text style={styles.reasonOptionTitle}>Damaged</Text>
                <Text style={styles.reasonOptionSubtitle}>Passport is damaged or worn</Text>
              </View>
              {renewalData.renewalReason === 'damaged' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C3AED" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.reasonOption,
                renewalData.renewalReason === 'lost' && styles.selectedReasonOption
              ]}
              onPress={() => handleInputChange('renewalReason', 'lost')}
            >
              <Ionicons name="help-circle" size={24} color="#6B7280" />
              <View style={styles.reasonOptionText}>
                <Text style={styles.reasonOptionTitle}>Lost/Stolen</Text>
                <Text style={styles.reasonOptionSubtitle}>Passport was lost or stolen</Text>
              </View>
              {renewalData.renewalReason === 'lost' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C3AED" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Payment Method</Text>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                renewalData.paymentMethod === 'rbc' && styles.selectedPaymentOption
              ]}
              onPress={() => handleInputChange('paymentMethod', 'rbc')}
            >
              <Ionicons name="card" size={24} color="#6B7280" />
              <View style={styles.paymentOptionText}>
                <Text style={styles.paymentOptionTitle}>RBC Account</Text>
                <Text style={styles.paymentOptionSubtitle}>Pay with your RBC account</Text>
              </View>
              {renewalData.paymentMethod === 'rbc' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C3AED" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                renewalData.paymentMethod === 'visa' && styles.selectedPaymentOption
              ]}
              onPress={() => handleInputChange('paymentMethod', 'visa')}
            >
              <Ionicons name="card-outline" size={24} color="#6B7280" />
              <View style={styles.paymentOptionText}>
                <Text style={styles.paymentOptionTitle}>Visa Debit</Text>
                <Text style={styles.paymentOptionSubtitle}>Pay with Visa debit card</Text>
              </View>
              {renewalData.paymentMethod === 'visa' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C3AED" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.processingInfo}>
            <Ionicons name="time" size={20} color="#6B7280" />
            <Text style={styles.processingText}>Processing time: 2-3 weeks</Text>
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
        <Text style={styles.confirmationTitle}>Confirm Renewal</Text>
        
        <View style={styles.confirmationDetails}>
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Current Passport</Text>
            <Text style={styles.confirmationValue}>{renewalData.currentPassportNumber}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Full Name</Text>
            <Text style={styles.confirmationValue}>{renewalData.fullName}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Expiration Date</Text>
            <Text style={styles.confirmationValue}>{renewalData.expirationDate}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Renewal Reason</Text>
            <Text style={styles.confirmationValue}>
              {renewalData.renewalReason === 'expiring' ? 'Expiring Soon' :
               renewalData.renewalReason === 'expired' ? 'Already Expired' :
               renewalData.renewalReason === 'damaged' ? 'Damaged' : 'Lost/Stolen'}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Processing Time</Text>
            <Text style={styles.confirmationValue}>2-3 weeks</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Renewal Fee</Text>
            <Text style={[styles.confirmationValue, styles.amountText]}>$80.00</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Payment Method</Text>
            <Text style={styles.confirmationValue}>
              {renewalData.paymentMethod === 'rbc' ? 'RBC Account' : 'Visa Debit'}
            </Text>
          </View>
        </View>

        <View style={styles.demoNotice}>
          <Text style={styles.demoNoticeText}>
            <Text style={styles.demoNoticeTitle}>Note:</Text> This is a demo application. No real passport renewal will be processed.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Renewal</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep('form')}>
        <Text style={styles.secondaryButtonText}>Back to Edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderProcessing = () => (
    <View style={styles.processingContainer}>
      <ActivityIndicator size="large" color="#7C3AED" />
      <Text style={styles.processingTitle}>Processing Renewal</Text>
      <Text style={styles.processingSubtitle}>Please wait while we process your renewal...</Text>
    </View>
  );

  const renderSuccess = () => (
    <ScrollView style={styles.content}>
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={40} color="#10B981" />
        </View>
        <Text style={styles.successTitle}>Renewal Submitted!</Text>
        <Text style={styles.successSubtitle}>Your passport renewal has been received</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.transactionDetailsTitle}>Renewal Details</Text>
        
        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Reference Number</Text>
            <Text style={styles.transactionValue}>PR{Date.now().toString().slice(-6)}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Processing Time</Text>
            <Text style={styles.transactionValue}>2-3 weeks</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Fee</Text>
            <Text style={styles.transactionValue}>$80.00</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Status</Text>
            <Text style={[styles.transactionValue, styles.statusProcessing]}>Under Review</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onBack}>
        <Text style={styles.buttonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const getHeaderTitle = () => {
    switch (step) {
      case 'form': return 'Passport Renewal';
      case 'confirm': return 'Confirm Renewal';
      case 'processing': return 'Processing';
      case 'success': return 'Renewal Submitted';
      default: return 'Passport Renewal';
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
    backgroundColor: '#F3E8FF',
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
  reasonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedReasonOption: {
    borderColor: '#7C3AED',
    backgroundColor: '#F3E8FF',
  },
  reasonOptionText: {
    flex: 1,
    marginLeft: 12,
  },
  reasonOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  reasonOptionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedPaymentOption: {
    borderColor: '#7C3AED',
    backgroundColor: '#F3E8FF',
  },
  paymentOptionText: {
    flex: 1,
    marginLeft: 12,
  },
  paymentOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  paymentOptionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  processingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginTop: 8,
  },
  processingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  primaryButton: {
    backgroundColor: '#7C3AED',
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
    fontSize: 18,
    color: '#7C3AED',
  },
  demoNotice: {
    padding: 16,
    backgroundColor: '#F3E8FF',
    borderRadius: 8,
  },
  demoNoticeText: {
    fontSize: 14,
    color: '#581C87',
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
  statusProcessing: {
    color: '#F59E0B',
  },
});