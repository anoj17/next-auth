'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "./components/Loader";


export default function Home() {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    router.push('/auth/signin')
    setIsLoading(true)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800 py-2">
      <div className="flex flex-col space-y-14">
        <h1 className="text-white font-bold text-8xl drop-shadow-md">
          <span className="text-6xl">🔑</span>
          Auth
        </h1>
        <Button className="bg-white px-5 py-8 rounded text-xl hover:bg-white/80" onClick={handleClick}>{isLoading ? <Loader /> : 'Signin'}</Button>
      </div>
    </div>
  );
}
