import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TrendData } from '../../types';

interface AQIChartProps {
    data: TrendData[];
    height?: number;
}

export default function AQIChart({ data, height = 250 }: AQIChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis
                    dataKey="day"
                    stroke="#475569"
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                />
                <YAxis
                    stroke="#475569"
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        padding: '12px',
                        color: '#F8FAFC'
                    }}
                    cursor={{ stroke: 'rgba(56, 189, 248, 0.2)', strokeWidth: 2 }}
                />
                <Line
                    type="monotone"
                    dataKey="aqi"
                    stroke="#38BDF8"
                    strokeWidth={3}
                    dot={{ fill: '#0F172A', stroke: '#38BDF8', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 8, fill: '#38BDF8', stroke: '#fff', strokeWidth: 2 }}
                    fill="url(#colorAqi)"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
