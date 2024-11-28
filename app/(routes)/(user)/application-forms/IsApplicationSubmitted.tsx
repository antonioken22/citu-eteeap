import Image from "next/image";

import ThankYouPhoto from "@/public/assets/thank-you.png";
import NotFoundMagnifyingGlassPhoto from "@/public/assets/not-found-magnifying-glass.png";

interface IsApplicationSubmittedProps {
  isSubmitted: boolean;
}

export const IsApplicationSubmitted = ({
  isSubmitted,
}: IsApplicationSubmittedProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-muted my-4 rounded-lg">
      {isSubmitted ? (
        <Image
          alt="Thank You"
          src={ThankYouPhoto}
          width={300}
          height={300}
          className="mb-6"
        />
      ) : (
        <Image
          alt="Not Found"
          src={NotFoundMagnifyingGlassPhoto}
          width={300}
          height={300}
          className="mb-6"
        />
      )}

      <h2 className="text-center text-2xl font-bold text-muted-foreground">
        {isSubmitted
          ? "Your application has been submitted."
          : "You have not yet submitted your application form."}
      </h2>
    </div>
  );
};
