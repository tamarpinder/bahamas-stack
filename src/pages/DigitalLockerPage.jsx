import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Global document storage - in a real app this would be AsyncStorage or a database
let globalDocuments = [
  {
    id: 'default-1',
    title: 'National Insurance ID',
    type: 'Government ID',
    category: 'government',
    verified: true,
    dateAdded: '2024-01-15',
    issuer: 'National Insurance Board',
    documentNumber: 'NIB-123456789',
    description: 'Official National Insurance identification card',
  },
  {
    id: 'default-2',
    title: 'Driver\'s License',
    type: 'Government ID',
    category: 'government',
    verified: true,
    dateAdded: '2024-03-10',
    issuer: 'Road Traffic Department',
    documentNumber: 'DL-987654321',
    description: 'Valid Bahamas driver\'s license',
  },
  {
    id: 'default-3',
    title: 'Passport',
    type: 'Government Document',
    category: 'government',
    verified: true,
    dateAdded: '2024-02-20',
    issuer: 'Ministry of Foreign Affairs',
    documentNumber: 'BS1234567',
    description: 'Bahamas passport for international travel',
  },
  {
    id: 'default-4',
    title: 'Resume',
    type: 'Personal Document',
    category: 'personal',
    verified: false,
    dateAdded: '2024-06-15',
    issuer: 'User Upload',
    documentNumber: 'PER-001',
    description: 'Professional resume document',
  }
];

