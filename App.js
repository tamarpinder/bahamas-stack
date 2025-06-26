import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  ScrollView, 
  StyleSheet, 
  StatusBar, 
  SafeAreaView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import pages
import BPLPaymentPage from './src/pages/BPLPaymentPage';
import WaterSeweragePaymentPage from './src/pages/WaterSeweragePaymentPage';
import CableBahamasPaymentPage from './src/pages/CableBahamasPaymentPage';
import LocalBankTransferPage from './src/pages/LocalBankTransferPage';
import InternationalBankTransferPage from './src/pages/InternationalBankTransferPage';
import BalanceHistoryPage from './src/pages/BalanceHistoryPage';
import ReceiveMoneyPage from './src/pages/ReceiveMoneyPage';
import DriverLicenseRenewalPage from './src/pages/DriverLicenseRenewalPage';
import PoliceCertificatePage from './src/pages/PoliceCertificatePage';
import VehicleRegistrationPage from './src/pages/VehicleRegistrationPage';
import VehicleInspectionPage from './src/pages/VehicleInspectionPage';
import PoliceRecordPage from './src/pages/PoliceRecordPage';
import FirearmRegistrationPage from './src/pages/FirearmRegistrationPage';
import PassportApplicationPage from './src/pages/PassportApplicationPage';
import PassportRenewalPage from './src/pages/PassportRenewalPage';
import BirthCertificatePage from './src/pages/BirthCertificatePage';
import DeathCertificatePage from './src/pages/DeathCertificatePage';
import MarriageCertificatePage from './src/pages/MarriageCertificatePage';
import InterIslandFlightsPage from './src/pages/InterIslandFlightsPage';
import CarRentalsPage from './src/pages/CarRentalsPage';
import TaxiPage from './src/pages/TaxiPage';
import DigitalLockerPage from './src/pages/DigitalLockerPage';
import NotificationSystem from './src/components/NotificationSystem';
import BrandIcon from './src/components/BrandIcon';

