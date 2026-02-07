import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center px-6">
            {/* Background Ambience - Organic Blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob opacity-50"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 opacity-50"></div>
            <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000 opacity-50"></div>

            <div className="relative max-w-5xl mx-auto text-center z-10">
                {/* Subtle Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-sm font-medium tracking-wide text-slate-300">Live Policy Simulation Engine v1.0</span>
                </div>

                {/* Heading - Split line for impact */}
                <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-[0.9] tracking-tighter animate-slide-up">
                    <span className="block text-slate-100">Simulate Impact.</span>
                    <span className="block text-gradient-accent">Shape the Future.</span>
                </h1>

                {/* Subtitle - Better typography */}
                <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-slide-up" style={{ animationDelay: '100ms' }}>
                    Decision intelligence for climate policy. Compare outcomes with
                    <span className="text-slate-200 font-normal"> real-time data</span> and
                    <span className="text-slate-200 font-normal"> predictive ML models</span>.
                </p>

                {/* CTAs - Using new button classes */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn-primary"
                    >
                        Launch Dashboard
                    </button>

                    <button
                        onClick={() => navigate('/simulator')}
                        className="btn-glass group"
                    >
                        Run Simulation
                        <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </button>
                </div>

                {/* Social Proof / Tech Stack - Minimalist */}
                <div className="mt-24 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-50 animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <span className="text-sm font-mono tracking-widest uppercase">Powered By</span>
                    <span className="font-display font-bold">TensorFlow</span>
                    <span className="font-display font-bold">React</span>
                    <span className="font-display font-bold">Python</span>
                </div>
            </div>
        </div>
    );
}
