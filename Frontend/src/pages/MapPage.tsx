import PollutionMap from '../components/charts/PollutionMap';

export default function MapPage() {
    return (
        <div className="min-h-[calc(100vh-80px)] p-6 md:p-12 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col">
                <div className="mb-8 animate-fade-in">
                    <h2 className="text-4xl font-display font-bold text-white mb-2">Live Pollution Monitor</h2>
                    <p className="text-slate-400">Real-time geospatial visualization of Air Quality Index across Delhi NCR.</p>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Map Area */}
                    <div className="lg:col-span-3 h-[600px] lg:h-auto animate-scale-in">
                        <PollutionMap aqi={287} />
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-1 space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <div className="glass-card p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">City Average</h3>
                            <div className="text-5xl font-display font-bold text-white mb-2">287</div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                Poor
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Hotspots</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center">
                                    <span className="text-sm text-slate-300">Anand Vihar</span>
                                    <span className="text-red-400 font-mono font-bold">450</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-sm text-slate-300">Punjabi Bagh</span>
                                    <span className="text-red-400 font-mono font-bold">410</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-sm text-slate-300">ITO</span>
                                    <span className="text-orange-400 font-mono font-bold">390</span>
                                </li>
                            </ul>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border border-white/10 bg-emerald-900/10">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Safest Zone</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-emerald-400">Dwarka</span>
                                <span className="text-emerald-400 font-mono text-xl">180</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
