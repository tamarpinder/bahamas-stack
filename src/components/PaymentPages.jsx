import React, { useState } from 'react'
import { ArrowLeft, CreditCard, Zap, Droplets, Tv } from 'lucide-react'
import { BahamasButton, BahamasInput, BahamasSelect, BahamasCard, BahamasAlert } from '../components/BahamasComponents'

export const BillPaymentsPage = ({ onBack }) => {
  const [selectedBillType, setSelectedBillType] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const billTypes = [
    { value: 'electricity', label: 'Bahamas Power & Light (BPL)', icon: Zap },
    { value: 'water', label: 'Water & Sewerage Corporation', icon: Droplets },
    { value: 'cable', label: 'Cable Bahamas', icon: Tv }
  ]

  const handlePayment = () => {
    setShowConfirmation(true)
    setTimeout(() => {
      setShowConfirmation(false)
      setSelectedBillType('')
      setAccountNumber('')
      setAmount('')
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
          <h1 className="text-lg font-bold">Payment Successful</h1>
        </div>

        <div className="p-4">
          <BahamasCard className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-green-600">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your {billTypes.find(b => b.value === selectedBillType)?.label} bill payment of ${amount} has been processed.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600">Transaction ID: BS{Date.now()}</p>
              <p className="text-sm text-gray-600">Account: {accountNumber}</p>
              <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
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
          <h1 className="text-lg font-bold">Bill Payments</h1>
          <div></div>
        </div>
      </div>

      <div className="p-4">
        <BahamasCard title="Pay Your Bills" subtitle="Select a utility provider and enter your account details">
          <BahamasSelect
            label="Select Bill Type"
            value={selectedBillType}
            onChange={(e) => setSelectedBillType(e.target.value)}
            options={billTypes}
            required
          />

          <BahamasInput
            label="Account Number"
            placeholder="Enter your account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />

          <BahamasInput
            label="Amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <div className="mt-6">
            <BahamasButton
              onClick={handlePayment}
              disabled={!selectedBillType || !accountNumber || !amount}
            >
              Pay Bill - ${amount || '0.00'}
            </BahamasButton>
          </div>
        </BahamasCard>

        <div className="mt-4">
          <BahamasAlert
            type="info"
            title="Secure Payment"
            message="Your payment will be processed through your connected bank account. No funds are stored in The Bahamas Stack."
          />
        </div>
      </div>
    </div>
  )
}

export const MoneyTransferPage = ({ onBack }) => {
  const [transferType, setTransferType] = useState('')
  const [recipientAccount, setRecipientAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const transferTypes = [
    { value: 'local', label: 'Local Bank Transfer' },
    { value: 'international', label: 'International Transfer' },
    { value: 'mobile', label: 'Mobile Money Transfer' }
  ]

  const handleTransfer = () => {
    setShowConfirmation(true)
    setTimeout(() => {
      setShowConfirmation(false)
      setTransferType('')
      setRecipientAccount('')
      setAmount('')
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
          <h1 className="text-lg font-bold">Transfer Successful</h1>
        </div>

        <div className="p-4">
          <BahamasCard className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-green-600">Transfer Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your ${amount} transfer has been sent successfully.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600">Transaction ID: BS{Date.now()}</p>
              <p className="text-sm text-gray-600">To: {recipientAccount}</p>
              <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
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
          <h1 className="text-lg font-bold">Money Transfer</h1>
          <div></div>
        </div>
      </div>

      <div className="p-4">
        <BahamasCard title="Send Money" subtitle="Transfer funds between bank accounts">
          <BahamasSelect
            label="Transfer Type"
            value={transferType}
            onChange={(e) => setTransferType(e.target.value)}
            options={transferTypes}
            required
          />

          <BahamasInput
            label="Recipient Account"
            placeholder="Enter recipient account number or email"
            value={recipientAccount}
            onChange={(e) => setRecipientAccount(e.target.value)}
            required
          />

          <BahamasInput
            label="Amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <div className="mt-6">
            <BahamasButton
              onClick={handleTransfer}
              disabled={!transferType || !recipientAccount || !amount}
            >
              Send ${amount || '0.00'}
            </BahamasButton>
          </div>
        </BahamasCard>

        <div className="mt-4">
          <BahamasAlert
            type="info"
            title="Bank-to-Bank Transfer"
            message="Transfers are processed directly between bank accounts through secure banking networks."
          />
        </div>
      </div>
    </div>
  )
}

