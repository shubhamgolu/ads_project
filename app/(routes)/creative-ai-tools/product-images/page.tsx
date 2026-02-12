"use client";
import FormInput from "../_components/Forminput";
import React from "react";
import PreviewResult from "../_components/PreviewResult";
import { on } from "events";
import { useState } from "react";
// import { console } from "inspector";
import { createServerParamsForServerSegment } from "next/dist/server/app-render/entry-base";
import axios from "axios";
import { useAuthContext } from "@/app/provider";

type formData = {
    file: File | undefined,
    description: string,
    size: string,
    imageUrl?: string,
}
function ProductImages({title}:any) {
    
    const [formData, setFormData] = useState<formData>();
    const [loading, setLoading] = useState(false);  
    const {user} = useAuthContext();
    const onHaddleInputChange = (field:string, value:string) => {
         setFormData((prev:any)=> { 
             return {
                 ...prev,
                 [field]:value
             }
         })
    }
    const onGenerate=async()=>{
       if(!formData?.file &&  !formData?.imageUrl) {
        alert("Please upload an image");
       }

       if(!formData?.description &&  !formData?.size) {
        alert("Enter description and size");
        return
       }
       setLoading(true);
       const formData_ = new FormData();
       if (formData?.file) {
           formData_.append("file", formData.file);
       }
       formData_.append("description", formData?.description?? "");
       formData_.append("size", formData?.size as string);
       formData_.append("imageUrl", formData?.imageUrl?? '1028x1028');
       formData_.append("userEmail", user?.email?? '');

    //    Api Call
       const result = await axios.post('/api/generate-product-image', formData_);
       console.log(result.data);
       setLoading(false);
    }
    return (
        <div>
            <h2 className="font-bold text-2xl mb-3">{title??"Product Images Generator"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="">
                   <FormInput onHandleInputChange={(field:string, value:string) =>onHaddleInputChange(field, value)} onGenerate={onGenerate} loading={loading}/>
                </div>
                 <div className="md:col-span-2">
                    <PreviewResult/>
                 </div>
                </div>
        </div>
    );
}

export default ProductImages;
