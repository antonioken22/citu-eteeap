import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIT-U ETEEAP",
  description: "CIT-U ETEEAP Process Management System Web Application.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light",
        url: "/citu-eteeap-logo.svg",
        href: "/citu-eteeap-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark",
        url: "/citu-eteeap-logo.svg",
        href: "/citu-eteeap-logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="citu-eteeap-theme"
          >
            {children}
          </ThemeProvider>
          <Toaster position="bottom-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
