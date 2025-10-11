import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message too long'),
  honeypot: z.string().optional(), // Bot detection field
})

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // Max 5 submissions per minute per IP

function getRateLimitKey(ip: string): string {
  return `contact_${ip}`
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

  // Count recent submissions from this IP
  let count = 0
  for (const [k, timestamp] of rateLimitMap.entries()) {
    if (k === key && timestamp >= windowStart) {
      count++
    }
  }

  return count >= RATE_LIMIT_MAX
}

function recordSubmission(ip: string): void {
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
          error: 'Too many requests. Please wait before submitting again.' 
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

    const validatedData = contactSchema.parse(body)

    // Record this submission for rate limiting
    recordSubmission(ip)

    // In a real application, you would:
    // 1. Send email via service like Resend, SendGrid, or Nodemailer
    // 2. Store in database for tracking
    // 3. Send to a CRM or project management tool

    // For now, we'll log the submission (in production, remove console.log)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      ip,
      data: validatedData,
    })

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // TODO: Implement actual email sending
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'contact@gr3ym4tt3r.com',
    //   to: 'team@gr3ym4tt3r.com',
    //   subject: `New Contact: ${validatedData.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${validatedData.name}</p>
    //     <p><strong>Email:</strong> ${validatedData.email}</p>
    //     ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
    //     <p><strong>Subject:</strong> ${validatedData.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
    //   `,
    // })

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We\'ll get back to you soon!' 
    })

  } catch (error) {
    console.error('Contact form error:', error)

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