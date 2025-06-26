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
import { addDocumentToDigitalLocker } from './DigitalLockerPage';

export default function PoliceRecordPage({ onBack }) {
  const [step, setStep] = useState('form');
  const [recordData, setRecordData] = useState({
    fullName: '',
    nibNumber: '',
    dateOfBirth: '',
    purpose: 'employment',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'rbc'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!recordData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    
    if (!recordData.nibNumber || recordData.nibNumber.length < 9) {
      newErrors.nibNumber = 'Please enter a valid NIB number';
    }
    
    if (!recordData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Please enter your date of birth';
    }
    
    if (!recordData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!recordData.phone || recordData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!recordData.address.trim()) {
      newErrors.address = 'Please enter your address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setRecordData(prev => ({ ...prev, [field]: value }));
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
      // Add document to Digital Locker
      const referenceNumber = `PR${Date.now().toString().slice(-6)}`;
      addDocumentToDigitalLocker({
        title: 'Police Record',
        type: 'Government Document',
        issuer: 'Royal Bahamas Police Force',
        description: `Police record for ${recordData.fullName}`,
        referenceNumber: referenceNumber,
      });
      setStep('success');
    }, 2000);
  };

  const renderForm = () => (
    <ScrollView style={styles.content}>
      <View style={styles.card}>
        <View style={styles.serviceHeader}>
          <View style={styles.serviceIcon}>
            <Ionicons name="document-text" size={32} color="#3B82F6" />
          </View>
          <View>
            <Text style={styles.serviceTitle}>Police Record</Text>
            <Text style={styles.serviceSubtitle}>Apply for a police record certificate</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={[styles.fieldInput, errors.fullName && styles.errorInput]}
              value={recordData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>NIB Number</Text>
            <TextInput
              style={[styles.fieldInput, errors.nibNumber && styles.errorInput]}
              value={recordData.nibNumber}
              onChangeText={(value) => handleInputChange('nibNumber', value)}
              placeholder="Enter your NIB number"
              keyboardType="numeric"
            />
            {errors.nibNumber && (
              <Text style={styles.errorText}>{errors.nibNumber}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <TextInput
              style={[styles.fieldInput, errors.dateOfBirth && styles.errorInput]}
              value={recordData.dateOfBirth}
              onChangeText={(value) => handleInputChange('dateOfBirth', value)}
              placeholder="MM/DD/YYYY"
            />
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <TextInput
              style={[styles.fieldInput, errors.email && styles.errorInput]}
              value={recordData.email}
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
              value={recordData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Current Address</Text>
            <TextInput
              style={[styles.fieldInput, errors.address && styles.errorInput]}
              value={recordData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholder="Enter your current address"
              multiline
              numberOfLines={3}
            />
            {errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Purpose of Record</Text>
            <TouchableOpacity
              style={[
                styles.purposeOption,
                recordData.purpose === 'employment' && styles.selectedPurposeOption
              ]}
              onPress={() => handleInputChange('purpose', 'employment')}
            >
              <Ionicons name="briefcase" size={24} color="#6B7280" />
              <View style={styles.purposeOptionText}>
                <Text style={styles.purposeOptionTitle}>Employment</Text>
                <Text style={styles.purposeOptionSubtitle}>For job applications</Text>
              </View>
              {recordData.purpose === 'employment' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.purposeOption,
                recordData.purpose === 'visa' && styles.selectedPurposeOption
              ]}
              onPress={() => handleInputChange('purpose', 'visa')}
            >
              <Ionicons name="document" size={24} color="#6B7280" />
              <View style={styles.purposeOptionText}>
                <Text style={styles.purposeOptionTitle}>Visa Application</Text>
                <Text style={styles.purposeOptionSubtitle}>For visa applications</Text>
              </View>
              {recordData.purpose === 'visa' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.purposeOption,
                recordData.purpose === 'immigration' && styles.selectedPurposeOption
              ]}
              onPress={() => handleInputChange('purpose', 'immigration')}
            >
              <Ionicons name="airplane" size={24} color="#6B7280" />
              <View style={styles.purposeOptionText}>
                <Text style={styles.purposeOptionTitle}>Immigration</Text>
                <Text style={styles.purposeOptionSubtitle}>For immigration purposes</Text>
              </View>
              {recordData.purpose === 'immigration' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.purposeOption,
                recordData.purpose === 'other' && styles.selectedPurposeOption
              ]}
              onPress={() => handleInputChange('purpose', 'other')}
            >
              <Ionicons name="help-circle" size={24} color="#6B7280" />
              <View style={styles.purposeOptionText}>
                <Text style={styles.purposeOptionTitle}>Other</Text>
                <Text style={styles.purposeOptionSubtitle}>Other purposes</Text>
              </View>
              {recordData.purpose === 'other' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Payment Method</Text>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                recordData.paymentMethod === 'rbc' && styles.selectedPaymentOption
              ]}
              onPress={() => handleInputChange('paymentMethod', 'rbc')}
            >
              <Ionicons name="card" size={24} color="#6B7280" />
              <View style={styles.paymentOptionText}>
                <Text style={styles.paymentOptionTitle}>RBC Account</Text>
                <Text style={styles.paymentOptionSubtitle}>Pay with your RBC account</Text>
              </View>
              {recordData.paymentMethod === 'rbc' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                recordData.paymentMethod === 'visa' && styles.selectedPaymentOption
              ]}
              onPress={() => handleInputChange('paymentMethod', 'visa')}
            >
              <Ionicons name="card-outline" size={24} color="#6B7280" />
              <View style={styles.paymentOptionText}>
                <Text style={styles.paymentOptionTitle}>Visa Debit</Text>
                <Text style={styles.paymentOptionSubtitle}>Pay with Visa debit card</Text>
              </View>
              {recordData.paymentMethod === 'visa' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.processingInfo}>
            <Ionicons name="time" size={20} color="#6B7280" />
            <Text style={styles.processingText}>Processing time: 3-5 business days</Text>
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
        <Text style={styles.confirmationTitle}>Confirm Application</Text>
        
        <View style={styles.confirmationDetails}>
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Full Name</Text>
            <Text style={styles.confirmationValue}>{recordData.fullName}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>NIB Number</Text>
            <Text style={styles.confirmationValue}>{recordData.nibNumber}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Date of Birth</Text>
            <Text style={styles.confirmationValue}>{recordData.dateOfBirth}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Purpose</Text>
            <Text style={styles.confirmationValue}>
              {recordData.purpose.charAt(0).toUpperCase() + recordData.purpose.slice(1)}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Processing Time</Text>
            <Text style={styles.confirmationValue}>3-5 business days</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Processing Fee</Text>
            <Text style={[styles.confirmationValue, styles.amountText]}>$25.00</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Payment Method</Text>
            <Text style={styles.confirmationValue}>
              {recordData.paymentMethod === 'rbc' ? 'RBC Account' : 'Visa Debit'}
            </Text>
          </View>
        </View>

        <View style={styles.demoNotice}>
          <Text style={styles.demoNoticeText}>
            <Text style={styles.demoNoticeTitle}>Note:</Text> This is a demo application. No real police record will be processed.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Application</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep('form')}>
        <Text style={styles.secondaryButtonText}>Back to Edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderProcessing = () => (
    <View style={styles.processingContainer}>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={styles.processingTitle}>Processing Application</Text>
      <Text style={styles.processingSubtitle}>Please wait while we process your application...</Text>
    </View>
  );

  const renderSuccess = () => (
    <ScrollView style={styles.content}>
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={40} color="#10B981" />
        </View>
        <Text style={styles.successTitle}>Application Submitted!</Text>
        <Text style={styles.successSubtitle}>Your police record application has been received</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.transactionDetailsTitle}>Application Details</Text>
        
        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Reference Number</Text>
            <Text style={styles.transactionValue}>PR{Date.now().toString().slice(-6)}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Processing Time</Text>
            <Text style={styles.transactionValue}>3-5 business days</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Fee</Text>
            <Text style={styles.transactionValue}>$25.00</Text>
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
      case 'form': return 'Police Record';
      case 'confirm': return 'Confirm Application';
      case 'processing': return 'Processing';
      case 'success': return 'Application Submitted';
      default: return 'Police Record';
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
    backgroundColor: '#EFF6FF',
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
  purposeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedPurposeOption: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  purposeOptionText: {
    flex: 1,
    marginLeft: 12,
  },
  purposeOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  purposeOptionSubtitle: {
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
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
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
    backgroundColor: '#3B82F6',
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
    color: '#3B82F6',
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
  statusProcessing: {
    color: '#F59E0B',
  },
});