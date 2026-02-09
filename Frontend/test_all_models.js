import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDn2WGPuKS4RV_gX7eDfL5AnCAHZJGKDvc");

async function testAllModels() {
    const models = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-1.0-pro",
        "gemini-1.5-flash-latest",
        "gemini-pro-vision"
    ];

    for (const modelName of models) {
        try {
            console.log(`\n🧪 Testing: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello");
            const response = await result.response;
            console.log(`✅ SUCCESS with ${modelName}:`, response.text());
            break; // Stop on first success
        } catch (error) {
            console.log(`❌ FAILED ${modelName}:`, error.message);
        }
    }
}

testAllModels();
