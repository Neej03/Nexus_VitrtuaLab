import { useParams, Link } from 'react-router-dom';
import { Play, ClipboardList, AlertTriangle, GraduationCap, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { EXPERIMENTS } from '../data/experiments';

export default function ExperimentDetail() {
  const { experimentId } = useParams();
  const lab = EXPERIMENTS.find(e => e.id === experimentId) || EXPERIMENTS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/labs" className="text-emerald-500 hover:text-emerald-400 font-medium mb-8 inline-block">
        &larr; Back to Laboratories
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12"
      >
        <div className="flex items-center space-x-4 mb-6">
          <span className="px-3 py-1 bg-white/5 rounded-lg text-sm text-slate-300 font-medium">
            {lab.category}
          </span>
          <span className="px-3 py-1 bg-white/5 rounded-lg text-sm text-slate-300 font-medium">
            {lab.difficulty}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-6">{lab.title}</h1>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          {lab.description}
        </p>

        <div className="flex justify-start mb-12">
          <Link
            to={`/simulation/${lab.id}`}
            className="inline-flex bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 px-8 rounded-xl items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Launch Virtual Simulation</span>
          </Link>
        </div>

        <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              <span>Experiment Theory</span>
            </h3>
            <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl">
              <p className="text-slate-300 leading-relaxed text-base">
                {lab.theory}
              </p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <ClipboardList className="w-5 h-5 text-emerald-400" />
              <span>Procedure Overview</span>
            </h3>
            <ul className="space-y-4">
              {lab.steps.map((step: string, i: number) => (
                <li key={i} className="flex space-x-4 text-slate-400">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-slate-300">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <h3 className="text-lg font-bold text-amber-500 mb-2 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Safety Precautions</span>
              </h3>
              <p className="text-sm text-amber-500/80">
                Put on virtual safety goggles. Pay attention to warnings about dangerous simulated actions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-cyan-400 mb-2 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5" />
                <span>Learning Objectives</span>
              </h3>
              <ul className="text-sm text-cyan-400/80 list-disc list-inside space-y-1">
                <li>Understand core theoretical concepts.</li>
                <li>Familiarize with standard lab equipment.</li>
                <li>Analyze resulting data via generated graphs.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
