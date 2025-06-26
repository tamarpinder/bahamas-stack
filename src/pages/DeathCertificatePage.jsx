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

export default function DeathCertificatePage({ onBack }) {
  const [step, setStep] = useState('form');
  const [certificateData, setCertificateData] = useState({
    deceasedFullName: '',
    dateOfDeath: '',
    placeOfDeath: '',
    relationship: 'family',
    certificateType: 'short',
    email: '',
    phone: '',
    paymentMethod: 'rbc'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!certificateData.deceasedFullName.trim()) {
      newErrors.deceasedFullName = 'Please enter the deceased\'s full name';
    }
    
    if (!certificateData.dateOfDeath.trim()) {
      newErrors.dateOfDeath = 'Please enter the date of death';
    }
    
    if (!certificateData.placeOfDeath.trim()) {
      newErrors.placeOfDeath = 'Please enter the place of death';
    }
    
    if (!certificateData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!certificateData.phone || certificateData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setCertificateData(prev => ({ ...prev, [field]: value }));
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
            <Ionicons name="flower" size={32} color="#7C2D12" />
          </View>
          <View>
            <Text style={styles.serviceTitle}>Death Certificate</Text>
            <Text style={styles.serviceSubtitle}>Request a certified death certificate</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Deceased's Full Name</Text>
            <TextInput
              style={[styles.fieldInput, errors.deceasedFullName && styles.errorInput]}
              value={certificateData.deceasedFullName}
              onChangeText={(value) => handleInputChange('deceasedFullName', value)}
              placeholder="Enter full name of deceased person"
            />
            {errors.deceasedFullName && (
              <Text style={styles.errorText}>{errors.deceasedFullName}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Date of Death</Text>
            <TextInput
              style={[styles.fieldInput, errors.dateOfDeath && styles.errorInput]}
              value={certificateData.dateOfDeath}
              onChangeText={(value) => handleInputChange('dateOfDeath', value)}
              placeholder="MM/DD/YYYY"
            />
            {errors.dateOfDeath && (
              <Text style={styles.errorText}>{errors.dateOfDeath}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Place of Death</Text>
            <TextInput
              style={[styles.fieldInput, errors.placeOfDeath && styles.errorInput]}
              value={certificateData.placeOfDeath}
              onChangeText={(value) => handleInputChange('placeOfDeath', value)}
              placeholder="Hospital, City, Island, Bahamas"
            />
            {errors.placeOfDeath && (
              <Text style={styles.errorText}>{errors.placeOfDeath}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Your Relationship to Deceased</Text>
            <TouchableOpacity
              style={[
                styles.relationshipOption,
                certificateData.relationship === 'spouse' && styles.selectedRelationshipOption
              ]}
              onPress={() => handleInputChange('relationship', 'spouse')}
            >
              <Ionicons name="heart" size={24} color="#6B7280" />
              <View style={styles.relationshipOptionText}>
                <Text style={styles.relationshipOptionTitle}>Spouse</Text>
                <Text style={styles.relationshipOptionSubtitle}>I was married to the deceased</Text>
              </View>
              {certificateData.relationship === 'spouse' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C2D12" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.relationshipOption,
                certificateData.relationship === 'child' && styles.selectedRelationshipOption
              ]}
              onPress={() => handleInputChange('relationship', 'child')}
            >
              <Ionicons name="people" size={24} color="#6B7280" />
              <View style={styles.relationshipOptionText}>
                <Text style={styles.relationshipOptionTitle}>Child</Text>
                <Text style={styles.relationshipOptionSubtitle}>I am a child of the deceased</Text>
              </View>
              {certificateData.relationship === 'child' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C2D12" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.relationshipOption,
                certificateData.relationship === 'parent' && styles.selectedRelationshipOption
              ]}
              onPress={() => handleInputChange('relationship', 'parent')}
            >
              <Ionicons name="person" size={24} color="#6B7280" />
              <View style={styles.relationshipOptionText}>
                <Text style={styles.relationshipOptionTitle}>Parent</Text>
                <Text style={styles.relationshipOptionSubtitle}>I am a parent of the deceased</Text>
              </View>
              {certificateData.relationship === 'parent' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C2D12" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.relationshipOption,
                certificateData.relationship === 'family' && styles.selectedRelationshipOption
              ]}
              onPress={() => handleInputChange('relationship', 'family')}
            >
              <Ionicons name="home" size={24} color="#6B7280" />
              <View style={styles.relationshipOptionText}>
                <Text style={styles.relationshipOptionTitle}>Family Member</Text>
                <Text style={styles.relationshipOptionSubtitle}>I am a family member of the deceased</Text>
              </View>
              {certificateData.relationship === 'family' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C2D12" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.relationshipOption,
                certificateData.relationship === 'legal' && styles.selectedRelationshipOption
              ]}
              onPress={() => handleInputChange('relationship', 'legal')}
            >
              <Ionicons name="document" size={24} color="#6B7280" />
              <View style={styles.relationshipOptionText}>
                <Text style={styles.relationshipOptionTitle}>Legal Representative</Text>
                <Text style={styles.relationshipOptionSubtitle}>I have legal authority to request</Text>
              </View>
              {certificateData.relationship === 'legal' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C2D12" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Certificate Type</Text>
            <TouchableOpacity
              style={[
                styles.certificateOption,
                certificateData.certificateType === 'short' && styles.selectedCertificateOption
              ]}
              onPress={() => handleInputChange('certificateType', 'short')}
            >
              <Ionicons name="document" size={24} color="#6B7280" />
              <View style={styles.certificateOptionText}>
                <Text style={styles.certificateOptionTitle}>Short Form</Text>
                <Text style={styles.certificateOptionSubtitle}>Basic death information</Text>
              </View>
              {certificateData.certificateType === 'short' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C2D12" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.certificateOption,
                certificateData.certificateType === 'long' && styles.selectedCertificateOption
              ]}
              onPress={() => handleInputChange('certificateType', 'long')}
            >
              <Ionicons name="document-text" size={24} color="#6B7280" />
              <View style={styles.certificateOptionText}>
                <Text style={styles.certificateOptionTitle}>Long Form</Text>
                <Text style={styles.certificateOptionSubtitle}>Detailed death information with cause</Text>
              </View>
              {certificateData.certificateType === 'long' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C2D12" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <TextInput
              style={[styles.fieldInput, errors.email && styles.errorInput]}
              value={certificateData.email}
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
              value={certificateData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Payment Method</Text>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                certificateData.paymentMethod === 'rbc' && styles.selectedPaymentOption
              ]}
              onPress={() => handleInputChange('paymentMethod', 'rbc')}
            >
              <Ionicons name="card" size={24} color="#6B7280" />
              <View style={styles.paymentOptionText}>
                <Text style={styles.paymentOptionTitle}>RBC Account</Text>
                <Text style={styles.paymentOptionSubtitle}>Pay with your RBC account</Text>
              </View>
              {certificateData.paymentMethod === 'rbc' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C2D12" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                certificateData.paymentMethod === 'visa' && styles.selectedPaymentOption
              ]}
              onPress={() => handleInputChange('paymentMethod', 'visa')}
            >
              <Ionicons name="card-outline" size={24} color="#6B7280" />
              <View style={styles.paymentOptionText}>
                <Text style={styles.paymentOptionTitle}>Visa Debit</Text>
                <Text style={styles.paymentOptionSubtitle}>Pay with Visa debit card</Text>
              </View>
              {certificateData.paymentMethod === 'visa' && (
                <Ionicons name="checkmark-circle" size={20} color="#7C2D12" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.processingInfo}>
            <Ionicons name="time" size={20} color="#6B7280" />
            <Text style={styles.processingText}>Processing time: Same day</Text>
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
        <Text style={styles.confirmationTitle}>Confirm Request</Text>
        
        <View style={styles.confirmationDetails}>
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Deceased's Name</Text>
            <Text style={styles.confirmationValue}>{certificateData.deceasedFullName}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Date of Death</Text>
            <Text style={styles.confirmationValue}>{certificateData.dateOfDeath}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Place of Death</Text>
            <Text style={styles.confirmationValue}>{certificateData.placeOfDeath}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Certificate Type</Text>
            <Text style={styles.confirmationValue}>
              {certificateData.certificateType === 'short' ? 'Short Form' : 'Long Form'}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Relationship</Text>
            <Text style={styles.confirmationValue}>
              {certificateData.relationship === 'spouse' ? 'Spouse' :
               certificateData.relationship === 'child' ? 'Child' :
               certificateData.relationship === 'parent' ? 'Parent' :
               certificateData.relationship === 'family' ? 'Family Member' : 'Legal Representative'}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Processing Time</Text>
            <Text style={styles.confirmationValue}>Same day</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Certificate Fee</Text>
            <Text style={[styles.confirmationValue, styles.amountText]}>$15.00</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Payment Method</Text>
            <Text style={styles.confirmationValue}>
              {certificateData.paymentMethod === 'rbc' ? 'RBC Account' : 'Visa Debit'}
            </Text>
          </View>
        </View>

        <View style={styles.demoNotice}>
          <Text style={styles.demoNoticeText}>
            <Text style={styles.demoNoticeTitle}>Note:</Text> This is a demo application. No real death certificate will be processed.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep('form')}>
        <Text style={styles.secondaryButtonText}>Back to Edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderProcessing = () => (
    <View style={styles.processingContainer}>
      <ActivityIndicator size="large" color="#7C2D12" />
      <Text style={styles.processingTitle}>Processing Request</Text>
      <Text style={styles.processingSubtitle}>Please wait while we process your request...</Text>
    </View>
  );

  const renderSuccess = () => (
    <ScrollView style={styles.content}>
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={40} color="#10B981" />
        </View>
        <Text style={styles.successTitle}>Request Submitted!</Text>
        <Text style={styles.successSubtitle}>Your death certificate request has been received</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.transactionDetailsTitle}>Request Details</Text>
        
        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Reference Number</Text>
            <Text style={styles.transactionValue}>DC{Date.now().toString().slice(-6)}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Processing Time</Text>
            <Text style={styles.transactionValue}>Same day</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Fee</Text>
            <Text style={styles.transactionValue}>$15.00</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Status</Text>
            <Text style={[styles.transactionValue, styles.statusProcessing]}>Being Processed</Text>
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
      case 'form': return 'Death Certificate';
      case 'confirm': return 'Confirm Request';
      case 'processing': return 'Processing';
      case 'success': return 'Request Submitted';
      default: return 'Death Certificate';
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
    backgroundColor: '#FEF3C7',
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
  relationshipOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedRelationshipOption: {
    borderColor: '#7C2D12',
    backgroundColor: '#FEF3C7',
  },
  relationshipOptionText: {
    flex: 1,
    marginLeft: 12,
  },
  relationshipOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  relationshipOptionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  certificateOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedCertificateOption: {
    borderColor: '#7C2D12',
    backgroundColor: '#FEF3C7',
  },
  certificateOptionText: {
    flex: 1,
    marginLeft: 12,
  },
  certificateOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  certificateOptionSubtitle: {
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
    borderColor: '#7C2D12',
    backgroundColor: '#FEF3C7',
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
    backgroundColor: '#7C2D12',
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
    color: '#7C2D12',
  },
  demoNotice: {
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
  },
  demoNoticeText: {
    fontSize: 14,
    color: '#92400E',
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