import { useForm } from '@formspree/react'

export const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || ''

export const submitServiceRequest = async (data: any) => {
  try {
    const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: 'website',
      }),
    })

    if (response.ok) {
      return {
        success: true,
        message: 'Service request submitted successfully',
      }
    } else {
      throw new Error('Failed to submit form')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    throw error
  }
}
