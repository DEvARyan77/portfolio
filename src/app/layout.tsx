import type { Metadata } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/geist";
import "@fontsource/caveat/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Aryan | Software developer",
  description:
    "Dev Aryan is a software developer building AI-native, full-stack systems for healthcare, including ClaimFlow and MediSync.",
  openGraph: {
    title: "Dev Aryan | Software developer",
    description: "AI-native, full-stack systems for healthcare. Walk through the forest to see the work.",
    images: ["/og.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen">
        <noscript>
          <style>{"#top{visibility:visible!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
