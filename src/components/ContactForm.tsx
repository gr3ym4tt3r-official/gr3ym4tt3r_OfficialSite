'use client'

import { useState } from 'react'
import { Button, Stack, Text } from '@/design-system'
import { Loader, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
  honeypot: string // Bot detection field
}

interface FormErrors {
  [key: string]: string
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    honeypot: '', // This should always remain empty
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [responseMessage, setResponseMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters'
    } else if (formData.subject.length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters'
    }

    // Company validation (optional)
    if (formData.company && formData.company.length > 100) {
      newErrors.company = 'Company name must be less than 100 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (!validateForm()) {
      return
    }

    setSubmissionState('submitting')
    setErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmissionState('success')
        setResponseMessage(data.message || 'Thank you for your message!')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          honeypot: '',
        })
      } else {
        setSubmissionState('error')
        
        if (data.details) {
          // Handle validation errors from server
          const serverErrors: FormErrors = {}
          data.details.forEach((detail: { field: string; message: string }) => {
            serverErrors[detail.field] = detail.message
          })
          setErrors(serverErrors)
        } else {
          setResponseMessage(data.error || 'Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmissionState('error')
      setResponseMessage('Network error. Please check your connection and try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const getInputClassName = (fieldName: string) => {
    const baseClasses = "w-full px-4 py-3 bg-grey-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-grey-100 placeholder-grey-400 transition-colors duration-200"
    const errorClasses = "border-red-500 focus:ring-red-500"
    const normalClasses = "border-grey-700 focus:ring-signal-red-500"
    
    return `${baseClasses} ${errors[fieldName] ? errorClasses : normalClasses}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleInputChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-grey-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          value={formData.name}
          onChange={handleInputChange}
          className={getInputClassName('name')}
          placeholder="Your name"
          disabled={submissionState === 'submitting'}
        />
        {errors.name && (
          <Text color="secondary" size="sm" className="mt-1 text-red-400">
            {errors.name}
          </Text>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-grey-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange}
          className={getInputClassName('email')}
          placeholder="your@email.com"
          disabled={submissionState === 'submitting'}
        />
        {errors.email && (
          <Text color="secondary" size="sm" className="mt-1 text-red-400">
            {errors.email}
          </Text>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-grey-300 mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          maxLength={100}
          autoComplete="organization"
          value={formData.company}
          onChange={handleInputChange}
          className={getInputClassName('company')}
          placeholder="Your company (optional)"
          disabled={submissionState === 'submitting'}
        />
        {errors.company && (
          <Text color="secondary" size="sm" className="mt-1 text-red-400">
            {errors.company}
          </Text>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-grey-300 mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          maxLength={200}
          value={formData.subject}
          onChange={handleInputChange}
          className={getInputClassName('subject')}
          placeholder="What's this about?"
          disabled={submissionState === 'submitting'}
        />
        {errors.subject && (
          <Text color="secondary" size="sm" className="mt-1 text-red-400">
            {errors.subject}
          </Text>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-grey-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={2000}
          value={formData.message}
          onChange={handleInputChange}
          className={`${getInputClassName('message')} resize-vertical`}
          placeholder="Tell me about your project, ideas, or how we can work together..."
          disabled={submissionState === 'submitting'}
        />
        {errors.message && (
          <Text color="secondary" size="sm" className="mt-1 text-red-400">
            {errors.message}
          </Text>
        )}
        <Text color="secondary" size="sm" className="mt-1">
          {formData.message.length}/2000 characters
        </Text>
      </div>

      {/* Response message */}
      {(submissionState === 'success' || submissionState === 'error') && responseMessage && (
        <div className={`p-4 rounded-lg flex items-center space-x-3 ${
          submissionState === 'success' 
            ? 'bg-green-500/10 border border-green-500/30' 
            : 'bg-red-500/10 border border-red-500/30'
        }`}>
          {submissionState === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <Text 
            className={submissionState === 'success' ? 'text-green-400' : 'text-red-400'}
            size="sm"
          >
            {responseMessage}
          </Text>
        </div>
      )}

      <Button 
        type="submit"
        variant="primary" 
        size="lg" 
        className="w-full" 
        disabled={submissionState === 'submitting'}
      >
        {submissionState === 'submitting' ? (
          <span className="flex items-center justify-center space-x-2">
            <Loader className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </span>
        ) : (
          'Send Message'
        )}
      </Button>

      <Text color="secondary" size="sm" className="text-center">
        * Required fields
      </Text>
    </form>
  )
}