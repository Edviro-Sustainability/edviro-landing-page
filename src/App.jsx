import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState({ hero: true })

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight

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

  return (
    <div className="min-h-screen bg-white text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold text-foreground">
              Edviro Energy
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">About</a>
              <a href="#pilot" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Success Story</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Contact</a>
              <a 
                href="https://edviroenergy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                Dashboard
              </a>
            </div>
            <button 
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#about" className="block text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#pilot" className="block text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>Success Story</a>
              <a href="#contact" className="block text-muted-foreground hover:text-foreground transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <a href="https://dashboard.edviroenergy.com" target="_blank" rel="noopener noreferrer" className="block w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg text-center font-medium" onClick={() => setMobileMenuOpen(false)}>Dashboard</a>
            </div>
          )}
        </div>
      </nav>

      {/* Main Layout with Fixed Center Divider */}
      <div className="relative flex">
        {/* Left Content Column */}
        <div className="flex-1 min-h-screen pt-20">
          {/* Hero Section */}
          <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 lg:px-32 xl:px-40 overflow-hidden">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="text-sm uppercase tracking-wider text-primary font-medium">Energy Intelligence</div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-foreground">
                Save Your School
                <span className="block text-primary">
                  Thousands
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Identify billing errors, optimize energy usage, and save thousands of dollars with our intelligent energy management platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#contact" className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all text-center">
                  Schedule a Demo
                </a>
                <a href="#pilot" className="px-8 py-4 bg-secondary border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-all text-center">
                  Learn More
                </a>
              </div>
            </div>
          </section>

          {/* About Section - Team */}
          <section id="about" className="relative py-32 px-6 lg:px-32 xl:px-40">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="text-sm uppercase tracking-wider text-primary font-medium">Our Story</div>
              <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
                Meet the
                <span className="block text-primary">Team</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Edviro Energy is run by two passionate college students who grew fed up with seeing their hometown high schools lose thousands of valuable tax payer money to inefficiences, overbillings, and simple oversights that can be fixed with proper dashboarding and modern day API tools
              </p>
              
              <div className="space-y-6 pt-8">
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <img src="https://picsum.photos/seed/hursh/100/100" alt="Hursh Shah" className="w-16 h-16 rounded-full object-cover border-2 border-border" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Hursh Shah</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Extensive experience in energy systems and data analytics
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <img src="https://picsum.photos/seed/tanuj/100/100" alt="Tanuj Siripurapu" className="w-16 h-16 rounded-full object-cover border-2 border-border" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Tanuj Siripurapu</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Deep technical expertise in software engineering
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pilot Program Success Story */}
          <section id="pilot" className="relative py-12 px-6 lg:px-32 xl:px-40">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 ${isVisible.pilot ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-foreground">
                $360,000+ in
                <span className="block text-primary">
                  Overbilling Identified
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our pilot program with local school districts uncovered significant billing discrepancies and energy inefficiencies. Using our advanced anomaly detection algorithms, we identified <span className="text-primary font-semibold">over $360,000 in overbilling</span> that schools were able to recover.
              </p>
            </div>
          </section>
        </div>

        {/* Fixed Center Divider Column */}
        <div className="hidden lg:block fixed left-1/2 top-0 bottom-0 w-0 -translate-x-1/2 z-10 pointer-events-none">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="w-px h-full bg-border opacity-30"></div>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="flex-1 min-h-screen pt-20">
          {/* Features Section */}
          <section id="features" className="relative min-h-screen flex items-center justify-center px-6 lg:px-32 xl:px-40">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 delay-200 ${isVisible.features ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="space-y-6 pt-8">
                {[
                  { icon: 'fa-chart-line', title: 'Real-time Dashboarding', desc: 'Monitor energy consumption across all facilities with intuitive, real-time dashboards.' },
                  { icon: 'fa-magnifying-glass', title: 'Anomaly Detection', desc: 'AI-powered algorithms automatically detect billing errors and unusual patterns.' },
                  { icon: 'fa-dollar-sign', title: 'Cost Optimization', desc: 'Get actionable recommendations to reduce energy costs and improve efficiency.' }
                ].map((feature, idx) => (
                  <div 
                    key={idx}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-all"
                  >
                    <div className="text-2xl mb-3 text-primary">
                      <i className={`fas ${feature.icon}`}></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section id="contact" className="relative py-32 px-6 lg:px-32 xl:px-40">
            <div className={`w-full max-w-2xl space-y-8 transition-all duration-1000 delay-300 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-primary rounded-lg p-12 md:p-16 text-center">
                <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-primary-foreground">Join Us in Q1 2026</h2>
                <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 leading-relaxed">
                  We're expanding to our first clients in Q1 2026 and are looking for forward-thinking school districts to join our mission of energy optimization.
                </p>
                <p className="text-base mb-8 text-primary-foreground/80">
                  Be part of the next generation of energy management for schools.
                </p>
                <a 
                  href="mailto:hurshshah@ucsb.edu"
                  className="inline-block px-8 py-4 bg-white text-primary rounded-lg text-base font-medium hover:bg-white/90 transition-all"
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
                <div className="bg-card border border-border rounded-lg p-10 text-center">
                  <div className="text-4xl font-semibold text-primary mb-2">$360K+</div>
                  <div className="text-muted-foreground text-sm">Recovered</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-10 text-center">
                  <div className="text-4xl font-semibold text-primary mb-2">7</div>
                  <div className="text-muted-foreground text-sm">Schools</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-10 text-center">
                  <div className="text-4xl font-semibold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground text-sm">Success</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-white relative z-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-semibold text-foreground mb-4 md:mb-0">
              Edviro Energy
            </div>
            <div className="text-muted-foreground text-sm">
              © 2025 Edviro Energy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
