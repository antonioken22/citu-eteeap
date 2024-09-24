import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-cover bg-center" style={{ backgroundImage: "url('/sign-in-bg.jpg')" }}>
      {/* Left Side - Sign In */}
      <div className="h-full flex flex-col items-center justify-center px-6 lg:px-12 relative bg-white bg-opacity-80">
        {/* Background Decoration (e.g., abstract shapes) */}
        <div className="absolute inset-0 bg-gray-100 opacity-50 rounded-full blur-md transform -translate-x-1/4 translate-y-10 scale-75"></div>

        <div className="text-center space-y-6 pt-20 relative z-10">
          <h1 className="font-bold text-4xl text-primary">Welcome Back!</h1>
          <p className="text-lg text-muted-foreground">
            Sign in or create an account to access CIT-U ETEEAP.
          </p>
          <p className="text-sm text-gray-500">
            Your journey to learning starts here.
          </p>
        </div>

        <div className="flex items-center justify-center mt-10">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md transition-transform duration-300 transform hover:scale-105">
            <ClerkLoaded>
              <SignIn path="/sign-in" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="animate-spin text-muted-foreground" size={32} />
            </ClerkLoading>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="h-full hidden lg:flex justify-center items-center">
        <Image
          src="/marketing-side-panel.jpg"
          alt="CIT-U ETEEAP Poster"
          height={640}
          width={490.5}
          className="m-10 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105"
        />
      </div>
    </div>
  );
}
