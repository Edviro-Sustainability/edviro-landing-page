import { useState } from 'react'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">Edviro Energy</div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#pilot" className="text-foreground hover:text-primary transition-colors">Success Story</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
              <a 
                href="https://dashboard.edviroenergy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Dashboard
        </a>
      </div>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
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
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a 
                href="#about" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#pilot" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Success Story
              </a>
              <a 
                href="#contact" 
                className="block text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="https://dashboard.edviroenergy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Energy Dashboarding &<br />
              <span className="text-primary">Anomaly Detection</span><br />
              for School Districts
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Identify billing errors, optimize energy usage, and save thousands of dollars 
              with our intelligent energy management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
              >
                Schedule a Demo
              </a>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-foreground rounded-lg text-lg font-semibold hover:bg-white/20 transition-all hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Co-founders */}
      <section id="about" className="py-20 px-6 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet the Founders
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Edviro Energy was founded by two passionate engineers dedicated to helping 
              school districts optimize their energy consumption and reduce costs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Co-founder 1 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover-card text-center">
              <div className="mb-6">
                <img 
                  src="https://picsum.photos/seed/hursh/300/300" 
                  alt="Hursh Shah" 
                  className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-primary/20"
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Hursh Shah</h3>
              <p className="text-primary font-semibold mb-4">Co-Founder</p>
              <p className="text-muted-foreground">
                Hursh brings extensive experience in energy systems and data analytics, 
                with a passion for creating sustainable solutions for educational institutions.
              </p>
            </div>

            {/* Co-founder 2 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover-card text-center">
              <div className="mb-6">
                <img 
                  src="https://picsum.photos/seed/tanuj/300/300" 
                  alt="Tanuj Siripurapu" 
                  className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-primary/20"
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Tanuj Siripurapu</h3>
              <p className="text-primary font-semibold mb-4">Co-Founder</p>
              <p className="text-muted-foreground">
                Tanuj combines deep technical expertise in software engineering with a 
                commitment to helping schools maximize their resources and reduce waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Program Success Story */}
      <section id="pilot" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-12 md:p-16 border border-primary/30">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-block px-4 py-2 bg-primary/20 rounded-full text-primary font-semibold mb-4">
                Pilot Program Success
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                $360,000+ in Overbilling Identified
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Our pilot program with a local school district uncovered significant billing 
                discrepancies and energy inefficiencies. Using our advanced anomaly detection 
                algorithms, we identified <span className="text-primary font-bold">over $360,000 in overbilling</span> that 
                the school was able to recover.
              </p>
              <div className="grid md:grid-cols-3 gap-6 pt-8">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                  <div className="text-4xl font-bold text-primary mb-2">$360K+</div>
                  <div className="text-muted-foreground">Recovered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                  <div className="text-4xl font-bold text-primary mb-2">7</div>
                  <div className="text-muted-foreground">Pilot Schools</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage and optimize your school district's energy consumption
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover-card">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Real-time Dashboarding</h3>
              <p className="text-muted-foreground">
                Monitor energy consumption across all your facilities with intuitive, 
                real-time dashboards and visualizations.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover-card">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Anomaly Detection</h3>
              <p className="text-muted-foreground">
                AI-powered algorithms automatically detect billing errors, unusual consumption 
                patterns, and potential equipment failures.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover-card">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Cost Optimization</h3>
              <p className="text-muted-foreground">
                Get actionable recommendations to reduce energy costs and improve 
                operational efficiency across your district.
        </p>
      </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Q1 2026 */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Us in Q1 2026
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              We're expanding to our first clients in Q1 2026 and are looking for 
              forward-thinking school districts to join our mission of energy optimization.
            </p>
            <p className="text-lg mb-8 text-white/80">
              Be part of the next generation of energy management for schools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:hurshshah@ucsb.edu"
                className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-lg text-lg font-semibold hover:bg-white/20 transition-all hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-primary mb-4 md:mb-0">Edviro Energy</div>
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
