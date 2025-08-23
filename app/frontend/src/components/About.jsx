import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Monitor, Zap, ArrowRight, CheckCircle } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const skills = [
    { name: "React/Next.js", level: 75, color: "bg-blue-500" },
    { name: "Node.js/Express", level: 70, color: "bg-green-500" },
    { name: "TypeScript", level: 65, color: "bg-blue-600" },
    { name: "Python", level: 60, color: "bg-yellow-500" },
    { name: "AWS", level: 45, color: "bg-orange-500" },
    { name: "Docker", level: 40, color: "bg-blue-400" }
  ];

  const achievements = [
    {
      icon: Code,
      title: "Learning Full-Stack",
      description: "Currently mastering both frontend and backend development with modern technologies.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Database,
      title: "Building Projects",
      description: "Creating personal projects to learn and improve my development skills.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Monitor,
      title: "Performance Learning",
      description: "Learning to optimize applications for speed, SEO, and user experience.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="about" ref={ref} className="py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              About Me
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Passionate Full-Stack
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Developer
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            I'm a passionate full-stack developer who loves turning ideas into reality. 
            Working with a skilled team to create innovative digital solutions and continuously expanding our expertise.
          </motion.p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${achievement.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <achievement.icon className="w-8 h-8" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {achievement.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Technical Expertise</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
              </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                      className={`h-full ${skill.color} rounded-full relative`}
                    >
                      <motion.div
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                        className="absolute inset-0 bg-white opacity-30 rounded-full"
                      />
                    </motion.div>
            </div>
                </motion.div>
          ))}
        </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100"
            >
                             <h4 className="text-2xl font-bold text-gray-900 mb-4">What I Offer</h4>
              <ul className="space-y-4">
                 {[
                   "Passionate about learning new technologies",
                   "Building personal projects to improve skills",
                   "Modern tech stack & current best practices",
                   "Dedicated to delivering quality work",
                   "Clean & well-documented code",
                   "Always open to feedback & improvement"
                 ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.button
                onClick={() => window.open('https://github.com/Butuan-Dev', '_blank')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;


