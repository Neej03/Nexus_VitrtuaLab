import { useState, useRef, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cylinder, Environment, ContactShadows, Float, Backdrop, PivotControls } from '@react-three/drei';
import { LineChart as LineChartIcon, Settings, ChevronLeft, CheckCircle2, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EXPERIMENTS } from '../data/experiments';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

function CustomModel({ url, type }: { url: string, type: 'gltf' | 'obj' }) {
  const Loader = type === 'gltf' ? GLTFLoader : OBJLoader;
  const model = useLoader(Loader as any, url);
  return (
    <PivotControls 
      anchor={[0, 0, 0]} 
      depthTest={false} 
      lineWidth={3} 
      scale={2}
      activeAxes={[true, true, true]}
    >
      <primitive object={type === 'gltf' ? (model as any).scene : model} />
    </PivotControls>
  );
}

function SimulationScene({ type, interactState, customModel, params }: { type: string, interactState: number, customModel?: { url: string, type: 'gltf' | 'obj'} | null, params: { speed: number, magnitude: number, envFactor: number } }) {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const spd = params.speed / 50;
      const mag = params.magnitude / 50;
      const env = params.envFactor / 50;

      if (customModel) {
        meshRef.current.rotation.y += 0.01 * spd;
      } else if (type === 'biology') {
        meshRef.current.rotation.y += 0.02 * spd;
      } else if (type === 'physics') {
        const t = (state.clock.elapsedTime * spd % 3);
        const progress = interactState / 100;
        if (progress > 0) {
           meshRef.current.position.x = -2 + (t * 1.5 * progress) * mag;
           meshRef.current.position.y = (t * 2 * progress) - (0.5 * 2 * t * t * progress) * env;
        }
      } else {
        meshRef.current.rotation.y += 0.01 * spd;
      }
    }
  });

  if (customModel) {
    return (
      <group ref={meshRef}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Suspense fallback={<Box args={[1, 1, 1]}><meshStandardMaterial color="#64748b" wireframe /></Box>}>
            <CustomModel url={customModel.url} type={customModel.type} />
          </Suspense>
        </Float>
      </group>
    );
  }

  const mag = params.magnitude / 50;
  const env = params.envFactor / 50;

  if (type === 'electronics') {
    return (
      <group>
        <Box args={[2 * env, 0.5, 3 * env]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} />
        </Box>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere ref={meshRef} args={[0.3 * mag, 32, 32]} position={[0, 0.5 * mag, 0]}>
            <meshStandardMaterial color={interactState > 0 ? "#eab308" : "#475569"} emissive="#eab308" emissiveIntensity={(interactState / 20) * mag} roughness={0.1} metalness={0.5} />
          </Sphere>
        </Float>
      </group>
    );
  }

  if (type === 'biology') {
    return (
      <group ref={meshRef}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          {Array.from({ length: 12 }).map((_, i) => {
            const y = (i - 5.5) * 0.4 * env;
            const angle = i * 0.6;
            return (
              <group key={i}>
                <Sphere args={[0.15 * mag, 32, 32]} position={[Math.cos(angle) * env, y, Math.sin(angle) * env]}>
                  <meshPhysicalMaterial color={i < (interactState/10) ? "#fb7185" : "#475569"} transmission={0.2} roughness={0.1} thickness={0.5} />
                </Sphere>
                <Sphere args={[0.15 * mag, 32, 32]} position={[-Math.cos(angle) * env, y, -Math.sin(angle) * env]}>
                  <meshPhysicalMaterial color={i < (interactState/10) ? "#60a5fa" : "#475569"} transmission={0.2} roughness={0.1} thickness={0.5} />
                </Sphere>
                <Cylinder args={[0.02 * mag, 0.02 * mag, 2 * env, 16]} position={[0, y, 0]} rotation={[Math.PI/2, 0, -angle]}>
                   <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
                </Cylinder>
              </group>
            );
          })}
        </Float>
      </group>
    );
  }

  if (type === 'physics') {
     return (
       <group>
         <Box args={[1 * mag, 1 * mag, 1 * mag]} position={[-2.5, 0, 0]}>
            <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} />
         </Box>
         <Sphere ref={meshRef} args={[0.2 * mag, 32, 32]} position={[-2, 0, 0]}>
            <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.8} />
         </Sphere>
         <Box args={[1 * env, 0.2, 1 * env]} position={[2, -1, 0]}>
            <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.1} />
         </Box>
       </group>
     );
  }

  if (type === 'cs') {
     return (
        <group ref={meshRef}>
          <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
            <Box args={[1 * mag, 1 * mag, 0.2]} position={[-1 * env, 0, 0]}>
              <meshStandardMaterial color={interactState > 50 ? "#10b981" : "#ef4444"} emissive={interactState > 50 ? "#10b981" : "#ef4444"} emissiveIntensity={0.5} />
            </Box>
            <Box args={[1 * mag, 1 * mag, 0.2]} position={[1 * env, 0, 0]}>
              <meshStandardMaterial color={interactState > 50 ? "#10b981" : "#ef4444"} emissive={interactState > 50 ? "#10b981" : "#ef4444"} emissiveIntensity={0.5} />
            </Box>
            <Cylinder args={[0.05, 0.05, 2 * env, 16]} position={[0, -1, 0]} rotation={[0, 0, Math.PI/2]}>
               <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
            </Cylinder>
            <Box args={[1 * mag, 1 * mag, 0.2]} position={[0, -2 * env, 0]}>
               <meshStandardMaterial color={interactState > 80 ? "#10b981" : "#475569"} emissive={interactState > 80 ? "#10b981" : "#000000"} emissiveIntensity={0.3} />
            </Box>
          </Float>
        </group>
     );
  }

  // Default / Chemistry
  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <Cylinder args={[0.8 * env, 1.2 * env, 2.5, 64]} position={[0, 0, 0]}>
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.95} 
            opacity={1} 
            roughness={0.05} 
            thickness={0.5}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1} 
          />
        </Cylinder>
        <Cylinder args={[0.75 * env, 1.15 * env, 2.4 * (interactState / 100) * mag, 64]} position={[0, -1.2 + (1.2 * (interactState / 100) * mag), 0]}>
          <meshPhysicalMaterial 
            color={interactState > 60 ? "#ec4899" : "#34d399"} 
            transmission={0.5}
            opacity={0.9}
            roughness={0.2}
            emissive={interactState > 60 ? "#ec4899" : "#000000"} 
            emissiveIntensity={env - 1} 
          />
        </Cylinder>
      </Float>
    </group>
  );
}

