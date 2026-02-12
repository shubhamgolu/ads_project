import { NextRequest, NextResponse } from "next/server";
import { replicate } from "@/lib/replicate";
export async function POST(req: NextRequest) {
    const { imageUrl,imageToVideoPrompt,uid } = await req.json();

    const input = {
    image: imageUrl,
    prompt: imageToVideoPrompt,
};

    const output = await replicate.run("wan-video/wan-2.2-i2v-fast", { input });
// @ts-ignore
    console.log(output.url);
    // @ts-ignore
    return NextResponse.json(output.url);

}