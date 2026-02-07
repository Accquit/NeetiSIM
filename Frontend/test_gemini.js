import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBpMvZt3zdZM25fNkIa9yBZHJy7JcmsgtY");

async function test() {
    try {
        console.log("Testing gemini-pro...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const resultPro = await modelPro.generateContent("Hello, are you there?");
        console.log("gemini-pro Success:", resultPro.response.text());
    } catch (e) {
        console.log("gemini-pro Failed:", e.message);
    }

    try {
        console.log("Testing gemini-1.5-flash...");
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const resultFlash = await modelFlash.generateContent("Hello, are you there?");
        console.log("gemini-1.5-flash Success:", resultFlash.response.text());
    } catch (e) {
        console.log("gemini-1.5-flash Failed:", e.message);
    }
}

test();
