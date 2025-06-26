import React, { useState } from 'react'
import { ArrowLeft, Building, User, Shield, FileCheck, Clock, CheckCircle } from 'lucide-react'
import { BahamasButton, BahamasInput, BahamasSelect, BahamasCard, BahamasAlert } from '../components/BahamasComponents'

export const GovernmentServicesPage = ({ onBack }) => {
  const [selectedService, setSelectedService] = useState('')
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    nationalId: '',
    email: '',
    phone: ''
  })

  const services = [
    { 
      value: 'drivers-license', 
      label: 'Driver\'s License Renewal',
      description: 'Renew your driver\'s license online',
      fee: '$50.00',
      processingTime: '5-7 business days'
    },
    { 
      value: 'police-record', 
      label: 'Police Certificate',
      description: 'Request a police certificate for employment or travel',
      fee: '$25.00',
      processingTime: '3-5 business days'
    },
    { 
      value: 'national-insurance', 
      label: 'National Insurance Services',
      description: 'Access your NIB account and services',
      fee: 'Free',
      processingTime: 'Instant'
    },
    { 
      value: 'passport', 
      label: 'Passport Services',
      description: 'Apply for or renew your Bahamian passport',
      fee: '$120.00',
      processingTime: '10-15 business days'
    }
  ]

  const handleSubmit = () => {
    // Simulate application submission
    alert('Application submitted successfully! You will receive updates via email.')
    setSelectedService('')
    setApplicationData({
      fullName: '',
      nationalId: '',
      email: '',
      phone: ''
    })
  }

  return (
    <div className="mobile-container">
      <div className="status-bar">
        <span>9:41</span>
        <span>The Bahamas Stack</span>
        <span>100%</span>
      </div>
      
      <div className="mobile-header">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Government Services</h1>
          <div></div>
        </div>
      </div>

      <div className="p-4">
        <BahamasCard title="MyGateway Services" subtitle="Access government services online">
          {!selectedService ? (
            <div className="space-y-3">
              {services.map((service) => (
                <div 
                  key={service.value}
                  className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedService(service.value)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{service.label}</h3>
                      <p className="text-xs text-gray-600 mb-2">{service.description}</p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>Fee: {service.fee}</span>
                        <span>Processing: {service.processingTime}</span>
                      </div>
                    </div>
                    <Building className="w-5 h-5 text-blue-600 ml-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <button 
                  onClick={() => setSelectedService('')}
                  className="text-blue-600 text-sm hover:underline"
                >
                  ← Back to Services
                </button>
              </div>
              
              <h3 className="font-semibold mb-4">
                {services.find(s => s.value === selectedService)?.label}
              </h3>

              <BahamasInput
                label="Full Name"
                value={applicationData.fullName}
                onChange={(e) => setApplicationData({...applicationData, fullName: e.target.value})}
                required
              />

              <BahamasInput
                label="National ID Number"
                value={applicationData.nationalId}
                onChange={(e) => setApplicationData({...applicationData, nationalId: e.target.value})}
                required
              />

              <BahamasInput
                label="Email Address"
                type="email"
                value={applicationData.email}
                onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                required
              />

              <BahamasInput
                label="Phone Number"
                type="tel"
                value={applicationData.phone}
                onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                required
              />

              <div className="mt-6">
                <BahamasButton
                  onClick={handleSubmit}
                  disabled={!applicationData.fullName || !applicationData.nationalId || !applicationData.email}
                >
                  Submit Application
                </BahamasButton>
              </div>
            </div>
          )}
        </BahamasCard>

        <div className="mt-4">
          <BahamasAlert
            type="info"
            title="MyGateway Integration"
            message="These services are integrated with the official MyGateway portal of The Government of The Bahamas."
          />
        </div>
      </div>
    </div>
  )
}

export const BiometricIdentityPage = ({ onBack }) => {
  const [step, setStep] = useState('intro') // intro, capture, verify, complete
  const [identityData, setIdentityData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationalId: '',
    address: ''
  })

  const handleStartVerification = () => {
    setStep('capture')
    // Simulate biometric capture process
    setTimeout(() => setStep('verify'), 2000)
    setTimeout(() => setStep('complete'), 4000)
  }

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
          <BahamasCard title="Biometric Identity Setup" subtitle="Secure your digital identity with biometric verification">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Enhanced Security</h3>
              <p className="text-sm text-gray-600 mb-4">
                Set up biometric authentication to secure your digital identity and enable seamless access to government services.
              </p>
            </div>

            <BahamasInput
              label="Full Name"
              value={identityData.fullName}
              onChange={(e) => setIdentityData({...identityData, fullName: e.target.value})}
              required
            />

            <BahamasInput
              label="Date of Birth"
              type="date"
              value={identityData.dateOfBirth}
              onChange={(e) => setIdentityData({...identityData, dateOfBirth: e.target.value})}
              required
            />

            <BahamasInput
              label="National ID Number"
              value={identityData.nationalId}
              onChange={(e) => setIdentityData({...identityData, nationalId: e.target.value})}
              required
            />

            <BahamasInput
              label="Address"
              value={identityData.address}
              onChange={(e) => setIdentityData({...identityData, address: e.target.value})}
              required
            />

            <div className="mt-6">
              <BahamasButton
                onClick={handleStartVerification}
                disabled={!identityData.fullName || !identityData.dateOfBirth || !identityData.nationalId}
              >
                Start Biometric Setup
              </BahamasButton>
            </div>
          </BahamasCard>
        )

      case 'capture':
        return (
          <BahamasCard className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Capturing Biometric Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please look directly at the camera and remain still...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
            <p className="text-xs text-gray-500">Scanning facial features...</p>
          </BahamasCard>
        )

      case 'verify':
        return (
          <BahamasCard className="text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="font-semibold mb-2">Verifying Identity</h3>
            <p className="text-sm text-gray-600 mb-4">
              Matching your biometric data with government records...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-yellow-600 h-2 rounded-full animate-pulse" style={{width: '90%'}}></div>
            </div>
            <p className="text-xs text-gray-500">Verification in progress...</p>
          </BahamasCard>
        )

      case 'complete':
        return (
          <BahamasCard className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2 text-green-600">Identity Verified!</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your biometric identity has been successfully set up and verified.
            </p>
            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-800">✓ Facial recognition enabled</p>
              <p className="text-sm text-green-800">✓ Government database verified</p>
              <p className="text-sm text-green-800">✓ Secure access activated</p>
            </div>
            <BahamasButton onClick={onBack}>
              Continue to Dashboard
            </BahamasButton>
          </BahamasCard>
        )

      default:
        return null
    }
  }

  return (
    <div className="mobile-container">
      <div className="status-bar">
        <span>9:41</span>
        <span>The Bahamas Stack</span>
        <span>100%</span>
      </div>
      
      <div className="mobile-header">
        <div className="flex items-center justify-between">
          {step === 'intro' && (
            <button onClick={onBack} className="text-white hover:bg-white/20 p-2 rounded">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-lg font-bold">Biometric Identity</h1>
          <div></div>
        </div>
      </div>

      <div className="p-4">
        {renderStep()}

        {step === 'intro' && (
          <div className="mt-4">
            <BahamasAlert
              type="info"
              title="Privacy & Security"
              message="Your biometric data is encrypted and stored securely. It is only used for identity verification and is never shared with third parties."
            />
          </div>
        )}
      </div>
    </div>
  )
}

