import OpenAi from "openai";

export const clientOpenAiImage = new OpenAi({
    apiKey: process.env.OPENAI_KEY1
})
