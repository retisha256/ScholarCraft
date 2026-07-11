'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const PHONE = '256764929546'
const MSG   = encodeURIComponent(
  'Hello! I am interested in your academic support services. Could you provide more information?'
)

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${PHONE}?text=${MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#16A34A] hover:bg-[#15803D] rounded-full shadow-[0_4px_24px_rgba(22,163,74,0.45)] flex items-center justify-center transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 rounded-full bg-[#16A34A] animate-ping opacity-25" aria-hidden="true" />
      <MessageCircle className="w-7 h-7 text-white fill-white relative z-10" aria-hidden="true" />
    </motion.a>
  )
}
