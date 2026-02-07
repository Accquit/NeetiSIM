import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
// FORCE UPDATE: 2026-02-07T17:40:00
const genAI = new GoogleGenerativeAI("AIzaSyBpMvZt3zdZM25fNkIa9yBZHJy7JcmsgtY");

export interface AIResponse {
    policyTitle: string;
    description: string;
    estimatedImpact: string;
}

export const generatePolicyInsight = async (query: string, currentAQI: number): Promise<AIResponse> => {
    const modelsToTry = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
        try {
            console.log(`Attempting Gemini API with model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const prompt = `
            Act as an environmental policy expert for the NeetiSIM governance platform.
            Current AQI in the region is ${currentAQI} (Severe).
            
            User Scenario: "${query}"
            
            Generate a structured policy intervention.
            Return ONLY a JSON object with this exact format (no markdown):
            {
                "policyTitle": "Title of the policy",
                "description": "2-3 sentences explaining the implementation",
                "estimatedImpact": "Predicted impact stats (e.g., 'Reduces PM2.5 by 15%')"
            }
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Clean up markdown code blocks if present
            const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(jsonString);
        } catch (error: any) {
            console.warn(`Gemini API failed with ${modelName}:`, error.message);
            lastError = error;
            // Continue to next model if this one fails
        }
    }

    // If all models fail, fall back to SIMULATION mode for the demo
    console.warn("All Gemini models failed. Switching to Simulation Mode.", lastError);

    return generateMockResponse(query);
};

const generateMockResponse = (query: string): AIResponse => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('traffic') || lowerQuery.includes('car') || lowerQuery.includes('vehicle')) {
        return {
            policyTitle: "🤖 Intelligent Traffic Management System",
            description: "Implement AI-driven traffic signal synchronization to reduce idling time by 30%. Combine with congestion pricing during peak hours (8 AM - 11 AM). [Simulation Mode]",
            estimatedImpact: "Expected to reduce NO2 levels by 18% and AQI by ~25 points in high-traffic zones."
        };
    } else if (lowerQuery.includes('industry') || lowerQuery.includes('factory') || lowerQuery.includes('smoke')) {
        return {
            policyTitle: "🤖 Industrial Emission Cap & Trade",
            description: "Enforce real-time stack monitoring for all heavy industries. Introduce a carbon trading credit system to incentivize cleaner production methods. [Simulation Mode]",
            estimatedImpact: "Projected reduction of PM2.5 by 12% and SO2 by 20% within 6 months."
        };
    } else if (lowerQuery.includes('farm') || lowerQuery.includes('stubble') || lowerQuery.includes('burning')) {
        return {
            policyTitle: "🤖 Bio-Decomposer Subsidy Program",
            description: "Provide free Pusa bio-decomposer capsules to farmers for rapid stubble decomposition. Incentivize collection of crop residue for bio-gas plants. [Simulation Mode]",
            estimatedImpact: "Potential to reduce seasonal PM2.5 spikes by 40% during harvest season."
        };
    } else {
        return {
            policyTitle: "🤖 Comprehensive Clean Air Action Plan",
            description: "A multi-pronged approach focusing on increasing green cover, promoting EV adoption, and waste management reforms. [Simulation Mode]",
            estimatedImpact: "Long-term reduction of AQI by 15-20% depending on enforcement strictness."
        };
    }
};
