import React from 'react'
import { Button } from '@/components/ui/button.jsx'

// Bahamas Stack Button Component
export const BahamasButton = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  onClick,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'bahamas-button'
  const variantClasses = variant === 'secondary' ? 'secondary' : ''
  const sizeClasses = size === 'small' ? 'text-sm py-2 px-3' : size === 'large' ? 'text-lg py-4 px-6' : ''
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// Feature Card Component
export const FeatureCard = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  color = 'primary',
  onClick,
  className = ''
}) => {
  return (
    <div
      className={`feature-card ${color} ${className}`}
      onClick={onClick}
    >
      <div className="feature-icon">
        <Icon className="w-6 h-6" />
      </div>
      <div className="feature-title">{title}</div>
      <div className="feature-subtitle">{subtitle}</div>
    </div>
  )
}

// Status Card Component
export const StatusCard = ({ 
  title, 
  value, 
  subtitle,
  icon: Icon,
  className = ''
}) => {
  return (
    <div className={`bg-white/20 rounded-lg p-3 text-center ${className}`}>
      {Icon && (
        <div className="flex justify-center mb-2">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-xl font-bold">{value}</p>
      {subtitle && <p className="text-xs opacity-75">{subtitle}</p>}
    </div>
  )
}

// Form Input Component
export const BahamasInput = ({ 
  label, 
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = ''
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`form-input ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

// Select Component
export const BahamasSelect = ({ 
  label, 
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  required = false,
  className = ''
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        className={`form-input ${className}`}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// Card Component
export const BahamasCard = ({ 
  children, 
  title,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
      {title && (
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'default', className = '' }) => {
  const sizeClasses = size === 'small' ? 'w-4 h-4' : size === 'large' ? 'w-8 h-8' : 'w-6 h-6'
  
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses} ${className}`}></div>
  )
}

// Alert Component
export const BahamasAlert = ({ 
  type = 'info', 
  title,
  message,
  onClose,
  className = ''
}) => {
  const typeClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }
  
  return (
    <div className={`border rounded-lg p-4 ${typeClasses[type]} ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

