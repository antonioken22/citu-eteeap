import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl primary">Welcome Back!</h1>
          <p className="text-base text-muted-foreground">
            Log in or Create account to access CIT-U ETEEAP!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full justify-center hidden lg:flex">
        <Image
          src="/marketing-side-panel.jpg"
          alt="CITU ETEEAP Poster"
          height={1280 * 0.5}
          width={981 * 0.5}
          className="m-8"
        />
      </div>
    </div>
  );
}
