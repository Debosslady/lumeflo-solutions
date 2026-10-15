'use client'

import { Calendar, Clock } from 'lucide-react'
import type { BlogArticle } from '../../data/blogData'
import { formatDate } from '../../data/blogData'

type Props = {
  article: BlogArticle
  isActive: boolean
  onClick: (article: BlogArticle) => void
}

export default function BlogArticleCard({ article, isActive, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(article)}
      className={`flex gap-4 bg-white border rounded-2xl overflow-hidden card-hover group cursor-pointer shadow-sm transition-all ${
        isActive ? 'border-[#C9A65B] ring-2 ring-[#C9A65B]/20' : 'border-gray-100'
      }`}
    >
      <div className="w-32 sm:w-40 shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="py-4 pr-4 flex-1 flex flex-col justify-center">
        <span className="px-2.5 py-1 rounded-full bg-[#123C2F]/8 text-[#123C2F] font-semibold text-xs inline-block mb-2 w-fit">
          {article.category}
        </span>
        <h3 className="font-bold text-[#123C2F] text-sm leading-tight mb-2">{article.title}</h3>
        <div className="flex items-center gap-3 text-gray-400 text-xs">
          <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(article.date)}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{article.readingTime} min</span>
        </div>
      </div>
    </div>
  )
}
