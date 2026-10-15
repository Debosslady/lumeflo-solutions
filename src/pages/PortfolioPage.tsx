'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

type Project = {
  id: string
  title: string
  category: string
  client: string
  industry: string
  image: string
  challenge: string
  solution: string
  outcome: string
  technologies: string[]
  is_featured: boolean
  testimonial?: string
}

const categories = ['All', 'Web Development', 'AI / Automation', 'Data Analysis', 'Training']

const projects: Project[] = [
  { id: 'wd1', title: 'Corporate Business Website', category: 'Web Development', client: 'GreenPath Academy', industry: 'Education', image: 'https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'GreenPath Academy needed a professional online presence to attract students and showcase their programs.', solution: 'We designed and developed a fast, responsive corporate website with an integrated course catalog and enquiry forms.', outcome: '300% increase in online enquiries within the first 3 months.', technologies: ['Next.js', 'Tailwind CSS', 'Supabase'], is_featured: true, testimonial: 'Lumeflo transformed our online presence completely.' },
  { id: 'wd2', title: 'E-commerce Platform', category: 'Web Development', client: 'Lagos Retail Co.', industry: 'Retail', image: 'https://images.pexels.com/photos/17485352/pexels-photo-17485352.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'A growing retail business needed an online store.', solution: 'Built a full e-commerce platform with product catalog, cart, and secure checkout.', outcome: 'Generated N12M in online sales in 6 months.', technologies: ['Next.js', 'Stripe', 'Supabase'], is_featured: false },
  { id: 'wd3', title: 'School Portal & Registration System', category: 'Web Development', client: 'Starlight Academy', industry: 'Education', image: 'https://images.pexels.com/photos/14553707/pexels-photo-14553707.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'Manual student registrations caused delays and errors.', solution: 'Developed a custom portal with online registration and payment integration.', outcome: 'Reduced registration processing time by 80%.', technologies: ['React', 'Node.js', 'PostgreSQL'], is_featured: false },
  { id: 'wd4', title: 'Landing Page for Product Launch', category: 'Web Development', client: 'PayFlow Africa', industry: 'Fintech', image: 'https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'PayFlow needed a high-converting landing page for a product launch.', solution: 'Designed a conversion-optimized landing page with A/B testing and lead capture.', outcome: 'Achieved 45% conversion rate on waitlist signups.', technologies: ['Next.js', 'Framer Motion'], is_featured: false },
  { id: 'wd5', title: 'NGO Donation Platform', category: 'Web Development', client: 'Harmony NGO', industry: 'Non-Profit', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'Harmony NGO needed a platform to accept online donations.', solution: 'Built a donation platform with recurring payments and impact reporting.', outcome: 'Raised N25M in donations in the first year.', technologies: ['Next.js', 'Paystack'], is_featured: false },
  { id: 'ai1', title: 'AI-Powered Customer Support Bot', category: 'AI / Automation', client: 'TechVentures', industry: 'Technology', image: 'https://images.pexels.com/photos/8566470/pexels-photo-8566470.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'TechVentures was overwhelmed by repetitive customer queries.', solution: 'Built an AI chatbot that handles 80% of queries automatically.', outcome: 'Reduced support response time from hours to seconds.', technologies: ['OpenAI API', 'Python', 'Next.js'], is_featured: true, testimonial: 'The AI bot has been a game-changer for our team.' },
  { id: 'ai2', title: 'Automation Dashboard for Workflows', category: 'AI / Automation', client: 'Lagos Realty', industry: 'Real Estate', image: 'https://images.pexels.com/photos/38984789/pexels-photo-38984789.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'Hours were spent manually processing property listings.', solution: 'Created an automation dashboard that auto-categorizes listings and sends notifications.', outcome: 'Saved 30+ hours per week in manual processing.', technologies: ['Python', 'Zapier', 'React'], is_featured: false },
  { id: 'ai3', title: 'Intelligent Business Tool', category: 'AI / Automation', client: 'GreenPath Academy', industry: 'Education', image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'GreenPath needed a tool to analyze student performance.', solution: 'Built an AI-powered analytics tool that identifies at-risk students.', outcome: 'Improved student pass rates by 25%.', technologies: ['OpenAI API', 'Python'], is_featured: false },
  { id: 'ai4', title: 'AI Workflow for Content Generation', category: 'AI / Automation', client: 'PayFlow Africa', industry: 'Fintech', image: 'https://images.pexels.com/photos/8566467/pexels-photo-8566467.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'PayFlow needed consistent marketing content across channels.', solution: 'Implemented an AI workflow that generates blog posts, captions, and email campaigns.', outcome: 'Tripled content output while maintaining brand consistency.', technologies: ['OpenAI API', 'Make.com'], is_featured: false },
  { id: 'da1', title: 'Business Performance Dashboard', category: 'Data Analysis', client: 'Lagos Realty', industry: 'Real Estate', image: 'https://images.pexels.com/photos/34069/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'Data was scattered across spreadsheets with no unified view.', solution: 'Built an interactive dashboard consolidating sales, listings, and client data into real-time KPIs.', outcome: 'Enabled data-driven decisions that increased sales by 35%.', technologies: ['Power BI', 'SQL', 'Python'], is_featured: true, testimonial: 'For the first time, we can see exactly how our business is performing in real time.' },
  { id: 'da2', title: 'Data Visualisation Report', category: 'Data Analysis', client: 'Harmony NGO', industry: 'Non-Profit', image: 'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'Harmony NGO needed to visualize their impact data for donors.', solution: 'Created comprehensive data visualizations showing beneficiary reach and program outcomes.', outcome: 'Secured 40% more recurring donations.', technologies: ['Tableau', 'Python'], is_featured: false },
  { id: 'da3', title: 'KPI Tracking Dashboard', category: 'Data Analysis', client: 'TechVentures', industry: 'Technology', image: 'https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'TechVentures lacked visibility into KPIs across departments.', solution: 'Developed a KPI dashboard with automated data pipelines and alerts.', outcome: 'Improved overall efficiency by 22%.', technologies: ['Looker', 'BigQuery'], is_featured: false },
  { id: 'da4', title: 'Analytics-Driven Decision Platform', category: 'Data Analysis', client: 'Starlight Academy', industry: 'Education', image: 'https://images.pexels.com/photos/37685036/pexels-photo-37685036.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'Starlight Academy needed data insights to optimize enrollment.', solution: 'Built an analytics platform tracking enrollment trends and resource utilization.', outcome: 'Reduced costs by 18% while improving student satisfaction.', technologies: ['Python', 'Pandas', 'React'], is_featured: false },
  { id: 'tr1', title: 'Online Training Platform', category: 'Training', client: 'GreenPath Academy', industry: 'Education', image: 'https://images.pexels.com/photos/6326370/pexels-photo-6326370.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'GreenPath Academy needed to move training programs online.', solution: 'Built a comprehensive LMS with video lessons, quizzes, and certificates.', outcome: 'Trained 500+ students online with 95% completion rate.', technologies: ['Next.js', 'Supabase'], is_featured: true, testimonial: 'The training platform Lumeflo built has been incredible.' },
  { id: 'tr2', title: 'Learning Management System', category: 'Training', client: 'PayFlow Africa', industry: 'Fintech', image: 'https://images.pexels.com/photos/4443160/pexels-photo-4443160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'PayFlow needed to train their growing team on compliance.', solution: 'Developed a custom LMS with role-based learning paths and compliance tracking.', outcome: 'Onboarded 50+ employees 60% faster.', technologies: ['React', 'Node.js'], is_featured: false },
  { id: 'tr3', title: 'Workshop Training Materials', category: 'Training', client: 'Harmony NGO', industry: 'Non-Profit', image: 'https://images.pexels.com/photos/5621952/pexels-photo-5621952.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'Harmony NGO needed professional training materials for community workshops.', solution: 'Created interactive digital training materials including presentations and workbooks.', outcome: 'Reached 1,000+ community members with digital skills training.', technologies: ['Figma', 'Articulate 360'], is_featured: false },
  { id: 'tr4', title: 'Educational Technology Platform', category: 'Training', client: 'Starlight Academy', industry: 'Education', image: 'https://images.pexels.com/photos/17471201/pexels-photo-17471201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', challenge: 'Starlight Academy wanted to offer coding as part of their curriculum.', solution: 'Built an interactive learning platform with coding exercises and peer review.', outcome: '200+ students completed digital skills courses.', technologies: ['Next.js', 'CodeSandbox API'], is_featured: false },
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      <section className="gradient-hero page-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#C9A65B 1px, transparent 1px), linear-gradient(90deg, #C9A65B 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-4">Our Portfolio</p>
          <h1 className="hero-text text-white mb-6 max-w-3xl mx-auto">Work That <span className="text-gradient-gold">Speaks</span> for Itself</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">Explore the brands we&apos;ve built, the websites we&apos;ve launched, and the digital stories we&apos;ve told for clients across Africa.</p>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 w-full"><path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="white" /></svg>
      </section>

      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`nav-pill ${activeCategory === cat ? 'active' : ''}`}>{cat}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20"><p className="text-gray-400 text-lg">No projects found in this category yet.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <div key={project.id} className="rounded-2xl overflow-hidden bg-white shadow-md card-hover group cursor-pointer" onClick={() => setSelected(project)}>
                  <div className="h-56 overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#123C2F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white font-semibold text-sm flex items-center gap-2">View Project <ExternalLink size={14} /></span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#123C2F]/8 text-[#123C2F] font-semibold text-xs">{project.category}</span>
                      {project.is_featured && <span className="inline-block px-3 py-1 rounded-full bg-[#C9A65B]/12 text-[#C9A65B] font-semibold text-xs">Featured</span>}
                    </div>
                    <h3 className="font-bold text-[#123C2F] text-lg mb-1">{project.title}</h3>
                    <p className="text-gray-500 text-sm">{project.client} · {project.industry}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.technologies.slice(0, 3).map((tech) => (<span key={tech} className="px-2 py-0.5 rounded-md bg-gray-50 text-gray-500 text-xs border border-gray-100">{tech}</span>))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 modal-overlay" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="h-64 overflow-hidden rounded-t-3xl relative">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#123C2F] transition-colors" aria-label="Close">
                <span className="text-xl font-bold leading-none">&times;</span>
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#123C2F]/8 text-[#123C2F] font-semibold text-xs">{selected.category}</span>
                <span className="text-gray-400 text-sm">{selected.client} · {selected.industry}</span>
              </div>
              <h2 className="font-black text-[#123C2F] text-2xl mb-6">{selected.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div><h4 className="font-bold text-[#123C2F] text-sm mb-2">The Challenge</h4><p className="text-gray-600 text-sm leading-relaxed">{selected.challenge}</p></div>
                <div><h4 className="font-bold text-[#123C2F] text-sm mb-2">Our Solution</h4><p className="text-gray-600 text-sm leading-relaxed">{selected.solution}</p></div>
              </div>
              <div className="bg-[#F8F6F0] rounded-xl p-5 mb-6 border-l-4 border-[#C9A65B]">
                <h4 className="font-bold text-[#123C2F] text-sm mb-2">Outcome</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{selected.outcome}</p>
              </div>
              <div className="mb-6">
                <h4 className="font-bold text-[#123C2F] text-sm mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">{selected.technologies.map((tech) => (<span key={tech} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">{tech}</span>))}</div>
              </div>
              {selected.testimonial && (
                <div className="bg-[#123C2F] rounded-2xl p-6 mb-6">
                  <p className="text-white/80 text-sm italic leading-relaxed mb-3">&ldquo;{selected.testimonial}&rdquo;</p>
                  <p className="text-[#C9A65B] font-semibold text-sm">— {selected.client}</p>
                </div>
              )}
              <div className="flex gap-3">
                <Link href="/contact" className="btn-gold flex-1 justify-center" onClick={() => setSelected(null)}>Start Similar Project</Link>
                <button onClick={() => setSelected(null)} className="btn-outline-dark px-6">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="section-pad bg-[#123C2F]">
        <div className="container-custom text-center">
          <h2 className="section-heading text-white mb-5">Ready to Be Our Next Success Story?</h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">Let&apos;s collaborate to create something extraordinary for your business.</p>
          <Link href="/contact" className="btn-gold">Start Your Project <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  )
}
