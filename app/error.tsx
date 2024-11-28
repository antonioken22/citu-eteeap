"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import ErrorPhoto from "@/public/assets/error.png";

const Error = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      {/* TODO: Create a personalized error image. */}
      <Image
        alt="Error"
        src={ErrorPhoto}
        height="300"
        width="300"
        className="dark:hidden"
      />
      <Image
        alt="Error"
        src={ErrorPhoto}
        height="300"
        width="300"
        className="hidden dark:block"
      />
      <h2>Something went wrong!</h2>
      <Button onClick={handleGoBack}>Go Back</Button>
    </div>
  );
};

export default Error;
