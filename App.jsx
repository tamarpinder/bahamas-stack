import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { StatusCard, FeatureCard } from './components/BahamasComponents'
import BPLPaymentPage from './components/BPLPaymentPage'
import WaterSeweragePaymentPage from './components/WaterSeweragePaymentPage'
import CableBahamasPaymentPage from './components/CableBahamasPaymentPage'
import LocalBankTransferPage from './components/LocalBankTransferPage'
import InternationalBankTransferPage from './components/InternationalBankTransferPage'
import BalanceHistoryPage from './components/BalanceHistoryPage'
import ReceiveMoneyPage from './components/ReceiveMoneyPage'
import DriverLicenseRenewalPage from './components/DriverLicenseRenewalPage'
import PoliceCertificatePage from './components/PoliceCertificatePage'
import './App.css'

// Import icons
import { CreditCard, DollarSign, Bus, FileText, Building, User } from 'lucide-react'

// Import assets
import bahamasIcon from './assets/Bahamasstackicon.PNG'
import bahamasLogo from './assets/Bahamasstacklogo.JPG'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [showKYC, setShowKYC] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [kycData, setKycData] = useState({
    fullName: '',
    telephone: '',
    nibNumber: '',
    address: '',
    island: '',
    biometricType: ''
  })

  const user = {
    name: 'Welcome to The Bahamas Stack',
    connectedAccounts: 2,
    primaryBank: 'Royal Bank of Canada',
    status: 'Connected'
  }

  const handleLogin = () => {
    setShowKYC(true)
  }

  const handleSkip = () => {
    setIsGuest(true)
    setCurrentView('dashboard')
  }

  const handleKYCComplete = () => {
    setIsLoggedIn(true)
    setShowKYC(false)
    setCurrentView('dashboard')
  }

  const renderLoginPortal = () => (
    <div className="mobile-page">
      <div className="status-bar">
        <span>9:41</span>
        <span>The Bahamas Stack</span>
        <span>100%</span>
      </div>
      
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex justify-end p-4">
          <button 
            onClick={handleSkip}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Skip
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-6">
            <img 
              src={bahamasIcon} 
              alt="Bahamas Stack" 
              className="w-16 h-16 object-contain"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            THE BAHAMAS STACK
          </h1>
          <p className="text-gray-600 text-center mb-12">Your Digital Life App</p>

          <div className="w-full max-w-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Enter mobile number
            </h2>
            <p className="text-gray-600 text-center mb-8 text-sm">
              linked to your bank account to enable The Bahamas Stack
            </p>

            <div className="flex mb-8">
              <div className="flex items-center px-3 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                <span className="text-gray-700 font-medium">+242</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="000-0000"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

          <div className="mobile-button-container">
            <button
              onClick={handleLogin}
              className="mobile-button mobile-button-primary"
            >
              Continue
            </button>
          </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing, you agree to The Bahamas Stack's Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderKYCPage = () => (
    <div className="mobile-page">
      <div className="status-bar">
        <span>9:41</span>
        <span>The Bahamas Stack</span>
        <span>100%</span>
      </div>
      
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowKYC(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Electronic KYC</h1>
            <div className="w-6"></div>
          </div>
        </div>

        <div className="flex-1 px-6 py-6 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-md bg-white p-3">
              <img 
                src={bahamasIcon} 
                alt="The Bahamas Stack" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Identity Verification</h2>
            <p className="text-gray-600 text-sm mt-1">Complete your profile to access The Bahamas Stack</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={kycData.fullName}
                onChange={(e) => setKycData({...kycData, fullName: e.target.value})}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telephone</label>
              <input
                type="tel"
                value={`+242 ${phoneNumber}`}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">N.I.B #</label>
              <input
                type="text"
                value={kycData.nibNumber}
                onChange={(e) => setKycData({...kycData, nibNumber: e.target.value})}
                placeholder="Enter your NIB number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={kycData.address}
                onChange={(e) => setKycData({...kycData, address: e.target.value})}
                placeholder="Enter your address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Island</label>
              <select
                value={kycData.island}
                onChange={(e) => setKycData({...kycData, island: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your island</option>
                <option value="new-providence">New Providence</option>
                <option value="grand-bahama">Grand Bahama</option>
                <option value="abaco">Abaco</option>
                <option value="eleuthera">Eleuthera</option>
                <option value="exuma">Exuma</option>
                <option value="long-island">Long Island</option>
                <option value="cat-island">Cat Island</option>
                <option value="andros">Andros</option>
                <option value="bimini">Bimini</option>
                <option value="inagua">Inagua</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Choose Biometric Method</label>
              
              <div className="space-y-3">
                <button
                  onClick={() => setKycData({...kycData, biometricType: 'face'})}
                  className={`w-full p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                    kycData.biometricType === 'face' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-lg">👤</span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">Add Face ID</div>
                    <div className="text-sm text-gray-600">Use facial recognition for secure login</div>
                  </div>
                  {kycData.biometricType === 'face' && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setKycData({...kycData, biometricType: 'fingerprint'})}
                  className={`w-full p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                    kycData.biometricType === 'fingerprint' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-lg">👆</span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">Add Fingerprint</div>
                    <div className="text-sm text-gray-600">Use fingerprint scanner for secure login</div>
                  </div>
                  {kycData.biometricType === 'fingerprint' && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-button-container">
          <button
            onClick={handleKYCComplete}
            className="mobile-button mobile-button-primary"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="mobile-page bg-gray-50">
      <div className="status-bar">
        <span>9:41</span>
        <span>The Bahamas Stack</span>
        <span>100%</span>
      </div>
      
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCurrentView('profile')}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center"
            >
              <span className="text-white font-semibold text-sm">
                {isGuest ? 'G' : 'U'}
              </span>
            </button>
            
            <div className="w-8 h-8">
              <img 
                src={bahamasIcon} 
                alt="Bahamas Stack" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-semibold text-gray-900">Bahamas Stack</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-600">🔍</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center relative">
              <span className="text-gray-600">🔔</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Digital Banking</h3>
              <p className="text-purple-100 text-sm mb-4">Connect all your accounts</p>
              <div className="text-2xl font-bold">2 Banks</div>
              <div className="text-purple-100">Connected</div>
            </div>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
              Add Bank
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill Payments</h3>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => setCurrentView('bpl-payment')}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <span className="text-sm font-medium text-gray-900">BPL</span>
            </button>
            
            <button 
              onClick={() => setCurrentView('water-sewerage-payment')}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🚰</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Water & Sewage</span>
            </button>
            
            <button 
              onClick={() => setCurrentView('cable-bahamas-payment')}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📺</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Cable Bahamas</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Money Transfer</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setCurrentView('local-bank-transfer')}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏦</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Local Bank Transfer</span>
            </button>
            
            <button 
              onClick={() => setCurrentView('international-bank-transfer')}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
              <span className="text-sm font-medium text-gray-900">International Transfer</span>
            </button>
            
            <button 
              onClick={() => setCurrentView('balance-history')}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Balance & History</span>
            </button>
            
            <button 
              onClick={() => setCurrentView('receive-money')}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Receive Money</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Government Services</h3>
          <p className="text-sm text-gray-600 mb-4">🔗 Powered by MyGateway Integration</p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setCurrentView('driver-license')}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🚗</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Driver License Renewal</span>
            </button>
            
            <button 
              onClick={() => setCurrentView('police-certificate')}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👮</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Police Certificate</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Do More With The Bahamas Stack</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✈️</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Inter Island Flights</span>
            </button>
            
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🚌</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Bus Tickets</span>
            </button>
            
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎬</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Movie Tickets</span>
            </button>
            
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <span className="text-sm font-medium text-gray-900">View All Services</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🗄️</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Digital Locker</span>
            </button>
            
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">Ask Anything</div>
                <div className="text-xs text-gray-500">Ask AI For Anything</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCurrentView = () => {
    const handleBack = () => setCurrentView('dashboard')
    
    switch (currentView) {
      case 'bpl-payment':
        return <BPLPaymentPage onBack={handleBack} />
      case 'water-sewerage-payment':
        return <WaterSeweragePaymentPage onBack={handleBack} />
      case 'cable-bahamas-payment':
        return <CableBahamasPaymentPage onBack={handleBack} />
      case 'local-bank-transfer':
        return <LocalBankTransferPage onBack={handleBack} />
      case 'international-bank-transfer':
        return <InternationalBankTransferPage onBack={handleBack} />
      case 'balance-history':
        return <BalanceHistoryPage onBack={handleBack} />
      case 'receive-money':
        return <ReceiveMoneyPage onBack={handleBack} />
      case 'driver-license':
        return <DriverLicenseRenewalPage onBack={handleBack} />
      case 'police-certificate':
        return <PoliceCertificatePage onBack={handleBack} />
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="mobile-app-container">
      {!isLoggedIn && !isGuest && !showKYC ? renderLoginPortal() : 
       showKYC ? renderKYCPage() : renderCurrentView()}
    </div>
  )
}

export default App

