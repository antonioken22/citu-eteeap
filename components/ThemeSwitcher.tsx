"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuMoon as Moon, LuSun as Sun } from "react-icons/lu";

export const ThemeSwitch = (className: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  return (
    <motion.button
      id="theme-btn"
      aria-label="Toggle Dark Mode"
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded p-1 "
      whileTap={{
        scale: 0.7,
        rotate: 360,
        transition: { duration: 0.2 },
      }}
      whileHover={{ scale: 1.2 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted && (theme === "dark" || resolvedTheme === "dark") ? (
        <Sun
          className={cn(
            "text-neutral-300 h-full w-full p-1 md:h-5 md:w-5 md:p-0",
            className
          )}
        />
      ) : (
        <Moon
          className={cn(
            "text-neutral-500 h-full w-full p-1 md:h-5 md:w-5 md:p-0",
            className
          )}
        />
      )}
    </motion.button>
  );
};
