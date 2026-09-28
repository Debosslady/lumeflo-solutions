'use client'

import Link from 'next/link'
import { ArrowRight, Target, Eye, Heart, Lightbulb, ShieldCheck, TrendingUp, Users, Star } from 'lucide-react'

const values = [
  { icon: Lightbulb, title: 'Innovation', desc: 'We relentlessly pursue creative and technical innovations that keep our clients ahead of the curve.' },
  { icon: ShieldCheck, title: 'Integrity', desc: 'We operate with absolute honesty, transparency, and accountability in everything we do.' },
  { icon: Star, title: 'Professionalism', desc: 'Every interaction, deliverable, and communication reflects the highest standard of professional conduct.' },
  { icon: TrendingUp, title: 'Excellence', desc: 'We never settle for good when extraordinary is achievable. Quality is non-negotiable.' },
  { icon: Users, title: 'Customer Success', desc: 'Your growth is our greatest achievement. We measure our success by the results we create for you.' },
  { icon: TrendingUp, title: 'Growth', desc: 'We invest in continuous learning so our team always brings the latest skills and insights to your project.' },
]

const timeline = [
  { year: '2019', title: 'Founded', desc: 'Lumeflo Solutions was born from a passion for creative excellence and a vision for Africa\'s digital future.' },
  { year: '2020', title: 'First 10 Clients', desc: 'Delivered exceptional results for our first 10 clients, establishing a reputation for quality and reliability.' },
  { year: '2021', title: 'Service Expansion', desc: 'Expanded our services to include UI/UX design, SEO, and comprehensive social media management.' },
  { year: '2022', title: 'Training Launch', desc: 'Launched our professional training programs, empowering the next generation of African digital creatives.' },
  { year: '2023', title: '50+ Brands Served', desc: 'Crossed the milestone of 50 brands served across diverse industries throughout Africa.' },
  { year: '2024', title: 'Leading Agency Status', desc: 'Recognized as one of Africa\'s leading creative and digital agencies with a world-class portfolio.' },
]

const team = [
  {
    name: 'Chief Creative Officer',
    role: 'Head of Creative & Brand Strategy',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    desc: 'Visionary creative leader with expertise in brand identity and digital experience design.',
  },
  {
    name: 'Lead Developer',
    role: 'Head of Technology',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    desc: 'Full-stack expert specializing in React, Next.js and scalable web applications.',
  },
  {
    name: 'Digital Strategist',
    role: 'Head of Growth & Marketing',
    image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
    desc: 'Data-driven strategist who translates business goals into digital growth campaigns.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero page-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#C9A65B 1px, transparent 1px), linear-gradient(90deg, #C9A65B 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-4">About Lumeflo</p>
            <h1 className="hero-text text-white mb-6">
              Who We Are &amp; <span className="text-gradient-gold">What Drives Us</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              We are Africa's trusted creative, branding, and digital agency — passionate about helping businesses grow through exceptional design, innovative technology, and strategic digital solutions.
            </p>
          </div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 w-full">
          <path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="white" />
        </svg>
      </section>

      {/* Story */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">Our Story</p>
              <h2 className="section-heading text-[#123C2F] mb-5">Built on Passion. Driven by Excellence.</h2>
              <div className="divider-gold mb-8" />
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Lumeflo Solutions Limited was founded on a single conviction: that African businesses deserve world-class creative and digital services. For too long, world-class design and technology solutions were inaccessible to most businesses on the continent.
                </p>
                <p>
                  We set out to change that. By combining cutting-edge creative talent with deep technical expertise and a relentless commitment to client success, we have built an agency that consistently delivers international-standard results.
                </p>
                <p>
                  Today, Lumeflo serves businesses across industries — from ambitious startups and growing SMEs to established corporations, NGOs, educational institutions, and churches — all unified by their desire to grow and their trust in our ability to get them there.
                </p>
              </div>
              <Link href="/contact" className="btn-primary mt-8 inline-flex">
                Work With Us
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Lumeflo team at work"
                className="rounded-3xl w-full object-cover h-96 lg:h-[500px] shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#123C2F] to-[#184D3A] flex items-center justify-center">
                    <Star className="text-[#C9A65B]" size={22} />
                  </div>
                  <div>
                    <div className="font-black text-2xl text-[#123C2F]">98%</div>
                    <div className="text-gray-500 text-xs font-medium">Client Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="section-pad bg-[#F8F6F0]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card-light rounded-3xl p-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#123C2F] to-[#184D3A] flex items-center justify-center mb-6">
                <Target size={28} className="text-[#C9A65B]" />
              </div>
              <h3 className="font-black text-[#123C2F] text-2xl mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                To empower businesses across Africa with world-class creative, branding, and digital solutions that drive measurable growth, build lasting brand equity, and open new possibilities for success in the digital age.
              </p>
            </div>

            <div className="glass-card-light rounded-3xl p-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A65B] to-[#D8BC79] flex items-center justify-center mb-6">
                <Eye size={28} className="text-[#123C2F]" />
              </div>
              <h3 className="font-black text-[#123C2F] text-2xl mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                To be Africa's most trusted and respected creative and digital agency — setting the standard for excellence, innovation, and client impact across the continent and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">What We Stand For</p>
            <h2 className="section-heading text-[#123C2F] mb-4">Our Core Values</h2>
            <div className="divider-gold mx-auto mb-5" />
            <p className="text-gray-600 max-w-xl mx-auto text-lg">The principles that guide every decision, every design, and every interaction at Lumeflo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-8 rounded-2xl border border-gray-100 bg-white card-hover group">
                <div className="service-icon-wrap mb-5">
                  <Icon size={24} className="text-[#123C2F]" />
                </div>
                <h3 className="font-bold text-[#123C2F] text-lg mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-[#F8F6F0]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">Our Journey</p>
            <h2 className="section-heading text-[#123C2F] mb-4">Company Milestones</h2>
            <div className="divider-gold mx-auto" />
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#123C2F] to-[#C9A65B] hidden lg:block" style={{ transform: 'translateX(-50%)' }} />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.year} className={`flex gap-8 items-start ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="glass-card-light rounded-2xl p-8 card-hover">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-[#123C2F] text-[#C9A65B] font-black text-lg mb-3">
                        {item.year}
                      </span>
                      <h3 className="font-bold text-[#123C2F] text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-col items-center shrink-0">
                    <div className="w-5 h-5 rounded-full bg-[#C9A65B] border-4 border-white shadow-lg z-10" />
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">The People Behind the Magic</p>
            <h2 className="section-heading text-[#123C2F] mb-4">Meet Our Leadership</h2>
            <div className="divider-gold mx-auto mb-5" />
            <p className="text-gray-600 max-w-xl mx-auto text-lg">A team of passionate creatives, strategists, and technologists united by a shared commitment to excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative mb-6 inline-block">
                  <div className="w-36 h-36 rounded-3xl overflow-hidden mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A65B] to-[#D8BC79] flex items-center justify-center shadow-lg">
                    <Heart size={16} className="text-[#123C2F]" />
                  </div>
                </div>
                <h3 className="font-black text-[#123C2F] text-lg">{member.name}</h3>
                <p className="text-[#C9A65B] font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-[#123C2F]">
        <div className="container-custom text-center">
          <h2 className="section-heading text-white mb-5">Ready to Work with Africa's Best?</h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Join the growing list of businesses that trust Lumeflo to take their brand and digital presence to the next level.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">
              Start Your Project <ArrowRight size={18} />
            </Link>
            <Link href="/services" className="btn-outline">
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
