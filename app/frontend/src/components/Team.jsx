import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
  import { Github, Linkedin, Facebook, Mail, Instagram, Users } from 'lucide-react';

const Team = () => {

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredMember, setHoveredMember] = useState(null);

  const navigate = useNavigate();

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
      rotateX: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const morphVariants = {
    animate: {
      borderRadius: ["40%", "60%", "40%"],
      rotate: [0, 90, 180, 270, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const teamMembers = [
    {
      id: 1,
      name: "Kent Andrian P. Sabayday",
      role: "Full-Stack Developer",
      image: "/images/2712bac0-4fc2-44e7-8f01-abeee8bc388d.jpg",
      bio: "Experienced full-stack developer with expertise in modern web technologies. Leads technical decisions and mentors the development team.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "System Architecture"],
      experience: "5+ years",
      projects: "30+ Projects",
      social: {
        github: "https://github.com/kenshi-ucl",
        instagram: "#",
        facebook: "https://www.facebook.com/kentadrian.sabayday",
        email: "mailto:kentadrianpalaciosabayday@gmail.com"
      }
    },
    {
      id: 2,
      name: "Justin Kim P. Nadela",
      role: "Full-Stack Developer",
      image: "/images/ef0304ad-5725-40a3-b3e9-1c6a442c2ce5.jpg",
      bio: "Skilled full-stack developer with expertise in both frontend and backend technologies. Creates responsive, interactive web applications with clean, maintainable code across the entire stack.",
      skills: ["React", "JavaScript", "CSS", "Tailwind CSS", "Framer Motion"],
      experience: "2+ years",
      projects: "15+ Projects",
      social: {
        github: "https://github.com/JustinNadz",
        instagram: "https://www.instagram.com/khabi_itzx/?igsh=OXlrZ3hwNXhncGd0&utm_source=qr#",
        facebook: "https://www.facebook.com/justin.pecasales",
        email: "mailto:justinnadela2@gmail.com"
      }
    },
    {
      id: 3,
      name: "Christopher Burlasa Raper",
      role: "Backend Developer",
      image: "/images/47c410eb-ef22-4631-99e1-9f7f68a4e6b5.jpg",
      bio: "Backend developer focused on server-side logic, APIs, and database design. Builds scalable and secure backend systems for web applications.",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "API Development"],
      experience: "2+ years",
      projects: "12+ Projects",
      social: {
        github: "https://github.com/cHITo-CBR",
        instagram: "https://www.instagram.com/_chis.raps05?igsh=ODgyMXpyeGVnZWtl",
        facebook: "https://www.facebook.com/christpher.raper",
        email: "mailto:chistopher.raper@urios.edu.ph"
      }
    },
    {
      id: 5,
      name: "Donnel Simbajon",
      role: "Front-end & Backend Developer",
      image: "/images/4f84ce92-4bbf-4983-a007-e67c2e185e70.jpg",
      bio: "Skilled developer with expertise in both frontend and backend technologies. Creates responsive web applications and robust server-side solutions using modern frameworks and databases.",
      skills: ["Angular.js", "Laravel", "CSS", "HTML", "Node.js", "Django", "Python", "MySQL", "PHP"],
      experience: "3+ years",
      projects: "20+ Projects",
      social: {
        github: "#",
        instagram: "https://www.instagram.com/unblankpage2/",
        facebook: "#",
        email: "mailto:donnel.simbajon@example.com"
      }
    },
    {
      id: 6,
      name: "John Viray",
      role: "Front-end Developer",
      image: "/images/24ffec49-ce3d-4c0a-80a4-d58a4d6cbc5a.jpg",
      bio: "Frontend developer passionate about building clean, responsive UIs.",
      skills: ["React", "JavaScript", "Tailwind CSS"],
      experience: "1+ years",
      projects: "5+ Projects",
      social: {
        github: "#",
        instagram: "#",
        facebook: "#",
        email: "mailto:john.viray@example.com"
      }
    }
  ];

  // Stats section removed

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (

    <section id="team" ref={ref} className="py-28 md:py-36 bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Morphing shapes */}
        <motion.div
          variants={morphVariants}
          animate="animate"
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 opacity-20"
        />
        <motion.div
          variants={morphVariants}
          animate="animate"
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-green-200 to-blue-200 opacity-20"
          style={{ animationDelay: "3s" }}
        />
        <motion.div
          variants={morphVariants}
          animate="animate"
          className="absolute bottom-20 left-1/3 w-28 h-28 bg-gradient-to-br from-pink-200 to-red-200 opacity-20"
          style={{ animationDelay: "6s" }}
        />
        
        {/* Floating particles */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-30"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-30"
          style={{ animationDelay: "2s" }}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-400 rounded-full opacity-30"
          style={{ animationDelay: "4s" }}
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
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Users className="w-4 h-4" />
              Our Team
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Meet Our
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Development Team
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Our skilled team of 5 developers combines senior expertise with specialized skills in frontend, backend, and UI/UX design to deliver exceptional digital solutions.
          </motion.p>
        </motion.div>

        {/* Team Stats removed */}

        {/* Team Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (

            <motion.div
              key={member.id}

              variants={cardVariants}
              whileHover={{ 
                y: -15,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredMember(member.id)}
              onHoverEnd={() => setHoveredMember(null)}
              onMouseMove={handleMouseMove}
              tabIndex={0}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 hover:ring-2 hover:ring-cyan-500/60"
            >
              {/* Member Image */}
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  animate={hoveredMember === member.id ? { opacity: 1 } : { opacity: 0 }}
                />

                {/* Persistent readability gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                
                {/* Social links on hover */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoveredMember === member.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {Object.entries(member.social).map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/90 text-gray-700 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 cursor-pointer"
                      style={{ pointerEvents: 'auto' }}
                    >
                      {platform === 'github' && <Github className="w-4 h-4" />}
                      {platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                      {platform === 'facebook' && <Facebook className="w-4 h-4" />}
                      {platform === 'instagram' && <Instagram className="w-4 h-4" />}
                      {platform === 'email' && <Mail className="w-4 h-4" />}
                    </motion.a>
                  ))}
                </motion.div>
                {/* Name overlay on image (no background container) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-0 pointer-events-none">
                  <h3 className="text-white text-lg md:text-xl font-semibold m-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] tracking-wide translate-y-1 group-hover:translate-y-0 transition-all duration-300">{member.name}</h3>
                </div>
              </div>




              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-2xl"
                initial={{ borderColor: "transparent" }}
                whileHover={{ 
                  borderColor: "#3b82f6",
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300 cursor-pointer"
          >
            <Users className="w-5 h-5" />
            <span>Join Our Team</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;



