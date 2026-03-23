-- Supabase Database Schema for Cosmic Attire
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- HACKATHON REGISTRATIONS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.hackathon_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  team_name TEXT NOT NULL,
  experience TEXT,
  project_idea TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_hackathon_registrations_user_id ON public.hackathon_registrations(user_id);
CREATE INDEX idx_hackathon_registrations_email ON public.hackathon_registrations(email);
CREATE INDEX idx_hackathon_registrations_created_at ON public.hackathon_registrations(created_at DESC);

-- ========================================
-- CAREER APPLICATIONS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.career_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id TEXT NOT NULL,
  role_title TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  how_heard TEXT NOT NULL,
  why_join TEXT NOT NULL,
  product_changes TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_career_applications_role_id ON public.career_applications(role_id);
CREATE INDEX idx_career_applications_email ON public.career_applications(email);
CREATE INDEX idx_career_applications_created_at ON public.career_applications(created_at DESC);

-- ========================================
-- HACKATHON SUBMISSIONS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.hackathon_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  round INTEGER NOT NULL DEFAULT 1,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_hackathon_submissions_user_id ON public.hackathon_submissions(user_id);
CREATE INDEX idx_hackathon_submissions_round ON public.hackathon_submissions(round);
CREATE INDEX idx_hackathon_submissions_submitted_at ON public.hackathon_submissions(submitted_at DESC);


-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on both tables
ALTER TABLE public.hackathon_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathon_submissions ENABLE ROW LEVEL SECURITY;

-- Hackathon Registrations Policies
-- Allow users to read their own registrations
CREATE POLICY "Users can view own hackathon registrations"
  ON public.hackathon_registrations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow service role to insert (for Cloudflare Worker)
CREATE POLICY "Service role can insert hackathon registrations"
  ON public.hackathon_registrations
  FOR INSERT
  WITH CHECK (true);

-- Allow service role to select all (for admin purposes)
CREATE POLICY "Service role can view all hackathon registrations"
  ON public.hackathon_registrations
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Career Applications Policies
-- Allow service role to insert (for Cloudflare Worker)
CREATE POLICY "Service role can insert career applications"
  ON public.career_applications
  FOR INSERT
  WITH CHECK (true);

-- Allow service role to select all (for admin purposes)
CREATE POLICY "Service role can view all career applications"
  ON public.career_applications
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Hackathon Submissions Policies
-- Allow users to view their own submissions
CREATE POLICY "Users can view own hackathon submissions"
  ON public.hackathon_submissions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow authenticated users to insert their own submissions
CREATE POLICY "Users can insert own hackathon submissions"
  ON public.hackathon_submissions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow service role to select all (for admin purposes)
CREATE POLICY "Service role can view all hackathon submissions"
  ON public.hackathon_submissions
  FOR SELECT
  USING (auth.role() = 'service_role');

-- ========================================
-- FUNCTIONS FOR UPDATED_AT
-- ========================================

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_hackathon_registrations_updated_at
  BEFORE UPDATE ON public.hackathon_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_career_applications_updated_at
  BEFORE UPDATE ON public.career_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hackathon_submissions_updated_at
  BEFORE UPDATE ON public.hackathon_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- GRANT PERMISSIONS
-- ========================================

-- Grant permissions to authenticated users
GRANT SELECT ON public.hackathon_registrations TO authenticated;
GRANT SELECT ON public.career_applications TO authenticated;
GRANT SELECT, INSERT ON public.hackathon_submissions TO authenticated;

-- Grant full permissions to service role (used by Cloudflare Workers)
GRANT ALL ON public.hackathon_registrations TO service_role;
GRANT ALL ON public.career_applications TO service_role;
GRANT ALL ON public.hackathon_submissions TO service_role;
