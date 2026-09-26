'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Palette, Globe, Share2, BookOpen, Search, ArrowRight,
  CheckCircle, ChevronDown, ChevronUp, BarChart3
} from 'lucide-react'

const serviceCategories = [
  {
    id: 'website-development',
    icon: Globe,
    title: 'Website Development',
    tagline: 'Digital Experiences That Convert',
    overview: 'We design and develop fast, beautiful, and conversion-optimized websites that serve as your most powerful marketing and sales tool. From simple landing pages to complex web platforms.',
    items: [
      'Corporate & Business Websites', 'Landing Pages', 'Portfolio Websites',
      'E-commerce Platforms', 'School & University Portals', 'NGO & Charity Websites',
      'Church & Ministry Websites', 'Real Estate Websites', 'Responsive Mobile Design',
      'Website Maintenance & Updates', 'SEO Optimization', 'Performance Optimization',
    ],
    benefits: [
      'Mobile-first responsive design', '95+ Google PageSpeed score',
      'SEO-ready from day one', 'Secure and scalable architecture',
    ],
    process: ['Requirements Gathering', 'Wireframing & Planning', 'UI/UX Design', 'Development & Testing', 'Launch & Training'],
    faqs: [
      { q: 'How long does a website take to build?', a: 'A basic business website takes 2–3 weeks. E-commerce and portal platforms typically take 4–8 weeks depending on complexity.' },
      { q: 'Will my website work on mobile?', a: 'Absolutely. Every website we build is mobile-first, fully responsive, and tested across all major devices and browsers.' },
      { q: 'Can you redesign my existing website?', a: 'Yes. We offer complete website redesigns that improve performance, aesthetics, and conversion rates while preserving your content and SEO rankings.' },
    ],
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    color: 'from-[#184D3A] to-[#2A7A57]',
  },
  {
    id: 'data-analysis',
    icon: BarChart3,
    title: 'Data Analysis',
    tagline: 'Insights That Drive Smarter Decisions',
    overview: 'We help you make sense of your business data. From sales and customer trends to operational performance, we turn raw numbers into clear, visual, and actionable insights that guide growth.',
    items: [
      'Business Data Dashboards', 'Sales & Revenue Analysis', 'Customer Behaviour Insights',
      'Google Analytics Setup & Audit', 'KPI Tracking & Reporting', 'Data Visualisation',
      'Spreadsheet Automation', 'Survey & Feedback Analysis', 'Market Trend Research',
      'Executive Summary Reports', 'Data Cleaning & Structuring', 'Monthly Performance Reviews',
    ],
    benefits: [
      'Clear visual dashboards', 'Faster, evidence-based decisions',
      'Identify growth opportunities', 'Track what truly matters',
    ],
    process: ['Data Discovery', 'Cleaning & Structuring', 'Analysis & Modelling', 'Dashboard Design', 'Review & Reporting'],
    faqs: [
      { q: 'What data sources do you work with?', a: 'We work with spreadsheets, Google Analytics, CRM exports, sales records, and most structured business data you already collect.' },
      { q: 'Do I need technical tools to use the dashboards?', a: 'No. We deliver dashboards that are easy to open and explore — no technical knowledge required.' },
      { q: 'How often are reports updated?', a: 'We offer one-off analysis as well as weekly, monthly, or quarterly reporting packages depending on your needs.' },
    ],
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    color: 'from-[#1E6045] to-[#2A7A57]',
  },
  {
    id: 'graphic-design',
    icon: Palette,
    title: 'Creative Graphic Design',
    tagline: 'Visuals That Command Attention',
    overview: 'We create stunning visual identities and design materials that position your brand as a trustworthy and memorable business. From logo to packaging, every pixel has a purpose.',
    items: [
      'Brand Identity & Logo Design', 'Corporate Identity Systems', 'Flyer & Poster Design',
      'Social Media Graphics', 'Business Cards & Stationery', 'Letterheads & Envelopes',
      'Roll-up Banners & Signage', 'Product Packaging Design', 'Presentation Design',
      'Marketing Materials & Brochures',
    ],
    benefits: [
      'Instantly recognizable brand identity', 'Consistent visuals across all touchpoints',
      'Strong positioning in your market', 'Print-ready and digital formats',
    ],
    process: ['Brand Discovery Brief', 'Research & Concept Development', 'Design Exploration', 'Refinement & Approval', 'Final Delivery & Brand Guide'],
    faqs: [
      { q: 'How long does a logo design take?', a: 'A professional logo design typically takes 5–10 business days, including revisions. Full brand identity packages take 2–4 weeks.' },
      { q: 'How many revisions do I get?', a: 'We include unlimited minor revisions and 3 rounds of major revisions in all our design packages to ensure your satisfaction.' },
      { q: 'Do you provide print-ready files?', a: 'Yes. All design deliverables include high-resolution files in all required formats (PDF, AI, EPS, PNG, JPEG) for both print and digital use.' },
    ],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    color: 'from-[#123C2F] to-[#1E6045]',
  },
  {
    id: 'social-media',
    icon: Share2,
    title: 'Social Media Management',
    tagline: 'Grow Your Audience, Amplify Your Impact',
    overview: 'Social media is where your brand lives in your audience\'s daily life. We manage every aspect of your social presence — from strategy and content creation to community management and analytics.',
    items: [
      'Social Media Strategy & Planning', 'Graphic Design for Social Media', 'Caption & Copy Writing',
      'Content Calendar Creation', 'Scheduling & Publishing', 'Community Management',
      'Audience Growth Strategy', 'Engagement Management', 'Analytics & Reporting',
      'Monthly Performance Reports',
    ],
    benefits: [
      'Consistent, high-quality content', 'Audience growth and engagement',
      'Brand voice and tone alignment', 'Data-driven optimization',
    ],
    process: ['Brand & Audience Audit', 'Strategy Development', 'Content Creation', 'Publishing & Management', 'Analysis & Optimization'],
    faqs: [
      { q: 'Which social media platforms do you manage?', a: 'We manage Facebook, Instagram, LinkedIn, Twitter/X, TikTok, and YouTube — tailored to where your target audience is most active.' },
      { q: 'How many posts per week do you create?', a: 'Our packages range from 3 to 7 posts per week per platform. We recommend a minimum of 5 posts per week for meaningful growth.' },
      { q: 'Do you respond to comments and messages?', a: 'Yes. Our community management service includes responding to comments, messages, and reviews within 24 hours on weekdays.' },
    ],
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    color: 'from-[#123C2F] to-[#184D3A]',
  },
  {
    id: 'training',
    icon: BookOpen,
    title: 'Professional Training',
    tagline: 'Invest in Skills That Transform Careers',
    overview: 'Our industry-led training programs equip individuals and teams with practical, job-ready digital skills. From beginner to advanced, our courses are designed to deliver real-world results.',
    items: [
      'Graphic Design Training', 'Website Design & Development', 'Data Analysis Course',
      'Digital Marketing Fundamentals', 'One-on-One Mentorship', 'Corporate Team Training',
      'Physical Classroom Sessions', 'Online Live Classes', 'Industry Certification',
    ],
    benefits: [
      'Hands-on, practical curriculum', 'Real client project experience',
      'Industry-recognized certificate', 'Post-training career support',
    ],
    process: ['Enrolment & Orientation', 'Foundational Modules', 'Practical Projects', 'Advanced Specialization', 'Portfolio Review', 'Certification'],
    faqs: [
      { q: 'Are the classes online or physical?', a: 'We offer both physical classes in Lagos and live online sessions via Zoom for students across Africa and the diaspora.' },
      { q: 'Do I need prior experience to enroll?', a: 'No prior experience is required for our beginner programs. We start from the absolute basics and build progressively.' },
      { q: 'Is there a certificate at the end?', a: 'Yes. Every student who completes the full program receives an industry-recognized certificate from Lumeflo Solutions Limited.' },
    ],
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    color: 'from-[#184D3A] to-[#1E6045]',
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO & Digital Strategy',
    tagline: 'Be Found When It Matters Most',
    overview: 'Visibility is everything online. Our SEO and digital strategy services ensure your business ranks at the top of search results and dominates your market online.',
    items: [
      'Technical SEO Audit', 'Keyword Research & Strategy', 'On-Page Optimization',
      'Content SEO Strategy', 'Link Building', 'Local SEO', 'Google Business Profile',
      'Schema & Structured Data', 'Monthly SEO Reporting',
    ],
    benefits: [
      'Higher organic search rankings', 'Increased qualified traffic',
      'Long-term sustainable growth', 'Measurable ROI tracking',
    ],
    process: ['Full SEO Audit', 'Strategy Development', 'On-Page Optimization', 'Content & Link Building', 'Monitor & Report'],
    faqs: [
      { q: 'How long before I see SEO results?', a: 'SEO is a long-term strategy. Meaningful results typically appear within 3–6 months. Competitive markets may take 6–12 months for significant rankings.' },
      { q: 'Do you guarantee first-page rankings?', a: 'No ethical SEO agency can guarantee specific rankings. We guarantee a proven, white-hat strategy that consistently improves your rankings over time.' },
      { q: 'Do you write the SEO content?', a: 'Yes. Our SEO packages include keyword-optimized content creation by our experienced digital copywriters.' },
    ],
    image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg',
    color: 'from-[#1E6045] to-[#2A7A57]',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-[family-name:var(--font-display)] font-semibold text-[#123C2F] text-sm">{q}</span>
        {open ? <ChevronUp size={18} className="text-[#C9A65B] shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function ServicesPage() {
  const [active, setActive] = useState('website-development')
  const activeService = serviceCategories.find((s) => s.id === active)!

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero page-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#C9A65B 1px, transparent 1px), linear-gradient(90deg, #C9A65B 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-[#C9A65B] font-[family-name:var(--font-display)] font-semibold text-sm tracking-widest uppercase mb-4">Our Services</p>
          <h1 className="hero-text text-white mb-6 max-w-3xl mx-auto">
            Everything You Need to <span className="text-gradient-gold">Grow</span> Your Brand
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            From website development to data analysis — our comprehensive service suite gives your business every competitive advantage.
          </p>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 w-full">
          <path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="white" />
        </svg>
      </section>

      {/* Service selector */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {serviceCategories.map(({ id, title, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-[family-name:var(--font-display)] font-semibold text-sm transition-all duration-200 border ${
                  active === id
                    ? 'bg-[#123C2F] text-white border-[#123C2F] shadow-lg shadow-[#123C2F]/15'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#C9A65B] hover:text-[#123C2F]'
                }`}
              >
                <Icon size={16} />
                {title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gradient-to-r ${activeService.color} mb-6`}>
                <activeService.icon size={20} className="text-[#C9A65B]" />
                <span className="text-white font-[family-name:var(--font-display)] font-semibold text-sm">{activeService.tagline}</span>
              </div>

              <h2 className="section-heading text-[#123C2F] mb-4">{activeService.title}</h2>
              <div className="divider-gold mb-6" />
              <p className="text-gray-600 leading-relaxed text-base mb-8">{activeService.overview}</p>

              <h4 className="font-[family-name:var(--font-display)] font-bold text-[#123C2F] text-base mb-4">What's Included</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {activeService.items.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[#C9A65B] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-[family-name:var(--font-display)] font-bold text-[#123C2F] text-base mb-4">Key Benefits</h4>
              <div className="space-y-2 mb-8">
                {activeService.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3 bg-[#F8F6F0] rounded-xl px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-[#C9A65B] shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{b}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="btn-gold inline-flex">
                Get a Quote
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl overflow-hidden">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-72 object-cover"
                />
              </div>

              <div>
                <h4 className="font-[family-name:var(--font-display)] font-bold text-[#123C2F] text-base mb-4">Our Process</h4>
                <div className="space-y-3">
                  {activeService.process.map((step, i) => (
                    <div key={step} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#123C2F] to-[#184D3A] flex items-center justify-center shrink-0">
                        <span className="text-[#C9A65B] font-[family-name:var(--font-display)] font-black text-xs">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-[family-name:var(--font-display)] font-bold text-[#123C2F] text-base mb-4">Frequently Asked Questions</h4>
                <div className="space-y-3">
                  {activeService.faqs.map((faq) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-[#123C2F]">
        <div className="container-custom text-center">
          <h2 className="section-heading text-white mb-5">Ready to Get Started?</h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Tell us about your project and get a free consultation with one of our experts.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Start Your Project <ArrowRight size={18} />
            </Link>
            <Link href="/portfolio" className="btn-outline">
              See Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
