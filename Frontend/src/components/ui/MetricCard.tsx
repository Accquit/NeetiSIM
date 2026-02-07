export default function MetricCard({ label, value, unit, status, large = false }: any) {
    return (
        <div className={`glass-card rounded-2xl p-6 ${large ? 'col-span-2' : ''} group hover:bg-slate-800/60 transition-colors cursor-default`}>
            <div className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                {label}
            </div>
            <div className="flex items-baseline gap-2">
                <div className={`font-display font-bold text-white group-hover:scale-105 transition-transform duration-300 origin-left ${large ? 'text-6xl' : 'text-4xl'}`}>
                    {value}
                </div>
                {unit && <div className="text-slate-500 font-medium">{unit}</div>}
            </div>

            {status && (
                <div className="mt-4 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${status === 'good' ? 'bg-emerald-400' :
                            status === 'moderate' ? 'bg-amber-400' : 'bg-red-400'
                        }`}></span>
                    <span className={`text-sm font-medium ${status === 'good' ? 'text-emerald-400' :
                            status === 'moderate' ? 'text-amber-400' : 'text-red-400'
                        }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)} Quality
                    </span>
                </div>
            )}
        </div>
    );
}
