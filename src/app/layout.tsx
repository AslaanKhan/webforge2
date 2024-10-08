import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/modal-provider";
import GlobalProvider, { GlobalContext } from "@/providers/global-provider";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Forge",
  description: "All in one Agency Solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} >
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalProvider>
            <ModalProvider>
              {children}
              <Toaster />
              <SonnarToaster position="bottom-left" />
            </ModalProvider>
          </GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
