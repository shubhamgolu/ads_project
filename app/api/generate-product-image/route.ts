import { NextRequest, NextResponse } from "next/server";
import { imagekit } from "@/lib/imagekit";
import { clientOpenAi } from "@/lib/openai";
import { clientOpenAiImage} from "@/lib/openaiimage";
import { Upload } from "lucide-react";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";

const PROMPT = `Create a vibrant product showcase image featuring a uploaded image in the center, surrounded by dynamic splashes of liquid or relevant material that complement the product.Use a clean, colorful background to make the product stand out. Include subtle elements related to the product's flavor, ingredients, or theme floating around to add context and visual interest.
Ensure the product is sharp and in focus, with motion and energy conveyed through the splash effects. Also give me image to video prompt for same in JSON format: {
  "textToImage": "detailed image generation prompt here",
  "imageToVideo": "detailed image-to-video animation prompt here"
}`
export async function POST(req:NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;
    const size = formData.get('size') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const userEmail = formData.get('userEmail') as string;
   

    const userRef = collection(db, 'users');
    const q = query(userRef, where('email', '==', userEmail));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    const userInfo = userDoc.data()

    // Save to Database
    const docId = Date.now().toString();
    await  setDoc(doc(db, 'user-ads', docId), {
         userEmail:userEmail,
         status:"pending",
         description: description,
         size: size
    })
    // Upload Product Image
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = buffer.toString('base64');
    
    const imageKitRef = await imagekit.upload({
        file : base64File,
        fileName:Date.now()+".png",
        isPublished: true   

    })

    console.log(imageKitRef.url);

    // Generate Product Image Prompt using ChatGpt
     const response = await clientOpenAi.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { 
            role: 'user', 
            content: [
               
                {
                type: "input_text",
                text: PROMPT
                },
                 // @ts-ignore
                {
                    type: "input_image",
                    image_url: imageKitRef.url
                }
            ]
         },
      ],
    });

const textOutput=response.output_text?.trim();
    let json = JSON.parse(textOutput);
//   return NextResponse.json(json)

    // Generate Image Product
    const ImageResponse = await clientOpenAiImage.responses.create({
          model: "gpt-4.1-mini",
          max_output_tokens: 500,
          input: [
        { 
            role: 'user', 
            content: [
              
                {
                type: "input_text",
                  // @ts-ignore
                text: json?.textToImage
                },
                 // @ts-ignore
                {
                    type: "input_image",
                    image_url: imageKitRef.url
                }
            ]
         },
      ],
      tools:[{type:"image_generation"}]

    })
     console.log(ImageResponse.output);
    const imageData = ImageResponse.output?.
    filter((item:any) => item.type === "image_generation_call")
    .map((item:any) => item.result)

    const generatedImage = imageData[0];// base64 encoded image
   
    //  Upload Generated Image to Imagekit
    const uploadResult = await imagekit.upload({
        file :`data:image/png;base64,${generatedImage}`,
        fileName:`Generated-${Date.now()}.png`,
        isPublished: true
    })

    // Update Document
    await  updateDoc(doc(db, 'user-ads', docId), {
         finalProductImageUrl:uploadResult.url, // finalProcutImage
         productImageUrl :imageKitRef.url, // productImage
         status:"completed",
         userInfo:userInfo?.credits - 5,
         imageToVideoPrompt:json?.imageToVideo// imageToVideo
    })
return NextResponse.json(uploadResult)
}