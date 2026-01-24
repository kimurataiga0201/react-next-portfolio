'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, Heart } from 'lucide-react';

export default function Entry() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-slate-950">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-slate-50 mb-4">
            Taiga Kimura
          </h1>
          <p className="text-2xl sm:text-3xl font-light text-slate-600">
            木村 太河
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/portfolio">
              <div className="group relative rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-12 h-64 flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2 cursor-pointer">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-blue-900/30 transition-colors">
                  <Briefcase className="w-10 h-10 text-blue-400" />
                </div>
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-50 mb-2 group-hover:text-blue-400 transition-colors">
                    Portfolio
                  </h2>
                  <p className="text-slate-400 text-sm">
                    スキルと活動を見る
                  </p>
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/hobby">
              <div className="group relative rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-12 h-64 flex flex-col items-center justify-center gap-6 transition-all duration-300 hover:border-slate-600 hover:shadow-2xl hover:shadow-pink-900/20 hover:-translate-y-2 cursor-pointer">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-pink-900/30 transition-colors">
                  <Heart className="w-10 h-10 text-pink-400" />
                </div>
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-slate-50 mb-2 group-hover:text-pink-400 transition-colors">
                    Hobby
                  </h2>
                  <p className="text-slate-400 text-sm">
                    趣味と興味を見る
                  </p>
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500 to-orange-600 opacity-0 group-hover:opacity-5 transition-opacity" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

