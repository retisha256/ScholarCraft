'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, MailOpen, Send } from 'lucide-react'
import type { ContactMessage } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function MessagesClient({ messages }: { messages: ContactMessage[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replying, setReplying] = useState(false)

  const filtered = messages.filter((msg) => {
    const q = searchQuery.toLowerCase()
    return (
      msg.name.toLowerCase().includes(q) ||
      msg.email.toLowerCase().includes(q) ||
      msg.subject.toLowerCase().includes(q)
    )
  })

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return
    setReplying(true)

    const supabase = createClient()
    const { error } = await supabase
      .from('contact_messages')
      .update({ replied: true, reply_text: replyText })
      .eq('id', selectedMessage.id)

    if (error) {
      toast.error('Failed to send reply')
    } else {
      toast.success('Reply saved. Send it via your email client.')
      setSelectedMessage({ ...selectedMessage, replied: true, reply_text: replyText })
      setReplyText('')
    }
    setReplying(false)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white">Messages</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          {messages.filter((m) => !m.replied).length} unreplied message{messages.filter((m) => !m.replied).length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 max-w-md"
          aria-label="Search messages"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-500">No messages found.</div>
          ) : (
            filtered.map((msg, index) => (
              <motion.button
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => setSelectedMessage(msg)}
                className={`w-full text-left p-5 rounded-2xl border transition-all ${
                  selectedMessage?.id === msg.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300'
                }`}
                aria-pressed={selectedMessage?.id === msg.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {msg.replied ? (
                        <MailOpen className="w-4 h-4 text-slate-400" aria-label="Read" />
                      ) : (
                        <Mail className="w-4 h-4 text-blue-600" aria-label="Unread" />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${msg.replied ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {msg.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{msg.email}</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{msg.subject}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{msg.message}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 flex-shrink-0">
                    {formatDate(msg.created_at)}
                  </p>
                </div>
              </motion.button>
            ))
          )}
        </div>

        {/* Message detail */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          {selectedMessage ? (
            <div>
              <div className="mb-5 pb-5 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold font-poppins text-slate-900 dark:text-white mb-1">
                  {selectedMessage.subject}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  From: <strong>{selectedMessage.name}</strong> &lt;{selectedMessage.email}&gt;
                </p>
                <p className="text-xs text-slate-400 mt-1">{formatDate(selectedMessage.created_at)}</p>
              </div>

              <div className="mb-6">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              {selectedMessage.replied && selectedMessage.reply_text && (
                <div className="mb-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">Your Reply:</p>
                  <p className="text-sm text-green-800 dark:text-green-300">{selectedMessage.reply_text}</p>
                </div>
              )}

              {!selectedMessage.replied && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Write a Reply
                  </label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 resize-none mb-3"
                  />
                  <button
                    onClick={handleReply}
                    disabled={replying || !replyText.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    {replying ? 'Saving...' : 'Save Reply'}
                  </button>
                  <p className="text-xs text-slate-400 mt-2">
                    Reply is saved to the database. Send via{' '}
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      className="text-blue-600 hover:underline"
                    >
                      email client
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
              <Mail className="w-12 h-12 mb-3 opacity-30" aria-hidden="true" />
              <p className="text-sm">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
