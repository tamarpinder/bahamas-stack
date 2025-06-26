import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Share
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReceiveMoneyPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('qr');

  const accountInfo = {
    accountNumber: '****4567',
    routingNumber: '242001234',
    bankName: 'Royal Bank of Canada - Bahamas',
    accountHolder: 'John Doe'
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Send me money using:\nBank: ${accountInfo.bankName}\nAccount: ${accountInfo.accountNumber}\nRouting: ${accountInfo.routingNumber}\nName: ${accountInfo.accountHolder}`,
        title: 'My Payment Details'
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const renderQRTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.qrContainer}>
        <View style={styles.qrPlaceholder}>
          <Ionicons name="qr-code" size={120} color="#6B7280" />
        </View>
        <Text style={styles.qrTitle}>Scan to Send Money</Text>
        <Text style={styles.qrSubtitle}>
          Share this QR code with others so they can send you money instantly
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share" size={24} color="#3B82F6" />
          <Text style={styles.actionButtonText}>Share QR Code</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download" size={24} color="#10B981" />
          <Text style={styles.actionButtonText}>Save to Photos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderAccountTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountTitle}>Account Details</Text>
        <Text style={styles.accountSubtitle}>
          Share these details for bank transfers and deposits
        </Text>

        <View style={styles.accountDetails}>
          <View style={styles.accountField}>
            <Text style={styles.fieldLabel}>Account Holder</Text>
            <View style={styles.fieldValue}>
              <Text style={styles.fieldText}>{accountInfo.accountHolder}</Text>
              <TouchableOpacity>
                <Ionicons name="copy" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.accountField}>
            <Text style={styles.fieldLabel}>Bank Name</Text>
            <View style={styles.fieldValue}>
              <Text style={styles.fieldText}>{accountInfo.bankName}</Text>
              <TouchableOpacity>
                <Ionicons name="copy" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.accountField}>
            <Text style={styles.fieldLabel}>Account Number</Text>
            <View style={styles.fieldValue}>
              <Text style={styles.fieldText}>{accountInfo.accountNumber}</Text>
              <TouchableOpacity>
                <Ionicons name="copy" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.accountField}>
            <Text style={styles.fieldLabel}>Routing Number</Text>
            <View style={styles.fieldValue}>
              <Text style={styles.fieldText}>{accountInfo.routingNumber}</Text>
              <TouchableOpacity>
                <Ionicons name="copy" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share" size={20} color="white" />
          <Text style={styles.shareButtonText}>Share Account Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receive Money</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Service Header */}
        <View style={styles.serviceHeader}>
          <View style={styles.serviceIcon}>
            <Ionicons name="arrow-down-circle" size={32} color="#10B981" />
          </View>
          <View>
            <Text style={styles.serviceTitle}>Receive Money</Text>
            <Text style={styles.serviceSubtitle}>Get paid quickly and securely</Text>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabSelector}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'qr' && styles.activeTab]}
            onPress={() => setActiveTab('qr')}
          >
            <Ionicons 
              name="qr-code" 
              size={20} 
              color={activeTab === 'qr' ? '#3B82F6' : '#6B7280'} 
            />
            <Text style={[
              styles.tabText,
              activeTab === 'qr' && styles.activeTabText
            ]}>
              QR Code
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'account' && styles.activeTab]}
            onPress={() => setActiveTab('account')}
          >
            <Ionicons 
              name="business" 
              size={20} 
              color={activeTab === 'account' ? '#3B82F6' : '#6B7280'} 
            />
            <Text style={[
              styles.tabText,
              activeTab === 'account' && styles.activeTabText
            ]}>
              Account Details
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'qr' ? renderQRTab() : renderAccountTab()}
      </View>
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
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#EFF6FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  tabContent: {
    flex: 1,
  },
  qrContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  qrSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  accountContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  accountSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  accountDetails: {
    marginBottom: 24,
  },
  accountField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  fieldValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  fieldText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});