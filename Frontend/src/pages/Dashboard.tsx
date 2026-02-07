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

    const loadData = async (city = 'delhi') => {
        setLoading(true);
        try {
            const result = await api.getBaselineData(city);
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
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 animate-slide-up">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">Live Monitoring</span>
                        </div>
                        <h2 className="text-5xl font-display font-bold text-white mb-2">
                            {data.city === 'mumbai' ? 'Mumbai' : data.city === 'bangalore' ? 'Bangalore' : 'Delhi NCR'}
                        </h2>
                        <p className="text-slate-400 text-lg font-light">
                            Real-time air hygiene analysis and predictive modeling.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <select
                                value={data.city}
                                onChange={(e) => loadData(e.target.value)}
                                className="appearance-none bg-slate-900 border border-white/10 rounded-xl px-6 py-3 pr-12 text-white font-medium focus:outline-none focus:border-accent transition-all cursor-pointer shadow-lg hover:bg-slate-800"
                            >
                                <option value="delhi">📍 New Delhi</option>
                                <option value="mumbai">📍 Mumbai</option>
                                <option value="bangalore">📍 Bangalore</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                ▼
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/simulator')}
                            className="btn-primary"
                        >
                            Run New Simulation
                        </button>
                    </div>
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

                {/* Chart Section Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 glass-card rounded-3xl p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-display font-bold text-white">7-Day Trend Analysis</h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-slate-300">AQI</span>
                            </div>
                        </div>
                        <AQIChart data={data.baseline.trend} height={350} />
                    </div>

                    {/* New Projection Graph (5-Year Forecast) */}
                    <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                        <div className="glass-card p-6 rounded-3xl h-full border border-white/5 relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 opacity-50">
                                <svg className="w-16 h-16 text-indigo-500/20" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-6">AI Projection (2025-2030)</h3>

                            <div className="space-y-4 flex-1">
                                {[2025, 2026, 2027, 2028, 2029, 2030].map((year, i) => {
                                    // Mock projection math for UI
                                    const val = Math.max(50, data.baseline.aqi * (1 - (i + 1) * 0.08));
                                    const percent = (val / 400) * 100;
                                    return (
                                        <div key={year} className="flex items-center gap-4">
                                            <span className="text-xs font-mono text-slate-500 w-10">{year}</span>
                                            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${percent}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-bold text-white w-8 text-right">{val.toFixed(0)}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    <span className="text-indigo-400 font-bold">Insight:</span> Based on current budget allocation, AQI is projected to decrease significantly over the next 5 years.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
