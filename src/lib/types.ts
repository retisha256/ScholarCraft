export type ServiceType =
  | 'research-guidance'
  | 'dissertation-thesis'
  | 'essay-assignment'
  | 'literature-review'
  | 'proposal-writing'
  | 'editing-proofreading'
  | 'referencing-formatting'
  | 'statistical-analysis'
  | 'presentation-preparation'

export type AcademicLevel =
  | 'high-school'
  | 'undergraduate'
  | 'masters'
  | 'phd'
  | 'postdoctoral'

export type CitationStyle =
  | 'APA'
  | 'MLA'
  | 'Chicago'
  | 'Harvard'
  | 'Vancouver'
  | 'IEEE'
  | 'Other'

export type RequestStatus = 'new' | 'in-progress' | 'completed' | 'cancelled'

export interface ProjectRequest {
  id: string
  full_name: string
  email: string
  phone: string
  country: string
  institution?: string
  academic_level: AcademicLevel
  service_required: ServiceType
  project_topic: string
  deadline: string
  number_of_pages?: number
  citation_style?: CitationStyle
  budget?: string
  file_url?: string
  additional_instructions?: string
  status: RequestStatus
  created_at: string
  updated_at: string
  admin_notes?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  replied: boolean
  reply_text?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  image_url?: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  created_at: string
  active: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  institution: string
  content: string
  rating: number
  image_url?: string
  approved: boolean
  created_at: string
}
