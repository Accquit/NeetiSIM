// API Response Types
export interface City {
    id: string;
    name: string;
}

export interface Policy {
    id: string;
    name: string;
    description: string;
}

export interface AQIData {
    aqi: number;
    pm25: number;
    no2: number;
}

export interface TrendData {
    day: string;
    aqi: number;
}

export interface BaselineData {
    city: string;
    baseline: AQIData & {
        trend: TrendData[];
    };
}

export interface SimulationResult {
    before: AQIData;
    after: AQIData;
    impactScore?: number;
}

export interface ComparisonResult {
    policyA: {
        after: AQIData;
        impactScore: number;
    };
    policyB: {
        after: AQIData;
        impactScore: number;
    };
    winner: 'A' | 'B';
    recommendation: {
        policy: string;
        reasons: string[];
    };
}

// Component Props Types
export interface MetricCardProps {
    label: string;
    value: number | string;
    unit?: string;
    status?: 'good' | 'moderate' | 'poor';
    large?: boolean;
}

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}