// Import actual brand assets
const bahamasIcon = require('./src/assets/icons/brand-icon.png');
const bahamasLogo = require('./src/assets/icons/brand-logo.png');

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [kycData, setKycData] = useState({
    fullName: '',
    telephone: '',
    nibNumber: '',
    address: '',
    island: '',
    biometricType: ''
  });

  const handleLogin = () => {
    setShowKYC(true);
  };

  const handleSkip = () => {
    setIsGuest(true);
    setCurrentView('dashboard');
  };

  const handleKYCComplete = () => {
    setIsLoggedIn(true);
    setShowKYC(false);
    setCurrentView('dashboard');
  };

  const renderLoginPortal = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.loginContainer}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.centerContent}>
          <BrandIcon size={96} style={styles.logoContainer} showFallback={false} />
          
          <Text style={styles.title}>THE BAHAMAS STACK</Text>
          <Text style={styles.subtitle}>Your Digital Life App</Text>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Enter mobile number</Text>
            <Text style={styles.formSubtitle}>
              linked to your bank account to enable The Bahamas Stack
            </Text>

            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+242</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="000-0000"
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you agree to The Bahamas Stack's Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  const renderKYCPage = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.kycHeader}>
        <TouchableOpacity onPress={() => setShowKYC(false)}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Electronic KYC</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.kycContent}>
        <View style={styles.kycIntro}>
          <BrandIcon size={80} style={styles.kycLogoContainer} showFallback={false} />
          <Text style={styles.kycTitle}>Identity Verification</Text>
          <Text style={styles.kycSubtitle}>Complete your profile to access The Bahamas Stack</Text>
        </View>

        <View style={styles.formFields}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={styles.fieldInput}
              value={kycData.fullName}
              onChangeText={(text) => setKycData({...kycData, fullName: text})}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Telephone</Text>
            <TextInput
              style={[styles.fieldInput, styles.readOnlyInput]}
              value={`+242 ${phoneNumber}`}
              editable={false}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>N.I.B #</Text>
            <TextInput
              style={styles.fieldInput}
              value={kycData.nibNumber}
              onChangeText={(text) => setKycData({...kycData, nibNumber: text})}
              placeholder="Enter your NIB number"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Address</Text>
            <TextInput
              style={styles.fieldInput}
              value={kycData.address}
              onChangeText={(text) => setKycData({...kycData, address: text})}
              placeholder="Enter your address"
            />
          </View>

          <View style={styles.biometricSection}>
            <Text style={styles.fieldLabel}>Choose Biometric Method</Text>
            
            <TouchableOpacity
              style={[
                styles.biometricOption,
                kycData.biometricType === 'face' && styles.biometricSelected
              ]}
              onPress={() => setKycData({...kycData, biometricType: 'face'})}
            >
              <View style={styles.biometricIcon}>
                <Text style={styles.biometricEmoji}>👤</Text>
              </View>
              <View style={styles.biometricText}>
                <Text style={styles.biometricTitle}>Add Face ID</Text>
                <Text style={styles.biometricSubtitle}>Use facial recognition for secure login</Text>
              </View>
              {kycData.biometricType === 'face' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.biometricOption,
                kycData.biometricType === 'fingerprint' && styles.biometricSelected
              ]}
              onPress={() => setKycData({...kycData, biometricType: 'fingerprint'})}
            >
              <View style={styles.biometricIcon}>
                <Text style={styles.biometricEmoji}>👆</Text>
              </View>
              <View style={styles.biometricText}>
                <Text style={styles.biometricTitle}>Add Fingerprint</Text>
                <Text style={styles.biometricSubtitle}>Use fingerprint scanner for secure login</Text>
              </View>
              {kycData.biometricType === 'fingerprint' && (
                <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleKYCComplete}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderDashboard = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>{isGuest ? 'G' : 'U'}</Text>
          </TouchableOpacity>
          <BrandIcon size={48} showFallback={false} />
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => setShowNotifications(true)}
          >
            <Ionicons name="notifications" size={20} color="#6B7280" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bankingCard}>
          <View style={styles.bankingHeader}>
            <View style={styles.bankingHeaderContent}>
              <Text style={styles.bankingTitle}>Your Digital Life App</Text>
              <Text style={styles.bankingSubtitle}>Connect All Your Accounts</Text>
            </View>
            <TouchableOpacity style={styles.addBankButton}>
              <Text style={styles.addBankText}>Add Bank</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bankingStats}>
            <View style={styles.bankingStatsContent}>
              <Text style={styles.bankingCount}>2 Connected</Text>
              <Text style={styles.bankingStatus}>Bank Accounts</Text>
            </View>
            <TouchableOpacity style={styles.viewAccountsButton}>
              <Text style={styles.viewAccountsText}>View Accounts</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Payments</Text>
          <View style={styles.threeColumnGrid}>
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('bpl-payment')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="flash" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.serviceText}>BPL</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('water-sewerage-payment')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="water" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.serviceText}>Water & Sewage</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('cable-bahamas-payment')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#EDE9FE' }]}>
                <Ionicons name="tv" size={24} color="#8B5CF6" />
              </View>
              <Text style={styles.serviceText}>Cable Bahamas</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Money Transfer</Text>
          <View style={styles.twoColumnGrid}>
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('local-bank-transfer')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#FED7AA' }]}>
                <Ionicons name="business" size={24} color="#EA580C" />
              </View>
              <Text style={styles.serviceText}>Local Bank Transfer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('international-bank-transfer')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="globe" size={24} color="#059669" />
              </View>
              <Text style={styles.serviceText}>International Transfer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('balance-history')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#FECACA' }]}>
                <Ionicons name="bar-chart" size={24} color="#DC2626" />
              </View>
              <Text style={styles.serviceText}>Balance & History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('receive-money')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="cash" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.serviceText}>Receive Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Government Services</Text>
          <Text style={styles.sectionSubtitle}>🔗 Powered by MyGateway Integration</Text>
          <View style={styles.twoColumnGrid}>
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('road-traffic-department')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#FECACA' }]}>
                <Ionicons name="car" size={24} color="#DC2626" />
              </View>
              <Text style={styles.serviceText}>Road Traffic Department</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('police-department')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="shield-checkmark" size={24} color="#059669" />
              </View>
              <Text style={styles.serviceText}>Royal Bahamas Police Force</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('foreign-affairs')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#E0F2FE' }]}>
                <Ionicons name="globe" size={24} color="#0891B2" />
              </View>
              <Text style={styles.serviceText}>Ministry Of Foreign Affairs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('registrar-general')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#F3E8FF' }]}>
                <Ionicons name="document" size={24} color="#8B5CF6" />
              </View>
              <Text style={styles.serviceText}>Registrar General</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Do More With Bahamas Stack</Text>
          <View style={styles.twoColumnGrid}>
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('inter-island-flights')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="airplane" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.serviceText}>Inter Island Flights</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('taxi')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="car" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.serviceText}>Taxi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('car-rentals')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="car" size={24} color="#059669" />
              </View>
              <Text style={styles.serviceText}>Car Rentals</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.serviceCard}>
              <View style={[styles.serviceIcon, { backgroundColor: '#F3F4F6' }]}>
                <Ionicons name="grid" size={24} color="#6B7280" />
              </View>
              <Text style={styles.serviceText}>View All Services</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tools</Text>
          <View style={styles.twoColumnGrid}>
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('digital-locker')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#E0F2FE' }]}>
                <Ionicons name="folder" size={24} color="#0891B2" />
              </View>
              <Text style={styles.serviceText}>Digital Locker</Text>
              <Text style={styles.serviceSubtext}>Access Government Docs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.serviceCard}>
              <View style={[styles.serviceIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#059669" />
              </View>
              <Text style={styles.serviceText}>Ask AI</Text>
              <Text style={styles.serviceSubtext}>Ask AI Anything</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <NotificationSystem 
        visible={showNotifications}
        onClose={() => {
          setShowNotifications(false);
          setCurrentView('dashboard');
        }}
      />
    </SafeAreaView>
  );

  const renderRoadTrafficDepartment = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('dashboard')}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Road Traffic Department</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.departmentHeader}>
          <View style={styles.departmentIcon}>
            <Ionicons name="car" size={40} color="#DC2626" />
          </View>
          <Text style={styles.departmentTitle}>Road Traffic Department</Text>
          <Text style={styles.departmentSubtitle}>Vehicle and driving related services</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          <View style={styles.twoColumnGrid}>
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('driver-license')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="card" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.serviceText}>Driver License Renewal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('vehicle-registration')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="document-text" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.serviceText}>Vehicle Registration Renewal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('vehicle-inspection')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="search" size={24} color="#059669" />
              </View>
              <Text style={styles.serviceText}>Vehicle Inspection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const renderPoliceDepartment = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('dashboard')}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Royal Bahamas Police Force</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.departmentHeader}>
          <View style={styles.departmentIcon}>
            <Ionicons name="shield-checkmark" size={40} color="#059669" />
          </View>
          <Text style={styles.departmentTitle}>Royal Bahamas Police Force</Text>
          <Text style={styles.departmentSubtitle}>Law enforcement and security services</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          <View style={styles.twoColumnGrid}>
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('police-record')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="document-text" size={24} color="#059669" />
              </View>
              <Text style={styles.serviceText}>Police Record</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('firearm-registration')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="shield" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.serviceText}>Firearm Registration</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const renderForeignAffairs = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('dashboard')}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ministry Of Foreign Affairs</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.departmentHeader}>
          <View style={styles.departmentIcon}>
            <Ionicons name="globe" size={40} color="#0891B2" />
          </View>
          <Text style={styles.departmentTitle}>Ministry Of Foreign Affairs</Text>
          <Text style={styles.departmentSubtitle}>International travel and diplomatic services</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          <View style={styles.twoColumnGrid}>
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('passport-application')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="book" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.serviceText}>Passport Application</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('passport-renewal')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#E0F2FE' }]}>
                <Ionicons name="refresh" size={24} color="#0891B2" />
              </View>
              <Text style={styles.serviceText}>Passport Renewal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const renderRegistrarGeneral = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('dashboard')}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrar General</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.departmentHeader}>
          <View style={styles.departmentIcon}>
            <Ionicons name="document" size={40} color="#8B5CF6" />
          </View>
          <Text style={styles.departmentTitle}>Registrar General</Text>
          <Text style={styles.departmentSubtitle}>Civil registration and vital records</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          <View style={styles.twoColumnGrid}>
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('birth-certificate')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="person-add" size={24} color="#DC2626" />
              </View>
              <Text style={styles.serviceText}>Birth Certificate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('death-certificate')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#F3F4F6' }]}>
                <Ionicons name="person-remove" size={24} color="#6B7280" />
              </View>
              <Text style={styles.serviceText}>Death Certificate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.serviceCard}
              onPress={() => setCurrentView('marriage-certificate')}
            >
              <View style={[styles.serviceIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="heart" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.serviceText}>Marriage Certificate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const renderCurrentView = () => {
    const handleBack = () => setCurrentView('dashboard');
    
    switch (currentView) {
      case 'bpl-payment':
        return <BPLPaymentPage onBack={handleBack} />;
      case 'water-sewerage-payment':
        return <WaterSeweragePaymentPage onBack={handleBack} />;
      case 'cable-bahamas-payment':
        return <CableBahamasPaymentPage onBack={handleBack} />;
      case 'local-bank-transfer':
        return <LocalBankTransferPage onBack={handleBack} />;
      case 'international-bank-transfer':
        return <InternationalBankTransferPage onBack={handleBack} />;
      case 'balance-history':
        return <BalanceHistoryPage onBack={handleBack} />;
      case 'receive-money':
        return <ReceiveMoneyPage onBack={handleBack} />;
      case 'driver-license':
        return <DriverLicenseRenewalPage onBack={handleBack} />;
      case 'vehicle-registration':
        return <VehicleRegistrationPage onBack={handleBack} />;
      case 'vehicle-inspection':
        return <VehicleInspectionPage onBack={handleBack} />;
      case 'police-certificate':
        return <PoliceCertificatePage onBack={handleBack} />;
      case 'police-record':
        return <PoliceRecordPage onBack={handleBack} />;
      case 'firearm-registration':
        return <FirearmRegistrationPage onBack={handleBack} />;
      case 'passport-application':
        return <PassportApplicationPage onBack={handleBack} />;
      case 'passport-renewal':
        return <PassportRenewalPage onBack={handleBack} />;
      case 'birth-certificate':
        return <BirthCertificatePage onBack={handleBack} />;
      case 'death-certificate':
        return <DeathCertificatePage onBack={handleBack} />;
      case 'marriage-certificate':
        return <MarriageCertificatePage onBack={handleBack} />;
      case 'road-traffic-department':
        return renderRoadTrafficDepartment();
      case 'police-department':
        return renderPoliceDepartment();
      case 'foreign-affairs':
        return renderForeignAffairs();
      case 'registrar-general':
        return renderRegistrarGeneral();
      case 'inter-island-flights':
        return <InterIslandFlightsPage onBack={handleBack} />;
      case 'car-rentals':
        return <CarRentalsPage onBack={handleBack} />;
      case 'taxi':
        return <TaxiPage onBack={handleBack} />;
      case 'digital-locker':
        return <DigitalLockerPage onBack={handleBack} />;
      default:
        return renderDashboard();
    }
  };

  return (
    <View style={styles.webContainer}>
      <View style={styles.mobileFrame}>
        {!isLoggedIn && !isGuest && !showKYC ? renderLoginPortal() : 
         showKYC ? renderKYCPage() : renderCurrentView()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  skipText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 96,
    height: 96,
    backgroundColor: 'white',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 48,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 320,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  countryCode: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCodeText: {
    color: '#374151',
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 0,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  kycHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 24,
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
  kycContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  kycIntro: {
    alignItems: 'center',
    marginBottom: 32,
  },
  kycLogoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  kycLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  kycTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  kycSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  formFields: {
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
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
  readOnlyInput: {
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
  },
  biometricSection: {
    marginTop: 8,
  },
  biometricOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 12,
  },
  biometricSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  biometricIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  biometricEmoji: {
    fontSize: 18,
  },
  biometricText: {
    flex: 1,
  },
  biometricTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  biometricSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    width: 32,
    height: 32,
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  profileText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  headerIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  notificationButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 32, // Extra bottom padding for comfortable scrolling
  },
  bankingCard: {
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  bankingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bankingHeaderContent: {
    flex: 1,
  },
  bankingStats: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  bankingStatsContent: {
    flex: 1,
  },
  bankingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  bankingSubtitle: {
    fontSize: 14,
    color: '#C4B5FD',
  },
  bankingCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  bankingStatus: {
    fontSize: 14,
    color: '#C4B5FD',
  },
  addBankButton: {
    backgroundColor: '#EAB308',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBankText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
  viewAccountsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  viewAccountsText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  departmentHeader: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 24,
  },
  departmentIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  departmentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  departmentSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  threeColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '47%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
  },
  serviceSubtext: {
    fontSize: 10,
    fontWeight: '400',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  // Mobile frame styles for web testing
  webContainer: {
    flex: 1,
    backgroundColor: '#E5E7EB', // Light gray background to simulate desktop
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Full viewport height for web
  },
  mobileFrame: {
    width: 375, // iPhone width simulation
    height: 812, // iPhone height simulation
    backgroundColor: '#FFFFFF',
    borderRadius: 25, // Rounded corners like mobile device
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 15, // Android shadow
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
});