/*
# Lumeflo Solutions Limited - Initial Database Schema

Creates all tables for the Lumeflo corporate website:
contact_enquiries, newsletter_subscribers, portfolio_projects, blog_posts, testimonials, training_programs.
All tables use RLS with anon+authenticated policies for public content.
Contact enquiries and newsletter allow anon inserts. Portfolio, blog, testimonials, training are read-only for anon.
*/

-- Contact Enquiries
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service_interested text,
  budget text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON contact_enquiries;
CREATE POLICY "anon_insert_enquiries" ON contact_enquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_enquiries" ON contact_enquiries;
CREATE POLICY "anon_select_enquiries" ON contact_enquiries FOR SELECT
  TO anon, authenticated USING (true);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  is_active boolean NOT NULL DEFAULT true,
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_select_newsletter" ON newsletter_subscribers FOR SELECT
  TO anon, authenticated USING (true);

-- Portfolio Projects
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  client text,
  industry text,
  challenge text,
  solution text,
  technologies text[] DEFAULT '{}',
  featured_image text,
  gallery_images text[] DEFAULT '{}',
  is_featured boolean NOT NULL DEFAULT false,
  outcome text,
  client_testimonial text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_portfolio" ON portfolio_projects;
CREATE POLICY "anon_select_portfolio" ON portfolio_projects FOR SELECT
  TO anon, authenticated USING (true);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  excerpt text,
  content text,
  featured_image text,
  author text NOT NULL DEFAULT 'Lumeflo Team',
  author_image text,
  tags text[] DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  read_time integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_blog" ON blog_posts;
CREATE POLICY "anon_select_blog" ON blog_posts FOR SELECT
  TO anon, authenticated USING (is_published = true);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_title text,
  company text,
  content text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  client_image text,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (true);

-- Training Programs
CREATE TABLE IF NOT EXISTS training_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  description text,
  overview text,
  duration text,
  schedule text,
  price text,
  features text[] DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_training" ON training_programs;
CREATE POLICY "anon_select_training" ON training_programs FOR SELECT
  TO anon, authenticated USING (is_active = true);

-- Seed Testimonials
INSERT INTO testimonials (client_name, client_title, company, content, rating, is_featured) VALUES
  ('Adaeze Okonkwo', 'CEO', 'TechVentures Nigeria', 'Lumeflo transformed our brand identity completely. The team delivered beyond our expectations with a world-class website and stunning visual identity. Our leads have tripled since launch.', 5, true),
  ('Emmanuel Adeyemi', 'Founder', 'GreenPath Academy', 'Working with Lumeflo was an exceptional experience. Their attention to detail, creativity, and professionalism set them apart. Our new website has significantly improved our student enrollment rates.', 5, true),
  ('Chidinma Nwosu', 'Marketing Director', 'Lagos Realty Group', 'The social media management service from Lumeflo has been a game-changer for our business. Our engagement increased by 400% in just three months. Highly professional team!', 5, true),
  ('Olumide Fashola', 'Executive Director', 'Harmony NGO', 'Lumeflo designed our entire brand from scratch. Every element reflects our mission perfectly. We have received so many compliments on our new identity. Outstanding work!', 5, false),
  ('Blessing Okeke', 'Proprietress', 'Starlight Academy', 'The school portal Lumeflo built for us has completely digitized our operations. Parents and students love it. The team was incredibly patient and thorough throughout the project.', 5, false)
ON CONFLICT DO NOTHING;

