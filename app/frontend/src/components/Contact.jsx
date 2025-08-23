import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Github, Linkedin, Twitter, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import ScheduleCall from './ScheduleCall';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [openScheduleCall, setOpenScheduleCall] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (openScheduleCall) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [openScheduleCall]);



  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 md:py-36 bg-gray-50"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-black">
            Let's Work Together
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Ready to bring your ideas to life? Get in touch and let's discuss your next project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate('/start-project')}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition"
            >
              <Mail className="w-5 h-5" />
              <span>Start a Project</span>
            </button>
            <button
              onClick={() => setOpenScheduleCall(true)}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 border border-gray-300 text-gray-900 hover:bg-gray-100 transition"
            >
              <Phone className="w-5 h-5" />
              <span>Schedule a Call</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-gray-500 mb-12">
            <a 
              href="https://github.com/Butuan-Dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-300" 
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-black transition" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-black transition" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="mailto:butuandeveloper@gmail.com" className="hover:text-black transition" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>


        </div>
      </div>
      
      {/* Schedule Call Modal */}
      {openScheduleCall && createPortal(
        <ScheduleCall onClose={() => setOpenScheduleCall(false)} />, 
        document.body
      )}
    </section>
  );
};

export default Contact;


