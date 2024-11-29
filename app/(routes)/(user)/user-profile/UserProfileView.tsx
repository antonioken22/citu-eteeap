"use client";

import { Tab1 } from "./components/Tab1";
import { Tab2 } from "./components/Tab2";
import { Tab3 } from "./components/Tab3";

export const UserProfileView = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-6">
      <Tab1 />
      <Tab2 />
      <Tab3 />
    </div>
  );
};