-- Seed Portfolio Projects
INSERT INTO portfolio_projects (title, slug, category, client, industry, challenge, solution, technologies, featured_image, is_featured, outcome, sort_order) VALUES
  ('Brand Identity Redesign', 'techventures-brand-identity', 'branding', 'TechVentures Nigeria', 'Technology', 'The client needed a complete brand overhaul to compete in the premium tech market.', 'We created a modern, sophisticated brand identity with custom logo, color system, and comprehensive brand guidelines.', ARRAY['Adobe Illustrator', 'Figma', 'Adobe Photoshop'], 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg', true, 'Brand recognition increased by 60% within 6 months of relaunch.', 1),
  ('Corporate Website Development', 'greenpath-academy-website', 'websites', 'GreenPath Academy', 'Education', 'The academy needed a modern, student-friendly website with online enrollment capability.', 'Built a fully responsive, fast-loading website with online enrollment system, course catalog, and student portal.', ARRAY['React', 'Next.js', 'Tailwind CSS', 'Supabase'], 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg', true, 'Student enrollment increased by 85% in the first semester after launch.', 2),
  ('E-commerce Platform', 'harmony-store-ecommerce', 'websites', 'Harmony Store', 'Retail', 'The client needed a robust e-commerce platform to expand their retail business online.', 'Developed a feature-rich e-commerce platform with inventory management, payment integration, and analytics dashboard.', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg', true, 'Online sales reached N2M in the first month of operation.', 3),
  ('Social Media Campaign', 'lagos-realty-social', 'social-media', 'Lagos Realty Group', 'Real Estate', 'The company had low social media presence and struggled to generate leads online.', 'Developed and executed a comprehensive social media strategy with premium visual content and targeted campaigns.', ARRAY['Canva', 'Adobe Premiere', 'Meta Ads', 'Analytics'], 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg', false, 'Followers grew from 500 to 15,000 and monthly leads increased by 300%.', 4),
  ('UI/UX Dashboard Design', 'fintech-dashboard-design', 'ui-ux', 'PayFlow Africa', 'Fintech', 'The fintech startup needed an intuitive dashboard that simplified complex financial data.', 'Designed a clean, data-rich dashboard with excellent UX, clear data visualization, and seamless user flows.', ARRAY['Figma', 'Framer', 'Adobe XD'], 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg', true, 'User satisfaction score improved from 3.2 to 4.8 out of 5 stars.', 5),
  ('NGO Website & Donation Portal', 'harmony-ngo-portal', 'websites', 'Harmony NGO', 'Non-profit', 'The organization needed a digital presence that communicated their mission and drove donations.', 'Created a beautiful, mission-driven website with donation integration, event management, and volunteer portal.', ARRAY['WordPress', 'Elementor', 'PayStack', 'Mailchimp'], 'https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg', false, 'Online donations increased by 200% and volunteer signups tripled.', 6)
ON CONFLICT DO NOTHING;

-- Seed Blog Posts
INSERT INTO blog_posts (title, slug, category, excerpt, featured_image, author, tags, is_published, published_at, read_time) VALUES
  ('10 Branding Mistakes That Are Costing Your Business Clients', '10-branding-mistakes', 'Branding', 'Discover the most common branding errors that drive potential customers away and learn how to fix them for a stronger, more trustworthy brand presence.', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', 'Lumeflo Team', ARRAY['branding', 'business', 'design'], true, now() - interval '7 days', 8),
  ('Why Every Business Needs a Premium Website in 2025', 'why-business-needs-premium-website-2025', 'Website Tips', 'Your website is your most powerful sales tool. Discover why investing in a premium website is the smartest business decision you can make this year.', 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg', 'Lumeflo Team', ARRAY['website', 'business growth', 'digital'], true, now() - interval '14 days', 6),
  ('The Complete Guide to Social Media Management for African Businesses', 'social-media-management-african-businesses', 'Social Media', 'Learn how to build a powerful social media presence that attracts customers, builds trust, and grows your African business in the digital age.', 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg', 'Lumeflo Team', ARRAY['social media', 'digital marketing', 'Africa'], true, now() - interval '21 days', 10),
  ('Graphic Design Trends Dominating African Brands in 2025', 'graphic-design-trends-african-brands-2025', 'Graphic Design', 'Explore the top graphic design trends that are shaping African brand identities and learn how to apply them to elevate your business visuals.', 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg', 'Lumeflo Team', ARRAY['design', 'trends', 'branding'], true, now() - interval '28 days', 7),
  ('How to Choose the Right Digital Agency for Your Business', 'how-to-choose-right-digital-agency', 'Business Growth', 'Not all digital agencies are equal. Learn the key questions to ask, red flags to avoid, and qualities to look for when hiring a digital partner.', 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg', 'Lumeflo Team', ARRAY['business', 'agency', 'tips'], true, now() - interval '35 days', 9),
  ('SEO Strategies That Actually Work for Nigerian Businesses', 'seo-strategies-nigerian-businesses', 'Technology', 'Cut through the SEO noise with proven strategies specifically tailored for Nigerian and African businesses looking to rank higher and attract more customers.', 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg', 'Lumeflo Team', ARRAY['SEO', 'digital marketing', 'Nigeria'], true, now() - interval '42 days', 11)
ON CONFLICT DO NOTHING;

-- Seed Training Programs
INSERT INTO training_programs (title, slug, category, description, overview, duration, schedule, price, features, is_active, sort_order) VALUES
  ('Professional Graphic Design', 'professional-graphic-design', 'Graphic Design', 'Master the art of visual communication and brand design with industry-standard tools and real-world projects.', 'This comprehensive program covers everything from design fundamentals to advanced branding techniques. You will work on real client projects and graduate with a professional portfolio.', '3 Months', 'Weekdays and Weekends available', 'N80,000', ARRAY['Adobe Illustrator mastery', 'Photoshop and Canva', 'Logo and brand identity design', 'Flyer and marketing materials', 'Social media graphics', 'Print design fundamentals', 'Portfolio development', 'Industry certificate'], true, 1),
  ('Website Design and Development', 'website-design-development', 'Website Development', 'Learn to design and build modern, responsive websites from concept to deployment using the latest technologies.', 'From HTML and CSS fundamentals to advanced React development, this program takes you from beginner to professional web developer. Build real websites throughout the course.', '4 Months', 'Flexible scheduling available', 'N120,000', ARRAY['HTML5 and CSS3 mastery', 'JavaScript fundamentals', 'React and Next.js', 'Responsive and mobile design', 'WordPress development', 'UI/UX principles', 'SEO fundamentals', 'Real project deployment', 'Industry certificate'], true, 2),
  ('UI/UX Design Professional', 'ui-ux-design-professional', 'UI Design', 'Become a sought-after UI/UX designer with skills in user research, wireframing, prototyping, and modern design tools.', 'This program focuses on creating exceptional digital experiences. You will learn user psychology, research methods, wireframing, and high-fidelity prototyping using industry-standard tools like Figma.', '3 Months', 'Weekdays and Weekends available', 'N100,000', ARRAY['Design thinking methodology', 'User research and personas', 'Wireframing and prototyping', 'Figma mastery', 'Mobile and web app design', 'Design systems', 'Usability testing', 'Portfolio showcase', 'Industry certificate'], true, 3),
  ('Digital Marketing Fundamentals', 'digital-marketing-fundamentals', 'Digital Marketing Basics', 'Launch and grow your business online with proven digital marketing strategies, social media management, and content creation skills.', 'This practical program covers all essential digital marketing channels and strategies. Learn how to create content, manage social media, run paid ads, and track results.', '2 Months', 'Flexible scheduling available', 'N60,000', ARRAY['Social media strategy', 'Content creation and planning', 'Meta and Google Ads basics', 'SEO fundamentals', 'Email marketing', 'Analytics and reporting', 'Brand storytelling', 'Practical campaigns', 'Industry certificate'], true, 4)
ON CONFLICT DO NOTHING;
