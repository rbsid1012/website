-- Hackathon Submissions Table
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create hackathon_submissions table
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

-- Create indexes
CREATE INDEX idx_hackathon_submissions_user_id ON public.hackathon_submissions(user_id);
CREATE INDEX idx_hackathon_submissions_round ON public.hackathon_submissions(round);
CREATE INDEX idx_hackathon_submissions_submitted_at ON public.hackathon_submissions(submitted_at DESC);

-- Enable RLS
ALTER TABLE public.hackathon_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own submissions"
  ON public.hackathon_submissions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submissions"
  ON public.hackathon_submissions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can view all submissions"
  ON public.hackathon_submissions
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_hackathon_submissions_updated_at
  BEFORE UPDATE ON public.hackathon_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT SELECT, INSERT ON public.hackathon_submissions TO authenticated;
GRANT ALL ON public.hackathon_submissions TO service_role;
