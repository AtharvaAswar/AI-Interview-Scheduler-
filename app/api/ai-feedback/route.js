import { Feedback_Prompt } from "@/services/Constants";
import { OpenAI } from "openai";

export async function POST(req) {

    const { conversation } = await req.json();
    const FinalPrompt = Feedback_Prompt.replace("{conversation}", JSON.stringify(conversation));

    try {
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY
        });

        const completion = await openai.chat.completions.create({
            model: google_Models,
            messages: [
                { role: "user", content: FinalPrompt }
            ],
        });

        return NextResponse.json(completion.choices[0].message);
        
    } catch (e) {

        console.log(e);
        return NextResponse.json(e);
    }
}