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

  return (
    <section id="testimonials" ref={ref} className="py-28 md:py-36 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Floating quote marks */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 text-9xl text-blue-100 font-serif opacity-20"
        >
          "
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-20 right-10 text-9xl text-purple-100 font-serif opacity-20"
          style={{ animationDelay: "2s" }}
        >
          "
        </motion.div>
        
        {/* Sparkle particles */}
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute top-1/4 right-1/4 w-3 h-3 bg-yellow-400 rounded-full opacity-60"
        />
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-60"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute top-1/2 right-1/3 w-4 h-4 bg-blue-400 rounded-full opacity-60"
          style={{ animationDelay: "3s" }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4" />
              Client Success
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            What Our
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Clients Say
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From students working on their final projects to small businesses building their online presence, here's what our clients say about working with us.
          </motion.p>
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => setHoveredCard(currentTestimonial.id)}
            onHoverEnd={() => setHoveredCard(null)}
            onMouseMove={handleMouseMove}
            className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden group"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Quote icon */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-500"
            >
              <Quote className="w-8 h-8" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <motion.div 
                className="flex gap-1 mb-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Testimonial text */}
              <motion.blockquote
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic"
              >
                "{currentTestimonial.content}"
              </motion.blockquote>

              {/* Client info */}
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg"
                >
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

              <div>
                  <motion.h4 
                    variants={itemVariants}
                    className="text-lg font-bold text-gray-900"
                  >
                    {currentTestimonial.name}
                  </motion.h4>
                  <motion.p 
                    variants={itemVariants}
                    className="text-blue-600 font-medium"
                  >
                    {currentTestimonial.role}
                  </motion.p>
                  
                  {/* Project info */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-2 mt-2 text-sm text-gray-500"
                  >
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span>{currentTestimonial.project}</span>
                    <span className="text-gray-300">•</span>
                    <span>{currentTestimonial.industry}</span>
                  </motion.div>
              </div>
            </div>
          </div>

            {/* Animated border effect */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent rounded-3xl"
              initial={{ borderColor: "transparent" }}
              whileHover={{ 
                borderColor: "#3b82f6",
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center items-center gap-6"
        >
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { value: "95%", label: "Client Satisfaction", icon: Heart, color: "text-red-500" },
            { value: "25+", label: "Projects Completed", icon: Sparkles, color: "text-yellow-500" },
            { value: "Student", label: "Friendly Pricing", icon: Star, color: "text-blue-500" },
            { value: "5.0", label: "Average Rating", icon: Quote, color: "text-green-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300 ${stat.color}`}
              >
                <stat.icon className="w-8 h-8" />
              </motion.div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Share Your Experience Form - Simple */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Share Your Experience
            </h3>
            <p className="text-gray-600">
              Tell us about your project experience
            </p>
          </motion.div>
          
          <motion.div variants={cardVariants}>
            {isSubmitted ? (
              <div className="bg-green-50 p-8 rounded-xl border border-green-200 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-semibold text-green-800 mb-2"
                >
                  Thank You!
                </motion.h4>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-green-700 mb-4"
                >
                  Your feedback has been submitted successfully!
                </motion.p>
                
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setIsSubmitted(false)}
                  className="text-green-600 hover:text-green-700 font-medium underline"
                >
                  Submit another feedback
                </motion.button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={feedbackForm.clientName}
                    onChange={handleFeedbackChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="clientRole" className="block text-sm font-medium text-gray-700 mb-1">
                    Role/Company
                  </label>
                  <input
                    type="text"
                    id="clientRole"
                    name="clientRole"
                    value={feedbackForm.clientRole}
                    onChange={handleFeedbackChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Student, Business Owner"
                    required
                  />
          </div>
        </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={feedbackForm.projectType}
                  onChange={handleFeedbackChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select type</option>
                  <option value="student-project">Student Project</option>
                  <option value="business-website">Business Website</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="e-commerce">E-commerce</option>
                  <option value="lgu-government">LGU/Government</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="clientFeedback" className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <textarea
                  id="clientFeedback"
                  name="clientFeedback"
                  value={feedbackForm.clientFeedback}
                  onChange={handleFeedbackChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Share your experience..."
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="canShare"
                  name="canShare"
                  checked={feedbackForm.canShare}
                  onChange={handleFeedbackChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="canShare" className="text-sm text-gray-600">
                  Share as testimonial
                </label>
              </div>
              
                             <button
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
               >
                 {isSubmitting ? (
                   <>
                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                     Submitting...
                   </>
                 ) : (
                   <>
                     <span>Submit</span>
                   </>
                 )}
               </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;


