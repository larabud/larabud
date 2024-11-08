import type { Metadata } from "next";
import "@repo/ui/globals.css"

export const metadata: Metadata = {
  title: "Larabud",
  description: "Deploy laravel applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
