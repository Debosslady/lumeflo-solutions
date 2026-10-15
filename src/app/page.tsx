 'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, CircleCheck as CheckCircle, Award, Zap, Users, Headphones, Star, Globe, Palette, Monitor, TrendingUp, Search, Share2, BookOpen, ChevronLeft, ChevronRight, Quote, ChartBar as BarChart3 } from 'lucide-react'

import {
  supabase,
  type Testimonial,
  type PortfolioProject,
} from '@/lib/supabase'


/* =========================================================
   COUNT UP HOOK
   ========================================================= */

function useCountUp(
  target: number,
  duration = 2000,
  trigger: boolean
) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) {
      setCount(0)
      return
    }

    let animationFrame: number
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      const currentCount = Math.floor(
        target * easedProgress
      )

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [target, duration, trigger])

  return count
}


/* =========================================================
   STAT CARD
   ========================================================= */

function StatCard({
  value,
  suffix,
  label,
  delay,
}: {
  value: number
  suffix: string
  label: string
  delay: number
}) {
  const [visible, setVisible] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)

          // Stop observing after first appearance
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  const count = useCountUp(
    value,
    2000,
    visible
  )

  return (
    <div
      ref={ref}
      className="text-center transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0)'
          : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="font-extrabold text-4xl md:text-5xl text-gradient-gold">
        {count}
        {suffix}
      </div>

      <div className="text-white/70 text-sm mt-2 font-medium">
        {label}
      </div>
    </div>
  )
}


/* =========================================================
   FEATURES
   ========================================================= */

const features = [
  {
    icon: Award,
    title: 'Creative Excellence',
    desc: 'Award-worthy designs that captivate your audience and communicate your brand story with precision and artistry.',
  },
  {
    icon: Monitor,
    title: 'Modern Technology',
    desc: 'We build with the latest tech stack ensuring your digital products are fast, secure, scalable, and future-proof.',
  },
  {
    icon: TrendingUp,
    title: 'Results Driven',
    desc: 'Every strategy we deploy is tied to measurable outcomes — leads, sales, growth, and real business impact.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    desc: 'We respect your time. Our agile process ensures rapid delivery without compromising on quality or detail.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    desc: 'Your success is our mission. We listen deeply, communicate clearly, and deliver solutions tailored to your exact needs.',
  },
  {
    icon: Headphones,
    title: 'Professional Support',
    desc: 'Our relationship does not end at delivery. We provide ongoing support to ensure your digital assets keep performing.',
  },
]


/* =========================================================
   SERVICES
   ========================================================= */

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Custom, responsive websites — from landing pages to full e-commerce and school portals.',
    color: 'from-[#123C2F]/8 to-[#C9A65B]/10',
    image: 'https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: BarChart3,
    title: 'Data Analysis',
    desc: 'Turn raw business data into clear, actionable insights that drive smarter decisions and growth.',
    color: 'from-[#184D3A]/8 to-[#C9A65B]/10',
    image: 'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Palette,
    title: 'Creative Graphic Design',
    desc: 'Logos, brand identity, flyers, packaging, and visual materials that make your brand unforgettable.',
    color: 'from-[#1E6045]/8 to-[#C9A65B]/10',
    image: 'https://images.pexels.com/photos/16313664/pexels-photo-16313664.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    desc: 'Rank higher on search engines with proven strategies that drive organic traffic and qualified leads.',
    color: 'from-[#123C2F]/8 to-[#D8BC79]/10',
    image: 'https://images.pexels.com/photos/12813050/pexels-photo-12813050.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: CheckCircle,
    title: 'Website Maintenance',
    desc: 'Keep your website secure, updated, and performing at peak levels with our managed maintenance plans.',
    color: 'from-[#184D3A]/8 to-[#D8BC79]/10',
    image: 'https://images.pexels.com/photos/17489151/pexels-photo-17489151.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    desc: 'Content planning, graphics, captions, scheduling, and community management to grow your audience.',
    color: 'from-[#1E6045]/8 to-[#EDD99A]/10',
    image: 'https://images.pexels.com/photos/15595050/pexels-photo-15595050.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Globe,
    title: 'Digital Branding',
    desc: 'Build a consistent, powerful brand presence across all digital channels that commands trust and recognition.',
    color: 'from-[#123C2F]/8 to-[#C9A65B]/10',
    image: 'https://images.pexels.com/photos/15635247/pexels-photo-15635247.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: BookOpen,
    title: 'Content Strategy',
    desc: 'Strategic content planning, creation, and distribution that engages your audience and drives conversions.',
    color: 'from-[#184D3A]/8 to-[#C9A65B]/10',
    image: 'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
]


