import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Team', id: 'team' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`} style={{ perspective: '1000px' }}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold text-black cursor-pointer transform-gpu transition-all duration-500"
            style={{ transform: 'translateZ(20px)' }}
            onClick={() => scrollToSection('hero')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateZ(40px) rotateY(5deg) scale(1.05)';
              e.currentTarget.style.textShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(20px) rotateY(0deg) scale(1)';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            ButDev
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-black hover:text-gray-600 transition-all duration-300 transform-gpu font-medium"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: 'translateZ(15px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateZ(25px) translateY(-2px) rotateX(-5deg)';
                  e.currentTarget.style.textShadow = '0 3px 10px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateZ(15px) translateY(0px) rotateX(0deg)';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-black text-white px-6 py-2 rounded-full transition-all duration-300 transform-gpu"
              style={{ 
                transform: 'translateZ(25px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateZ(35px) rotateX(-5deg) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateZ(25px) rotateX(0deg) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
              }}
            >
              Get Started
            </button>
          </nav>

          <button
            className="md:hidden text-black hover:text-gray-600 transition-all duration-300 transform-gpu"
            style={{ transform: 'translateZ(20px)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateZ(30px) rotateY(10deg) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(20px) rotateY(0deg) scale(1)';
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`} style={{ perspective: '800px' }}>
          <nav className="flex flex-col space-y-4 py-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-100">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-black hover:text-gray-600 transition-all duration-300 text-left font-medium px-4 py-2 transform-gpu"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: `translateZ(${10 + index * 5}px) translateX(${isMobileMenuOpen ? '0px' : '-20px'})`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `translateZ(${20 + index * 5}px) translateX(5px) rotateY(3deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `translateZ(${10 + index * 5}px) translateX(0px) rotateY(0deg)`;
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-black text-white px-6 py-2 rounded-full transition-all duration-300 w-fit mx-4 transform-gpu"
              style={{ 
                transform: `translateZ(40px) translateX(${isMobileMenuOpen ? '0px' : '-20px'})`,
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateZ(50px) translateX(5px) rotateX(-5deg) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateZ(40px) translateX(0px) rotateX(0deg) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
              }}
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;


