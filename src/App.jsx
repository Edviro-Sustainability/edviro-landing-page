import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const lightbulbRef = useRef(null)

  useEffect(() => {
    // Set hero as visible initially
    setIsVisible({ hero: true })
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollableHeight = documentHeight - windowHeight
      const progress = Math.min(scrollTop / scrollableHeight, 1)
      setScrollProgress(progress)

      // Track visibility of sections
      const sections = document.querySelectorAll('section[id]')
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const isInView = rect.top < windowHeight * 0.8 && rect.bottom > 0
        if (isInView) {
          setIsVisible((prev) => ({ ...prev, [section.id]: true }))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const lightbulbBrightness = Math.min(scrollProgress * 1.5, 1)
  const lightbulbScale = 0.8 + scrollProgress * 0.3
  const glowIntensity = scrollProgress * 120

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Edviro Energy
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-white/80 hover:text-primary transition-colors">About</a>
              <a href="#pilot" className="text-white/80 hover:text-primary transition-colors">Success Story</a>
              <a href="#contact" className="text-white/80 hover:text-primary transition-colors">Contact</a>
              <a 
                href="https://edviroenergy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                Dashboard
              </a>
            </div>
            <button 
              className="md:hidden p-2 text-white/80 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#about" className="block text-white/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#pilot" className="block text-white/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Success Story</a>
              <a href="#contact" className="block text-white/80 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <a href="https://dashboard.edviroenergy.com" target="_blank" rel="noopener noreferrer" className="block w-full px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg text-center" onClick={() => setMobileMenuOpen(false)}>Dashboard</a>
            </div>
          )}
        </div>
      </nav>

      {/* Main Layout with Fixed Center Light Bulb */}
      <div className="relative flex">
        {/* Left Content Column */}
        <div className="flex-1 min-h-screen pt-20">
          {/* Hero Section */}
          <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 lg:px-32 xl:px-40 overflow-hidden">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="text-sm uppercase tracking-wider text-primary font-semibold">Energy Intelligence</div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Save Your School
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Thousands
                </span>
              </h1>
              <p className="text-xl text-white/70 leading-relaxed">
                Identify billing errors, optimize energy usage, and save thousands of dollars with our intelligent energy management platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#contact" className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105 text-center">
                  Schedule a Demo
                </a>
                <a href="#pilot" className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all hover:scale-105 text-center">
                  Learn More
        </a>
      </div>
            </div>
          </section>

          {/* About Section - Team */}
          <section id="about" className="relative py-32 px-6 lg:px-32 xl:px-40">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="text-sm uppercase tracking-wider text-primary font-semibold">Our Story</div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Meet the
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Team</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Edviro Energy is run by two passionate college students who grew fed up with seeing their hometown high schools lose thousands of valuable tax payer money to inefficiences, overbillings, and simple oversights that can be fixed with proper dashboarding and modern day API tools
              </p>
              
              <div className="space-y-6 pt-8">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <img src="https://picsum.photos/seed/hursh/100/100" alt="Hursh Shah" className="w-16 h-16 rounded-full object-cover border-2 border-primary/50" />
                    <div>
                      <h3 className="text-xl font-bold">Hursh Shah</h3>
                      <p className="text-sm text-white/60">Co-Founder</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">
                    Extensive experience in energy systems and data analytics
                  </p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <img src="https://picsum.photos/seed/tanuj/100/100" alt="Tanuj Siripurapu" className="w-16 h-16 rounded-full object-cover border-2 border-accent/50" />
                    <div>
                      <h3 className="text-xl font-bold">Tanuj Siripurapu</h3>
                      <p className="text-sm text-white/60">Co-Founder</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">
                    Deep technical expertise in software engineering
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pilot Program Success Story */}
          <section id="pilot" className="relative py-12 px-6 lg:px-32 xl:px-40">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 ${isVisible.pilot ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                $360,000+ in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                  Overbilling Identified
                </span>
              </h2>
              <p className="text-xl text-white/70 leading-relaxed">
                Our pilot program with local school districts uncovered significant billing discrepancies and energy inefficiencies. Using our advanced anomaly detection algorithms, we identified <span className="text-primary font-bold">over $360,000 in overbilling</span> that schools were able to recover.
              </p>
            </div>
          </section>
        </div>

        {/* Fixed Center Light Bulb Column */}
        <div className="hidden lg:block fixed left-1/2 top-0 bottom-0 w-0 -translate-x-1/2 z-10 pointer-events-none">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div 
              ref={lightbulbRef}
              className="relative"
              style={{
                transform: `scale(${lightbulbScale})`,
                transition: 'transform 0.3s ease-out',
                padding: '0 60px'
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(76, 175, 132, ${lightbulbBrightness * 0.8}) 0%, rgba(155, 135, 245, ${lightbulbBrightness * 0.6}) 40%, transparent 70%)`,
                  width: `${300 + glowIntensity * 3}px`,
                  height: `${300 + glowIntensity * 3}px`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: lightbulbBrightness,
                  filter: `blur(${40 + glowIntensity * 0.5}px)`,
                  transition: 'all 0.3s ease-out'
                }}
              />
              
              {/* Light Bulb SVG - Based on provided design */}
              <svg 
                width="200" 
                height="280" 
                viewBox="0 0 1024 1024" 
                className="relative z-10"
                style={{
                  filter: `brightness(${0.5 + lightbulbBrightness * 0.5}) drop-shadow(0 0 ${glowIntensity * 0.8}px rgba(76, 175, 132, ${lightbulbBrightness}))`
                }}
              >
                {/* Main bulb shape - adapted from provided SVG */}
                <path 
                  d="M434.452 904.856c0 30.647 24.843 55.49 55.489 55.49h36.993c30.647 0 55.49-24.843 55.49-55.49V886.36H434.452v18.496z m73.986-832.342c-173.66 0-314.44 140.78-314.44 314.44 0 95.368 42.457 180.82 109.499 238.486 41.118 35.365 130.955 223.926 130.955 223.926h147.972s89.893-188.849 130.128-223.219c67.521-57.672 110.326-143.433 110.326-239.193 0.001-173.659-140.78-314.44-314.44-314.44z m180.101 524.718C653.037 627.509 573.72 812.374 573.72 812.374h-46.785V579.401l87.181-87.181c7.173-7.175 7.173-18.805 0-25.978-7.173-7.173-18.804-7.173-25.978 0l-79.61 79.61-107.895-107.895c-7.225-7.225-18.935-7.225-26.158 0-7.225 7.223-7.225 18.933 0 26.158l112.292 112.292c0.981 0.981 2.05 1.817 3.174 2.531v233.436h-46.785s-79.269-184.61-115.548-215.765c-59.157-50.801-96.618-126.079-96.618-210.094 0-152.986 124.217-277.007 277.447-277.007s277.447 124.021 277.447 277.007c0.002 84.358-37.768 159.911-97.345 210.717z" 
                  fill={`rgba(76, 175, 132, ${0.3 + lightbulbBrightness * 0.6})`}
                  stroke={`rgba(76, 175, 132, ${0.5 + lightbulbBrightness * 0.5})`}
                  strokeWidth="2"
                  style={{
                    filter: lightbulbBrightness > 0.3 ? `drop-shadow(0 0 ${glowIntensity * 0.3}px rgba(76, 175, 132, ${lightbulbBrightness * 0.8}))` : 'none'
                  }}
                />
                
                {/* Inner glow effect */}
                <path 
                  d="M508.438 72.514c-152.986 0-277.007 124.021-277.007 277.007 0 84.015 37.461 159.293 96.618 210.094 36.279 31.155 115.548 215.765 115.548 215.765h46.785V579.401c-1.124-0.714-2.193-1.55-3.174-2.531L400.2 464.578c-7.225-7.225-7.225-18.935 0-26.158 7.223-7.225 18.933-7.225 26.158 0l107.895 107.895 79.61-79.61c7.174-7.173 18.805-7.173 25.978 0 7.173 7.173 7.173 18.803 0 25.978L534.935 579.401v233.436h46.785s89.837-188.561 130.128-223.219c67.577-50.806 105.345-126.359 105.345-210.717 0-152.986-124.021-277.007-277.007-277.007z" 
                  fill={`rgba(255, 255, 255, ${0.1 + lightbulbBrightness * 0.4})`}
                  opacity={lightbulbBrightness * 0.6}
                />
                
                {/* Bright core at center */}
                <circle 
                  cx="512" 
                  cy="400" 
                  r={`${40 + lightbulbBrightness * 30}`}
                  fill={`rgba(76, 175, 132, ${lightbulbBrightness * 0.7})`}
                  opacity={lightbulbBrightness * 0.8}
                  style={{
                    filter: `blur(${10 + lightbulbBrightness * 5}px)`
                  }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="flex-1 min-h-screen pt-20">
          {/* Features Section */}
          <section id="features" className="relative min-h-screen flex items-center justify-center px-6 lg:px-32 xl:px-40">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 delay-200 ${isVisible.features ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="space-y-6 pt-8">
                {[
                  { icon: '📊', title: 'Real-time Dashboarding', desc: 'Monitor energy consumption across all facilities with intuitive, real-time dashboards.' },
                  { icon: '🔍', title: 'Anomaly Detection', desc: 'AI-powered algorithms automatically detect billing errors and unusual patterns.' },
                  { icon: '💰', title: 'Cost Optimization', desc: 'Get actionable recommendations to reduce energy costs and improve efficiency.' }
                ].map((feature, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary/50 transition-all"
                  >
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section id="contact" className="relative py-32 px-6 lg:px-32 xl:px-40">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 delay-300 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-gradient-to-br from-primary via-accent to-primary rounded-3xl p-12 md:p-16 text-center shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us in Q1 2026</h2>
                <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                  We're expanding to our first clients in Q1 2026 and are looking for forward-thinking school districts to join our mission of energy optimization.
                </p>
                <p className="text-lg mb-8 text-white/80">
                  Be part of the next generation of energy management for schools.
                </p>
                <a 
                  href="mailto:hurshshah@ucsb.edu"
                  className="inline-block px-8 py-4 bg-white text-primary rounded-lg text-lg font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section id="stats" className="relative py-32 px-6 lg:px-32 xl:px-40">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 delay-200 ${isVisible.stats ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="flex flex-col gap-6">
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-10 border border-primary/30 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">$360K+</div>
                  <div className="text-white/70 text-sm">Recovered</div>
                </div>
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl p-10 border border-accent/30 text-center">
                  <div className="text-4xl font-bold text-accent mb-2">7</div>
                  <div className="text-white/70 text-sm">Schools</div>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-10 border border-primary/30 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-white/70 text-sm">Success</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-slate-900/50 relative z-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 md:mb-0">
              Edviro Energy
            </div>
            <div className="text-white/60 text-sm">
              © 2025 Edviro Energy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
