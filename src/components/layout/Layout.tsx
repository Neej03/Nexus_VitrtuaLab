import { Outlet, Link } from 'react-router-dom';
import { FlaskConical, Microscope } from 'lucide-react';
import { ReactNode } from 'react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-emerald-500/10 p-2 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                <Microscope className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Nexus VirtuaLab
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/labs" icon={<FlaskConical className="w-4 h-4" />}>Laboratories</NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({ to, children, icon }: { to: string; children: ReactNode; icon: ReactNode }) {
  return (
    <Link 
      to={to} 
      className="flex items-center space-x-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
