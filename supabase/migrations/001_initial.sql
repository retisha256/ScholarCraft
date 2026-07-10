-- ============================================
-- AcademicPro Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Project Requests Table
-- ============================================
CREATE TABLE IF NOT EXISTS project_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  institution TEXT,
  academic_level TEXT NOT NULL CHECK (academic_level IN ('high-school', 'undergraduate', 'masters', 'phd', 'postdoctoral')),
  service_required TEXT NOT NULL CHECK (service_required IN (
    'research-guidance', 'dissertation-thesis', 'essay-assignment',
    'literature-review', 'proposal-writing', 'editing-proofreading',
    'referencing-formatting', 'statistical-analysis', 'presentation-preparation'
  )),
  project_topic TEXT NOT NULL,
  deadline TEXT NOT NULL,
  number_of_pages INTEGER,
  citation_style TEXT CHECK (citation_style IN ('APA', 'MLA', 'Chicago', 'Harvard', 'Vancouver', 'IEEE', 'Other')),
  budget TEXT,
  file_url TEXT,
  additional_instructions TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'completed', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Contact Messages Table
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  replied BOOLEAN DEFAULT FALSE,
  reply_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Blog Posts Table
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Newsletter Subscribers Table
-- ============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Testimonials Table
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  institution TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  image_url TEXT,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public: Can insert project requests (no auth required)
CREATE POLICY "Public can insert project requests"
  ON project_requests FOR INSERT
  WITH CHECK (true);

-- Public: Can insert contact messages
CREATE POLICY "Public can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Public: Can subscribe to newsletter
CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Public: Can read published blog posts
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (published = TRUE);

-- Public: Can read approved testimonials
CREATE POLICY "Public can read approved testimonials"
  ON testimonials FOR SELECT
  USING (approved = TRUE);

-- Authenticated (admin): Full access to all tables
CREATE POLICY "Authenticated users have full access to requests"
  ON project_requests FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to messages"
  ON contact_messages FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to blog"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to subscribers"
  ON newsletter_subscribers FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- Storage Bucket for Project Files
-- ============================================
INSERT INTO storage.buckets (id, name, public)
  VALUES ('project-files', 'project-files', true)
  ON CONFLICT DO NOTHING;

CREATE POLICY "Public can upload project files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-files');

CREATE POLICY "Public can view project files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-files');

CREATE POLICY "Authenticated can manage project files"
  ON storage.objects FOR ALL
  USING (bucket_id = 'project-files' AND auth.role() = 'authenticated');

-- ============================================
-- Update Timestamps Function
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_project_requests_updated_at
  BEFORE UPDATE ON project_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Sample Blog Posts (optional, remove if not needed)
-- ============================================
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, published)
VALUES (
  'How to Write a Strong Literature Review',
  'how-to-write-strong-literature-review',
  'A comprehensive guide to writing a literature review that impresses your supervisor and sets the foundation for excellent research.',
  'Writing a literature review is one of the most important skills in academic research. It demonstrates your understanding of the field and identifies gaps that your research will address...',
  'Dr. Elizabeth Carter',
  'Research Tips',
  ARRAY['literature review', 'research', 'writing'],
  TRUE
),
(
  '10 Common Dissertation Mistakes to Avoid',
  'common-dissertation-mistakes',
  'Learn from the most common mistakes students make in their dissertations and how to avoid them for a successful submission.',
  'Dissertations are one of the most challenging academic undertakings. Here are the top mistakes and how to avoid them...',
  'Prof. Michael Adebayo',
  'Dissertation',
  ARRAY['dissertation', 'mistakes', 'tips'],
  TRUE
);
