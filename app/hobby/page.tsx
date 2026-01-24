'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getHobbiesList } from '@/app/_libs/microcms';
import type { Hobby } from '@/app/_libs/microcms';
import Image from 'next/image';

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

export default function HobbyPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const data = await getHobbiesList({ orders: 'order' });
        setHobbies(data.contents);
      } catch (error) {
        console.error('Failed to fetch hobbies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHobbies();
  }, []);

  if (loading) {
    return (
      <main className="pt-16 px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center py-12 text-slate-500">
          読み込み中...
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 px-6 py-24 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
          趣味
        </h1>
        <p className="text-lg text-slate-400">
          私の趣味や興味について
        </p>
      </div>

      {hobbies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400 mb-2">まだ趣味が登録されていません</p>
          <p className="text-sm text-slate-500">
            microCMSで趣味を追加してください
          </p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {hobbies.map((hobby) => (
            <motion.div
              key={hobby.id}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-900/50"
            >
              {/* サムネイル */}
              {hobby.thumbnail && (
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={hobby.thumbnail.url}
                    alt={hobby.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}

              {/* コンテンツ */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-50 mb-4">
                  {hobby.title}
                </h2>
                <p className="text-slate-400 mb-4">
                  {hobby.description}
                </p>
                {hobby.content && (
                  <div 
                    className="text-slate-500 text-sm prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: hobby.content }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}
