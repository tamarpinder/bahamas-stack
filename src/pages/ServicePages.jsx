import React, { useState } from 'react'
import { ArrowLeft, Bus, MapPin, Clock, FileText, Upload, Eye, Share } from 'lucide-react'
import { BahamasButton, BahamasInput, BahamasSelect, BahamasCard, BahamasAlert } from '../components/BahamasComponents'

export const BusTicketsPage = ({ onBack }) => {
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const locations = [
    { value: 'nassau', label: 'Nassau' },
    { value: 'freeport', label: 'Freeport' },
    { value: 'paradise-island', label: 'Paradise Island' },
    { value: 'cable-beach', label: 'Cable Beach' },
    { value: 'airport', label: 'Lynden Pindling International Airport' }
  ]

  const handleBooking = () => {
    setShowConfirmation(true)
    setTimeout(() => {
      setShowConfirmation(false)
      setFromLocation('')
      setToLocation('')
      setTravelDate('')
      setPassengers('1')
    }, 3000)
  }

  if (showConfirmation) {
    return (
      <div className="mobile-container">
        <div className="status-bar">
          <span>9:41</span>
          <span>The Bahamas Stack</span>
          <span>100%</span>
        </div>
        
        <div className="mobile-header">
          <h1 className="text-lg font-bold">Booking Confirmed</h1>
        </div>

        <div className="p-4">
          <BahamasCard className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bus className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-green-600">Ticket Booked!</h2>
            <p className="text-gray-600 mb-4">
              Your bus ticket has been confirmed and sent to your email.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600">Ticket ID: BT{Date.now()}</p>
              <p className="text-sm text-gray-600">Route: {locations.find(l => l.value === fromLocation)?.label} → {locations.find(l => l.value === toLocation)?.label}</p>
              <p className="text-sm text-gray-600">Date: {travelDate}</p>
              <p className="text-sm text-gray-600">Passengers: {passengers}</p>
            </div>
          </BahamasCard>
        </div>
      </div>
    )
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
          <h1 className="text-lg font-bold">Bus Tickets</h1>
          <div></div>
        </div>
      </div>

      <div className="p-4">
        <BahamasCard title="Book Your Journey" subtitle="Travel across The Bahamas with ease">
          <BahamasSelect
            label="From"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            options={locations}
            required
          />

          <BahamasSelect
            label="To"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            options={locations}
            required
          />

          <BahamasInput
            label="Travel Date"
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            required
          />

          <BahamasSelect
            label="Passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            options={[
              { value: '1', label: '1 Passenger' },
              { value: '2', label: '2 Passengers' },
              { value: '3', label: '3 Passengers' },
              { value: '4', label: '4 Passengers' }
            ]}
            required
          />

          <div className="mt-6">
            <BahamasButton
              onClick={handleBooking}
              disabled={!fromLocation || !toLocation || !travelDate}
            >
              Book Ticket - $15.00
            </BahamasButton>
          </div>
        </BahamasCard>

        <div className="mt-4">
          <BahamasAlert
            type="info"
            title="Public Transportation"
            message="Tickets are valid for all participating bus operators across The Bahamas."
          />
        </div>
      </div>
    </div>
  )
}

export const DigitalLockerPage = ({ onBack }) => {
  const [documents] = useState([
    { id: 1, name: 'Passport', type: 'Government ID', verified: true, date: '2024-01-15' },
    { id: 2, name: 'Driver\'s License', type: 'Government ID', verified: true, date: '2024-02-20' },
    { id: 3, name: 'Birth Certificate', type: 'Government Document', verified: true, date: '2024-01-10' },
    { id: 4, name: 'Resume', type: 'Personal Document', verified: false, date: '2024-03-01' }
  ])

  const [showUpload, setShowUpload] = useState(false)

  const handleUpload = () => {
    setShowUpload(false)
    // Simulate upload
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
          <h1 className="text-lg font-bold">Digital Locker</h1>
          <div></div>
        </div>
      </div>

      <div className="p-4">
        <BahamasCard title="Your Documents" subtitle="Securely store and manage your important documents">
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    doc.verified ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      doc.verified ? 'text-green-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{doc.name}</p>
                    <p className="text-xs text-gray-600">{doc.type}</p>
                    <p className="text-xs text-gray-500">Added: {doc.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {doc.verified && (
                    <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
                      ✓ Verified
                    </span>
                  )}
                  <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <BahamasButton
              variant="secondary"
              onClick={() => setShowUpload(true)}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </BahamasButton>
          </div>
        </BahamasCard>

        <div className="mt-4">
          <BahamasAlert
            type="info"
            title="Secure Storage"
            message="Your documents are encrypted and stored securely. Verified documents can be shared with government agencies and approved organizations."
          />
        </div>
      </div>

      {showUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Upload Document</h3>
            <BahamasInput
              label="Document Name"
              placeholder="Enter document name"
            />
            <BahamasSelect
              label="Document Type"
              options={[
                { value: 'government', label: 'Government Document' },
                { value: 'personal', label: 'Personal Document' },
                { value: 'financial', label: 'Financial Document' }
              ]}
            />
            <div className="flex gap-3 mt-6">
              <BahamasButton
                variant="secondary"
                onClick={() => setShowUpload(false)}
                className="flex-1"
              >
                Cancel
              </BahamasButton>
              <BahamasButton
                onClick={handleUpload}
                className="flex-1"
              >
                Upload
              </BahamasButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