// Function to add document from government services
export const addDocumentToDigitalLocker = (documentData) => {
  const newDocument = {
    id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: documentData.title,
    type: documentData.type || 'Government Document',
    category: 'government',
    verified: true,
    dateAdded: new Date().toISOString().split('T')[0],
    issuer: documentData.issuer || 'Government of The Bahamas',
    documentNumber: documentData.documentNumber || `DOC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    description: documentData.description || `Official ${documentData.title}`,
    serviceReferenceNumber: documentData.referenceNumber,
  };
  
  globalDocuments.push(newDocument);
  return newDocument;
};

const DigitalLockerPage = ({ navigation, onBack }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load documents from global storage
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    setDocuments([...globalDocuments]);
    setIsLoading(false);
  };

  // Document types with their icons and categories
  const documentTypes = {
    passport: { icon: '📘', category: 'government', title: 'Passport' },
    license: { icon: '🪪', category: 'government', title: 'Driver\'s License' },
    birth: { icon: '📄', category: 'government', title: 'Birth Certificate' },
    death: { icon: '🕊️', category: 'government', title: 'Death Certificate' },
    marriage: { icon: '💍', category: 'government', title: 'Marriage Certificate' },
    police: { icon: '🚔', category: 'government', title: 'Police Record' },
    firearm: { icon: '🔫', category: 'government', title: 'Firearms License' },
    vehicle: { icon: '🚗', category: 'government', title: 'Vehicle Registration' },
    inspection: { icon: '🔍', category: 'government', title: 'Vehicle Inspection' },
    resume: { icon: '📝', category: 'personal', title: 'Resume' },
    diploma: { icon: '🎓', category: 'personal', title: 'Diploma/Certificate' },
    medical: { icon: '🏥', category: 'personal', title: 'Medical Record' },
    insurance: { icon: '🛡️', category: 'personal', title: 'Insurance Document' },
  };

  const handleDocumentPress = (document) => {
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  const handleShareDocument = (document) => {
    Alert.alert(
      'Share Document',
      `Share ${document.title} with government agencies or approved organizations?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Share', 
          onPress: () => {
            Alert.alert('Success', 'Document shared securely!');
            setShowDocumentModal(false);
          }
        }
      ]
    );
  };

  const handleUploadDocument = () => {
    setShowUploadModal(true);
  };

  const simulateDocumentUpload = (docType) => {
    const newDocument = {
      id: `upload-${Date.now()}`,
      title: documentTypes[docType].title,
      type: 'Personal Document',
      category: 'personal',
      verified: false,
      dateAdded: new Date().toISOString().split('T')[0],
      issuer: 'User Upload',
      documentNumber: `UP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      description: `User uploaded ${documentTypes[docType].title}`,
    };

    globalDocuments.push(newDocument);
    setDocuments([...globalDocuments]);
    setShowUploadModal(false);
    
    Alert.alert(
      'Upload Successful',
      `Your ${documentTypes[docType].title} has been uploaded to your Digital Locker.`
    );
  };

  const getDocumentIcon = (document) => {
    const title = document.title.toLowerCase();
    if (title.includes('passport')) return documentTypes.passport.icon;
    if (title.includes('license') || title.includes('licence')) return documentTypes.license.icon;
    if (title.includes('birth')) return documentTypes.birth.icon;
    if (title.includes('death')) return documentTypes.death.icon;
    if (title.includes('marriage')) return documentTypes.marriage.icon;
    if (title.includes('police')) return documentTypes.police.icon;
    if (title.includes('firearm')) return documentTypes.firearm.icon;
    if (title.includes('vehicle') && title.includes('registration')) return documentTypes.vehicle.icon;
    if (title.includes('vehicle') && title.includes('inspection')) return documentTypes.inspection.icon;
    if (title.includes('resume')) return documentTypes.resume.icon;
    if (title.includes('diploma') || title.includes('certificate')) return documentTypes.diploma.icon;
    if (title.includes('medical')) return documentTypes.medical.icon;
    if (title.includes('insurance')) return documentTypes.insurance.icon;
    if (title.includes('national insurance')) return '🆔';
    return '📄'; // Default document icon
  };

  const renderDocument = (document) => (
    <TouchableOpacity
      key={document.id}
      style={styles.documentCard}
      onPress={() => handleDocumentPress(document)}
    >
      <View style={styles.documentIcon}>
        <Text style={styles.documentEmoji}>{getDocumentIcon(document)}</Text>
      </View>
      
      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{document.title}</Text>
        <Text style={styles.documentType}>{document.type}</Text>
        <Text style={styles.documentDate}>Added: {document.dateAdded}</Text>
      </View>
      
      <View style={styles.documentActions}>
        {document.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark" size={12} color="white" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="eye" size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDocumentModal = () => (
    <Modal
      visible={showDocumentModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowDocumentModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Document Details</Text>
            <TouchableOpacity onPress={() => setShowDocumentModal(false)}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          {selectedDocument && (
            <ScrollView style={styles.modalBody}>
              <View style={styles.documentPreview}>
                <Text style={styles.previewEmoji}>{getDocumentIcon(selectedDocument)}</Text>
                <Text style={styles.previewTitle}>{selectedDocument.title}</Text>
                {selectedDocument.verified && (
                  <View style={styles.verifiedBadgeLarge}>
                    <Ionicons name="checkmark" size={16} color="white" />
                    <Text style={styles.verifiedTextLarge}>Verified</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.documentDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Document Type:</Text>
                  <Text style={styles.detailValue}>{selectedDocument.type}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Issuer:</Text>
                  <Text style={styles.detailValue}>{selectedDocument.issuer}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Document Number:</Text>
                  <Text style={styles.detailValue}>{selectedDocument.documentNumber}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date Added:</Text>
                  <Text style={styles.detailValue}>{selectedDocument.dateAdded}</Text>
                </View>
                
                {selectedDocument.serviceReferenceNumber && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Service Reference:</Text>
                    <Text style={styles.detailValue}>{selectedDocument.serviceReferenceNumber}</Text>
                  </View>
                )}
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Description:</Text>
                  <Text style={styles.detailValue}>{selectedDocument.description}</Text>
                </View>
              </View>
              
              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.shareButton}
                  onPress={() => handleShareDocument(selectedDocument)}
                >
                  <Ionicons name="share" size={20} color="white" />
                  <Text style={styles.shareButtonText}>Share Document</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.downloadButton}>
                  <Ionicons name="download" size={20} color="#2563eb" />
                  <Text style={styles.downloadButtonText}>Download PDF</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  const renderUploadModal = () => (
    <Modal
      visible={showUploadModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowUploadModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Upload Document</Text>
            <TouchableOpacity onPress={() => setShowUploadModal(false)}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <Text style={styles.uploadDescription}>
              Choose the type of document you'd like to upload to your Digital Locker.
            </Text>
            
            <View style={styles.uploadOptions}>
              {Object.entries(documentTypes)
                .filter(([key, type]) => type.category === 'personal')
                .map(([key, type]) => (
                <TouchableOpacity
                  key={key}
                  style={styles.uploadOption}
                  onPress={() => simulateDocumentUpload(key)}
                >
                  <Text style={styles.uploadOptionIcon}>{type.icon}</Text>
                  <Text style={styles.uploadOptionText}>{type.title}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Loading your documents...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const governmentDocs = documents.filter(doc => doc.category === 'government');
  const personalDocs = documents.filter(doc => doc.category === 'personal');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Digital Locker</Text>
          <Text style={styles.headerSubtitle}>Your secure document vault</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Documents</Text>
          <Text style={styles.sectionSubtitle}>
            Securely store and manage your important documents
          </Text>
        </View>

        {governmentDocs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.categoryTitle}>Government Documents</Text>
            {governmentDocs.map(renderDocument)}
          </View>
        )}

        {personalDocs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.categoryTitle}>Personal Documents</Text>
            {personalDocs.map(renderDocument)}
          </View>
        )}

        {documents.length === 1 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📁</Text>
            <Text style={styles.emptyTitle}>Complete More Services</Text>
            <Text style={styles.emptyDescription}>
              Complete government services or upload personal documents to add more documents to your locker.
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadDocument}>
          <Ionicons name="cloud-upload" size={24} color="#2563eb" />
          <Text style={styles.uploadButtonText}>Upload Document</Text>
        </TouchableOpacity>

        <View style={styles.securityInfo}>
          <Text style={styles.securityTitle}>Secure Storage</Text>
          <Text style={styles.securityDescription}>
            Your documents are encrypted and stored securely. Verified documents can be shared with government agencies and approved organizations.
          </Text>
        </View>
      </ScrollView>

      {renderDocumentModal()}
      {renderUploadModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#dbeafe',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 10,
  },
  sectionHeader: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 15,
  },
  documentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  documentIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#dbeafe',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  documentEmoji: {
    fontSize: 24,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  documentType: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  documentDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  documentActions: {
    alignItems: 'flex-end',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  verifiedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  uploadButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#fbbf24',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginLeft: 8,
  },
  securityInfo: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  securityDescription: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    minHeight: '40%',
    width: '100%',
    maxWidth: 350,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalBody: {
    flex: 1,
    padding: 16,
  },
  documentPreview: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  previewEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  verifiedBadgeLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  verifiedTextLarge: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  documentDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  modalActions: {
    gap: 12,
  },
  shareButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  downloadButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  downloadButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  uploadDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadOptions: {
    gap: 12,
  },
  uploadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  uploadOptionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  uploadOptionText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
});

export default DigitalLockerPage;