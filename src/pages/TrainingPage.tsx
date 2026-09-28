'use client'

import { useEffect, useState } from 'react'
import { CircleCheck as CheckCircle, ArrowRight, Clock, Calendar, Award, Users, Monitor, Palette, Share2, TrendingUp, BookOpen, Video } from 'lucide-react'
import { supabase, type TrainingProgram } from '../lib/supabase'

const iconMap: Record<string, React.ElementType> = {
  'Graphic Design': Palette,
  'Website Development': Monitor,
  'UI Design': Monitor,
  'Digital Marketing Basics': TrendingUp,
}

const features = [
  { icon: BookOpen, title: 'Practical Curriculum', desc: 'Hands-on projects based on real client scenarios, not just theory.' },
  { icon: Users, title: 'Expert Instructors', desc: 'Learn from industry professionals with years of real-world experience.' },
  { icon: Award, title: 'Industry Certificate', desc: 'Earn a recognized certificate that opens doors to career opportunities.' },
  { icon: Video, title: 'Online & Physical', desc: 'Flexible learning — attend live online sessions or join in-person classes.' },
  { icon: Monitor, title: 'Real Projects', desc: 'Build a strong portfolio by working on actual client briefs during training.' },
  { icon: Share2, title: 'Career Support', desc: 'Post-training mentorship and job placement assistance for top graduates.' },
]

export default function TrainingPage() {
  const [programs, setPrograms] = useState<TrainingProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [enrollForm, setEnrollForm] = useState({ name: '', email: '', phone: '', program: '', mode: '' })
  const [enrollState, setEnrollState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    supabase.from('training_programs').select('*').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data) setPrograms(data)
      setLoading(false)
    })
  }, [])

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnrollState('loading')
    const { error } = await supabase.from('contact_enquiries').insert({
      name: enrollForm.name,
      email: enrollForm.email,
      phone: enrollForm.phone,
      service_interested: `Training: ${enrollForm.program}`,
      message: `Enrollment inquiry for ${enrollForm.program} training. Preferred mode: ${enrollForm.mode}`,
    })
    if (error) setEnrollState('error')
    else { setEnrollState('success'); setEnrollForm({ name: '', email: '', phone: '', program: '', mode: '' }) }
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
          <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-4">Lumeflo Training</p>
          <h1 className="hero-text text-white mb-6 max-w-3xl mx-auto">
            Unlock Your Digital <span className="text-gradient-gold">Potential</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-10">
            Industry-led training programs designed to equip you with the real-world skills that employers and clients are looking for right now.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#programs" className="btn-gold">
              Explore Programs <ArrowRight size={18} />
            </a>
            <a href="#enroll" className="btn-outline">
              Enroll Now
            </a>
          </div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 w-full">
          <path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="white" />
        </svg>
      </section>

      {/* Why Train With Us */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">Why Lumeflo Training</p>
            <h2 className="section-heading text-[#123C2F] mb-4">Skills That Launch Careers & Businesses</h2>
            <div className="divider-gold mx-auto mb-5" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Our programs are designed with one goal: to make you job-ready and business-ready in the shortest possible time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card-light rounded-2xl p-8 card-hover">
                <div className="service-icon-wrap mb-5">
                  <Icon size={24} className="text-[#123C2F]" />
                </div>
                <h3 className="font-bold text-[#123C2F] text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="section-pad bg-[#F8F6F0]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">Training Programs</p>
            <h2 className="section-heading text-[#123C2F] mb-4">Choose Your Path to Success</h2>
            <div className="divider-gold mx-auto" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-2xl bg-gray-200 animate-pulse h-72" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program) => {
                const Icon = iconMap[program.category] || BookOpen
                return (
                  <div key={program.id} className="bg-white rounded-3xl overflow-hidden shadow-md card-hover">
                    <div className="h-2 bg-gradient-to-r from-[#123C2F] to-[#C9A65B]" />
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-5">
                        <div>
                          <div className="service-icon-wrap mb-3">
                            <Icon size={24} className="text-[#123C2F]" />
                          </div>
                          <h3 className="font-black text-[#123C2F] text-xl">{program.title}</h3>
                          <span className="text-[#C9A65B] font-semibold text-sm">{program.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-[#123C2F] text-2xl">{program.price}</div>
                          <div className="text-gray-400 text-xs">Full Program</div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-5">{program.description}</p>

                      <div className="flex gap-4 mb-5">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Clock size={15} className="text-[#C9A65B]" />
                          {program.duration}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar size={15} className="text-[#C9A65B]" />
                          {program.schedule}
                        </div>
                      </div>

                      {program.features.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                          {program.features.map((f) => (
                            <div key={f} className="flex items-start gap-2">
                              <CheckCircle size={14} className="text-[#C9A65B] mt-0.5 shrink-0" />
                              <span className="text-gray-600 text-xs">{f}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <a href="#enroll" className="btn-primary w-full justify-center">
                        Enroll in This Program
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="section-pad bg-[#123C2F]">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { num: '500+', label: 'Students Trained' },
              { num: '4', label: 'Training Programs' },
              { num: '95%', label: 'Employment Rate' },
              { num: '100%', label: 'Graduate Certified' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-black text-4xl text-gradient-gold mb-2">{num}</div>
                <div className="text-white/60 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enroll Form */}
      <section id="enroll" className="section-pad bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">Ready to Start?</p>
              <h2 className="section-heading text-[#123C2F] mb-4">Enroll Today</h2>
              <div className="divider-gold mx-auto mb-5" />
              <p className="text-gray-600 text-lg">Fill out the form below and our team will contact you within 24 hours with enrollment details.</p>
            </div>

            {enrollState === 'success' ? (
              <div className="bg-[#F0FDF4] border border-[#C9A65B]/30 rounded-3xl p-12 text-center">
                <CheckCircle size={56} className="text-[#C9A65B] mx-auto mb-6" />
                <h3 className="font-black text-[#123C2F] text-2xl mb-3">Enrollment Request Received!</h3>
                <p className="text-gray-600">Our team will contact you within 24 hours to complete your enrollment. We look forward to welcoming you!</p>
              </div>
            ) : (
              <form onSubmit={handleEnroll} className="space-y-5 bg-white border border-gray-100 rounded-3xl p-8 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#123C2F] text-sm mb-2">Full Name *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Your full name"
                      value={enrollForm.name}
                      onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#123C2F] text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="your@email.com"
                      value={enrollForm.email}
                      onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-[#123C2F] text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="+234 800 000 0000"
                    value={enrollForm.phone}
                    onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#123C2F] text-sm mb-2">Program of Interest *</label>
                  <select
                    className="input-field"
                    value={enrollForm.program}
                    onChange={(e) => setEnrollForm({ ...enrollForm, program: e.target.value })}
                    required
                  >
                    <option value="">Select a training program</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#123C2F] text-sm mb-2">Preferred Learning Mode *</label>
                  <select
                    className="input-field"
                    value={enrollForm.mode}
                    onChange={(e) => setEnrollForm({ ...enrollForm, mode: e.target.value })}
                    required
                  >
                    <option value="">Select learning mode</option>
                    <option value="Physical">Physical Classes (Lagos)</option>
                    <option value="Online">Online Live Classes</option>
                    <option value="Either">Either / Flexible</option>
                  </select>
                </div>

                {enrollState === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                )}

                <button type="submit" disabled={enrollState === 'loading'} className="btn-gold w-full justify-center">
                  {enrollState === 'loading' ? 'Submitting...' : 'Submit Enrollment Request'}
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
