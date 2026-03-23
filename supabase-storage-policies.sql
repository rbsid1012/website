-- Storage Bucket Policies for hackathon-submissions
-- Run this SQL in Supabase SQL Editor after creating the bucket

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'hackathon-submissions');

-- Allow public read access (so file URLs work)
CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'hackathon-submissions');

-- Allow users to delete their own files (optional)
CREATE POLICY "Allow users to delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'hackathon-submissions' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own files (optional)
CREATE POLICY "Allow users to update own files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'hackathon-submissions' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
