// Firebase configuration for mock data
// This is a mock configuration for demo purposes

const mockFirebaseConfig = {
  apiKey: "mock-api-key-for-demo",
  authDomain: "bahamas-stack-demo.firebaseapp.com",
  projectId: "bahamas-stack-demo",
  storageBucket: "bahamas-stack-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:mock-app-id"
};

// Mock Firebase services for demonstration
export const mockFirebaseAuth = {
  currentUser: null,
  signInWithPhoneNumber: (phoneNumber) => {
    return Promise.resolve({
      user: {
        uid: 'mock-user-id',
        phoneNumber: phoneNumber
      }
    });
  },
  signOut: () => Promise.resolve()
};

export const mockFirestore = {
  collection: (collectionName) => ({
    doc: (docId) => ({
      get: () => Promise.resolve({
        exists: true,
        data: () => ({
          id: docId,
          ...getMockData(collectionName, docId)
        })
      }),
      set: (data) => Promise.resolve(),
      update: (data) => Promise.resolve()
    }),
    add: (data) => Promise.resolve({ id: 'mock-doc-id' }),
    where: (field, operator, value) => ({
      get: () => Promise.resolve({
        docs: [
          {
            id: 'mock-doc-1',
            data: () => getMockData(collectionName)
          }
        ]
      })
    })
  })
};

// Mock data generator
function getMockData(collection, docId = null) {
  switch (collection) {
    case 'users':
      return {
        fullName: 'John Doe',
        phoneNumber: '+1234567890',
        email: 'john.doe@example.com',
        isVerified: true,
        createdAt: new Date().toISOString()
      };
    
    case 'transactions':
      return {
        id: docId || `txn_${Date.now()}`,
        type: 'payment',
        amount: 150.00,
        currency: 'BSD',
        status: 'completed',
        createdAt: new Date().toISOString(),
        description: 'Mock transaction for demo'
      };
    
    case 'accounts':
      return {
        accountNumber: '****1234',
        bankName: 'Royal Bank of Canada',
        accountType: 'checking',
        balance: 2500.00,
        isActive: true
      };
    
    default:
      return {
        id: docId || Date.now().toString(),
        createdAt: new Date().toISOString()
      };
  }
}

// Mock transaction storage for demo purposes
export const MockTransactionService = {
  saveTransaction: (transaction) => {
    try {
      const transactions = JSON.parse(localStorage?.getItem('bahamasStackTransactions') || '[]');
      transactions.unshift({
        ...transaction,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      });
      localStorage?.setItem('bahamasStackTransactions', JSON.stringify(transactions));
      return Promise.resolve(transaction);
    } catch (error) {
      console.log('Local storage not available, using memory storage');
      return Promise.resolve(transaction);
    }
  },
  
  getTransactions: (userId) => {
    try {
      const transactions = JSON.parse(localStorage?.getItem('bahamasStackTransactions') || '[]');
      return Promise.resolve(transactions);
    } catch (error) {
      console.log('Local storage not available, returning mock data');
      return Promise.resolve([
        {
          id: '1',
          type: 'Bill Payment',
          company: 'Bahamas Power & Light',
          amount: 156.78,
          status: 'Completed',
          date: new Date(Date.now() - 86400000).toISOString(),
          reference: 'BPL123456'
        },
        {
          id: '2',
          type: 'Bank Transfer',
          recipient: 'Jane Smith',
          amount: 250.00,
          status: 'Completed', 
          date: new Date(Date.now() - 172800000).toISOString(),
          reference: 'TXN789012'
        }
      ]);
    }
  }
};

export default mockFirebaseConfig;