import { Button } from "@/components/ui/button";
// import { Link } from "lucide-react";
import Link from 'next/link'
import path from "path";
import React from "react";

const AiTools= [
    { name: "Ai Product Image", desc: "Ai Product Image", bannerImage: "/product-image.png" ,path:"/creative-ai-tools/product-images"},
    { name: "Ai Product Video", desc: "Description for Tool 2", bannerImage: "/product2.jpg" ,path:"/creative-ai-tools/product-video"},
    { name: "Ai Product With Avatar", desc: "Description for Tool 3", bannerImage: "/product3.jpg" ,path:"/product3"},
];
const AiToolList = () => {
  return (
    <div>
     <h2 className="text-2xl font-bold mb-4">AI Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AiTools.map((tool, index) => (
          <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
    
            <img src={tool.bannerImage} alt={tool.name}  className="w-full h-40 object-cover mb-4 rounded fill-none"  width={100} height={100}/>
            <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
            <p className="text-gray-600">{tool.desc}</p>
            <Link href={tool.path}>
              <Button className="mt-4 w-full">Create Now</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiToolList;
