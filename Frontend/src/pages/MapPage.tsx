import { useState, useEffect } from 'react';
import PollutionMap from '../components/charts/PollutionMap';
import { api } from '../services/api';

// Replicating base values from PollutionMap to ensure consistency across the UI
const GLOBAL_BASE = 287;
const HOTSPOTS = [
    { name: "Anand Vihar", baseAqi: 450 },
    { name: "Punjabi Bagh", baseAqi: 360 },
    { name: "ITO", baseAqi: 310 },
];
const SAFEST = { name: "Dwarka", baseAqi: 180 };

export default function MapPage() {
    const [aqi, setAqi] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAQI = async () => {
            try {
                // Defaulting to Delhi for the map view
                const data = await api.getBaselineData('delhi');
                setAqi(data.baseline.aqi);
            } catch (error) {
                console.error("Failed to fetch map AQI", error);
                setAqi(287); // Fallback to base
            } finally {
                setLoading(false);
            }
        };

        fetchAQI();
    }, []);

    // Calculate dynamic values based on the ratio of current AQI to the base baseline
    const ratio = aqi / GLOBAL_BASE;

    const getScaledAqi = (base: number) => Math.round(base * ratio);
    const getStatus = (val: number) => {
        if (val <= 100) return { label: 'Good', color: 'text-emerald-400', dot: 'bg-emerald-500' };
        if (val <= 200) return { label: 'Moderate', color: 'text-amber-400', dot: 'bg-amber-500' };
        if (val <= 300) return { label: 'Poor', color: 'text-orange-400', dot: 'bg-orange-500' };
        if (val <= 400) return { label: 'Very Poor', color: 'text-red-400', dot: 'bg-red-500' };
        return { label: 'Severe', color: 'text-red-600', dot: 'bg-red-700' };
    }

    const cityStatus = getStatus(aqi);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

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
                        <PollutionMap aqi={aqi} />
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-1 space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <div className="glass-card p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">City Average</h3>
                            <div className="text-5xl font-display font-bold text-white mb-2">{aqi}</div>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 ${cityStatus.color} text-xs font-bold uppercase`}>
                                <span className={`w-2 h-2 rounded-full ${cityStatus.dot} animate-pulse`}></span>
                                {cityStatus.label}
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border border-white/10">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Hotspots</h3>
                            <ul className="space-y-4">
                                {HOTSPOTS.map(spot => {
                                    const val = getScaledAqi(spot.baseAqi);
                                    const status = getStatus(val);
                                    return (
                                        <li key={spot.name} className="flex justify-between items-center">
                                            <span className="text-sm text-slate-300">{spot.name}</span>
                                            <span className={`${status.color} font-mono font-bold`}>{val}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border border-white/10 bg-emerald-900/10">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Safest Zone</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-emerald-400">{SAFEST.name}</span>
                                <span className="text-emerald-400 font-mono text-xl">{getScaledAqi(SAFEST.baseAqi)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
