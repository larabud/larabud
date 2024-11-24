import type { Metadata } from "next";
import "@repo/ui/globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Providers } from "@/components/providers/providers";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
