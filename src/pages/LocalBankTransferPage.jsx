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
  ActivityIndicator,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LocalBankTransferPage({ onBack }) {
  const [step, setStep] = useState('form');
  const [transferData, setTransferData] = useState({
    recipientName: '',
    recipientBank: '',
    recipientAccount: '',
    amount: '',
    reference: '',
    paymentMethod: 'bank-account'
  });
  const [errors, setErrors] = useState({});
  const [showBankPicker, setShowBankPicker] = useState(false);

  const bahamianBanks = [
    'Royal Bank of Canada',
    'Scotiabank',
    'FirstCaribbean International Bank',
    'Commonwealth Bank',
    'Fidelity Bank',
    'SG Hambros Bank'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!transferData.recipientName.trim()) {
      newErrors.recipientName = 'Please enter recipient name';
    }
    
    if (!transferData.recipientBank) {
      newErrors.recipientBank = 'Please select recipient bank';
    }
    
    if (!transferData.recipientAccount || transferData.recipientAccount.length < 6) {
      newErrors.recipientAccount = 'Please enter a valid account number (minimum 6 digits)';
    }
    
    if (!transferData.amount || parseFloat(transferData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (parseFloat(transferData.amount) > 50000) {
      newErrors.amount = 'Amount cannot exceed $50,000 for demo purposes';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setTransferData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContinue = () => {
    if (validateForm()) {
      setStep('confirm');
    }
  };

  const handleTransfer = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const renderBankPicker = () => (
    <Modal
      visible={showBankPicker}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Bank</Text>
            <TouchableOpacity onPress={() => setShowBankPicker(false)}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.bankList}>
            {bahamianBanks.map((bank) => (
              <TouchableOpacity
                key={bank}
                style={styles.bankOption}
                onPress={() => {
                  handleInputChange('recipientBank', bank);
                  setShowBankPicker(false);
                }}
              >
                <Text style={styles.bankOptionText}>{bank}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderForm = () => (
    <ScrollView style={styles.content}>
      <View style={styles.card}>
        <View style={styles.serviceHeader}>
          <View style={styles.serviceIcon}>
            <Ionicons name="swap-horizontal" size={32} color="#F97316" />
          </View>
          <View>
            <Text style={styles.serviceTitle}>Local Bank Transfer</Text>
            <Text style={styles.serviceSubtitle}>Send money to any Bahamian bank</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Recipient Name</Text>
            <TextInput
              style={[styles.fieldInput, errors.recipientName && styles.errorInput]}
              value={transferData.recipientName}
              onChangeText={(value) => handleInputChange('recipientName', value)}
              placeholder="Enter recipient's full name"
            />
            {errors.recipientName && (
              <Text style={styles.errorText}>{errors.recipientName}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Recipient Bank</Text>
            <TouchableOpacity
              style={[styles.fieldInput, styles.dropdownInput, errors.recipientBank && styles.errorInput]}
              onPress={() => setShowBankPicker(true)}
            >
              <Text style={[styles.dropdownText, !transferData.recipientBank && styles.placeholderText]}>
                {transferData.recipientBank || "Select recipient's bank"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
            {errors.recipientBank && (
              <Text style={styles.errorText}>{errors.recipientBank}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Recipient Account Number</Text>
            <TextInput
              style={[styles.fieldInput, errors.recipientAccount && styles.errorInput]}
              value={transferData.recipientAccount}
              onChangeText={(value) => handleInputChange('recipientAccount', value)}
              placeholder="Enter recipient's account number"
              keyboardType="numeric"
            />
            {errors.recipientAccount && (
              <Text style={styles.errorText}>{errors.recipientAccount}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Amount (BSD)</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={[styles.amountInput, errors.amount && styles.errorInput]}
                value={transferData.amount}
                onChangeText={(value) => handleInputChange('amount', value)}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>
            {errors.amount && (
              <Text style={styles.errorText}>{errors.amount}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Reference (Optional)</Text>
            <TextInput
              style={styles.fieldInput}
              value={transferData.reference}
              onChangeText={(value) => handleInputChange('reference', value)}
              placeholder="Payment reference or note"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Payment Method</Text>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                transferData.paymentMethod === 'bank-account' && styles.selectedPaymentMethod
              ]}
              onPress={() => handleInputChange('paymentMethod', 'bank-account')}
            >
              <Ionicons name="business" size={24} color="#6B7280" />
              <View style={styles.paymentMethodText}>
                <Text style={styles.paymentMethodTitle}>Royal Bank of Canada</Text>
                <Text style={styles.paymentMethodSubtitle}>Account ending in 4567</Text>
              </View>
              {transferData.paymentMethod === 'bank-account' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethod,
                transferData.paymentMethod === 'debit-card' && styles.selectedPaymentMethod
              ]}
              onPress={() => handleInputChange('paymentMethod', 'debit-card')}
            >
              <Ionicons name="card" size={24} color="#6B7280" />
              <View style={styles.paymentMethodText}>
                <Text style={styles.paymentMethodTitle}>Debit Card</Text>
                <Text style={styles.paymentMethodSubtitle}>Visa ending in 8901</Text>
              </View>
              {transferData.paymentMethod === 'debit-card' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {renderBankPicker()}
    </ScrollView>
  );

  const renderConfirmation = () => (
    <ScrollView style={styles.content}>
      <View style={styles.card}>
        <Text style={styles.confirmationTitle}>Confirm Transfer</Text>
        
        <View style={styles.confirmationDetails}>
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Recipient</Text>
            <Text style={styles.confirmationValue}>{transferData.recipientName}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Bank</Text>
            <Text style={styles.confirmationValue}>{transferData.recipientBank}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Account</Text>
            <Text style={styles.confirmationValue}>***{transferData.recipientAccount.slice(-4)}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Amount</Text>
            <Text style={[styles.confirmationValue, styles.amountText]}>
              ${parseFloat(transferData.amount).toFixed(2)}
            </Text>
          </View>
          
          {transferData.reference && (
            <View style={styles.confirmationRow}>
              <Text style={styles.confirmationLabel}>Reference</Text>
              <Text style={styles.confirmationValue}>{transferData.reference}</Text>
            </View>
          )}
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Payment Method</Text>
            <Text style={styles.confirmationValue}>
              {transferData.paymentMethod === 'bank-account' ? 'RBC Account' : 'Visa Debit'}
            </Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Transfer Fee</Text>
            <Text style={[styles.confirmationValue, styles.freeText]}>FREE</Text>
          </View>
        </View>

        <View style={styles.demoNotice}>
          <Text style={styles.demoNoticeText}>
            <Text style={styles.demoNoticeTitle}>Note:</Text> This is a demo transaction. No real money will be transferred.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleTransfer}>
        <Text style={styles.buttonText}>Transfer ${parseFloat(transferData.amount).toFixed(2)}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep('form')}>
        <Text style={styles.secondaryButtonText}>Back to Edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderProcessing = () => (
    <View style={styles.processingContainer}>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={styles.processingTitle}>Processing Transfer</Text>
      <Text style={styles.processingSubtitle}>Please wait while we process your transfer...</Text>
    </View>
  );

  const renderSuccess = () => (
    <ScrollView style={styles.content}>
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={40} color="#10B981" />
        </View>
        <Text style={styles.successTitle}>Transfer Successful!</Text>
        <Text style={styles.successSubtitle}>Your money has been sent to {transferData.recipientName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.transactionDetailsTitle}>Transaction Details</Text>
        
        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Reference Number</Text>
            <Text style={styles.transactionValue}>LBT{Date.now().toString().slice(-6)}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Amount Sent</Text>
            <Text style={styles.transactionValue}>${parseFloat(transferData.amount).toFixed(2)}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Date & Time</Text>
            <Text style={styles.transactionValue}>{new Date().toLocaleString()}</Text>
          </View>
          
          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>Status</Text>
            <Text style={[styles.transactionValue, styles.statusCompleted]}>Completed</Text>
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
          setTransferData({ recipientName: '', recipientBank: '', recipientAccount: '', amount: '', reference: '', paymentMethod: 'bank-account' });
          setErrors({});
        }}
      >
        <Text style={styles.secondaryButtonText}>Make Another Transfer</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const getHeaderTitle = () => {
    switch (step) {
      case 'form': return 'Bank Transfer';
      case 'confirm': return 'Confirm Transfer';
      case 'processing': return 'Processing';
      case 'success': return 'Transfer Complete';
      default: return 'Local Bank Transfer';
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
    backgroundColor: '#FED7AA',
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
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#111827',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  errorInput: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingLeft: 16,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  bankList: {
    maxHeight: 300,
  },
  bankOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  bankOptionText: {
    fontSize: 16,
    color: '#111827',
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

