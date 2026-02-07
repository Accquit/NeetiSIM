import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState(0);

    // Auto-rotate the holographic cards
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-[calc(100vh-80px)] overflow-hidden flex items-center">
            {/* Background: Cyber Grid & Glow */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)]"></div>

            <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Editorial Typography */}
                <div className="space-y-8 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-mono font-medium tracking-widest text-emerald-400 uppercase">System Online</span>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-display font-bold leading-[0.9] tracking-tighter text-white">
                        Neeti<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-purple to-accent">SIM</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 font-light max-w-lg leading-relaxed">
                        Next-generation policy simulation engine.
                        <span className="block mt-2 text-white font-medium">Predict. Visualize. Solve.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Launch Console <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </button>

                        <button
                            onClick={() => navigate('/simulator')}
                            className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium hover:bg-white/10 transition-colors"
                        >
                            Run Simulation
                        </button>
                    </div>

                    <div className="flex items-center gap-8 pt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-slate-800 relative z-0" /> // Placeholders for avatars/tech icons
                            ))}
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                            TRUSTED BY <br /> GOVERNMENT AGENCIES
                        </div>
                        {/* New Map Link for Quick Access */}
                        <button onClick={() => navigate('/map')} className="text-xs font-mono text-accent hover:text-white transition-colors cursor-pointer ml-auto border-b border-accent/30 hover:border-white">
                            VIEW LIVE MAP →
                        </button>
                    </div>
                </div>

                {/* Right: Holographic Stack (Restored) */}
                <div className="relative h-[600px] hidden lg:flex items-center justify-center perspective-[2000px]">

                    {/* Floating Cards Container */}
                    <div className="relative w-96 h-[500px] transform-style-3d rotate-y-[-12deg] rotate-x-[5deg]">

                        {/* Card 1: Map Layer (Back) */}
                        <div className={`absolute inset-0 rounded-3xl p-6 border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl transition-all duration-1000 ease-out transform ${activeCard === 0 ? 'translate-z-[100px] scale-105 z-30 border-primary/50' : 'translate-z-[0px] scale-95 z-10 opacity-60'}`}>
                            <div className="h-full flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-xs font-mono text-slate-500 uppercase">Geospatial Data</div>
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                </div>
                                <div className="flex-1 rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden group">
                                    {/* Fake Map Grid */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-ping"></div>
                                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full"></div>
                                </div>
                                <div className="mt-4">
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-[75%] animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-between text-xs mt-2 text-slate-400">
                                        <span>Hotspot Analysis</span>
                                        <span>75% Critical</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Analytics (Middle) */}
                        <div className={`absolute inset-0 rounded-3xl p-6 border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl transition-all duration-1000 ease-out transform ${activeCard === 1 ? 'translate-z-[100px] scale-105 z-30 border-accent/50' : 'translate-z-[50px] translate-x-[20px] -translate-y-[20px] scale-95 z-20 opacity-80'}`}>
                            <div className="h-full flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-xs font-mono text-slate-500 uppercase">Predictive Model</div>
                                    <div className="text-accent font-bold">98%</div>
                                </div>
                                <div className="flex-1 flex items-end justify-between gap-2 pb-4">
                                    {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                                        <div key={i} className="w-full bg-gradient-to-t from-accent/20 to-accent rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                        <span className="text-sm text-slate-300">AQI Trend</span>
                                        <span className="text-emerald-400 font-mono text-sm">↓ 24%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                        <span className="text-sm text-slate-300">Health Impact</span>
                                        <span className="text-accent font-mono text-sm">+ Good</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Policy Engine (Front/Bottom) */}
                        <div className={`absolute inset-0 rounded-3xl p-6 border border-white/10 bg-indigo-950/60 backdrop-blur-xl shadow-2xl transition-all duration-1000 ease-out transform ${activeCard === 2 ? 'translate-z-[100px] scale-105 z-30 border-purple-500/50' : 'translate-z-[20px] translate-x-[-20px] translate-y-[20px] scale-95 z-10 opacity-70'}`}>
                            <div className="h-full flex flex-col justify-center items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.5)] animate-pulse">
                                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Simulating...</h3>
                                <p className="text-slate-400 text-sm mb-6">Processing 1.5M data points across 12 sectors</p>
                                <div className="w-full bg-black/40 rounded-full h-12 flex items-center px-1">
                                    <div className="h-10 bg-purple-600 rounded-full w-2/3 flex items-center justify-center text-xs font-bold text-white tracking-widest shadow-lg">
                                        OPTIMIZING
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
