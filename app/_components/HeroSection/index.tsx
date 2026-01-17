'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Name */}
          <div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-slate-50">
              Taiga Kimura
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-600 mt-2">
              木村 太河
            </p>
          </div>
          
          {/* Bio */}
          <p className="text-xl sm:text-2xl text-slate-400 font-light">
            Building digital products
          </p>
          
          {/* Description */}
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            Full Stack Developer specializing in React, Next.js, and Node.js. 
            I create fast, scalable, and beautiful web applications that solve real problems.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all duration-200"
            >
              <Github className="w-5 h-5 text-slate-400 group-hover:text-slate-300" />
              <span className="text-sm text-slate-300 group-hover:text-slate-200">GitHub</span>
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all duration-200"
            >
              <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-slate-300" />
              <span className="text-sm text-slate-300 group-hover:text-slate-200">LinkedIn</span>
            </a>
            
            <a
              href="mailto:alex@example.com"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all duration-200"
            >
              <Mail className="w-5 h-5 text-slate-400 group-hover:text-slate-300" />
              <span className="text-sm text-slate-300 group-hover:text-slate-200">Email</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
