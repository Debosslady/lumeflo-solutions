'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { supabase, type PortfolioProject } from '../lib/supabase'

const categories = ['All', 'Branding', 'Websites', 'UI/UX', 'Social Media', 'Marketing']
const categoryMap: Record<string, string> = {
  'All': '',
  'Branding': 'branding',
  'Websites': 'websites',
  'UI/UX': 'ui-ux',
  'Social Media': 'social-media',
  'Marketing': 'marketing',
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [filtered, setFiltered] = useState<PortfolioProject[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<PortfolioProject | null>(null)

  useEffect(() => {
    supabase.from('portfolio_projects').select('*').order('sort_order').then(({ data }) => {
      if (data) { setProjects(data); setFiltered(data) }
      setLoading(false)
    })
  }, [])

  const filter = (cat: string) => {
    setActiveCategory(cat)
    const slug = categoryMap[cat]
    setFiltered(slug ? projects.filter((p) => p.category === slug) : projects)
  }

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero page-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#C9A65B 1px, transparent 1px), linear-gradient(90deg, #C9A65B 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-4">Our Portfolio</p>
          <h1 className="hero-text text-white mb-6 max-w-3xl mx-auto">
            Work That <span className="text-gradient-gold">Speaks</span> for Itself
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Explore the brands we've built, the websites we've launched, and the digital stories we've told for clients across Africa.
          </p>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 w-full">
          <path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="white" />
        </svg>
      </section>

      {/* Portfolio */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => filter(cat)}
                className={`nav-pill ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-80" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No projects found in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl overflow-hidden bg-white shadow-md card-hover group cursor-pointer"
                  onClick={() => setSelected(project)}
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={project.featured_image || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#123C2F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white font-semibold text-sm flex items-center gap-2">
                        View Project <ExternalLink size={14} />
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#123C2F]/8 text-[#123C2F] font-semibold text-xs capitalize">
                        {project.category}
                      </span>
                      {project.is_featured && (
                        <span className="inline-block px-3 py-1 rounded-full bg-[#C9A65B]/12 text-[#C9A65B] font-semibold text-xs">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-[#123C2F] text-lg mb-1">{project.title}</h3>
                    <p className="text-gray-500 text-sm">{project.client} · {project.industry}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded-md bg-gray-50 text-gray-500 text-xs border border-gray-100">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-64 overflow-hidden rounded-t-3xl">
              <img
                src={selected.featured_image || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#123C2F]/8 text-[#123C2F] font-semibold text-xs capitalize">
                  {selected.category}
                </span>
                <span className="text-gray-400 text-sm">{selected.client} · {selected.industry}</span>
              </div>
              <h2 className="font-black text-[#123C2F] text-2xl mb-6">{selected.title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {selected.challenge && (
                  <div>
                    <h4 className="font-bold text-[#123C2F] text-sm mb-2">The Challenge</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{selected.challenge}</p>
                  </div>
                )}
                {selected.solution && (
                  <div>
                    <h4 className="font-bold text-[#123C2F] text-sm mb-2">Our Solution</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{selected.solution}</p>
                  </div>
                )}
              </div>

              {selected.outcome && (
                <div className="bg-[#F8F6F0] rounded-xl p-5 mb-6 border-l-4 border-[#C9A65B]">
                  <h4 className="font-bold text-[#123C2F] text-sm mb-2">Outcome</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{selected.outcome}</p>
                </div>
              )}

              {selected.technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-[#123C2F] text-sm mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.client_testimonial && (
                <div className="bg-[#123C2F] rounded-2xl p-6 mb-6">
                  <p className="text-white/80 text-sm italic leading-relaxed mb-3">"{selected.client_testimonial}"</p>
                  <p className="text-[#C9A65B] font-semibold text-sm">— {selected.client}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Link href="/contact" className="btn-gold flex-1 justify-center" onClick={() => setSelected(null)}>
                  Start Similar Project
                </Link>
                <button
                  onClick={() => setSelected(null)}
                  className="btn-outline-dark px-6"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="section-pad bg-[#123C2F]">
        <div className="container-custom text-center">
          <h2 className="section-heading text-white mb-5">Ready to Be Our Next Success Story?</h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Let's collaborate to create something extraordinary for your business.
          </p>
          <Link href="/contact" className="btn-gold">
            Start Your Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
