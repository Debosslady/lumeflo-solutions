'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageCircle, CircleCheck as CheckCircle, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { notifyAdmin } from '../lib/notifications'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '../components/SocialIcons'

const services = [
  'Website Development',
  'Data Analysis',
  'Creative Graphic Design',
  'Social Media Management',
  'SEO Optimization',
  'Digital Branding',
  'Content Strategy',
  'Training Program',
  'Other',
]

const budgets = [
  'Under ₦100,000',
  '₦100,000 – ₦300,000',
  '₦300,000 – ₦500,000',
  '₦500,000 – ₦1,000,000',
  'Above ₦1,000,000',
  'Not sure yet',
]

type FormState = {
  name: string; email: string; phone: string; company: string;
  service_interested: string; budget: string; message: string
}

const init: FormState = { name: '', email: '', phone: '', company: '', service_interested: '', budget: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(init)
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const validate = () => {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setState('loading')
    const { error } = await supabase.from('contact_enquiries').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      company: form.company || null,
      service_interested: form.service_interested || null,
      budget: form.budget || null,
      message: form.message,
    })
    if (error) setState('error')
    else { setState('success'); setForm(init) }
  }

  const field = (id: keyof FormState, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block font-semibold text-[#123C2F] text-sm mb-2">{label}</label>
      <input
        type={type}
        className={`input-field ${errors[id] ? 'border-red-400' : ''}`}
        placeholder={placeholder}
        value={form[id]}
        onChange={(e) => { setForm({ ...form, [id]: e.target.value }); if (errors[id]) setErrors({ ...errors, [id]: undefined }) }}
      />
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
    </div>
  )

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero page-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#C9A65B 1px, transparent 1px), linear-gradient(90deg, #C9A65B 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-4">Let's Talk</p>
          <h1 className="hero-text text-white mb-6 max-w-3xl mx-auto">
            Start Your Journey to <span className="text-gradient-gold">Growth</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Tell us about your project. Our team will review your enquiry and respond within 24 hours with a tailored proposal.
          </p>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 w-full">
          <path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="white" />
        </svg>
      </section>

      {/* Contact */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info Column */}
            <div className="space-y-8">
              <div>
                <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">Contact Information</p>
                <h2 className="font-black text-[#123C2F] text-2xl mb-4">We'd Love to Hear From You</h2>
                <p className="text-gray-600 leading-relaxed">Our friendly team is always ready to discuss your project, answer questions, or help you explore the right solution for your business.</p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email Us', value: 'hello@lumeflo.com', href: 'mailto:hello@lumeflo.com' },
                  { icon: Phone, label: 'Call Us', value: '+234 800 000 0000', href: 'tel:+2348000000000' },
                  { icon: MessageCircle, label: 'WhatsApp', value: '+234 800 000 0000', href: 'https://wa.me/2348000000000' },
                  { icon: MapPin, label: 'Office', value: 'Lagos, Nigeria', href: undefined },
                ].map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#123C2F] to-[#184D3A] flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-[#C9A65B]" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                        <p className="font-semibold text-[#123C2F] text-sm">{value}</p>
                      </div>
                    </div>
                  )
                  return href ? (
                    <a key={label} href={href} className="block hover:opacity-80 transition-opacity">{content}</a>
                  ) : (
                    <div key={label}>{content}</div>
                  )
                })}
              </div>

              {/* Office hours */}
              <div className="bg-[#F8F6F0] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={18} className="text-[#C9A65B]" />
                  <h4 className="font-bold text-[#123C2F] text-sm">Office Hours</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Monday – Friday</span><span className="font-semibold text-[#123C2F]">8:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="font-semibold text-[#123C2F]">9:00 AM – 3:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="font-semibold text-gray-400">Closed</span></div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <h4 className="font-bold text-[#123C2F] text-sm mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: FacebookIcon, href: '#', label: 'Facebook' },
                    { icon: InstagramIcon, href: '#', label: 'Instagram' },
                    { icon: TwitterIcon, href: '#', label: 'Twitter' },
                    { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-xl bg-[#F8F6F0] flex items-center justify-center text-[#123C2F] hover:bg-[#123C2F] hover:text-[#C9A65B] transition-all"
                    >
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-2">
              {state === 'success' ? (
                <div className="bg-[#F0FDF4] border border-[#C9A65B]/30 rounded-3xl p-16 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#123C2F] to-[#184D3A] flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-[#C9A65B]" />
                  </div>
                  <h3 className="font-black text-[#123C2F] text-3xl mb-4">Message Sent!</h3>
                  <p className="text-gray-600 text-lg max-w-md">
                    Thank you for reaching out. Our team will review your enquiry and respond within 24 hours with a tailored proposal.
                  </p>
                  <button
                    onClick={() => setState('idle')}
                    className="btn-gold mt-8"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {field('name', 'Full Name *', 'text', 'Your full name')}
                    {field('email', 'Email Address *', 'email', 'your@email.com')}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {field('phone', 'Phone Number', 'tel', '+234 800 000 0000')}
                    {field('company', 'Company / Organisation', 'text', 'Your company name')}
                  </div>
                  <div>
                    <label className="block font-semibold text-[#123C2F] text-sm mb-2">Service Interested In</label>
                    <select
                      className="input-field"
                      value={form.service_interested}
                      onChange={(e) => setForm({ ...form, service_interested: e.target.value })}
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#123C2F] text-sm mb-2">Budget Range</label>
                    <select
                      className="input-field"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    >
                      <option value="">Select your budget range</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#123C2F] text-sm mb-2">Your Message *</label>
                    <textarea
                      className={`input-field ${errors.message ? 'border-red-400' : ''}`}
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      value={form.message}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: undefined }) }}
                      rows={5}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {state === 'error' && (
                    <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">Something went wrong. Please try again or email us directly.</p>
                  )}

                  <button type="submit" disabled={state === 'loading'} className="btn-gold w-full justify-center">
                    {state === 'loading' ? 'Sending Message...' : 'Send Your Message'}
                    <ArrowRight size={18} />
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    We respond within 24 hours. Your information is kept 100% confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="h-72 bg-gradient-to-br from-[#F8F6F0] to-[#E8F5EF] flex items-center justify-center">
        <div className="text-center">
          <MapPin size={40} className="text-[#C9A65B] mx-auto mb-3" />
          <p className="font-bold text-[#123C2F] text-lg">Lumeflo Solutions Limited</p>
          <p className="text-gray-500">Port Harcourt, Nigeria</p>
        </div>
      </div>

      {/* WhatsApp floating */}
      <a
        href="https://wa.me/2349055817159"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
      </a>
    </>
  )
}
