"use client"; 
import React  from "react";
import { Input } from "@/components/ui/input";
import PreviewResult from "./PreviewResult";
import { ImagePlus, Loader2Icon, Monitor, Smartphone, Sparkle, Square } from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const sampleProduct = [
'/headphone.jpeg',
'/perfume.png',
'/sunglasses.png',
'/burger.jpeg',  
]

type Props = {
       onHandleInputChange: any,
       onGenerate:any
       loading?:boolean
    }

const FormInput = ({ onHandleInputChange,onGenerate,loading }: Props) => {

     const [preview, setPreview] = React.useState<string | null>(null);
     const onFileSelect = (files: FileList | null) => {
        if(!files || files.length === 0) return;
        const file = files[0];
        if(file.size >5 * 1024 * 1024) {
            alert("File size should be less than 5MB");
            return;
        }
        onHandleInputChange('file', file);
        setPreview(URL.createObjectURL(file))
    }

    
    return (
                 
    <div>   
        <div>       
            <h2 className="font-semibold">1. Upload Product Image</h2>
            <div>
                <label htmlFor="imageUpload" className="mt-2 border-dashed border-2 rounded-xl flex flex-col p-4 items-center justify-center min-h-[200px] cursor-pointer">
                  {!preview ? <div className="flex flex-col items-center gap-3">
                        <ImagePlus className="h-8 w-8 opacity-40"/>
                        <h2 className="text-xl">Click here to upload Image</h2>
                        <p className="opacity-45 ">File should be png, jpg, jpeg</p>
                    </div>
                   : <Image src={preview} alt="preview" width={100} height={100} className="w-full h-full object-cover"/>
                    }
                </label>
                 <Input type="file"  id="imageUpload" className="hidden" accept="image/*"  onChange={(e) => onFileSelect(e.target.files)}/>
            </div>
            {/* sample products */}
            <div>
                <h2 className="font-semibold">2. Select Sample Product</h2>
        
                    <div className="flex flex-wrap gap-5">
                    {sampleProduct.map((product, index) => (
                        <Image src={product} key={index}   alt={product} width={60} height={60} className="rounded-lg cursor-pointer hover:scale-110 transition-all"
                        
                        onClick={() => {
                             setPreview(product);
                            onHandleInputChange('ImageUrl', product)}}
                        />    
                    ))}
                           
                    </div>  
                
            </div>
            <div className="mt-8">
                <h2 className="font-semibold">3. Add Product Description</h2>
                <Textarea placeholder="Add Product Description" className="min-h-[150px] mt-2" onChange={(e) => onHandleInputChange('description', e.target.value)}></Textarea>
            </div>
            <div className="mt-8">
                <h2 className="font-semibold">3. Select Image Size</h2>
               <Select onValueChange={(value) => onHandleInputChange('size', value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Size" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="1024*1024">
        <div className="flex gap-2 items-center">
        <Square className="h-4 w-4"/>
        <span>1:1</span>
        </div>
      </SelectItem>
      <SelectItem value="1536*1024">
         <div className="flex gap-2 items-center">
        <Monitor className="h-4 w-4"/>
        <span>16:9</span>
        </div>
      </SelectItem>
      <SelectItem value="1024*1536">
         <div className="flex gap-2 items-center">
        <Smartphone className="h-4 w-4"/>
        <span>9:16</span>
        </div>
      </SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
            </div>
       
            <Button className="mt-5 w-full" disabled={loading} onClick={onGenerate}>{loading?<Loader2Icon className="animate-spin"/>:<Sparkle />}Generate</Button><h2 className="mt-1 text-xs opacity-35 text-center"> 5 Credit to generate 1 image</h2>{"}"}


        </div>
    </div>
               
    );
};

export default FormInput;

