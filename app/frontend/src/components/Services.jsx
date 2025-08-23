import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Code, Database, Monitor, Zap, Rocket, Shield, Globe, Smartphone, Palette, Cpu, Building } from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Mouse tracking for interactive animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -30
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [0, 5, -5, 0],
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

  const morphVariants = {
    animate: {
      borderRadius: ["50%", "30%", "50%"],
      rotate: [0, 180, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const services = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Modern, responsive web applications with cutting-edge technologies and smooth animations.",
      features: ["React/Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
      color: "from-blue-500 to-cyan-500",
      delay: 0
    },
    {
      icon: Database,
      title: "Backend Development", 
      description: "Scalable server-side solutions with robust APIs and microservices architecture.",
      features: ["Node.js/Express", "Python/Django", "PostgreSQL", "Redis"],
      color: "from-green-500 to-emerald-500",
      delay: 0.1
    },
    {
      icon: Monitor,
      title: "Full-Stack Solutions",
      description: "End-to-end development from concept to deployment with modern DevOps practices.",
      features: ["Microservices", "Cloud Deployment", "CI/CD", "Monitoring"],
      color: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Cross-platform mobile applications with native performance and modern UI/UX.",
      features: ["React Native", "Flutter", "iOS/Android", "PWA"],
      color: "from-orange-500 to-red-500",
      delay: 0.3
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive user interfaces that enhance user experience and engagement.",
      features: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      color: "from-pink-500 to-rose-500",
      delay: 0.4
    },
    {
      icon: Cpu,
      title: "System Architecture",
      description: "Scalable system design with performance optimization and security best practices.",
      features: ["AWS/Azure", "Docker", "Kubernetes", "Security"],
      color: "from-indigo-500 to-blue-500",
      delay: 0.5
    },
    {
      icon: Building,
      title: "LGU & Government Projects",
      description: "Specialized solutions for local government units with compliance and security standards.",
      features: ["Government Compliance", "Security Standards", "Citizen Portals", "Public Services"],
      color: "from-orange-500 to-red-500",
      delay: 0.6
    }
  ];

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="services" ref={ref} className="py-28 md:py-36 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Floating geometric shapes */}
        <motion.div
          variants={morphVariants}
          animate="animate"
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20"
        />
        <motion.div
          variants={morphVariants}
          animate="animate"
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-20"
          style={{ animationDelay: "2s" }}
        />
        <motion.div
          variants={morphVariants}
          animate="animate"
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-pink-200 to-red-200 rounded-full opacity-20"
          style={{ animationDelay: "4s" }}
        />
        
        {/* Particle grid */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0)', backgroundSize: '50px 50px' }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              What I Offer
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Comprehensive
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Development Services
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From concept to deployment, I provide end-to-end solutions for businesses, students, and government units that drive growth and user engagement.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ 
                y: -15,
                rotateY: 10,
                transition: { duration: 0.3 }
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
                  style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d"
              }}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Floating icon */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}
              >
                <service.icon className="w-8 h-8" />
                
                {/* Pulsing ring effect */}
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

              {/* Features list with staggered animation */}
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + idx * 0.05 + 0.5 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <motion.div
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      whileHover={{ scale: 1.5, backgroundColor: "#3b82f6" }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
};

export default Services;


