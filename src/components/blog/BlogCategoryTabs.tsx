'use client'

import { blogCategories } from '../../data/blogData'

type Props = {
  active: string
  onChange: (cat: string) => void
}

export default function BlogCategoryTabs({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {blogCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`nav-pill ${active === cat ? 'active' : ''}`}
          aria-label={`Filter by ${cat}`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
