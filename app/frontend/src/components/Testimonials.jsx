import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { useTestimonials } from '../context/TestimonialsContext';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { testimonials, addTestimonial } = useTestimonials();
  const [feedbackForm, setFeedbackForm] = useState({
    clientName: '',
    clientRole: '',
    projectType: '',
    clientFeedback: '',
    canShare: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mouse tracking for interactive animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: -20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };



  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const handleFeedbackChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started!', feedbackForm);
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically send the data to your backend
    console.log('Feedback submitted:', feedbackForm);
    
    // If client allows sharing, add to testimonials
    if (feedbackForm.canShare) {
      const newTestimonial = {
        name: feedbackForm.clientName,
        role: feedbackForm.clientRole,
        content: feedbackForm.clientFeedback,
        project: feedbackForm.projectType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        industry: feedbackForm.projectType.includes('student') ? 'Education' : 
                  feedbackForm.projectType.includes('business') ? 'Small Business' :
                  feedbackForm.projectType.includes('lgu') ? 'Government' : 'Other'
      };
      
      addTestimonial(newTestimonial);
    }
    
    // Reset form
    setFeedbackForm({
      clientName: '',
      clientRole: '',
      projectType: '',
      clientFeedback: '',
      canShare: false
    });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    console.log('Success state set to true!');
    
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      console.log('Success state reset to false!');
    }, 5000);
  };

  return null;
};

export default Testimonials;


