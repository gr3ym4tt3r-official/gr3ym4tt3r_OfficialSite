'use client'

import { useState } from 'react'
import { Button, Stack, Text, SectionHeading } from '@/design-system'
import { Loader, CheckCircle, AlertCircle, Mail } from 'lucide-react'
import { trackNewsletterSignup } from '@/lib/analytics'

interface FormData {
  email: string
  firstName: string
  honeypot: string // Bot detection field
}

interface FormErrors {
  [key: string]: string
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

interface NewsletterSignupProps {
  className?: string
  variant?: 'default' | 'compact' | 'inline'
  title?: string
  description?: string
}

export function NewsletterSignup({ 
  className = '',
  variant = 'default',
  title,
  description
}: NewsletterSignupProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    honeypot: '', // This should always remain empty
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [responseMessage, setResponseMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName = 'First name must be less than 50 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
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
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmissionState('success')
        setResponseMessage(data.message || 'Thank you for subscribing!')
        
        // Track successful signup
        trackNewsletterSignup(true, variant)
        
        // Reset form
        setFormData({
          email: '',
          firstName: '',
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
          
          // Track failed signup
          trackNewsletterSignup(false, variant)
        }
      }
    } catch (error) {
      console.error('Newsletter signup error:', error)
      setSubmissionState('error')
      setResponseMessage('Network error. Please check your connection and try again.')
      
      // Track network error
      trackNewsletterSignup(false, variant)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const getInputClassName = (fieldName: string) => {
    const baseClasses = "px-4 py-3 bg-grey-900/50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-grey-100 placeholder-grey-400 transition-colors duration-200"
    const errorClasses = "border-red-500 focus:ring-red-500"
    const normalClasses = "border-grey-700 focus:ring-signal-red-500"
    
    return `${baseClasses} ${errors[fieldName] ? errorClasses : normalClasses}`
  }

  // Default content
  const defaultTitle = "Stay Updated"
  const defaultDescription = "Get the latest insights on technology, philosophy, and disciplined craftsmanship delivered to your inbox."

  // Render based on variant
  if (variant === 'compact') {
    return (
      <div className={`bg-grey-950/30 rounded-lg p-6 ${className}`}>
        <Stack space="base">
          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-signal-red-500/10 rounded-lg">
              <Mail className="w-5 h-5 text-signal-red-500" />
            </div>
            <div>
              <SectionHeading size="sm" className="mb-1">
                {title || defaultTitle}
              </SectionHeading>
              <Text color="secondary" size="sm">
                {description || "Monthly insights & updates"}
              </Text>
            </div>
          </div>

          {submissionState === 'success' ? (
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <Text size="sm" className="text-green-400">
                {responseMessage}
              </Text>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Honeypot field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                aria-hidden="true"
              />

              <div className="flex space-x-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`${getInputClassName('firstName')} flex-1`}
                  disabled={submissionState === 'submitting'}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${getInputClassName('email')} flex-1`}
                  disabled={submissionState === 'submitting'}
                />
              </div>

              {(errors.firstName || errors.email) && (
                <Text color="secondary" size="sm" className="text-red-400">
                  {errors.firstName || errors.email}
                </Text>
              )}

              <Button 
                type="submit"
                variant="primary" 
                size="sm" 
                className="w-full"
                disabled={submissionState === 'submitting'}
              >
                {submissionState === 'submitting' ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Loader className="w-3 h-3 animate-spin" />
                    <span>Subscribing...</span>
                  </span>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          )}

          {submissionState === 'error' && responseMessage && (
            <div className="flex items-center space-x-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <Text size="sm" className="text-red-400">
                {responseMessage}
              </Text>
            </div>
          )}
        </Stack>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`${className}`}>
        {submissionState === 'success' ? (
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <Text className="text-green-400">
              {responseMessage}
            </Text>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              aria-hidden="true"
            />

            <div className="flex space-x-3">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`${getInputClassName('firstName')} flex-1`}
                disabled={submissionState === 'submitting'}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className={`${getInputClassName('email')} flex-2`}
                disabled={submissionState === 'submitting'}
              />
              <Button 
                type="submit"
                variant="primary" 
                disabled={submissionState === 'submitting'}
              >
                {submissionState === 'submitting' ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  'Subscribe'
                )}
              </Button>
            </div>

            {(errors.firstName || errors.email) && (
              <Text color="secondary" size="sm" className="text-red-400">
                {errors.firstName || errors.email}
              </Text>
            )}
          </form>
        )}

        {submissionState === 'error' && responseMessage && (
          <div className="flex items-center space-x-2 text-red-400 mt-2">
            <AlertCircle className="w-4 h-4" />
            <Text size="sm" className="text-red-400">
              {responseMessage}
            </Text>
          </div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={`bg-grey-950/50 rounded-lg border border-grey-800/50 p-8 ${className}`}>
      <Stack space="lg">
        <div className="text-center">
          <SectionHeading size="lg" className="mb-4">
            {title || defaultTitle}
          </SectionHeading>
          <Text color="secondary" className="max-w-md mx-auto">
            {description || defaultDescription}
          </Text>
        </div>

        {submissionState === 'success' ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <Text className="text-green-400 text-lg">
              {responseMessage}
            </Text>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              aria-hidden="true"
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`${getInputClassName('firstName')} w-full`}
                  disabled={submissionState === 'submitting'}
                />
                {errors.firstName && (
                  <Text color="secondary" size="sm" className="mt-1 text-red-400">
                    {errors.firstName}
                  </Text>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${getInputClassName('email')} w-full`}
                  disabled={submissionState === 'submitting'}
                />
                {errors.email && (
                  <Text color="secondary" size="sm" className="mt-1 text-red-400">
                    {errors.email}
                  </Text>
                )}
              </div>
            </div>

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
                  <span>Subscribing...</span>
                </span>
              ) : (
                'Subscribe to Newsletter'
              )}
            </Button>
          </form>
        )}

        {submissionState === 'error' && responseMessage && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <Text className="text-red-400">
              {responseMessage}
            </Text>
          </div>
        )}

        <Text color="secondary" size="sm" className="text-center">
          No spam. Unsubscribe anytime.
        </Text>
      </Stack>
    </div>
  )
}