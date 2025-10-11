import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Newsletter signup validation schema
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  honeypot: z.string().optional(), // Bot detection field
})

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 3 // Max 3 newsletter signups per minute per IP

function getRateLimitKey(ip: string): string {
  return `newsletter_${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW

  // Clean up old entries
  for (const [k, timestamp] of rateLimitMap.entries()) {
    if (timestamp < windowStart) {
      rateLimitMap.delete(k)
    }
  }

  // Count recent signups from this IP
  let count = 0
  for (const [k, timestamp] of rateLimitMap.entries()) {
    if (k === key && timestamp >= windowStart) {
      count++
    }
  }

  return count >= RATE_LIMIT_MAX
}

function recordSignup(ip: string): void {
  const key = getRateLimitKey(ip)
  rateLimitMap.set(`${key}_${Date.now()}`, Date.now())
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please wait before signing up again.' 
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    
    // Check honeypot field (should be empty)
    if (body.honeypot && body.honeypot.trim() !== '') {
      // Likely a bot, return success but don't process
      return NextResponse.json({ success: true })
    }

    const validatedData = newsletterSchema.parse(body)

    // Record this signup for rate limiting
    recordSignup(ip)

    // In a real application, you would:
    // 1. Add to email service provider (Mailchimp, ConvertKit, Buttondown, etc.)
    // 2. Store in database for tracking
    // 3. Send welcome email
    // 4. Check for existing subscribers

    // For now, we'll log the signup (in production, remove console.log)
    console.log('Newsletter signup:', {
      timestamp: new Date().toISOString(),
      ip,
      data: validatedData,
    })

    // Simulate email service API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // TODO: Implement actual newsletter service integration
    // Example with Buttondown:
    // const response = await fetch('https://api.buttondown.email/v1/subscribers', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: validatedData.email,
    //     notes: `Name: ${validatedData.firstName}, Signed up: ${new Date().toISOString()}`,
    //   }),
    // })

    // Example with ConvertKit:
    // const response = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     api_key: process.env.CONVERTKIT_API_KEY,
    //     email: validatedData.email,
    //     first_name: validatedData.firstName,
    //   }),
    // })

    return NextResponse.json({ 
      success: true, 
      message: `Thanks ${validatedData.firstName}! You've been added to our newsletter.` 
    })

  } catch (error) {
    console.error('Newsletter signup error:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }))
        },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { 
        success: false, 
        error: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}