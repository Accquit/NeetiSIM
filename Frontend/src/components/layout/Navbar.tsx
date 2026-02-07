import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-6 h-20">
                <div className="flex items-center justify-between h-full">
                    {/* Logo - Minimalist Type Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <span className="text-background font-bold text-xl font-display">N</span>
                        </div>
                        <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                            NeetiSIM
                        </span>
                    </Link>

                    {/* Navigation Links - Pill Style */}
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
                        {['/', '/dashboard', '/simulator', '/comparison'].map((path) => {
                            const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
                            const active = isActive(path);

                            return (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active
                                            ? 'bg-white text-background shadow-lg shadow-white/10'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
