import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Policy, ComparisonResult } from '../types';

export default function Comparison() {
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [policyA, setPolicyA] = useState('tree_cover');
    const [policyB, setPolicyB] = useState('ev_subsidy');
    const [comparison, setComparison] = useState<ComparisonResult | null>(null);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPolicies();
    }, []);

    useEffect(() => {
        if (policyA && policyB) {
            comparePolices();
        }
    }, [policyA, policyB]);

    const loadPolicies = async () => {
        const data = await api.getPolicies();
        setPolicies(data);
    };

    const comparePolices = async () => {
        // setLoading(true);
        try {
            const data = await api.comparePolicies('delhi', policyA, policyB);
            setComparison(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // setLoading(false);
        }
    };

    // const getPolicyName = (id: string) => policies.find(p => p.id === id)?.name || id;

    const PolicyCard = ({
        policyId,
        setPolicyId,
        data,
        isWinner
    }: {
        policyId: string,
        setPolicyId: (id: string) => void,
        data?: { after: { aqi: number, pm25: number, no2: number }, impactScore: number },
        isWinner?: boolean
    }) => (
        <div className={`glass-card rounded-3xl p-8 relative transition-all duration-500 ${isWinner ? 'border-emerald-500/50 shadow-emerald-900/20' : ''}`}>
            {isWinner && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg z-10">
                    Most Effective
                </div>
            )}

            <div className="mb-6">
                <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                    Select Scenario
                </label>
                <div className="relative">
                    <select
                        value={policyId}
                        onChange={(e) => setPolicyId(e.target.value)}
                        className="w-full appearance-none bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors cursor-pointer text-sm"
                    >
                        {policies.map((policy) => (
                            <option key={policy.id} value={policy.id} className="bg-slate-900">
                                {policy.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">
                        ▼
                    </div>
                </div>
            </div>

            {data ? (
                <div className="space-y-6">
                    <div className="text-center py-6 border-b border-white/5">
                        <div className="text-5xl font-display font-bold text-white mb-2">{data.after.aqi}</div>
                        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Projected AQI</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-xl p-4 text-center">
                            <div className="text-xl font-bold text-slate-200">{data.after.pm25}</div>
                            <div className="text-xs text-slate-500 mt-1">PM2.5</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 text-center">
                            <div className="text-xl font-bold text-slate-200">{data.after.no2}</div>
                            <div className="text-xs text-slate-500 mt-1">NO₂</div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>Impact Score</span>
                            <span>{data.impactScore}/100</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${isWinner ? 'bg-emerald-500' : 'bg-slate-500'}`}
                                style={{ width: `${data.impactScore}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-48 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin"></div>
                </div>
            )}
        </div>
    );

    return (
        <div className="relative min-h-[calc(100vh-80px)] p-6 md:p-12 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>

            <div className="relative max-w-7xl mx-auto z-10">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Comparative Analysis
                    </h2>
                    <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto">
                        Evaluate distinct policy interventions side-by-side to determine the optimal strategy for emission reduction.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-11 gap-8 items-center">
                    {/* Left Policy */}
                    <div className="lg:col-span-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <PolicyCard
                            policyId={policyA}
                            setPolicyId={setPolicyA}
                            data={comparison?.policyA}
                            isWinner={comparison?.winner === 'A'}
                        />
                    </div>

                    {/* VS Badge */}
                    <div className="lg:col-span-1 flex justify-center py-4 lg:py-0 animate-scale-in z-20">
                        <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-display font-bold text-slate-500">
                            VS
                        </div>
                    </div>

                    {/* Right Policy */}
                    <div className="lg:col-span-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <PolicyCard
                            policyId={policyB}
                            setPolicyId={setPolicyB}
                            data={comparison?.policyB}
                            isWinner={comparison?.winner === 'B'}
                        />
                    </div>
                </div>

                {/* AI Recommendation */}
                {comparison && (
                    <div className="mt-12 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '400ms' }}>
                        <div className="glass-card rounded-2xl p-8 border border-accent/20 bg-accent/5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                                    ✨
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-2">AI Recommendation</h4>
                                    <p className="text-slate-300 mb-4 leading-relaxed">
                                        Based on multi-variable analysis, <span className="text-white font-semibold">{comparison.recommendation.policy}</span> appears to be the most effective intervention.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {comparison.recommendation.reasons.map((reason, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-slate-900/50 border border-white/5 text-xs text-slate-400">
                                                {reason}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
