-- Fix RLS policies for contact_enquiries and newsletter_subscribers
-- Replace "always true" policies with proper validation checks

-- Contact Enquiries: Validate required fields on insert
DROP POLICY IF EXISTS "anon_insert_enquiries" ON contact_enquiries;
CREATE POLICY "anon_insert_enquiries" ON contact_enquiries FOR INSERT
  TO anon, authenticated 
  WITH CHECK (
    name IS NOT NULL 
    AND trim(name) <> ''
    AND email IS NOT NULL 
    AND trim(email) <> ''
    AND message IS NOT NULL 
    AND trim(message) <> ''
    AND email ~* '^[^@]+@[^@]+\.[^@]+$'
  );

-- Newsletter Subscribers: Validate required fields on insert
DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated 
  WITH CHECK (
    email IS NOT NULL 
    AND trim(email) <> ''
    AND email ~* '^[^@]+@[^@]+\.[^@]+$'
  );