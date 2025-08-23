import React, { createContext, useContext, useState } from 'react';

const TestimonialsContext = createContext();

export const useTestimonials = () => {
  const context = useContext(TestimonialsContext);
  if (!context) {
    throw new Error('useTestimonials must be used within a TestimonialsProvider');
  }
  return context;
};

export const TestimonialsProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Alex Martinez",
      role: "Computer Science Student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "ButDev helped me build my final year project - a task management web app. They guided me through the entire process, explained complex concepts clearly, and delivered exactly what I needed for my presentation.",
      rating: 5,
      project: "Student Task Manager",
      industry: "Education"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "MBA Student",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "The team created a professional, modern site that perfectly showcased my projects and achievements. Great communication throughout!",
      rating: 5,
      project: "Student Portfolio",
      industry: "Education"
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Engineering Student",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Excellent work on my research data visualization dashboard. They made complex data easy to understand and present to my professors.",
      rating: 5,
      project: "Research Platform",
      industry: "Education"
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "ButDev created a beautiful website for my local bakery. They understood my budget constraints and delivered a professional site that helps customers find us online. Sales have increased since launch!",
      rating: 5,
      project: "Business Website",
      industry: "Small Business"
    },
    {
      id: 5,
      name: "David Park",
      role: "Graduate Student",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "Amazing experience working with ButDev on my study group platform. They delivered on time and within budget, perfect for a student project!",
      rating: 5,
      project: "Study Platform",
      industry: "Education"
    },
    {
      id: 6,
      name: "Mayor Santos",
      role: "Municipal Mayor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "ButDev developed our municipal website and citizen portal. They handled all government requirements professionally and delivered a system that improved our public services. Highly recommended for LGU projects!",
      rating: 5,
      project: "Municipal Website & Portal",
      industry: "Government"
    }
  ]);

  const addTestimonial = (newTestimonial) => {
    const testimonialWithId = {
      ...newTestimonial,
      id: testimonials.length + 1,
      rating: 5, // Default rating
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", // Default avatar
    };
    
    setTestimonials(prev => [testimonialWithId, ...prev]);
  };

  const value = {
    testimonials,
    addTestimonial
  };

  return (
    <TestimonialsContext.Provider value={value}>
      {children}
    </TestimonialsContext.Provider>
  );
};
