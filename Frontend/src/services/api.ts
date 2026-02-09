import type { BaselineData, Policy, SimulationResult, ComparisonResult } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Service
const policyLabels: Record<string, string> = {
    tree_cover: "Tree Cover",
    ev_subsidy: "EV Subsidy",
    cool_roofs: "Cool Roofs",
    public_transport: "Public Transport"
};

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
        // Map city IDs to coordinates
        const cityCoords: Record<string, { lat: number, lon: number }> = {
            'delhi': { lat: 28.61, lon: 77.23 },
            'mumbai': { lat: 19.07, lon: 72.87 },
            'bangalore': { lat: 12.97, lon: 77.59 }
        };

        const coords = cityCoords[cityId] || cityCoords['delhi'];

        try {
            // Fetch live data from our backend, which proxies OpenMeteo
            // Use environment variable for API URL in production
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${API_URL}/live-aqi?lat=${coords.lat}&lon=${coords.lon}`);
            if (!response.ok) throw new Error('Backend offline');

            const data = await response.json();

            return {
                city: cityId,
                baseline: {
                    aqi: data.aqi,
                    pm25: data.pm2_5,
                    no2: data.no2,
                    trend: [
                        // Mock trend based on current live value for visualization
                        { day: 'Mon', aqi: Math.max(0, data.aqi - 15) },
                        { day: 'Tue', aqi: Math.max(0, data.aqi - 5) },
                        { day: 'Wed', aqi: Math.max(0, data.aqi + 10) },
                        { day: 'Thu', aqi: Math.max(0, data.aqi + 5) },
                        { day: 'Fri', aqi: Math.max(0, data.aqi + 20) },
                        { day: 'Sat', aqi: Math.max(0, data.aqi - 10) },
                        { day: 'Sun', aqi: Math.max(0, data.aqi - 20) },
                    ],
                },
            };
        } catch (error) {
            console.error("Failed to fetch live data, falling back to mock:", error);

            // Fallback Mock Data
            const cityBaselines: Record<string, any> = {
                'delhi': { aqi: 287, pm25: 140, no2: 65 },
                'mumbai': { aqi: 165, pm25: 85, no2: 45 },
                'bangalore': { aqi: 110, pm25: 45, no2: 30 }
            };
            const base = cityBaselines[cityId] || cityBaselines['delhi'];

            return {
                city: cityId,
                baseline: {
                    aqi: base.aqi,
                    pm25: base.pm25,
                    no2: base.no2,
                    trend: [
                        { day: 'Mon', aqi: base.aqi - 15 },
                        { day: 'Tue', aqi: base.aqi - 5 },
                        { day: 'Wed', aqi: base.aqi + 10 },
                        { day: 'Thu', aqi: base.aqi + 5 },
                        { day: 'Fri', aqi: base.aqi + 20 },
                        { day: 'Sat', aqi: base.aqi - 10 },
                        { day: 'Sun', aqi: base.aqi - 20 },
                    ],
                },
            };
        }
    },

    async getProjectedAQI(cityId: string, policyId: string, budget: number): Promise<{ year: number, aqi: number }[]> {
        await delay(600);
        // Mock projection logic
        const startAQI = cityId === 'delhi' ? 287 : cityId === 'mumbai' ? 165 : 110;
        const reductionRate = (budget / 2000) * 0.5; // Simple mock formula

        const data = [];
        let currentAQI = startAQI;
        for (let year = 2024; year <= 2029; year++) {
            data.push({ year, aqi: Math.round(currentAQI) });
            currentAQI = currentAQI * (1 - reductionRate);
        }
        return data;
    },

    async simulatePolicy(cityId: string, policyId: string, budget: number): Promise<SimulationResult> {
        // ... (keep existing logic but use cityId if needed in future)
        return this.simulatePolicyMock(cityId, policyId, budget);
    },

    // KEEPING MOCK AS FALLBACK JUST IN CASE
    async simulatePolicyMock(cityId: string, _policyId: string, budget: number): Promise<SimulationResult> {
        await delay(800);
        const cityBaselines: Record<string, any> = {
            'delhi': { aqi: 287, pm25: 140, no2: 65 },
            'mumbai': { aqi: 165, pm25: 85, no2: 45 },
            'bangalore': { aqi: 110, pm25: 45, no2: 30 }
        };
        const baseline = cityBaselines[cityId] || cityBaselines['delhi'];

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

    async comparePolicies(cityId: string, policyA: string, policyB: string, budget: number): Promise<ComparisonResult> {
        // ... (Mock comparison)
        return this.comparePoliciesMock(cityId, policyA, policyB, budget);
    },

    async comparePoliciesMock(_cityId: string, _policyA: string, _policyB: string, budget: number): Promise<ComparisonResult> {
        await delay(1000);

        // Simple mock logic that scales with budget
        const factor = (budget / 100);

        const resultA = {
            after: { aqi: Math.max(50, 145 - factor * 5), pm25: 76, no2: 38 },
            impactScore: Math.min(99, 22 + factor * 2),
        };

        const resultB = {
            after: { aqi: Math.max(50, 152 - factor * 6), pm25: 81, no2: 40 },
            impactScore: Math.min(99, 19 + factor * 2.5),
        };

        return {
            policyA: resultA as any,
            policyB: resultB as any,
            winner: resultA.impactScore > resultB.impactScore ? 'A' : 'B',
            recommendation: {
                policy: 'Increase Tree Cover',
                reasons: [
                    'Reduces AQI by significantly compared to baseline',
                    'Most cost-effective per unit of AQI reduction',
                ],
            },
        };
    },
};
