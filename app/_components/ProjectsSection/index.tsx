'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Palette, Globe, Smartphone, Server, Cpu, Box, FileCode2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSkillsList } from '@/app/_libs/microcms';
import type { Skill } from '@/app/_libs/microcms';
import Image from 'next/image';

// プログラミング言語のデータ
const programmingLanguages = [
  { name: 'Python', icon: '/python.png', type: 'image', color: 'from-yellow-400 to-blue-500' },
  { name: 'HTML', icon: '/HTML5_Logo_256.png', type: 'image', color: 'from-orange-500 to-red-500' },
  { name: 'CSS', icon: '/css3.jpg', type: 'image', color: 'from-blue-400 to-purple-500' },
  { name: 'Next.js', icon: '/nextjs.jpg', type: 'image', color: 'from-slate-200 to-slate-400' },
];

// アイコンマッピング
const iconMap: { [key: string]: any } = {
  Code2,
  Database,
  Palette,
  Globe,
  Smartphone,
  Server,
  Cpu,
  Box,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkillsList({ orders: 'order' });
        setSkills(data.contents);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center py-12 text-slate-500">
          読み込み中...
        </div>
      </section>
    );
  }
  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
          スキルと技術
        </h2>
        <p className="text-lg text-slate-400">
          できることと使用している技術
        </p>
      </div>

      {/* プログラミング言語 - 横スクロール */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-slate-50 mb-6 px-2">
          プログラミング言語
        </h3>
        <div className="relative">
          {/* グラデーションオーバーレイ（左右） */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          
          {/* スクロールコンテナ */}
          <div className="overflow-x-auto scrollbar-hide pb-4 py-4">
            <div className="flex gap-4 px-2" style={{ width: 'max-content' }}>
              {programmingLanguages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className="w-32 h-40 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-slate-600 hover:shadow-2xl hover:shadow-slate-900/50 overflow-visible">
                    {/* アイコン */}
                    <div className={`transition-all duration-300 group-hover:scale-125 ${lang.type === 'image' ? 'w-16 h-16' : 'text-5xl'}`}>
                      {lang.type === 'image' ? (
                        <Image 
                          src={lang.icon} 
                          alt={lang.name} 
                          width={64} 
                          height={64}
                          className="object-contain"
                        />
                      ) : (
                        lang.icon
                      )}
                    </div>
                    
                    {/* 言語名 */}
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {lang.name}
                      </p>
                    </div>
                    
                    {/* グラデーション背景 */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${lang.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {skills.map((skill) => {
          const Icon = iconMap[skill.icon] || Code2;
          
          return (
            <motion.div
              key={skill.id}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-900/50"
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                  <Icon className={`w-6 h-6 ${skill.color}`} />
                </div>
                
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    {skill.category}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-50">
                    {skill.title}
                  </h3>
                </div>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
