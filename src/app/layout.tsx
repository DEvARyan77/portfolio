import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Aryan | Full-stack developer",
  description:
    "Dev Aryan builds full-stack health-tech software: insurance claims, hospital OPDs, pharmacy and ambulance systems. Java, Spring Boot, React, Node.js and MongoDB.",
  openGraph: {
    title: "Dev Aryan | Full-stack developer",
    description:
      "Full-stack health-tech projects: ClaimFlow, MediSync and DocOnGo.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
