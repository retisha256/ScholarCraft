'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, FileText, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react'
import { formatFileSize } from '@/lib/utils'

const ACCEPTED = ['.pdf', '.doc', '.docx', '.txt', '.xlsx', '.pptx', '.png', '.jpg', '.jpeg']
const ACCEPTED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/png',
  'image/jpeg',
]
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

interface Props {
  value?: File | null
  onChange: (file: File | null) => void
  error?: string
  label?: string
}

/**
 * FileUploader — drag-and-drop file upload with preview.
 * Supports images (renders thumbnail) and documents (renders icon).
 *
 * Usage:
 *   const [file, setFile] = useState<File | null>(null)
 *   <FileUploader value={file} onChange={setFile} />
 */
export default function FileUploader({
  value,
  onChange,
  error,
  label = 'Supporting File',
}: Props) {
  const [dragging, setDragging] = useState(false)
  const [localError, setLocalError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const validate = useCallback((file: File): string | null => {
    if (file.size > MAX_SIZE) return `File too large. Max is ${formatFileSize(MAX_SIZE)}.`
    if (!ACCEPTED_MIME.includes(file.type)) return 'Unsupported file type.'
    return null
  }, [])

  const handleFile = useCallback(
    (file: File | null) => {
      setLocalError('')
      if (!file) { onChange(null); return }
      const err = validate(file)
      if (err) { setLocalError(err); return }
      onChange(file)
    },
    [onChange, validate]
  )

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0] ?? null)
  }

  const isImage = value?.type.startsWith('image/')
  const previewUrl = value && isImage ? URL.createObjectURL(value) : null
  const displayError = error || localError

  return (
    <div>
      {label && (
        <p className="text-xs font-medium text-[#CBD5E1] uppercase tracking-wider mb-2">
          {label}{' '}
          <span className="text-[#475569] normal-case tracking-normal">(optional)</span>
        </p>
      )}

      <AnimatePresence mode="wait">
        {value ? (
          /* ── File preview ──────────────────────────────── */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-2xl p-4 flex items-center gap-4"
          >
            {/* Thumbnail or file icon */}
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Preview"
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                onLoad={() => URL.revokeObjectURL(previewUrl)}
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-[#2563EB]/15 border border-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                {value.type === 'application/pdf' ? (
                  <FileText className="w-6 h-6 text-[#2563EB]" aria-hidden="true" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-[#2563EB]" aria-hidden="true" />
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-[#F8FAFC] text-sm font-medium truncate">{value.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <CheckCircle className="w-3 h-3 text-[#22C55E]" aria-hidden="true" />
                <p className="text-xs text-[#22C55E]">{formatFileSize(value.size)}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleFile(null)}
              className="w-9 h-9 rounded-xl bg-[#EF4444]/10 hover:bg-[#EF4444]/20 flex items-center justify-center text-[#EF4444] transition-colors flex-shrink-0"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        ) : (
          /* ── Drop zone ─────────────────────────────────── */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload file — click or drag and drop"
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
                        transition-all duration-200
                        ${dragging
                          ? 'border-[#2563EB]/70 bg-[#2563EB]/5'
                          : displayError
                          ? 'border-[#EF4444]/40 bg-[#EF4444]/5'
                          : 'border-white/[0.08] hover:border-white/[0.20] hover:bg-white/[0.02]'
                        }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED.join(',')}
              className="sr-only"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              aria-hidden="true"
            />

            <motion.div
              animate={{ y: dragging ? -4 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-3"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                dragging ? 'bg-[#2563EB]/20' : 'bg-white/[0.04]'
              }`}>
                <Upload
                  className={`w-6 h-6 transition-colors ${dragging ? 'text-[#2563EB]' : 'text-[#475569]'}`}
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-sm text-[#CBD5E1]">
                  <span className="text-[#2563EB] font-medium">Click to upload</span>{' '}
                  or drag and drop
                </p>
                <p className="text-xs text-[#475569] mt-1">
                  PDF, DOC, DOCX, TXT, XLSX, PPTX, PNG, JPG — max {formatFileSize(MAX_SIZE)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {displayError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 text-xs text-[#EF4444] mt-1.5"
            role="alert"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {displayError}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
