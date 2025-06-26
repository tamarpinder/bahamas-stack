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

export default function BirthCertificatePage({ onBack }) {
  const [step, setStep] = useState('form');
  const [certificateData, setCertificateData] = useState({
    fullName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    fatherName: '',
    motherName: '',
    certificateType: 'short',
    relationship: 'self',
    email: '',
    phone: '',
    paymentMethod: 'rbc'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!certificateData.fullName.trim()) {
      newErrors.fullName = 'Please enter the full name';
    }
    
    if (!certificateData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Please enter the date of birth';
    }
    
    if (!certificateData.placeOfBirth.trim()) {
      newErrors.placeOfBirth = 'Please enter the place of birth';
    }
    
    if (!certificateData.fatherName.trim()) {
      newErrors.fatherName = 'Please enter the father\'s name';
    }
    
    if (!certificateData.motherName.trim()) {
      newErrors.motherName = 'Please enter the mother\'s name';
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
      // Add document to Digital Locker
      const referenceNumber = `BC${Date.now().toString().slice(-6)}`;
      addDocumentToDigitalLocker({
        title: 'Birth Certificate',
        type: 'Government Document',
        issuer: 'Registrar General\'s Office',
        description: `Official birth certificate for ${certificateData.fullName}`,
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
            <Ionicons name="document-text" size={32} color="#1D4ED8" />
          </View>
          <View>
            <Text style={styles.serviceTitle}>Birth Certificate</Text>
            <Text style={styles.serviceSubtitle}>Request a certified birth certificate</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Full Name of Person</Text>
            <TextInput
              style={[styles.fieldInput, errors.fullName && styles.errorInput]}
              value={certificateData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              placeholder="Enter full name as it appears on birth record"
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <TextInput
              style={[styles.fieldInput, errors.dateOfBirth && styles.errorInput]}
              value={certificateData.dateOfBirth}
              onChangeText={(value) => handleInputChange('dateOfBirth', value)}
              placeholder="MM/DD/YYYY"
            />
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Place of Birth</Text>
            <TextInput
              style={[styles.fieldInput, errors.placeOfBirth && styles.errorInput]}
              value={certificateData.placeOfBirth}
              onChangeText={(value) => handleInputChange('placeOfBirth', value)}
              placeholder="City, Island, Bahamas"
            />
            {errors.placeOfBirth && (
              <Text style={styles.errorText}>{errors.placeOfBirth}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Father's Full Name</Text>
            <TextInput
              style={[styles.fieldInput, errors.fatherName && styles.errorInput]}
              value={certificateData.fatherName}
              onChangeText={(value) => handleInputChange('fatherName', value)}
              placeholder="Enter father's full name"
            />
            {errors.fatherName && (
              <Text style={styles.errorText}>{errors.fatherName}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Mother's Full Name</Text>
            <TextInput
              style={[styles.fieldInput, errors.motherName && styles.errorInput]}
              value={certificateData.motherName}
              onChangeText={(value) => handleInputChange('motherName', value)}
              placeholder="Enter mother's full name"
            />
            {errors.motherName && (
              <Text style={styles.errorText}>{errors.motherName}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Your Relationship to Person</Text>
            <TouchableOpacity
              style={[
                styles.relationshipOption,
                certificateData.relationship === 'self' && styles.selectedRelationshipOption
              ]}
              onPress={() => handleInputChange('relationship', 'self')}
            >
              <Ionicons name="person" size={24} color="#6B7280" />
              <View style={styles.relationshipOptionText}>
                <Text style={styles.relationshipOptionTitle}>Self</Text>
                <Text style={styles.relationshipOptionSubtitle}>This is my own birth certificate</Text>
              </View>
              {certificateData.relationship === 'self' && (
                <Ionicons name="checkmark-circle" size={20} color="#1D4ED8" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.relationshipOption,
                certificateData.relationship === 'parent' && styles.selectedRelationshipOption
              ]}
              onPress={() => handleInputChange('relationship', 'parent')}
            >
              <Ionicons name="people" size={24} color="#6B7280" />
              <View style={styles.relationshipOptionText}>
                <Text style={styles.relationshipOptionTitle}>Parent</Text>
                <Text style={styles.relationshipOptionSubtitle}>I am the parent of this person</Text>
              </View>
              {certificateData.relationship === 'parent' && (
                <Ionicons name="checkmark-circle" size={20} color="#1D4ED8" />
              )}
            </TouchableOpacity>

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
                <Text style={styles.relationshipOptionSubtitle}>I am married to this person</Text>
              </View>
              {certificateData.relationship === 'spouse' && (
                <Ionicons name="checkmark-circle" size={20} color="#1D4ED8" />
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
                <Ionicons name="checkmark-circle" size={20} color="#1D4ED8" />
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
                <Text style={styles.certificateOptionSubtitle}>Basic birth information</Text>
              </View>
              {certificateData.certificateType === 'short' && (
                <Ionicons name="checkmark-circle" size={20} color="#1D4ED8" />
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
                <Text style={styles.certificateOptionSubtitle}>Detailed birth information with parents</Text>
              </View>
              {certificateData.certificateType === 'long' && (
                <Ionicons name="checkmark-circle" size={20} color="#1D4ED8" />
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
                <Ionicons name="checkmark-circle" size={20} color="#1D4ED8" />
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
                <Ionicons name="checkmark-circle" size={20} color="#1D4ED8" />
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
            <Text style={styles.confirmationLabel}>Full Name</Text>
            <Text style={styles.confirmationValue}>{certificateData.fullName}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Date of Birth</Text>
            <Text style={styles.confirmationValue}>{certificateData.dateOfBirth}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Place of Birth</Text>
            <Text style={styles.confirmationValue}>{certificateData.placeOfBirth}</Text>
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
              {certificateData.relationship === 'self' ? 'Self' :
               certificateData.relationship === 'parent' ? 'Parent' :
               certificateData.relationship === 'spouse' ? 'Spouse' : 'Legal Representative'}
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
            <Text style={styles.demoNoticeTitle}>Note:</Text> This is a demo application. No real birth certificate will be processed.
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
      <ActivityIndicator size="large" color="#1D4ED8" />
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
        <Text style={styles.successSubtitle}>Your birth certificate request has been received and added to your Digital Locker</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.transactionDetailsTitle}>Request Details</Text>
        
        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Reference Number</Text>
            <Text style={styles.transactionValue}>BC{Date.now().toString().slice(-6)}</Text>
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
      case 'form': return 'Birth Certificate';
      case 'confirm': return 'Confirm Request';
      case 'processing': return 'Processing';
      case 'success': return 'Request Submitted';
      default: return 'Birth Certificate';
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
    backgroundColor: '#DBEAFE',
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
    borderColor: '#1D4ED8',
    backgroundColor: '#DBEAFE',
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
    borderColor: '#1D4ED8',
    backgroundColor: '#DBEAFE',
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
    borderColor: '#1D4ED8',
    backgroundColor: '#DBEAFE',
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
    backgroundColor: '#1D4ED8',
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
    color: '#1D4ED8',
  },
  demoNotice: {
    padding: 16,
    backgroundColor: '#DBEAFE',
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