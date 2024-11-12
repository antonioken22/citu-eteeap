import { useEffect } from "react";
import { toast } from "sonner";

import { Spinner } from "@/components/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import useAuthState from "@/hooks/use-user-state";
import useProfilePhotoUpdate from "@/hooks/userProfilePhotoUpdate";

const UserProfileUpdatePhoto = () => {
  const {
    userFirstName,
    userLastName,
    userEmail,
    userPhotoUrl,
    setUserPhotoUrl,
    loading: userLoading,
  } = useAuthState();
  const { setSelectedImageUpload, updateProfilePicture, newPhotoUrl } =
    useProfilePhotoUpdate();

  useEffect(() => {
    if (newPhotoUrl) {
      setUserPhotoUrl(newPhotoUrl);
    }
  }, [newPhotoUrl, setUserPhotoUrl]);

  // String initial parser (for string | null datatypes)
  const getInitials = (...names: (string | null)[]): string => {
    const initials = names.map((name) => (name ? name.trim()[0] : "")).join("");
    return initials;
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center relative inset-y-0 h-full w-full z-50">
        <Spinner size="lg" text="background" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Profile</h2>
      </CardHeader>
      <CardContent>
        {userPhotoUrl && (
          <div className="flex flex-col items-center">
            <Avatar className="border border-primary w-24 h-24 rounded-full">
              <AvatarImage
                alt="ETEEAP"
                src={userPhotoUrl ? userPhotoUrl : ""}
              />
              <AvatarFallback>
                {getInitials(userFirstName, userLastName)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        <h2 className="text-md md:text-xl font-bold text-center break-words mt-2">
          {userFirstName} {userLastName}
        </h2>
        <p className="text-muted-foreground text-xs md:text-base mb-2 text-center break-words ">
          {userEmail}
        </p>
        <Input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const fileSizeInMB = file.size / (1024 * 1024);
              if (fileSizeInMB > 2) {
                toast.warning("File size exceeds 2MB.");
                setSelectedImageUpload(null);
              } else {
                setSelectedImageUpload(file);
              }
            } else {
              setSelectedImageUpload(null);
            }
          }}
        />
        <p className="text-center text-xs text-muted-foreground text-wrap">
          File size limit: 2 MB
        </p>
        <div className="flex flex-col justify-center w-full my-1">
          <Button onClick={updateProfilePicture}>Update</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileUpdatePhoto;
