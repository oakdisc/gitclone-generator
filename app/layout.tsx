import type { Metadata } from "next";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./app";

export const metadata: Metadata = {
  title: "Generate Git Clone Command",
  description:
    " Generate personalized git clone commands and quickly set up each repository individually to keep things organized",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
