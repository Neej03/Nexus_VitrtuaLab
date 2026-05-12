import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Beaker, Bolt, Dna, FlaskConical, Microscope, Orbit } from 'lucide-react';
import { EXPERIMENTS } from '../data/experiments';

const categoryIcons: Record<string, React.ReactNode> = {
  'Electronics': <Bolt className="w-6 h-6 text-yellow-400" />,
  'Chemistry': <FlaskConical className="w-6 h-6 text-emerald-400" />,
  'Physics': <Orbit className="w-6 h-6 text-cyan-400" />,
  'Biology': <Dna className="w-6 h-6 text-rose-400" />,
  'Computer Science': <Beaker className="w-6 h-6 text-purple-400" />
};

export default function LabCategories() {
  const [filter, setFilter] = useState('All');

  const filteredLabs = filter === 'All' ? EXPERIMENTS : EXPERIMENTS.filter(l => l.category === filter);
  const categories = ['All', ...Array.from(new Set(EXPERIMENTS.map(l => l.category)))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Virtual Laboratories</h1>
          <p className="text-slate-400">Select an experiment to begin your hands-on simulation.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab, i) => (
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link 
              to={`/labs/${lab.id}`}
              className="block h-full bg-slate-900 border border-white/10 hover:border-emerald-500/50 rounded-2xl p-6 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  {categoryIcons[lab.category] || <Microscope className="w-6 h-6 text-slate-400" />}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  lab.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                  lab.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-rose-500/10 text-rose-400'
                }`}>
                  {lab.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {lab.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                {lab.description}
              </p>
              
              <div className="flex items-center text-emerald-400 text-sm font-medium">
                Enter Laboratory
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
