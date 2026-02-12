import React, { use, useEffect } from "react";
import { useAuthContext } from "@/app/provider";
import {db} from "@/configs/firebaseConfig"
import { query,collection,where ,onSnapshot} from "firebase/firestore";

import Image from "next/image";
import Link from "next/link";
import { Download, Ghost, Loader2Icon, Sparkle, SparkleIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type PreviewProduct = {
    id: string,
    finalProductImageUrl: string,
    productImageUrl: string,
    description: string,
    size: string,
    status: string    

}
const PreviewResult = () => {

    const {user} = useAuthContext();
    const [productList, setProductList] = React.useState<PreviewProduct[]>([]);
     
    useEffect(() => {
        if(!user?.email) return;
        const q = query(collection(db, "user-ads"),
         where("userEmail", "==", user?.email));

        const unSub = onSnapshot(q, (querySnapshot) => {
            const matchDocs: any = [];
            querySnapshot.forEach((doc) => {
                matchDocs.push({ id: doc.id, ...doc.data() });
            });
            console.log(matchDocs); 
           
            setProductList(matchDocs);
        });
        //  console.log("productList);
        return () => unSub();
    }, [user?.email]);

    const DownloadImage = async(imageUrl:string) => {
        const result = await fetch(imageUrl);
        const blob = await result.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        link.click();
    }
    
   


    return (
        <div className="rond-2xl border">
            <h2 className="text-2xl font-bold">Generated Result </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {productList.map((product, index) => (
                    <div key={index}>
                    {product.status === 'completed' ? 
                      <div>
                        <Image src={product.finalProductImageUrl} alt={product.id} width={500} height={500}  className="w-full h-[250px] object-cover rounded-lg"/>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2">   
                                                  
                            <Button variant={'ghost'} onClick={() => DownloadImage(product.finalProductImageUrl)}><Download/></Button>
                            
                            <Link href={product.finalProductImageUrl} target="_blank"> 
                            <Button variant={'ghost'}>View</Button>
                            </Link>
                            </div>  
                          
                            <Button><Sparkles/>Animate</Button>
                           
                        </div>
                      </div>
                     : 
                     <div className="flex flex-col items-center justify-center border rounded-xl h-full max-h-[250px] bg-zinc-800">
                      <Loader2Icon className="h-8 w-8 animate-spin"/>
                      <h2>Genreting .....</h2>
                    
                       {/* <h3 className="text-xl font-semibold mb-2">{product.description}</h3> */}
                        {/* <p className="text-gray-600">{product.size}</p>
                        <a href={product.finalProductUrl} target="_blank" rel="noopener noreferrer"> */}
                            {/* <Button className="mt-4 w-full">View Product</Button> */}
                        {/* </a> */}
                    </div>
                    }
                    </div>
                ))}
            <div>

            </div>
            </div>
        </div>
    )
};

export default PreviewResult;   
// Removed unused unSub function
