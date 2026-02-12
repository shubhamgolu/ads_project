"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
function UsersAdsList() {
    const [adsList, setAdsList] = useState([]);
  return ( 
    <div>
         <h2 className="text-2xl font-bold mb-4 mt-5">My Ads</h2>
        {adsList.length === 0 &&
        <div className="p-5 border-dashed border-2 border-gray-300 rounded-2xl flex flex-col items-center justify-center mt-6 gap-3">
            <Image src="/signboard.png" alt="signboard" width={150} height={150} />
            <h2 className="text-xl">You Don't Have Any Ads Created</h2>
            <Button className="primary">Create New Ad</Button>
        </div>
        
        }
    </div>
  );
}

export default UsersAdsList;