export default function SimulationWorkspace() {
  const { experimentId } = useParams();
  const lab = EXPERIMENTS.find(e => e.id === experimentId) || EXPERIMENTS[0];
  
  const [activeTab, setActiveTab] = useState<'data' | 'tools'>('data');
  
  const [simState, setSimState] = useState(10);
  const [dataPoints, setDataPoints] = useState<{time: number, value: number}[]>([{time: 0, value: 0}]);
  const [customModel, setCustomModel] = useState<{ url: string, type: 'gltf' | 'obj' } | null>(null);
  const [params, setParams] = useState({ speed: 50, magnitude: 50, envFactor: 50 });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    const type = (extension === 'gltf' || extension === 'glb') ? 'gltf' : (extension === 'obj' ? 'obj' : null);
    
    if (type) {
      if (customModel?.url) URL.revokeObjectURL(customModel.url);
      const url = URL.createObjectURL(file);
      setCustomModel({ url, type });
    } else {
      alert("Unsupported file format. Please upload .gltf, .glb, or .obj files.");
    }
  };

  const handleSimulateStep = () => {
    if (simState < 100) {
      const newState = simState + 20;
      setSimState(newState);
      setDataPoints(prev => [...prev, { time: prev.length * 5, value: Math.random() * newState }]);
    }
  };

  const getControlLabels = (type: string) => {
    switch (type) {
      case 'electronics': return { speed: 'Clock Rate', magnitude: 'Voltage', envFactor: 'Resistance' };
      case 'chemistry': return { speed: 'Drop Rate', magnitude: 'Concentration', envFactor: 'Temperature' };
      case 'physics': return { speed: 'Sim Speed', magnitude: 'Launch Velocity', envFactor: 'Gravity' };
      case 'biology': return { speed: 'Reaction Rate', magnitude: 'Reagent Amt', envFactor: 'Incubation Temp' };
      case 'cs': return { speed: 'Clock Speed', magnitude: 'Voltage (High)', envFactor: 'Signal Noise' };
      default: return { speed: 'Speed', magnitude: 'Magnitude', envFactor: 'Environmental Factor' };
    }
  };

  const labels = getControlLabels(lab.visualType);

  return (
    <div className="h-screen bg-slate-950 flex flex-col font-sans overflow-hidden">
      <header className="h-14 bg-slate-900 border-b border-white/10 flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center space-x-4">
          <Link to={`/labs/${experimentId}`} className="text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <h1 className="font-semibold text-white tracking-tight">{lab.title} Simulation</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Simulation Active</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative bg-slate-950">
          <Canvas camera={{ position: [0, 2, 7], fov: 45 }} shadows>
            <color attach="background" args={['#020617']} />
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
            <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
            <Environment preset="city" />
            <SimulationScene type={lab.visualType} interactState={simState} customModel={customModel} params={params} />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            <Backdrop floor={2} segments={20} position={[0, -2, -5]} scale={[50, 20, 10]}>
              <meshStandardMaterial color="#0f172a" />
            </Backdrop>
            <OrbitControls makeDefault maxPolarAngle={Math.PI / 2} minDistance={2} maxDistance={15} />
          </Canvas>

          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
            <div className="pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center space-x-4 shadow-xl">
              <button 
                onClick={() => setSimState(10)} 
                className="px-4 py-2 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={handleSimulateStep}
                disabled={simState >= 100}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-slate-950 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
              >
                Execute Next Step
              </button>
            </div>
            
            <div className="pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl flex flex-col items-end shadow-xl">
               <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Experiment Progress</span>
               <div className="flex items-center space-x-3">
                 <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-emerald-400 transition-all duration-500" 
                     style={{ width: `${simState}%` }}
                   />
                 </div>
                 <span className="text-sm font-bold text-white">{simState}%</span>
               </div>
            </div>
          </div>
        </div>

        <div className="w-[400px] bg-slate-900 border-l border-white/10 flex flex-col shrink-0">
          <div className="flex px-2 pt-2 border-b border-white/10 gap-1">
            <TabButton active={activeTab === 'data'} onClick={() => setActiveTab('data')} icon={<LineChartIcon className="w-4 h-4"/>}>Live Data</TabButton>
            <TabButton active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} icon={<Settings className="w-4 h-4"/>}>Instruments</TabButton>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0 relative">
            <AnimatePresence mode="wait">
              {activeTab === 'data' && (
                <motion.div 
                  key="data"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 p-4 flex flex-col"
                >
                  <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Live Telemetry</h3>
                  <div className="h-[250px] w-full bg-slate-950 rounded-xl border border-white/5 p-4 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dataPoints}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                          itemStyle={{ color: '#34d399' }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} dot={{ fill: '#0f172a', stroke: '#34d399', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 rounded-xl p-4 border border-white/5">
                      <div className="text-xs text-slate-400 mb-1">Peak Value</div>
                      <div className="text-2xl font-mono text-cyan-400">
                        {Math.max(...dataPoints.map(d => d.value)).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-white/5">
                      <div className="text-xs text-slate-400 mb-1">Status</div>
                      <div className="text-sm font-bold text-emerald-400 flex items-center mt-1">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Normal
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'tools' && (
                <motion.div 
                  key="tools"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 p-4 overflow-y-auto"
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                      <h3 className="font-medium text-slate-200 mb-4">{lab.title} Parameters</h3>
                      <div className="space-y-4">
                         <ParamSlider label={labels.speed} value={params.speed} onChange={(v) => setParams(p => ({...p, speed: v}))} />
                         <ParamSlider label={labels.magnitude} value={params.magnitude} onChange={(v) => setParams(p => ({...p, magnitude: v}))} />
                         <ParamSlider label={labels.envFactor} value={params.envFactor} onChange={(v) => setParams(p => ({...p, envFactor: v}))} />
                      </div>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-200">Recording</span>
                        <div className="w-8 h-4 bg-slate-700 rounded-full group-hover:bg-emerald-500/20 transition-colors relative">
                          <div className="absolute left-1 top-1 w-2 h-2 rounded-full bg-slate-400 group-hover:bg-emerald-400 transition-colors" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">Auto-record experimental data output.</p>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-200">Import Custom Model</span>
                        <Upload className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-xs text-slate-400 mb-4">Upload a .gltf, .glb, or .obj file to visualize.</p>
                      <input 
                        type="file" 
                        accept=".gltf,.glb,.obj" 
                        onChange={handleFileUpload}
                        className="block w-full text-xs text-slate-400
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-xs file:font-bold
                          file:bg-emerald-500/10 file:text-emerald-400
                          hover:file:bg-emerald-500/20 transition-colors cursor-pointer"
                      />
                      {customModel && (
                        <button
                          onClick={() => {
                            if (customModel.url) URL.revokeObjectURL(customModel.url);
                            setCustomModel(null);
                          }}
                          className="mt-4 px-4 py-2 w-full text-xs font-bold text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors border border-red-400/20"
                        >
                          Remove Custom Model
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

function TabButton({ active, onClick, children, icon }: { active: boolean, onClick: () => void, children: React.ReactNode, icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 flex items-center justify-center space-x-2 text-xs font-bold transition-all border-b-2 ${
        active 
          ? 'border-emerald-400 text-emerald-400 bg-emerald-400/5' 
          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

function ParamSlider({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="space-y-2 text-white">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-slate-400">{label}</span>
        <span className="text-emerald-400">{value}%</span>
      </div>
      <input 
        type="range" 
        min="1" 
        max="100" 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
      />
    </div>
  );
}
