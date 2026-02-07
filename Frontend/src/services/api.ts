import type { BaselineData, Policy, SimulationResult, ComparisonResult } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Service
export const api = {
    async getCities() {
        await delay(300);
        return [
            { id: 'delhi', name: 'Delhi' },
            { id: 'mumbai', name: 'Mumbai' },
            { id: 'bangalore', name: 'Bangalore' },
        ];
    },

    async getPolicies(): Promise<Policy[]> {
        await delay(300);
        return [
            { id: 'tree_cover', name: 'Increase Tree Cover', description: 'Plant 10,000 trees' },
            { id: 'ev_subsidy', name: 'EV Subsidy Program', description: 'Subsidize electric vehicles' },
            { id: 'industrial_limits', name: 'Industrial Emission Limits', description: 'Stricter emission standards' },
            { id: 'public_transport', name: 'Expand Public Transport', description: 'Add metro lines and buses' },
        ];
    },

    async getBaselineData(cityId: string): Promise<BaselineData> {
        await delay(500);
        return {
            city: cityId,
            baseline: {
                aqi: 187,
                pm25: 98,
                no2: 45,
                trend: [
                    { day: 'Mon', aqi: 165 },
                    { day: 'Tue', aqi: 178 },
                    { day: 'Wed', aqi: 192 },
                    { day: 'Thu', aqi: 185 },
                    { day: 'Fri', aqi: 195 },
                    { day: 'Sat', aqi: 182 },
                    { day: 'Sun', aqi: 187 },
                ],
            },
        };
    },

    async simulatePolicy(_cityId: string, _policyId: string, budget: number): Promise<SimulationResult> {
        await delay(800);

        const baseline = { aqi: 187, pm25: 98, no2: 45 };
        const reductionFactor = (budget / 100) * 0.15;

        return {
            before: baseline,
            after: {
                aqi: Math.round(baseline.aqi * (1 - reductionFactor)),
                pm25: Math.round(baseline.pm25 * (1 - reductionFactor)),
                no2: Math.round(baseline.no2 * (1 - reductionFactor * 0.8)),
            },
            impactScore: Math.round((1 - (1 - reductionFactor)) * 100),
        };
    },

    async comparePolicies(_cityId: string, _policyA: string, _policyB: string): Promise<ComparisonResult> {
        await delay(1000);

        const resultA = {
            after: { aqi: 145, pm25: 76, no2: 38 },
            impactScore: 22,
        };

        const resultB = {
            after: { aqi: 152, pm25: 81, no2: 40 },
            impactScore: 19,
        };

        return {
            policyA: resultA,
            policyB: resultB,
            winner: 'A',
            recommendation: {
                policy: 'Increase Tree Cover',
                reasons: [
                    'Reduces AQI by 22% compared to baseline',
                    'Most cost-effective per unit of AQI reduction',
                    'Additional benefits: urban cooling, biodiversity',
                ],
            },
        };
    },
};
