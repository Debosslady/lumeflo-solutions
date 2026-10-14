'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import Logo from '../Logo'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Training', path: '/training' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname() || '/'
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path)

  const transparent = isHome && !scrolled
  const headerBg = transparent
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-[88px]">
          <Link href="/" className="flex-shrink-0">
            <Logo variant={transparent ? 'light' : 'dark'} size="sm" showText />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              const linkColor = transparent
                ? active ? 'text-[#D8BC79] font-semibold' : 'text-white/85 hover:text-[#D8BC79]'
                : active ? 'text-[#123C2F] font-semibold' : 'text-[#2D2D2D] hover:text-[#123C2F]'
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${linkColor}`}
                >
                  {link.label}
                  <span
                    className={`nav-underline ${active ? 'nav-underline-active' : ''}`}
                    style={transparent ? { background: '#D8BC79' } : { background: '#C9A65B' }}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact" className="btn-gold text-sm">
              Start Project
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${transparent ? 'text-white hover:bg-white/10' : 'text-[#123C2F] hover:bg-gray-100'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'} bg-white border-t border-gray-100 shadow-xl`}
      >
        <div className="container-custom py-6">
          <nav className="flex flex-col gap-1 mb-6">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-between ${
                    active ? 'bg-[#123C2F] text-white' : 'text-[#2D2D2D] hover:bg-gray-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-1.5 h-6 rounded-full bg-[#C9A65B]" />}
                </Link>
              )
            })}
          </nav>
          <div className="flex flex-col gap-3">
            <a href="tel:+2348000000000" className="btn-outline-dark justify-center">
              <Phone size={16} />
              Call Us Now
            </a>
            <Link href="/contact" className="btn-gold justify-center">
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
