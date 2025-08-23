import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Eye, Code, Database, Monitor, ArrowRight } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      rotateX: -15
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

  const projects = [
    {
      id: 1,
      title: "Student Portfolio Website",
      description: "Professional portfolio website for a computer science student's job applications. Features responsive design, project showcase, and smooth animations.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Netlify"],
      category: "Frontend",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Student Task Manager",
      description: "Task management app for a final year project. Features drag-and-drop functionality, deadline tracking, and progress visualization for academic projects.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      category: "Full-Stack",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Research Data Dashboard",
      description: "Interactive data visualization dashboard for an engineering student's research project. Displays complex data with charts and filtering capabilities.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["React", "D3.js", "Chart.js", "Express", "PostgreSQL"],
      category: "Full-Stack",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 4,
      title: "Local Bakery Website",
      description: "Business website for a local bakery with menu display, contact information, and location details. Mobile-friendly design with online ordering form.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      technologies: ["React", "Tailwind CSS", "EmailJS", "Google Maps"],
      category: "Frontend",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Study Group Platform",
      description: "Web platform for graduate students to form study groups, share resources, and schedule meetings. Built for university research collaboration.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "Firebase", "Vuex", "Bootstrap"],
      category: "Frontend",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 6,
      title: "Municipal Citizen Portal",
      description: "Government website and citizen portal for a local municipality. Features public information, online services, and citizen engagement tools.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "PostgreSQL", "Government APIs", "Security Compliance"],
      category: "Full-Stack",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 7,
      title: "Small Business API",
      description: "RESTful API backend for a small business inventory management system. Handles product data, orders, and customer information securely.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Heroku"],
      category: "Backend",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const categories = ["All", "Frontend", "Backend", "Full-Stack"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Frontend": return Code;
      case "Backend": return Database;
      case "Full-Stack": return Monitor;
      default: return Code;
    }
  };

  return (
    <section id="projects" ref={ref} className="py-28 md:py-36 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Code className="w-4 h-4" />
              My Work
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Featured
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Explore my recent projects built for students and small businesses, showcasing practical solutions and modern web technologies.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 text-gray-700 rounded-full text-sm font-medium">
                    {React.createElement(getCategoryIcon(project.category), { className: "w-4 h-4" })}
                    {project.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoveredProject === project.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  className="absolute bottom-4 right-4 flex gap-2"
                >
                  <motion.a
                    href={project.liveUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/90 text-gray-700 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/Butuan-Dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/90 text-gray-700 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <motion.button
                  onClick={() => window.open('https://github.com/Butuan-Dev', '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 cursor-pointer"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                    Featured
                  </span>
              </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => window.open('https://github.com/Butuan-Dev', '_blank')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-all duration-300 cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;


