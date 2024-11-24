import axios from 'axios'

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

export const sendTelegramNotification = async (message: string) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured')
    return
  }

  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      },
    )
  } catch (error) {
    console.error('Error sending Telegram notification:', error)
  }
}

export const submitToFormspree = async (data: any) => {
  if (!FORMSPREE_ENDPOINT) {
    console.warn('Formspree endpoint not configured')
    return
  }

  try {
    const response = await axios.post(FORMSPREE_ENDPOINT, data)
    return response.data
  } catch (error) {
    console.error('Error submitting to Formspree:', error)
    throw error
  }
}
