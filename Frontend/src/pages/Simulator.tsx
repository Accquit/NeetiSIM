import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { Policy, SimulationResult } from '../types';

export default function Simulator() {
    const navigate = useNavigate();
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [selectedPolicy, setSelectedPolicy] = useState('');
    const [budget, setBudget] = useState(100);
    const [results, setResults] = useState<SimulationResult | null>(null);

    useEffect(() => {
        loadPolicies();
    }, []);

    useEffect(() => {
        if (selectedPolicy) {
            simulateEffect();
        } else {
            setResults(null);
        }
    }, [selectedPolicy, budget]);

    const loadPolicies = async () => {
        const data = await api.getPolicies();
        setPolicies(data);
    };

    const simulateEffect = async () => {
        // setLoading(true);
        try {
            const data = await api.simulatePolicy('delhi', selectedPolicy, budget);
            setResults(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // setLoading(false);
        }
    };

    const calculateChange = (before: number, after: number) => {
        const val = (after - before) / before * 100;
        const change = val.toFixed(1);
        return (val > 0 ? '+' : '') + change + '%';
    };

    return (
        <div className="relative min-h-[calc(100vh-80px)] p-6 md:p-12 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent-purple/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>

            <div className="relative max-w-7xl mx-auto z-10">
                <div className="mb-12 animate-slide-up">
                    <span className="text-sm font-mono text-primary uppercase tracking-widest mb-2 block">Experimental Mode</span>
                    <h2 className="text-5xl font-display font-bold text-white mb-4">Policy Simulator</h2>
                    <p className="text-slate-400 max-w-2xl font-light text-lg">
                        Adjust parameters to model future scenarios using our predictive engine.
                        Results update in real-time based on historical data patterns.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Controls Panel */}
                    <div className="lg:col-span-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <div className="glass-card rounded-3xl p-8 sticky top-24">
                            <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">01</span>
                                Configuration
                            </h3>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
                                        Select Policy Intervention
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedPolicy}
                                            onChange={(e) => setSelectedPolicy(e.target.value)}
                                            className="w-full appearance-none bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
                                        >
                                            <option value="" className="bg-slate-900">Choose an intervention...</option>
                                            {policies.map((policy) => (
                                                <option key={policy.id} value={policy.id} className="bg-slate-900">
                                                    {policy.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-4">
                                        <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest">
                                            Allocated Budget
                                        </label>
                                        <span className="text-2xl font-display font-bold text-accent">
                                            ₹{budget}<span className="text-sm text-slate-500 font-normal ml-1">Cr</span>
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="500"
                                        step="10"
                                        value={budget}
                                        onChange={(e) => setBudget(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent"
                                    />
                                    <div className="flex justify-between mt-2 text-xs text-slate-600 font-mono">
                                        <span>₹10 Cr</span>
                                        <span>₹500 Cr</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Visualizer */}
                    <div className="lg:col-span-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        {results ? (
                            <div className="space-y-6">
                                {/* Visual Comparison */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Before State */}
                                    <div className="glass-card rounded-3xl p-8 border-l-4 border-l-slate-700">
                                        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">Baseline State</div>
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-5xl font-display font-bold text-slate-300">{results.before.aqi}</span>
                                            <span className="text-sm text-slate-500">AQI</span>
                                        </div>
                                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-slate-500" style={{ width: `${(results.before.aqi / 500) * 100}%` }}></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                                            <div>
                                                <div className="text-xs text-slate-500 mb-1">PM2.5</div>
                                                <div className="text-xl font-bold text-slate-300">{results.before.pm25}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-500 mb-1">NO₂</div>
                                                <div className="text-xl font-bold text-slate-300">{results.before.no2}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* After State */}
                                    <div className="glass-card rounded-3xl p-8 border-l-4 border-l-emerald-500 bg-emerald-900/10">
                                        <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-6">Projected Outcome</div>
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-6xl font-display font-bold text-white tracking-tight">{results.after.aqi}</span>
                                            <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                                                {calculateChange(results.before.aqi, results.after.aqi)}
                                            </span>
                                        </div>
                                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: `${(results.after.aqi / 500) * 100}%` }}></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                                            <div>
                                                <div className="text-xs text-slate-400 mb-1">PM2.5</div>
                                                <div className="text-xl font-bold text-white">{results.after.pm25}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 mb-1">NO₂</div>
                                                <div className="text-xl font-bold text-white">{results.after.no2}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Impact Summary */}
                                <div className="glass-card rounded-3xl p-8">
                                    <h4 className="text-lg font-display font-bold text-white mb-4">Model Confidence & Impact</h4>
                                    <div className="flex items-center gap-6">
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm text-slate-400">Projected Efficiency</span>
                                                <span className="text-sm text-white font-bold">{results.impactScore}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-emerald-500 to-accent" style={{ width: `${results.impactScore}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-center">
                                            <div className="text-xs text-slate-500 uppercase">Confidence</div>
                                            <div className="text-lg font-bold text-white">High</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full min-h-[400px] glass-card rounded-3xl flex flex-col items-center justify-center p-8 text-center border-dashed border-2 border-slate-800">
                                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Ready to Simulate</h3>
                                <p className="text-slate-400 max-w-sm">
                                    Select a policy from the configuration panel to generate a predictive model for Delhi NCR.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 flex justify-end">
                    <button
                        onClick={() => navigate('/comparison')}
                        className="btn-glass group"
                    >
                        Compare Multiple Scenarios <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
