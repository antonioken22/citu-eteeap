import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESC,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon/favicon-96x96.png",
        href: "/favicon/favicon-96x96.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon/favicon-96x96.png",
        href: "/favicon/favicon-96x96.png",
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
        <head>
          {/* NextJS */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          {/* https://realfavicongenerator.net/favicon-generator/nextjs */}
          <link
            rel="icon"
            type="image/png"
            href="/favicon/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="antonioken" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
        </head>
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