/* =========================================================
   PROCESS
   ========================================================= */

const processSteps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We dive deep into your business, goals, and audience to build a solid strategic foundation.',
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'We craft a tailored creative and technical strategy aligned to your business objectives.',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'Our designers bring the strategy to life with stunning visuals and intuitive user experiences.',
  },
  {
    num: '04',
    title: 'Development',
    desc: 'We build robust, fast, and scalable digital solutions using modern technology stacks.',
  },
  {
    num: '05',
    title: 'Launch',
    desc: 'We deploy, test, and optimize your project for maximum performance and impact.',
  },
  {
    num: '06',
    title: 'Support',
    desc: 'We stay by your side with ongoing support, updates, and growth consulting.',
  },
]


/* =========================================================
   HOME PAGE
   ========================================================= */

export default function HomePage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [projects, setProjects] = useState<PortfolioProject[]>([])

  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const [heroVisible, setHeroVisible] = useState(false)


  /* =======================================================
     PAGE INITIALIZATION
     ======================================================= */

  useEffect(() => {
    // Trigger hero entrance animation
    const timer = window.setTimeout(() => {
      setHeroVisible(true)
    }, 100)

    /* -------------------------------------------------------
       LOAD FEATURED TESTIMONIALS
       ------------------------------------------------------- */

    supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .order('created_at')
      .then(({ data }) => {
        if (data) {
          setTestimonials(data)
        }
      })


    /* -------------------------------------------------------
       LOAD FEATURED PROJECTS
       ------------------------------------------------------- */

    supabase
      .from('portfolio_projects')
      .select('*')
      .eq('is_featured', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data) {
          setProjects(data)
        }
      })


    return () => {
      window.clearTimeout(timer)
    }
  }, [])


  /* =======================================================
     TESTIMONIAL NAVIGATION
     ======================================================= */

  const prevTestimonial = () => {
    setTestimonialIndex((current) =>
      current === 0
        ? Math.max(testimonials.length - 1, 0)
        : current - 1
    )
  }


  const nextTestimonial = () => {
    setTestimonialIndex((current) =>
      current === testimonials.length - 1
        ? 0
        : current + 1
    )
  }


  return (
    <>
      {/* =====================================================
          HERO SECTION
          ===================================================== */}

      <section className="relative min-h-screen gradient-hero overflow-hidden flex items-center">

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div
            className="floating-shape absolute top-24 right-20 w-80 h-80 rounded-full opacity-10"
            style={{
              background:
                'radial-gradient(circle, rgba(201,166,91,0.18) 0%, transparent 70%)',
            }}
          />

          <div
            className="floating-shape-delay absolute bottom-40 left-20 w-72 h-72 rounded-full opacity-10"
            style={{
              background:
                'radial-gradient(circle, rgba(30,96,69,0.45) 0%, transparent 70%)',
            }}
          />

          <div className="floating-shape absolute top-1/2 right-1/4 w-36 h-36 border border-[#C9A65B]/15 rounded-2xl rotate-45 opacity-60" />

          <div className="floating-shape-delay absolute top-1/4 left-1/4 w-24 h-24 border border-[#C9A65B]/20 rounded-full opacity-60" />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#C9A65B 1px, transparent 1px), linear-gradient(90deg, #C9A65B 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

        </div>


        {/* Hero Content */}
        <div className="container-custom relative z-10 pt-36 pb-28">

          <div className="max-w-4xl">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 transition-all duration-700 ease-out"
              style={{
                background: 'rgba(201,166,91,0.12)',
                border: '1px solid rgba(201,166,91,0.25)',
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible
                  ? 'translateY(0)'
                  : 'translateY(20px)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-[#C9A65B] animate-pulse" />

              <span className="text-[#D8BC79] font-semibold text-sm tracking-wide">
                Africa&apos;s Trusted Creative &amp; Digital Agency
              </span>
            </div>


            {/* Main Heading */}
            <h1
              className="hero-text text-white mb-7 transition-all duration-700 ease-out"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible
                  ? 'translateY(0)'
                  : 'translateY(32px)',
                transitionDelay: '100ms',
              }}
            >
              Grow Your Business with{' '}
              <span className="shine-text">
                Creative
              </span>{' '}
              &amp;{' '}
              <span className="text-white">
                Digital Solutions
              </span>
            </h1>


            {/* Description */}
            <p
              className="text-white/70 text-xl leading-relaxed max-w-2xl mb-12 transition-all duration-700 ease-out"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible
                  ? 'translateY(0)'
                  : 'translateY(32px)',
                transitionDelay: '200ms',
              }}
            >
              Helping businesses grow through exceptional branding,
              website development, data analysis, and social media
              excellence. We turn ideas into impactful realities.
            </p>


            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 mb-14 transition-all duration-700 ease-out"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible
                  ? 'translateY(0)'
                  : 'translateY(32px)',
                transitionDelay: '300ms',
              }}
            >
              <Link
                href="/contact"
                className="btn-gold"
              >
                Start Your Project
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/portfolio"
                className="btn-outline"
              >
                View Our Work
                <ArrowRight size={18} />
              </Link>
            </div>


            {/* Trust Points */}
            <div
              className="flex flex-wrap gap-x-8 gap-y-3 transition-all duration-700 ease-out"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible
                  ? 'translateY(0)'
                  : 'translateY(16px)',
                transitionDelay: '500ms',
              }}
            >
              {[
                '100% Satisfaction Guaranteed',
                'Fast Turnaround',
                'Quality You Can Trust',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <CheckCircle
                    size={16}
                    className="text-[#C9A65B]"
                  />

                  <span className="text-white/70 text-sm font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>


        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z"
              fill="white"
            />
          </svg>
        </div>

      </section>


      {/* =====================================================
          STATISTICS
          ===================================================== */}

      <section className="bg-[#123C2F] py-24">
        <div className="container-custom">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            <StatCard
              value={100}
              suffix="+"
              label="Projects Completed"
              delay={0}
            />

            <StatCard
              value={50}
              suffix="+"
              label="Brands Served"
              delay={100}
            />

            <StatCard
              value={98}
              suffix="%"
              label="Client Satisfaction"
              delay={200}
            />

            <StatCard
              value={5}
              suffix="+"
              label="Years Combined Experience"
              delay={300}
            />

          </div>

        </div>
      </section>


      {/* =====================================================
          WHY CHOOSE US
          ===================================================== */}

      <section className="section-pad bg-[#F8F6F0]">

        <div className="container-custom">

          <div className="text-center mb-20">

            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">
              Why Choose Us
            </p>

            <h2 className="section-heading text-[#123C2F] mb-4">
              The Lumeflo Difference
            </h2>

            <div className="divider-gold mx-auto mb-5" />

            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We combine creative excellence with strategic thinking
              to deliver results that genuinely move businesses forward.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map(
              ({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="glass-card-light rounded-2xl p-8 card-hover"
                >

                  <div className="service-icon-wrap mb-5">
                    <Icon
                      size={26}
                      className="text-[#123C2F]"
                    />
                  </div>

                  <h3 className="font-bold text-[#123C2F] text-lg mb-3">
                    {title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {desc}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
          ===================================================== */}

      <section className="section-pad bg-white">

        <div className="container-custom">

          <div className="text-center mb-20">

            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">
              What We Do
            </p>

            <h2 className="section-heading text-[#123C2F] mb-4">
              Services Built for Growth
            </h2>

            <div className="divider-gold mx-auto mb-5" />

            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              From brand identity to digital experiences, we offer
              a full suite of creative and technical services.
            </p>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {services.map(
              ({ icon: Icon, title, desc, color, image }) => (
                <Link
                  key={title}
                  href="/services"
                  className={`rounded-2xl card-hover bg-gradient-to-br ${color} border border-gray-100 group block overflow-hidden service-card-wrap`}
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover service-card-img"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />
                    <div className="absolute bottom-3 left-3 service-icon-wrap" style={{ width: '40px', height: '40px', borderRadius: '10px' }}>
                      <Icon size={18} className="text-[#123C2F]" />
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-[#123C2F] text-base mb-2">
                      {title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {desc}
                    </p>

                    <div className="flex items-center gap-1 mt-4 text-[#C9A65B] font-semibold text-xs">
                      Learn More

                      <ArrowRight
                        size={13}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>

                </Link>
              )
            )}

          </div>


          <div className="text-center mt-14">

            <Link
              href="/services"
              className="btn-primary"
            >
              <span>View All Services</span>
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED PROJECTS
          ===================================================== */}

      {projects.length > 0 && (
        <section className="section-pad bg-[#F8F6F0]">

          <div className="container-custom">

            <div className="text-center mb-20">

              <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">
                Our Work
              </p>

              <h2 className="section-heading text-[#123C2F] mb-4">
                Featured Projects
              </h2>

              <div className="divider-gold mx-auto mb-5" />

              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                A glimpse of the transformations we&apos;ve delivered
                for brands across Africa.
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {projects.map((project) => (
                <Link
                  key={project.id}
                  href="/portfolio"
                  className="rounded-2xl overflow-hidden bg-white shadow-md card-hover group"
                >

                  <div className="h-56 overflow-hidden">

                    <img
                      src={
                        project.featured_image ||
                        'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                  </div>


                  <div className="p-7">

                    <span className="inline-block px-3 py-1 rounded-full bg-[#123C2F]/8 text-[#123C2F] font-semibold text-xs capitalize mb-3">
                      {project.category}
                    </span>

                    <h3 className="font-bold text-[#123C2F] text-lg mb-1">
                      {project.title}
                    </h3>

                    <p className="text-gray-500 text-sm mb-4">
                      {project.client} · {project.industry}
                    </p>

                    {project.outcome && (
                      <p className="text-gray-600 text-sm leading-relaxed border-l-2 border-[#C9A65B] pl-3">
                        {project.outcome}
                      </p>
                    )}

                    <div className="flex items-center gap-1 mt-4 text-[#C9A65B] font-semibold text-xs">
                      View Details

                      <ArrowRight
                        size={13}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>

                  </div>

                </Link>
              ))}

            </div>


            <div className="text-center mt-14">

              <Link
                href="/portfolio"
                className="btn-outline-dark"
              >
                View All Projects
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </section>
      )}


      {/* =====================================================
          TESTIMONIALS
          ===================================================== */}

      {testimonials.length > 0 && (
        <section className="section-pad gradient-hero relative overflow-hidden">

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#C9A65B 1px, transparent 1px), linear-gradient(90deg, #C9A65B 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          <div className="container-custom relative z-10">

            <div className="text-center mb-20">

              <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">
                Client Love
              </p>

              <h2 className="section-heading text-white mb-4">
                What Our Clients Say
              </h2>

              <div className="divider-gold mx-auto" />

            </div>


            <div className="max-w-3xl mx-auto">

              <div className="glass-card rounded-3xl p-10 md:p-14 relative">

                <Quote
                  size={48}
                  className="text-[#C9A65B]/25 absolute top-8 left-8"
                />

                {testimonials[testimonialIndex] && (
                  <div
                    key={testimonials[testimonialIndex].id}
                    className="text-center animate-[fadeIn_.5s_ease-out]"
                  >

                    <div className="flex justify-center gap-1 mb-6">

                      {Array.from({
                        length:
                          testimonials[testimonialIndex].rating,
                      }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="text-[#C9A65B] fill-[#C9A65B]"
                        />
                      ))}

                    </div>


                    <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 italic">
                      &ldquo;
                      {testimonials[testimonialIndex].content}
                      &rdquo;
                    </p>


                    <div>

                      <p className="text-[#D8BC79] font-bold text-base">
                        {testimonials[testimonialIndex].client_name}
                      </p>

                      <p className="text-white/50 text-sm mt-1">
                        {testimonials[testimonialIndex].client_title}

                        {testimonials[testimonialIndex].company &&
                          ` · ${testimonials[testimonialIndex].company}`}
                      </p>

                    </div>

                  </div>
                )}

              </div>


              {/* Testimonial Navigation */}
              <div className="flex items-center justify-center gap-6 mt-8">

                <button
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9A65B] text-white hover:text-[#123C2F] flex items-center justify-center transition-all"
                >
                  <ChevronLeft size={20} />
                </button>


                <div className="flex gap-2">

                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setTestimonialIndex(i)
                      }
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === testimonialIndex
                          ? 'bg-[#C9A65B] w-8'
                          : 'bg-white/30 w-2'
                      }`}
                    />
                  ))}

                </div>


                <button
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9A65B] text-white hover:text-[#123C2F] flex items-center justify-center transition-all"
                >
                  <ChevronRight size={20} />
                </button>

              </div>

            </div>

          </div>

        </section>
      )}


      {/* =====================================================
          WORKING PROCESS
          ===================================================== */}

      <section className="section-pad bg-white">

        <div className="container-custom">

          <div className="text-center mb-20">

            <p className="text-[#C9A65B] font-semibold text-sm tracking-widest uppercase mb-3">
              How We Work
            </p>

            <h2 className="section-heading text-[#123C2F] mb-4">
              Our Working Process
            </h2>

            <div className="divider-gold mx-auto mb-5" />

            <p className="text-gray-600 max-w-xl mx-auto text-lg">
              A proven 6-step methodology that consistently delivers
              outstanding results for every client.
            </p>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {processSteps.map(
              ({ num, title, desc }) => (
                <div
                  key={num}
                  className="relative p-8 rounded-2xl border border-gray-100 bg-white card-hover group"
                >

                  <div className="text-5xl font-extrabold text-[#123C2F]/8 absolute top-6 right-8 leading-none select-none">
                    {num}
                  </div>


                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#123C2F] to-[#184D3A] flex items-center justify-center mb-5">

                    <span className="text-[#C9A65B] font-extrabold text-sm">
                      {num}
                    </span>

                  </div>


                  <h3 className="font-bold text-[#123C2F] text-lg mb-2">
                    {title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {desc}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          TRUSTED BUSINESSES
          ===================================================== */}

      <section className="py-16 bg-[#F8F6F0]">

        <div className="container-custom">

          <p className="text-center text-gray-400 text-sm mb-8 uppercase tracking-widest">
            Trusted by Businesses Across Africa
          </p>


          <div className="flex flex-wrap justify-center gap-8 md:gap-16">

            {[
              'TechVentures',
              'GreenPath Academy',
              'Lagos Realty',
              'Harmony NGO',
              'Starlight Academy',
              'PayFlow Africa',
            ].map((name) => (
              <div
                key={name}
                className="text-gray-300 hover:text-[#123C2F] font-bold text-lg transition-colors cursor-default"
              >
                {name}
              </div>
            ))}

          </div>

        </div>

      </section>
    </>
  )
}