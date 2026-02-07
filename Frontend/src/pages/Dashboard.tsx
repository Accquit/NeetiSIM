import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../components/ui/MetricCard';
import AQIChart from '../components/charts/AQIChart';
import { api } from '../services/api';
import type { BaselineData } from '../types';

export default function Dashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState<BaselineData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const result = await api.getBaselineData('delhi');
            setData(result);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getHealthStatus = (aqi: number): 'good' | 'moderate' | 'poor' => {
        if (aqi <= 100) return 'good';
        if (aqi <= 200) return 'moderate';
        return 'poor';
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <div className="text-sm font-medium tracking-widest uppercase text-slate-500 animate-pulse">Initializing Data Stream...</div>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const healthStatus = getHealthStatus(data.baseline.aqi);

    return (
        <div className="relative min-h-[calc(100vh-80px)] p-6 md:p-12 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>

            <div className="relative max-w-7xl mx-auto z-10">
                {/* Header - Asymmetric Layout */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-slide-up">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">Live Monitoring</span>
                        </div>
                        <h2 className="text-5xl font-display font-bold text-white mb-2">
                            Delhi NCR
                        </h2>
                        <p className="text-slate-400 text-lg font-light">
                            Real-time air hygiene analysis and predictive modeling.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/simulator')}
                        className="btn-primary"
                    >
                        Run New Simulation
                    </button>
                </div>

                {/* Metrics Grid - Masonry-ish feel */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <MetricCard
                        label="Current AQI"
                        value={data.baseline.aqi}
                        status={healthStatus}
                        large
                    />
                    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:bg-slate-800/60 transition-colors">
                        <div className="text-sm font-mono text-slate-400 uppercase tracking-widest">PM2.5 Conc.</div>
                        <div className="text-4xl font-display font-bold text-white group-hover:text-accent transition-colors">
                            {data.baseline.pm25} <span className="text-lg text-slate-500 font-normal">µg/m³</span>
                        </div>
                    </div>
                    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:bg-slate-800/60 transition-colors">
                        <div className="text-sm font-mono text-slate-400 uppercase tracking-widest">NO₂ Levels</div>
                        <div className="text-4xl font-display font-bold text-white group-hover:text-accent-purple transition-colors">
                            {data.baseline.no2} <span className="text-lg text-slate-500 font-normal">µg/m³</span>
                        </div>
                    </div>
                    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-white/5 to-white/0">
                        <div className="text-sm font-mono text-slate-400 uppercase tracking-widest">Health Impact</div>
                        <div className={`text-2xl font-display font-bold ${healthStatus === 'good' ? 'text-emerald-400' :
                                healthStatus === 'moderate' ? 'text-amber-400' : 'text-red-400'
                            }`}>
                            {healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)} Risk
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="glass-card rounded-3xl p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-display font-bold text-white">7-Day Trend Analysis</h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-slate-300">AQI</span>
                            <span className="px-3 py-1 rounded-full bg-transparent border border-white/10 text-xs font-medium text-slate-500">PM2.5</span>
                        </div>
                    </div>
                    <AQIChart data={data.baseline.trend} height={350} />
                </div>
            </div>
        </div>
    );
}
