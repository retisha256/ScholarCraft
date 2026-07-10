import { z } from 'zod'

export const requestFormSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  country: z.string().min(2, 'Please enter your country'),
  institution: z.string().optional(),
  academic_level: z.enum(['high-school', 'undergraduate', 'masters', 'phd', 'postdoctoral'] as const, {
    error: 'Please select your academic level',
  }),
  service_required: z.enum([
    'research-guidance',
    'dissertation-thesis',
    'essay-assignment',
    'literature-review',
    'proposal-writing',
    'editing-proofreading',
    'referencing-formatting',
    'statistical-analysis',
    'presentation-preparation',
  ] as const, {
    error: 'Please select a service',
  }),
  project_topic: z.string().min(5, 'Project topic must be at least 5 characters'),
  deadline: z.string().min(1, 'Please provide a deadline'),
  number_of_pages: z.number().min(1).optional().or(z.literal('')).or(z.undefined()),
  citation_style: z.enum(['APA', 'MLA', 'Chicago', 'Harvard', 'Vancouver', 'IEEE', 'Other'] as const).optional(),
  budget: z.string().optional(),
  additional_instructions: z.string().optional(),
})

export type RequestFormData = z.infer<typeof requestFormSchema>

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginData = z.infer<typeof loginSchema>

export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(5, 'Slug must be at least 5 characters'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters'),
  content: z.string().min(100, 'Content must be at least 100 characters'),
  author: z.string().min(2, 'Author name required'),
  category: z.string().min(2, 'Category required'),
  tags: z.string().optional(),
  published: z.boolean(),
})

export type BlogPostData = z.infer<typeof blogPostSchema>
