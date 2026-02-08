import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCFPRTBaK1eS4BkIbSXR4eah2jW27MmLwg");

async function testKey() {
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];

    console.log("🔑 Testing API Key: AIzaSyCFPRTBaK1eS4BkIbSXR4eah2jW27MmLwg\n");

    for (const modelName of models) {
        try {
            console.log(`🧪 Testing: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello in one word");
            const response = await result.response;
            console.log(`✅ SUCCESS! Model ${modelName} works!`);
            console.log(`   Response: "${response.text()}"\n`);
            console.log(`\n🎉🎉🎉 API KEY IS VALID! Best model: ${modelName} 🎉🎉🎉\n`);
            return true;
        } catch (error) {
            console.log(`❌ Failed: ${error.message}\n`);
        }
    }

    console.log("\n❌ API KEY FAILED - None of the models work\n");
    return false;
}

testKey();
