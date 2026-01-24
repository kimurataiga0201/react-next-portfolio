'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getWorksList } from '@/app/_libs/microcms';
import type { Work } from '@/app/_libs/microcms';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

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

export default function WorksSection() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await getWorksList({ orders: 'order' });
        setWorks(data.contents);
      } catch (error) {
        console.error('Failed to fetch works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
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

  if (works.length === 0) {
    return (
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-slate-400 mb-2">まだ作品がありません</p>
          <p className="text-sm text-slate-500">
            microCMSで作品を追加してください
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
          作品
        </h2>
        <p className="text-lg text-slate-400">
          これまでに制作したプロジェクト
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {works.map((work) => (
          <motion.div
            key={work.id}
            variants={item}
            className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-900/50"
          >
            {/* サムネイル */}
            {work.thumbnail && (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={work.thumbnail.url}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}

            {/* コンテンツ */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-slate-50 mb-2">
                {work.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                {work.description}
              </p>

              {/* タグ */}
              <div className="flex flex-wrap gap-2 mb-4">
                {work.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 rounded border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* リンク */}
              <div className="flex gap-3">
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>サイト</span>
                  </a>
                )}
                {work.github && (
                  <a
                    href={work.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
