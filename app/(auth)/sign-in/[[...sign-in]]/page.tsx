import Image from "next/image";
import { Loader2 } from "lucide-react";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

import { ModeToggle } from "@/components/mode-toggle";
import ETEEAPMarketingPoster from "@/public/marketing-side-panel.jpg";
import WildCatsWallpaper from "@/public/wildcats-wallpaper.png";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-primary">
      <div className="absolute z-50 top-0 right-0 p-2">
        <ModeToggle />
      </div>

      {/* Left Side - Sign In */}
      <div className="h-full flex flex-col items-center justify-center px-6 lg:px-12 relative z-10">
        <div className="flex items-center justify-center ">
          <div className="transition-transform duration-300 transform hover:scale-105">
            <ClerkLoaded>
              <SignIn
                path="/sign-in"
                forceRedirectUrl="/registration"
                fallbackRedirectUrl="/registration"
                signUpFallbackRedirectUrl="/registration"
              />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2
                className="animate-spin text-muted-foreground"
                size={32}
              />
            </ClerkLoading>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="h-full hidden lg:flex justify-center items-center z-10 relative ">
        <Image
          alt="CIT-U ETEEAP Poster"
          src={ETEEAPMarketingPoster}
          height={640}
          width={490.5}
          className="m-10 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 z-10"
          placeholder="blur"
        />
      </div>

      <Image
        alt="Wild Cats Wallpaper"
        src={WildCatsWallpaper}
        fill
        placeholder="blur"
        priority
        className="object-cover"
      />
    </div>
  );
}
