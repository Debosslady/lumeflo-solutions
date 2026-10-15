'use client'

import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { BlogArticle } from '../../data/blogData'
import { formatDate } from '../../data/blogData'

type Props = {
  article: BlogArticle
  onReadMore: (article: BlogArticle) => void
}

export default function FeaturedBlogCard({ article, onReadMore }: Props) {
  return (
    <div className="featured-fade rounded-3xl overflow-hidden bg-white shadow-lg card-hover group mb-8 border border-gray-100">
      <div className="h-72 overflow-hidden relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#C9A65B] text-[#123C2F] font-bold text-xs">
          Featured
        </span>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#123C2F]/8 text-[#123C2F] font-semibold text-xs">
            {article.category}
          </span>
        </div>
        <h2 className="font-black text-[#123C2F] text-2xl mb-3 leading-tight">{article.title}</h2>
        <p className="text-gray-600 leading-relaxed mb-5">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1"><Calendar size={13} />{formatDate(article.date)}</span>
            <span className="flex items-center gap-1"><Clock size={13} />{article.readingTime} min read</span>
          </div>
          <button
            onClick={() => onReadMore(article)}
            className="flex items-center gap-1 text-[#C9A65B] font-semibold text-sm hover:gap-2 transition-all"
            aria-label={`Read more about ${article.title}`}
          >
            Read More <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
