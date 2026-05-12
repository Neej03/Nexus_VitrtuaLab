import { motion } from 'motion/react';
import { ArrowRight, Beaker, Cpu, Globe, Rocket, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1000px] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
             <span className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-emerald-500/20">
              <Zap className="w-4 h-4" />
              <span>Next-Gen Interactive Labs</span>
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Experience Science in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 animate-gradient-x">
              Immersive 3D
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
          >
            Conduct advanced physics, chemistry, and biology experiments safely from your browser. 
            Powered by real-time physics and high-fidelity rendering.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link 
              to="/labs"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] flex items-center space-x-2"
            >
              <span>Explore Labs</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Globe className="w-8 h-8 text-cyan-400" />}
            title="Real-Time Simulation"
            description="High-fidelity physics and chemical reactions rendered directly in your browser."
            delay={0.4}
          />
          <FeatureCard 
            icon={<Cpu className="w-8 h-8 text-emerald-400" />}
            title="Custom 3D Models"
            description="Import your own .obj or .gltf files to visualize custom scientific equipment directly in the workspace."
            delay={0.5}
          />
          <FeatureCard 
            icon={<Rocket className="w-8 h-8 text-purple-400" />}
            title="Safe Exploration"
            description="Dangerous voltages and corrosive acids are all contained safely in the virtual environment."
            delay={0.6}
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group"
    >
      <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
