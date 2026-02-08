import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyD1oOZY3hVfFjiLBNF73hoeOqPlchjEHJE");

async function testKey() {
    const models = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    console.log("🔑 Testing API Key: AIzaSyD1oOZY3hVfFjiLBNF73hoeOqPlchjEHJE\n");

    for (const modelName of models) {
        try {
            console.log(`🧪 Testing: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello in one word");
            const response = await result.response;
            console.log(`✅ SUCCESS! Model ${modelName} works!`);
            console.log(`   Response: ${response.text()}\n`);
            console.log(`\n🎉 API KEY IS VALID! Use model: ${modelName}`);
            return true;
        } catch (error) {
            console.log(`❌ Failed: ${error.message}\n`);
        }
    }

    console.log("\n❌ API KEY FAILED - None of the models work with this key");
    return false;
}

testKey();
