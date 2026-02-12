import { NextRequest, NextResponse } from "next/server";
import { replicate } from "@/lib/replicate";
export async function POST(req: NextRequest) {
   
    return NextResponse.json("oka");

}