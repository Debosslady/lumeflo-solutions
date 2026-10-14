'use client'

import { useState, useEffect } from 'react'
import { CircleCheck as CheckCircle, ArrowRight, Clock, Award, Users, BookOpen, Video, Monitor, Share2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

type TrainingProgram = {
  id: string
  title: string
  description: string
  duration: string
  level: string
  image: string
}

const programs: TrainingProgram[] = [
  { id: 'ai-web-dev', title: 'AI-Powered Web Development', description: 'Build modern websites and web apps using AI tools to accelerate development.', duration: '8 weeks', level: 'Intermediate', image: 'https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'web-dev-ai', title: 'Website Development with AI', description: 'Learn full-stack web development enhanced with AI assistance for smarter coding.', duration: '10 weeks', level: 'Beginner', image: 'https://images.pexels.com/photos/14553707/pexels-photo-14553707.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'prompt-engineering', title: 'Prompt Engineering', description: 'Master the art of crafting effective AI prompts for professional-quality results.', duration: '4 weeks', level: 'Beginner', image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'ai-coding-automation', title: 'AI-Assisted Coding & Automation', description: 'Automate repetitive tasks and supercharge your coding workflow with AI tools.', duration: '6 weeks', level: 'Intermediate', image: 'https://images.pexels.com/photos/38984789/pexels-photo-38984789.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'website-customisation', title: 'Website Customisation', description: 'Learn to customise and extend existing websites — themes, plugins, and styling.', duration: '5 weeks', level: 'Beginner', image: 'https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'debugging', title: 'Debugging & Troubleshooting', description: 'Develop systematic debugging skills to identify and fix issues in web apps.', duration: '4 weeks', level: 'Intermediate', image: 'https://images.pexels.com/photos/17489151/pexels-photo-17489151.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'website-deployment', title: 'Website Deployment', description: 'Deploy, host, and manage websites — domains, SSL, CI/CD, and monitoring.', duration: '3 weeks', level: 'Advanced', image: 'https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { id: 'data-analysis', title: 'Data Analysis & Visualisation', description: 'Turn raw data into compelling visual stories and dashboards for business decisions.', duration: '8 weeks', level: 'Intermediate', image: 'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
]

const features = [
  { icon: BookOpen, title: 'Practical Curriculum', desc: 'Hands-on projects based on real client scenarios, not just theory.' },
  { icon: Users, title: 'Expert Instructors', desc: 'Learn from industry professionals with years of real-world experience.' },
  { icon: Award, title: 'Industry Certificate', desc: 'Earn a recognized certificate that opens doors to career opportunities.' },
  { icon: Video, title: 'Online & Physical', desc: 'Flexible learning — attend live online sessions or join in-person classes.' },
  { icon: Monitor, title: 'Real Projects', desc: 'Build a strong portfolio by working on actual client briefs during training.' },
  { icon: Share2, title: 'Career Support', desc: 'Post-training mentorship and job placement assistance for top graduates.' },
]

type EnrollForm = { name: string; email: string; phone: string; program: string; experienceLevel: string; message: string }
const initForm: EnrollForm = { name: '', email: '', phone: '', program: '', experienceLevel: '', message: '' }

export default function TrainingPage() {
  const [selectedProgram, setSelectedProgram] = useState<string>('')
  const [enrollForm, setEnrollForm] = useState<EnrollForm>(initForm)
  const [enrollState, setEnrollState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<EnrollForm>>({})

  useEffect(() => {
    if (selectedProgram) setEnrollForm((prev) => ({ ...prev, program: selectedProgram }))
  }, [selectedProgram])

  const validate = () => {
    const e: Partial<EnrollForm> = {}
    if (!enrollForm.name.trim()) e.name = 'Full name is required'
    if (!enrollForm.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(enrollForm.email)) e.email = 'Invalid email address'
    if (!enrollForm.phone.trim()) e.phone = 'Phone number is required'
    if (!enrollForm.program) e.program = 'Please select a program'
    if (!enrollForm.experienceLevel) e.experienceLevel = 'Please select your experience level'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setEnrollState('loading')
    const { error } = await supabase.from('contact_enquiries').insert({
      name: enrollForm.name, email: enrollForm.email, phone: enrollForm.phone,
      service_interested: `Training: ${enrollForm.program}`,
      message: `Enrollment inquiry for ${enrollForm.program}. Experience level: ${enrollForm.experienceLevel}. Additional info: ${enrollForm.message}`,
    })
    if (error) setEnrollState('error')
    else { setEnrollState('success'); setEnrollForm(initForm); setSelectedProgram('') }
  }

  const levelColors: Record<string, string> = {
    Beginner: 'bg-green-500/20 text-green-300 border-green-500/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Advanced: 'bg-red-500/20 text-red-300 border-red-500/30',
  }

  return (
    <>
      <section className="gradient-hero page-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#C9A65B 1px, transparent 1px), linear-gradient(90deg, #C9A65B 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container-custom relative z-10 text-center">
          <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-4">Lumeflo Training</p>
          <h1 className="hero-text text-white mb-6 max-w-3xl mx-auto">Unlock Your Digital <span className="text-gradient-gold">Potential</span></h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-10">Industry-led training programs designed to equip you with the real-world skills that employers and clients are looking for right now.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#programs" className="btn-gold">Explore Programs <ArrowRight size={18} /></a>
            <a href="#enroll" className="btn-outline">Enroll Now</a>
          </div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 w-full"><path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="white" /></svg>
      </section>

      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">Why Lumeflo Training</p>
            <h2 className="section-heading text-[#123C2F] mb-4">Skills That Launch Careers &amp; Businesses</h2>
            <div className="divider-gold mx-auto mb-5" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Our programs are designed with one goal: to make you job-ready and business-ready in the shortest possible time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card-light rounded-2xl p-8 card-hover">
                <div className="service-icon-wrap mb-5"><Icon size={24} className="text-[#123C2F]" /></div>
                <h3 className="font-bold text-[#123C2F] text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programs" className="section-pad bg-[#F8F6F0]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">Program of Interest</p>
            <h2 className="section-heading text-[#123C2F] mb-4">Choose Your Path to Success</h2>
            <div className="divider-gold mx-auto mb-5" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Browse our training programs and select the one that matches your goals.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <div key={program.id} className="rounded-2xl overflow-hidden card-hover group cursor-pointer relative min-h-[340px] flex flex-col justify-end"
                onClick={() => { setSelectedProgram(program.title); document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' }) }}>
                <div className="absolute inset-0 training-card-bg" style={{ backgroundImage: `url(${program.image})` }} />
                <div className="absolute inset-0 training-card-overlay" />
                <div className="relative z-10 p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${levelColors[program.level] || ''}`}>{program.level}</span>
                    <span className="flex items-center gap-1 text-white/70 text-xs"><Clock size={12} /> {program.duration}</span>
                  </div>
                  <h3 className="font-black text-lg mb-2 leading-tight">{program.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{program.description}</p>
                  <button className="inline-flex items-center gap-2 text-[#D8BC79] font-semibold text-xs group-hover:gap-3 transition-all" aria-label={`Select ${program.title}`}>
                    Select Program <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#123C2F]">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[{ num: '500+', label: 'Students Trained' }, { num: '8', label: 'Training Programs' }, { num: '95%', label: 'Employment Rate' }, { num: '100%', label: 'Graduate Certified' }].map(({ num, label }) => (
              <div key={label}><div className="font-black text-4xl text-gradient-gold mb-2">{num}</div><div className="text-white/60 text-sm font-medium">{label}</div></div>
            ))}
          </div>
        </div>
      </section>

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
                <p className="text-gray-600">Thank you! Your submission has been received successfully. We will get back to you shortly. Our team will contact you within 24 hours to complete your enrollment.</p>
                <button onClick={() => setEnrollState('idle')} className="btn-gold mt-8">Submit Another Request</button>
              </div>
            ) : (
              <form onSubmit={handleEnroll} className="space-y-5 bg-white border border-gray-100 rounded-3xl p-8 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#123C2F] text-sm mb-2">Full Name *</label>
                    <input type="text" className={`input-field ${errors.name ? 'border-red-400' : ''}`} placeholder="Your full name" value={enrollForm.name}
                      onChange={(e) => { setEnrollForm({ ...enrollForm, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }) }} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold text-[#123C2F] text-sm mb-2">Email Address *</label>
                    <input type="email" className={`input-field ${errors.email ? 'border-red-400' : ''}`} placeholder="your@email.com" value={enrollForm.email}
                      onChange={(e) => { setEnrollForm({ ...enrollForm, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: undefined }) }} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-[#123C2F] text-sm mb-2">Phone Number *</label>
                  <input type="tel" className={`input-field ${errors.phone ? 'border-red-400' : ''}`} placeholder="+234 800 000 0000" value={enrollForm.phone}
                    onChange={(e) => { setEnrollForm({ ...enrollForm, phone: e.target.value }); if (errors.phone) setErrors({ ...errors, phone: undefined }) }} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-[#123C2F] text-sm mb-2">Program of Interest *</label>
                  <select className={`input-field ${errors.program ? 'border-red-400' : ''}`} value={enrollForm.program}
                    onChange={(e) => { setEnrollForm({ ...enrollForm, program: e.target.value }); if (errors.program) setErrors({ ...errors, program: undefined }) }}>
                    <option value="">Select a training program</option>
                    {programs.map((p) => (<option key={p.id} value={p.title}>{p.title}</option>))}
                  </select>
                  {errors.program && <p className="text-red-500 text-xs mt-1">{errors.program}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-[#123C2F] text-sm mb-2">Experience Level *</label>
                  <select className={`input-field ${errors.experienceLevel ? 'border-red-400' : ''}`} value={enrollForm.experienceLevel}
                    onChange={(e) => { setEnrollForm({ ...enrollForm, experienceLevel: e.target.value }); if (errors.experienceLevel) setErrors({ ...errors, experienceLevel: undefined }) }}>
                    <option value="">Select your experience level</option>
                    <option value="Beginner">Beginner — No prior experience</option>
                    <option value="Intermediate">Intermediate — Some experience</option>
                    <option value="Advanced">Advanced — Experienced professional</option>
                  </select>
                  {errors.experienceLevel && <p className="text-red-500 text-xs mt-1">{errors.experienceLevel}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-[#123C2F] text-sm mb-2">Message / Additional Information</label>
                  <textarea className="input-field" placeholder="Tell us about your goals, availability, or any questions..." value={enrollForm.message} rows={4}
                    onChange={(e) => setEnrollForm({ ...enrollForm, message: e.target.value })} />
                </div>
                {enrollState === 'error' && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">Something went wrong while submitting your information. Please try again.</p>}
                <button type="submit" disabled={enrollState === 'loading'} className="btn-gold w-full justify-center">
                  {enrollState === 'loading' ? 'Submitting...' : 'Submit Enrollment Request'} <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
