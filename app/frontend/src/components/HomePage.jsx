import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Team from './Team';
import Projects from './Projects';
// Testimonials removed
import Contact from './Contact';
import Footer from './Footer';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Projects />
        {/* Testimonials removed */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;


