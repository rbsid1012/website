# Supabase Storage Setup for Hackathon Submissions

## Create Storage Bucket

In your Supabase dashboard:

1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Set bucket name: `hackathon-submissions`
4. Set to **Public bucket** (so files can be accessed via public URLs)
5. Click **Create bucket**

## Bucket Policies (Optional - for extra security)

If you want to restrict who can upload files, add these policies:

### Allow authenticated users to upload
```sql
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'hackathon-submissions');
```

### Allow public read access
```sql
CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'hackathon-submissions');
```

### Allow users to delete their own files
```sql
CREATE POLICY "Allow users to delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'hackathon-submissions' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## File Size Limit

The default file size limit in Supabase is **50MB**. The frontend currently limits uploads to **2MB**, which is well within this limit.

To change the file size limit:
1. Go to **Settings** → **Storage**
2. Adjust **Max file size** if needed

## Done!

Once you've created the `hackathon-submissions` bucket and run the SQL schema, hackathon submissions will work automatically. Files will be stored in the format:
```
hackathon-submissions/
  └── round1-submissions/
      └── {user_id}_{timestamp}.{ext}
```
