 import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
)

export type ContactEnquiry = {
  id?: string
  name: string
  email: string
  phone?: string
  company?: string
  service_interested?: string
  budget?: string
  message: string
  status?: string
  created_at?: string
}

export type NewsletterSubscriber = {
  id?: string
  email: string
  name?: string
  is_active?: boolean
  subscribed_at?: string
}

export type PortfolioProject = {
  id: string
  title: string
  slug: string
  category: string
  client?: string
  industry?: string
  challenge?: string
  solution?: string
  technologies: string[]
  featured_image?: string
  gallery_images: string[]
  is_featured: boolean
  outcome?: string
  client_testimonial?: string
  sort_order: number
  created_at: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  category: string
  excerpt?: string
  content?: string
  featured_image?: string
  author: string
  author_image?: string
  tags: string[]
  is_published: boolean
  published_at?: string
  read_time: number
  created_at: string
}

export type Testimonial = {
  id: string
  client_name: string
  client_title?: string
  company?: string
  content: string
  rating: number
  client_image?: string
  is_featured: boolean
  created_at: string
}

export type TrainingProgram = {
  id: string
  title: string
  slug: string
  category: string
  description?: string
  overview?: string
  duration?: string
  schedule?: string
  price?: string
  features: string[]
  is_active: boolean
  sort_order: number
  created_at: string
}