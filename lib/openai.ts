import OpenAi from "openai";

export const clientOpenAi = new OpenAi({
    apiKey: process.env.OPENAI_KEY
})
