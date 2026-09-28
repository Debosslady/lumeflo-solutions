'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar, Search, Tag } from 'lucide-react'
import { supabase, type BlogPost } from '../lib/supabase'

const allCategories = ['All', 'Branding', 'Website Tips', 'Graphic Design', 'Social Media', 'Business Growth', 'Technology']

function NewsletterBox() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    const { error } = await supabase.from('newsletter_subscribers').insert({ email })
    if (error && error.code !== '23505') setState('error')
    else { setState('success'); setEmail('') }
  }

  return (
    <div className="bg-gradient-to-br from-[#123C2F] to-[#184D3A] rounded-2xl p-7 text-white">
      <h4 className="font-black text-xl mb-2">Stay Informed</h4>
      <p className="text-white/70 text-sm mb-5">Get the latest insights on branding, web design, and digital growth delivered to your inbox.</p>

      {state === 'success' ? (
        <p className="text-[#C9A65B] font-semibold text-sm">You're subscribed! Welcome aboard.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm outline-none focus:border-[#C9A65B] transition-colors"
            required
          />
          <button type="submit" disabled={state === 'loading'} className="btn-gold w-full justify-center">
            {state === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
          </button>
        </form>
      )}
      {state === 'error' && <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>}
    </div>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filtered, setFiltered] = useState<BlogPost[]>([])
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('blog_posts').select('*').eq('is_published', true).order('published_at', { ascending: false }).then(({ data }) => {
      if (data) { setPosts(data); setFiltered(data) }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    let result = posts
    if (category !== 'All') result = result.filter((p) => p.category === category)
    if (search) result = result.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt || '').toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(result)
  }, [category, search, posts])

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero page-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#C9A65B 1px, transparent 1px), linear-gradient(90deg, #C9A65B 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-4">The Lumeflo Blog</p>
          <h1 className="hero-text text-white mb-6 max-w-3xl mx-auto">
            Insights to <span className="text-gradient-gold">Grow</span> Your Business
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Expert articles on branding, website design, social media, and digital strategy — written for ambitious African businesses.
          </p>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 w-full">
          <path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="white" />
        </svg>
      </section>

      {/* Blog Content */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Search & Filter */}
              <div className="mb-8 space-y-4">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm font-['Inter'] outline-none focus:border-[#123C2F] transition-colors"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`nav-pill ${category === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-56" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">No articles found.</p>
                </div>
              ) : (
                <>
                  {/* Featured post */}
                  {featured && (
                    <div className="rounded-3xl overflow-hidden bg-white shadow-lg card-hover group mb-8 border border-gray-100">
                      <div className="h-72 overflow-hidden">
                        <img
                          src={featured.featured_image || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'}
                          alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 rounded-full bg-[#123C2F]/8 text-[#123C2F] font-semibold text-xs">
                            {featured.category}
                          </span>
                          <span className="inline-block px-3 py-1 rounded-full bg-[#C9A65B]/12 text-[#C9A65B] font-semibold text-xs">
                            Featured
                          </span>
                        </div>
                        <h2 className="font-black text-[#123C2F] text-2xl mb-3 leading-tight">{featured.title}</h2>
                        <p className="text-gray-600 leading-relaxed mb-5">{featured.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <span className="flex items-center gap-1"><Calendar size={13} />{formatDate(featured.published_at)}</span>
                            <span className="flex items-center gap-1"><Clock size={13} />{featured.read_time} min read</span>
                          </div>
                          <Link href="/contact" className="flex items-center gap-1 text-[#C9A65B] font-semibold text-sm hover:gap-2 transition-all">
                            Read More <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rest of posts */}
                  <div className="space-y-6">
                    {rest.map((post) => (
                      <div key={post.id} className="flex gap-6 bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover group shadow-sm">
                        <div className="w-40 shrink-0 overflow-hidden">
                          <img
                            src={post.featured_image || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-center">
                          <span className="px-2.5 py-1 rounded-full bg-[#123C2F]/8 text-[#123C2F] font-semibold text-xs inline-block mb-2 w-fit">
                            {post.category}
                          </span>
                          <h3 className="font-bold text-[#123C2F] text-base leading-tight mb-2">{post.title}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center gap-3 text-gray-400 text-xs">
                            <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(post.published_at)}</span>
                            <span className="flex items-center gap-1"><Clock size={11} />{post.read_time} min</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter */}
              <NewsletterBox />

              {/* Categories */}
              <div className="bg-[#F8F6F0] rounded-2xl p-6">
                <h4 className="font-bold text-[#123C2F] text-base mb-4">Categories</h4>
                <div className="space-y-2">
                  {allCategories.filter((c) => c !== 'All').map((cat) => {
                    const count = posts.filter((p) => p.category === cat).length
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all ${
                          category === cat ? 'bg-[#123C2F] text-white' : 'hover:bg-white text-gray-600 hover:text-[#123C2F]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Tag size={13} />
                          {cat}
                        </span>
                        <span className={`text-xs ${category === cat ? 'text-[#C9A65B]' : 'text-gray-400'}`}>{count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Popular posts */}
              <div>
                <h4 className="font-bold text-[#123C2F] text-base mb-4">Popular Articles</h4>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post, i) => (
                    <div key={post.id} className="flex gap-3 items-start">
                      <span className="font-black text-2xl text-[#C9A65B]/30 leading-none shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-semibold text-[#123C2F] text-sm leading-tight mb-1">{post.title}</p>
                        <p className="text-gray-400 text-xs">{post.read_time} min read</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#C9A65B] to-[#D8BC79] rounded-2xl p-7 text-center">
                <h4 className="font-black text-[#123C2F] text-xl mb-2">Need Help Growing?</h4>
                <p className="text-[#123C2F]/70 text-sm mb-5">Let our experts build your brand and digital presence.</p>
                <Link href="/contact" className="btn-primary justify-center w-full">
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
