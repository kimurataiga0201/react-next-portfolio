'use client';

import { motion } from 'framer-motion';
import { GitCommit, GitBranch, GitPullRequest } from 'lucide-react';
import { useState, useEffect } from 'react';

const GITHUB_USERNAME = 'kimurataiga0201';

interface Activity {
  id: string;
  type: 'commit' | 'branch' | 'pr';
  message: string;
  repo: string;
  date: string;
  time: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
  payload: {
    commits?: Array<{ message: string }>;
    ref?: string;
    ref_type?: string;
    pull_request?: {
      title: string;
    };
  };
}

const generateContributionsFromEvents = (events: GitHubEvent[]) => {
  const weeks = 12;
  const daysPerWeek = 7;
  const totalDays = weeks * daysPerWeek;
  
  const today = new Date();
  const dates: Date[] = [];
  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date);
  }
  
  const countByDate: { [key: string]: number } = {};
  events.forEach(event => {
    const eventDate = new Date(event.created_at).toISOString().split('T')[0];
    countByDate[eventDate] = (countByDate[eventDate] || 0) + 1;
  });
  
  const contributions = [];
  for (let week = 0; week < weeks; week++) {
    const weekData = [];
    for (let day = 0; day < daysPerWeek; day++) {
      const dateIndex = week * daysPerWeek + day;
      const date = dates[dateIndex].toISOString().split('T')[0];
      const count = countByDate[date] || 0;
      weekData.push(count);
    }
    contributions.push(weekData);
  }
  
  return contributions;
};

const getContributionColor = (count: number) => {
  if (count === 0) return 'bg-slate-800';
  if (count <= 2) return 'bg-emerald-900/50';
  if (count <= 4) return 'bg-emerald-700/70';
  if (count <= 6) return 'bg-emerald-500/80';
  return 'bg-emerald-400';
};

const getActivityIcon = (type: Activity['type']) => {
  if (type === 'commit') return GitCommit;
  if (type === 'branch') return GitBranch;
  if (type === 'pr') return GitPullRequest;
  return GitCommit;
};

const formatGitHubEvents = (events: GitHubEvent[]): Activity[] => {
  return events.slice(0, 6).map((event) => {
    const date = new Date(event.created_at);
    const dateStr = date.toISOString().split('T')[0];
    const timeStr = date.toTimeString().split(' ')[0].substring(0, 5);
    
    let message = '';
    let type: Activity['type'] = 'commit';
    
    if (event.type === 'PushEvent' && event.payload.commits && event.payload.commits.length > 0) {
      message = event.payload.commits[0].message;
      type = 'commit';
    } else if (event.type === 'CreateEvent') {
      message = `Created ${event.payload.ref_type}: ${event.payload.ref || 'new branch'}`;
      type = 'branch';
    } else if (event.type === 'PullRequestEvent' && event.payload.pull_request) {
      message = event.payload.pull_request.title;
      type = 'pr';
    } else {
      message = `${event.type.replace('Event', '')} activity`;
    }
    
    return {
      id: event.id,
      type,
      message,
      repo: event.repo.name,
      date: dateStr,
      time: timeStr,
    };
  });
};

export default function ActivitySection() {
  const [contributions, setContributions] = useState<number[][]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`);
        if (response.ok) {
          const data = await response.json();
          setActivities(formatGitHubEvents(data));
          setContributions(generateContributionsFromEvents(data));
        }
      } catch (error) {
        console.error('Failed to fetch GitHub activity:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGitHubActivity();
  }, []);

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
          最近の活動
        </h2>
        <p className="text-lg text-slate-400">
          最新のコミットとコントリビューション
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-slate-200 mb-6">
            コントリビューショングラフ（過去12週間）
          </h3>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            {contributions.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                読み込み中...
              </div>
            ) : (
            <div className="flex gap-1 overflow-x-auto pb-2">
              {contributions.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((count, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (weekIndex * 7 + dayIndex) * 0.005 }}
                      whileHover={{ scale: 1.2 }}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(count)} transition-all cursor-pointer`}
                      title={`${count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
            )}
            
            <div className="flex items-center gap-2 mt-6 text-xs text-slate-500">
              <span>少ない</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-slate-800" />
                <div className="w-3 h-3 rounded-sm bg-emerald-900/50" />
                <div className="w-3 h-3 rounded-sm bg-emerald-700/70" />
                <div className="w-3 h-3 rounded-sm bg-emerald-500/80" />
                <div className="w-3 h-3 rounded-sm bg-emerald-400" />
              </div>
              <span>多い</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-slate-200 mb-6">
            アクティビティタイムライン
          </h3>
          
          {loading ? (
            <div className="text-center py-12 text-slate-500">
              読み込み中...
            </div>
          ) : activities.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
              <p className="text-slate-400 mb-2">最近のアクティビティがありません</p>
              <p className="text-sm text-slate-500">
                後ほど再度ご確認ください
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-300" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300 font-medium mb-1">
                          {activity.message}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-mono">{activity.repo}</span>
                          <span>•</span>
                          <span>{activity.date}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
