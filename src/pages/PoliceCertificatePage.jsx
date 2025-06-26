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

export default function PoliceCertificatePage({ onBack }) {
  const [step, setStep] = useState('form');
  const [certificateData, setCertificateData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationalId: '',
    email: '',
    phone: '',
    address: '',
    purpose: 'employment',
    urgency: 'standard'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!certificateData.firstName.trim()) {
      newErrors.firstName = 'Please enter your first name';
    }
    
    if (!certificateData.lastName.trim()) {
      newErrors.lastName = 'Please enter your last name';
    }
    
    if (!certificateData.nationalId || certificateData.nationalId.length < 9) {
      newErrors.nationalId = 'Please enter a valid national ID';
    }
    
    if (!certificateData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!certificateData.phone || certificateData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!certificateData.address.trim()) {
      newErrors.address = 'Please enter your address';
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
            <Ionicons name="shield-checkmark" size={32} color="#3B82F6" />
          </View>
          <View>
            <Text style={styles.serviceTitle}>Police Certificate</Text>
            <Text style={styles.serviceSubtitle}>Apply for a police clearance certificate</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>First Name</Text>
            <TextInput
              style={[styles.fieldInput, errors.firstName && styles.errorInput]}
              value={certificateData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Last Name</Text>
            <TextInput
              style={[styles.fieldInput, errors.lastName && styles.errorInput]}
              value={certificateData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <TextInput
              style={styles.fieldInput}
              value={certificateData.dateOfBirth}
              onChangeText={(value) => handleInputChange('dateOfBirth', value)}
              placeholder="MM/DD/YYYY"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>National ID Number</Text>
            <TextInput
              style={[styles.fieldInput, errors.nationalId && styles.errorInput]}
              value={certificateData.nationalId}
              onChangeText={(value) => handleInputChange('nationalId', value)}
              placeholder="Enter your national ID number"
              keyboardType="numeric"
            />
            {errors.nationalId && (
              <Text style={styles.errorText}>{errors.nationalId}</Text>
            )}
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
            <Text style={styles.fieldLabel}>Current Address</Text>
            <TextInput
              style={[styles.fieldInput, errors.address && styles.errorInput]}
              value={certificateData.address}
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
            <Text style={styles.fieldLabel}>Purpose of Certificate</Text>
            <TouchableOpacity
              style={[
                styles.purposeOption,
                certificateData.purpose === 'employment' && styles.selectedPurposeOption
              ]}
              onPress={() => handleInputChange('purpose', 'employment')}
            >
              <Ionicons name="briefcase" size={24} color="#6B7280" />
              <View style={styles.purposeOptionText}>
                <Text style={styles.purposeOptionTitle}>Employment</Text>
                <Text style={styles.purposeOptionSubtitle}>For job applications</Text>
              </View>
              {certificateData.purpose === 'employment' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.purposeOption,
                certificateData.purpose === 'immigration' && styles.selectedPurposeOption
              ]}
              onPress={() => handleInputChange('purpose', 'immigration')}
            >
              <Ionicons name="airplane" size={24} color="#6B7280" />
              <View style={styles.purposeOptionText}>
                <Text style={styles.purposeOptionTitle}>Immigration</Text>
                <Text style={styles.purposeOptionSubtitle}>For visa applications</Text>
              </View>
              {certificateData.purpose === 'immigration' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.purposeOption,
                certificateData.purpose === 'education' && styles.selectedPurposeOption
              ]}
              onPress={() => handleInputChange('purpose', 'education')}
            >
              <Ionicons name="school" size={24} color="#6B7280" />
              <View style={styles.purposeOptionText}>
                <Text style={styles.purposeOptionTitle}>Education</Text>
                <Text style={styles.purposeOptionSubtitle}>For school applications</Text>
              </View>
              {certificateData.purpose === 'education' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Processing Time</Text>
            <TouchableOpacity
              style={[
                styles.urgencyOption,
                certificateData.urgency === 'standard' && styles.selectedUrgencyOption
              ]}
              onPress={() => handleInputChange('urgency', 'standard')}
            >
              <Ionicons name="time" size={24} color="#6B7280" />
              <View style={styles.urgencyOptionText}>
                <Text style={styles.urgencyOptionTitle}>Standard Processing</Text>
                <Text style={styles.urgencyOptionSubtitle}>7-10 business days - $25</Text>
              </View>
              {certificateData.urgency === 'standard' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.urgencyOption,
                certificateData.urgency === 'expedited' && styles.selectedUrgencyOption
              ]}
              onPress={() => handleInputChange('urgency', 'expedited')}
            >
              <Ionicons name="flash" size={24} color="#6B7280" />
              <View style={styles.urgencyOptionText}>
                <Text style={styles.urgencyOptionTitle}>Expedited Processing</Text>
                <Text style={styles.urgencyOptionSubtitle}>2-3 business days - $50</Text>
              </View>
              {certificateData.urgency === 'expedited' && (
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
        <Text style={styles.confirmationTitle}>Confirm Application</Text>
        
        <View style={styles.confirmationDetails}>
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Full Name</Text>
            <Text style={styles.confirmationValue}>{certificateData.firstName} {certificateData.lastName}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>National ID</Text>
            <Text style={styles.confirmationValue}>{certificateData.nationalId}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Email</Text>
            <Text style={styles.confirmationValue}>{certificateData.email}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Purpose</Text>
            <Text style={styles.confirmationValue}>
              {certificateData.purpose.charAt(0).toUpperCase() + certificateData.purpose.slice(1)}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Processing</Text>
            <Text style={styles.confirmationValue}>
              {certificateData.urgency === 'standard' ? 'Standard (7-10 days)' : 'Expedited (2-3 days)'}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Processing Fee</Text>
            <Text style={[styles.confirmationValue, styles.amountText]}>
              ${certificateData.urgency === 'standard' ? '25.00' : '50.00'}
            </Text>
          </View>
        </View>

        <View style={styles.demoNotice}>
          <Text style={styles.demoNoticeText}>
            <Text style={styles.demoNoticeTitle}>Note:</Text> This is a demo application. No real certificate will be issued.
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
        <Text style={styles.successSubtitle}>Your police certificate application has been received</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.transactionDetailsTitle}>Application Details</Text>
        
        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Reference Number</Text>
            <Text style={styles.transactionValue}>PCC{Date.now().toString().slice(-6)}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Processing Time</Text>
            <Text style={styles.transactionValue}>
              {certificateData.urgency === 'standard' ? '7-10 business days' : '2-3 business days'}
            </Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Fee</Text>
            <Text style={styles.transactionValue}>
              ${certificateData.urgency === 'standard' ? '25.00' : '50.00'}
            </Text>
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
      case 'form': return 'Police Certificate';
      case 'confirm': return 'Confirm Application';
      case 'processing': return 'Processing';
      case 'success': return 'Application Submitted';
      default: return 'Police Certificate';
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
  urgencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedUrgencyOption: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  urgencyOptionText: {
    flex: 1,
    marginLeft: 12,
  },
  urgencyOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  urgencyOptionSubtitle: {
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