'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import Logo from '../Logo'
import { supabase } from '../../lib/supabase'
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon, YoutubeIcon } from '../SocialIcons'

const services = [
  'Website Development',
  'Data Analysis',
  'Creative Graphic Design',
  'Social Media Management',
  'SEO Optimization',
  'Digital Branding',
]

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Training', path: '/training' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribeState, setSubscribeState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribeState('loading')
    const { error } = await supabase.from('newsletter_subscribers').insert({ email })
    if (error && error.code !== '23505') {
      setSubscribeState('error')
    } else {
      setSubscribeState('success')
      setEmail('')
    }
  }

  return (
    <footer className="bg-[#0A2820] text-white">
      <div className="bg-gradient-to-r from-[#123C2F] to-[#1E6045] py-20">
        <div className="container-custom text-center">
          <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-4">
            Ready to Transform Your Business?
          </p>
          <h2 className="section-heading text-white mb-6">
            Let&apos;s Build Something <span className="text-gradient-gold">Extraordinary</span> Together
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Join 100+ businesses that trust Lumeflo to power their creative and digital growth.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Start Your Project
              <ArrowRight size={18} />
            </Link>
            <Link href="/services" className="btn-outline">
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      <div className="section-pad">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <Logo variant="light" size="md" showText />
              <p className="text-white/60 text-sm leading-relaxed mt-5 mb-6">
                Africa&apos;s trusted creative, branding, website development and digital growth agency. We build brands that inspire and digital experiences that convert.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: FacebookIcon, href: '#', label: 'Facebook' },
                  { icon: InstagramIcon, href: '#', label: 'Instagram' },
                  { icon: TwitterIcon, href: '#', label: 'Twitter/X' },
                  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
                  { icon: YoutubeIcon, href: '#', label: 'YouTube' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-white/60 hover:bg-[#C9A65B] hover:text-[#123C2F] transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-white/60 hover:text-[#C9A65B] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-5">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-white/60 hover:text-[#C9A65B] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-200" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-base mb-5">Get In Touch</h4>
              <div className="space-y-4 mb-8">
                <a href="mailto:lumeflosolutions@gmail.com" className="flex items-start gap-3 text-white/60 hover:text-[#C9A65B] transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A65B]/10 flex items-center justify-center mt-0.5 group-hover:bg-[#C9A65B] transition-colors">
                    <Mail size={14} className="text-[#C9A65B] group-hover:text-[#123C2F]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">Email Us</p>
                    <p className="text-sm">lumeflosolutions@gmail.com</p>
                  </div>
                </a>
                <a href="tel:+2349027088714" className="flex items-start gap-3 text-white/60 hover:text-[#C9A65B] transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A65B]/10 flex items-center justify-center mt-0.5 group-hover:bg-[#C9A65B] transition-colors">
                    <Phone size={14} className="text-[#C9A65B] group-hover:text-[#123C2F]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">Call Us</p>
                    <p className="text-sm">+234 902 7088 714</p>
                  </div>
                </a>
                <div className="flex items-start gap-3 text-white/60">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A65B]/10 flex items-center justify-center mt-0.5">
                    <MapPin size={14} className="text-[#C9A65B]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">Location</p>
                    <p className="text-sm">Port Harcourt, Nigeria</p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-white text-sm mb-3">Newsletter</h5>
                {subscribeState === 'success' ? (
                  <p className="text-[#C9A65B] text-sm">Thank you for subscribing!</p>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/8 border border-white/12 text-white placeholder-white/30 text-sm outline-none focus:border-[#C9A65B] transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      disabled={subscribeState === 'loading'}
                      className="px-4 py-2.5 bg-gradient-to-r from-[#C9A65B] to-[#D8BC79] text-[#123C2F] rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-70"
                    >
                      {subscribeState === 'loading' ? '...' : 'Join'}
                    </button>
                  </form>
                )}
                {subscribeState === 'error' && (
                  <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 py-6">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Lumeflo Solutions Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <span key={item} className="text-white/40 hover:text-[#C9A65B] text-sm cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
