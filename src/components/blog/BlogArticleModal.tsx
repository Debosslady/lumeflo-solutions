'use client'

import { useEffect } from 'react'
import { Calendar, Clock, X } from 'lucide-react'
import type { BlogArticle } from '../../data/blogData'
import { formatDate } from '../../data/blogData'

type Props = {
  article: BlogArticle | null
  onClose: () => void
}

export default function BlogArticleModal({ article, onClose }: Props) {
  useEffect(() => {
    if (article) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [article])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (article) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [article, onClose])

  if (!article) return null

  const contentParagraphs = article.content.split('\n').filter((line) => line.trim())

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-64 sm:h-72 overflow-hidden rounded-t-3xl relative">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#123C2F] transition-colors"
            aria-label="Close article"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#123C2F]/8 text-[#123C2F] font-semibold text-xs">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-gray-400 text-sm">
              <Calendar size={13} />{formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1 text-gray-400 text-sm">
              <Clock size={13} />{article.readingTime} min read
            </span>
          </div>
          <h2 className="font-black text-[#123C2F] text-2xl mb-4 leading-tight">{article.title}</h2>
          <p className="text-gray-500 text-sm mb-6">By {article.author}</p>

          <div className="prose-content text-gray-700 leading-relaxed space-y-4">
            {contentParagraphs.map((para, idx) => {
              const trimmed = para.trim()
              if (trimmed.startsWith('## ')) {
                return <h3 key={idx} className="font-black text-[#123C2F] text-xl mt-6 mb-2">{trimmed.slice(3)}</h3>
              }
              if (trimmed.startsWith('### ')) {
                return <h4 key={idx} className="font-bold text-[#123C2F] text-lg mt-5 mb-2">{trimmed.slice(4)}</h4>
              }
              if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                return <p key={idx} className="font-bold text-[#123C2F]">{trimmed.slice(2, -2)}</p>
              }
              return <p key={idx}>{trimmed}</p>
            })}
          </div>

          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <button onClick={onClose} className="btn-outline-dark w-full justify-center mt-8">
            Close Article
          </button>
        </div>
      </div>
    </div>
  )
}
