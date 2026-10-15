'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { blogArticles, getArticlesByCategory, getLatestArticle, formatDate, type BlogArticle } from '../data/blogData'
import BlogCategoryTabs from '../components/blog/BlogCategoryTabs'
import FeaturedBlogCard from '../components/blog/FeaturedBlogCard'
import BlogArticleCard from '../components/blog/BlogArticleCard'
import BlogArticleModal from '../components/blog/BlogArticleModal'

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
      <p className="text-white/70 text-sm mb-5">Get the latest insights on AI, web development, and digital growth delivered to your inbox.</p>
      {state === 'success' ? (
        <p className="text-[#C9A65B] font-semibold text-sm">You&apos;re subscribed! Welcome aboard.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm outline-none focus:border-[#C9A65B] transition-colors" required />
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
  const [category, setCategory] = useState('All')
  const [featuredArticle, setFeaturedArticle] = useState<BlogArticle>(getLatestArticle())
  const [modalArticle, setModalArticle] = useState<BlogArticle | null>(null)

  const filteredArticles = useMemo(() => {
    const articles = getArticlesByCategory(category)
    return articles.filter((a) => a.id !== featuredArticle.id)
  }, [category, featuredArticle])

  useEffect(() => {
    if (category !== 'All') {
      const latestInCategory = getArticlesByCategory(category).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0]
      if (latestInCategory) setFeaturedArticle(latestInCategory)
    }
  }, [category])

  const handleTileClick = (article: BlogArticle) => {
    setFeaturedArticle(article)
  }

  const handleReadMore = (article: BlogArticle) => {
    setModalArticle(article)
  }

  const popularArticles = [...blogArticles].sort((a, b) => b.readingTime - a.readingTime).slice(0, 3)

  return (
    <>
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
            Expert articles on AI, web development, data analysis, and digital strategy — written for ambitious African businesses.
          </p>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 w-full">
          <path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="white" />
        </svg>
      </section>

      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <BlogCategoryTabs active={category} onChange={setCategory} />
              </div>

              <FeaturedBlogCard article={featuredArticle} onReadMore={handleReadMore} />

              <div className="space-y-4">
                {filteredArticles.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No more articles in this category.</p>
                ) : (
                  filteredArticles.map((article) => (
                    <BlogArticleCard
                      key={article.id}
                      article={article}
                      isActive={false}
                      onClick={handleTileClick}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="space-y-8">
              <NewsletterBox />

              <div className="bg-[#F8F6F0] rounded-2xl p-6">
                <h4 className="font-bold text-[#123C2F] text-base mb-4">Categories</h4>
                <div className="space-y-2">
                  {['AI & Automation', 'Web Development', 'Technology', 'Business', 'Data Analysis', 'Digital Skills'].map((cat) => {
                    const count = blogArticles.filter((a) => a.category === cat).length
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all ${
                          category === cat ? 'bg-[#123C2F] text-white' : 'hover:bg-white text-gray-600 hover:text-[#123C2F]'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-xs ${category === cat ? 'text-[#C9A65B]' : 'text-gray-400'}`}>{count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#123C2F] text-base mb-4">Popular Articles</h4>
                <div className="space-y-4">
                  {popularArticles.map((post, i) => (
                    <div key={post.id} className="flex gap-3 items-start cursor-pointer" onClick={() => handleTileClick(post)}>
                      <span className="font-black text-2xl text-[#C9A65B]/30 leading-none shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-semibold text-[#123C2F] text-sm leading-tight mb-1">{post.title}</p>
                        <p className="text-gray-400 text-xs">{post.readingTime} min read · {formatDate(post.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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

      <BlogArticleModal article={modalArticle} onClose={() => setModalArticle(null)} />
    </>
  )
}
