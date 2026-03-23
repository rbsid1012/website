-- Add team_members column to hackathon_registrations table
-- Run this SQL in your Supabase SQL Editor

ALTER TABLE public.hackathon_registrations
ADD COLUMN IF NOT EXISTS team_members JSONB;

-- Update comment
COMMENT ON COLUMN public.hackathon_registrations.team_members IS 'Array of team member objects with name, rollNumber, email, phone';
