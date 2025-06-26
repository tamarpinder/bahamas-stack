import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    department: 'Road Traffic Department',
    requestedDocuments: [
      { id: 'drivers-license', name: 'Driver\'s License', icon: '🪪', required: true },
      { id: 'vehicle-registration', name: 'Vehicle Registration', icon: '🚗', required: false },
      { id: 'vehicle-inspection', name: 'Vehicle Inspection Certificate', icon: '🔍', required: false },
    ],
    purpose: 'License renewal verification',
    requestDate: '2024-06-26',
    urgency: 'normal',
  },
  {
    id: 2,
    department: 'Ministry of Foreign Affairs',
    requestedDocuments: [
      { id: 'passport', name: 'Passport', icon: '📘', required: true },
      { id: 'birth-certificate', name: 'Birth Certificate', icon: '📄', required: true },
    ],
    purpose: 'Visa application processing',
    requestDate: '2024-06-25',
    urgency: 'high',
  },
];

const NotificationSystem = ({ visible, onClose }) => {
  const [notifications] = useState(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState({});
  const [accessDuration, setAccessDuration] = useState('30');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [consentData, setConsentData] = useState(null);

  const accessDurations = [
    { value: '15', label: '15 Days' },
    { value: '30', label: '30 Days' },
    { value: '45', label: '45 Days' },
    { value: '60', label: '60 Days' },
  ];

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    // Initialize selected documents with required ones checked
    const initialSelection = {};
    notification.requestedDocuments.forEach(doc => {
      initialSelection[doc.id] = doc.required;
    });
    setSelectedDocuments(initialSelection);
    setShowConsentModal(true);
  };

  const toggleDocumentSelection = (docId) => {
    setSelectedDocuments(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  const handleContinue = () => {
    const selectedDocs = selectedNotification.requestedDocuments.filter(
      doc => selectedDocuments[doc.id]
    );
    
    if (selectedDocs.length === 0) {
      Alert.alert('Error', 'Please select at least one document to share.');
      return;
    }

    const consent = {
      department: selectedNotification.department,
      documents: selectedDocs,
      duration: accessDuration,
      grantedDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + parseInt(accessDuration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setConsentData(consent);
    setShowConsentModal(false);
    setShowConfirmation(true);
  };

  const handleConfirmConsent = () => {
    setShowConfirmation(false);
    setSelectedNotification(null);
    setConsentData(null);
    onClose();
  };

  const renderNotificationsList = () => (
    <View style={styles.notificationsContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.notificationsList}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={styles.notificationCard}
            onPress={() => handleNotificationPress(notification)}
          >
            <View style={styles.notificationHeader}>
              <View style={styles.departmentInfo}>
                <Text style={styles.departmentName}>{notification.department}</Text>
                <Text style={styles.requestDate}>{notification.requestDate}</Text>
              </View>
              {notification.urgency === 'high' && (
                <View style={styles.urgencyBadge}>
                  <Text style={styles.urgencyText}>Urgent</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.requestPurpose}>{notification.purpose}</Text>
            
            <View style={styles.documentsPreview}>
              <Text style={styles.documentsLabel}>Requesting:</Text>
              <View style={styles.documentIcons}>
                {notification.requestedDocuments.slice(0, 3).map((doc, index) => (
                  <Text key={index} style={styles.documentIcon}>{doc.icon}</Text>
                ))}
                {notification.requestedDocuments.length > 3 && (
                  <Text style={styles.moreDocuments}>+{notification.requestedDocuments.length - 3}</Text>
                )}
              </View>
            </View>
            
            <View style={styles.notificationFooter}>
              <Text style={styles.tapToReview}>Tap to review request</Text>
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderConsentModal = () => (
    <Modal
      visible={showConsentModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowConsentModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.consentModal}>
          <View style={styles.consentHeader}>
            <Text style={styles.consentTitle}>Document Access Request</Text>
            <TouchableOpacity onPress={() => setShowConsentModal(false)}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.consentBody}>
            <View style={styles.departmentSection}>
              <Text style={styles.departmentTitle}>{selectedNotification?.department}</Text>
              <Text style={styles.purposeText}>{selectedNotification?.purpose}</Text>
            </View>
            
            <View style={styles.documentsSection}>
              <Text style={styles.sectionTitle}>Select Documents to Share:</Text>
              {selectedNotification?.requestedDocuments.map((doc) => (
                <TouchableOpacity
                  key={doc.id}
                  style={styles.documentOption}
                  onPress={() => !doc.required && toggleDocumentSelection(doc.id)}
                >
                  <View style={styles.checkbox}>
                    {selectedDocuments[doc.id] && (
                      <Ionicons name="checkmark" size={16} color="#2563eb" />
                    )}
                  </View>
                  <Text style={styles.documentIconLarge}>{doc.icon}</Text>
                  <View style={styles.documentDetails}>
                    <Text style={styles.documentName}>{doc.name}</Text>
                    {doc.required && (
                      <Text style={styles.requiredLabel}>Required</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.durationSection}>
              <Text style={styles.sectionTitle}>Access Duration:</Text>
              <View style={styles.durationOptions}>
                {accessDurations.map((duration) => (
                  <TouchableOpacity
                    key={duration.value}
                    style={[
                      styles.durationOption,
                      accessDuration === duration.value && styles.selectedDuration
                    ]}
                    onPress={() => setAccessDuration(duration.value)}
                  >
                    <Text style={[
                      styles.durationText,
                      accessDuration === duration.value && styles.selectedDurationText
                    ]}>
                      {duration.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.warningSection}>
              <Ionicons name="warning" size={20} color="#f59e0b" />
              <Text style={styles.warningText}>
                By granting access, {selectedNotification?.department} will be able to view the selected documents for the specified duration.
              </Text>
            </View>
          </ScrollView>
          
          <View style={styles.consentActions}>
            <TouchableOpacity
              style={styles.denyButton}
              onPress={() => setShowConsentModal(false)}
            >
              <Text style={styles.denyButtonText}>Deny Access</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.grantButton}
              onPress={handleContinue}
            >
              <Text style={styles.grantButtonText}>Grant Access</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderConfirmationModal = () => (
    <Modal
      visible={showConfirmation}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowConfirmation(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.confirmationModal}>
          <View style={styles.confirmationHeader}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={32} color="#10b981" />
            </View>
            <Text style={styles.confirmationTitle}>Access Granted</Text>
          </View>
          
          <View style={styles.confirmationBody}>
            <View style={styles.consentSummary}>
              <Text style={styles.summaryTitle}>Consent Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Department:</Text>
                <Text style={styles.summaryValue}>{consentData?.department}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Access Duration:</Text>
                <Text style={styles.summaryValue}>{consentData?.duration} days</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Valid Until:</Text>
                <Text style={styles.summaryValue}>{consentData?.expiryDate}</Text>
              </View>
              
              <View style={styles.sharedDocuments}>
                <Text style={styles.documentsTitle}>Shared Documents:</Text>
                {consentData?.documents.map((doc, index) => (
                  <View key={index} style={styles.sharedDocument}>
                    <Text style={styles.sharedDocIcon}>{doc.icon}</Text>
                    <Text style={styles.sharedDocName}>{doc.name}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color="#2563eb" />
              <Text style={styles.infoText}>
                You can revoke access at any time through your Digital Locker settings.
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmConsent}
          >
            <Text style={styles.confirmButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {renderNotificationsList()}
        {renderConsentModal()}
        {renderConfirmationModal()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  notificationsContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    minHeight: '45%',
    width: '100%',
    maxWidth: 350,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  notificationsList: {
    flex: 1,
    padding: 16,
  },
  notificationCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  requestDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  urgencyBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  requestPurpose: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
  },
  documentsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentsLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 8,
  },
  documentIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  moreDocuments: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tapToReview: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
  consentModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    minHeight: '60%',
    width: '100%',
    maxWidth: 350,
  },
  consentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  consentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  consentBody: {
    flex: 1,
    padding: 16,
  },
  departmentSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  departmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  purposeText: {
    fontSize: 14,
    color: '#6b7280',
  },
  documentsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  documentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  documentIconLarge: {
    fontSize: 24,
    marginRight: 12,
  },
  documentDetails: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  requiredLabel: {
    fontSize: 12,
    color: '#dc2626',
    marginTop: 2,
  },
  durationSection: {
    marginBottom: 24,
  },
  durationOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  durationOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
  },
  selectedDuration: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  durationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectedDurationText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  warningSection: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    marginBottom: 20,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#92400e',
    marginLeft: 8,
  },
  consentActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  denyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dc2626',
    alignItems: 'center',
  },
  denyButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '600',
  },
  grantButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  grantButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmationModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '45%',
    maxHeight: '60%',
    width: '100%',
    maxWidth: 350,
  },
  confirmationHeader: {
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d1fae5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  confirmationBody: {
    flex: 1,
    padding: 16,
  },
  consentSummary: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  sharedDocuments: {
    marginTop: 12,
  },
  documentsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sharedDocument: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sharedDocIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  sharedDocName: {
    fontSize: 14,
    color: '#374151',
  },
  infoBox: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#1e40af',
    marginLeft: 8,
  },
  confirmButton: {
    margin: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#10b981',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationSystem;