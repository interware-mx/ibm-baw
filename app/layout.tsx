// 📦 Dependencies
import type { Metadata } from "next";
import { Raleway } from "next/font/google";

// 📖 lib
import Providers from "@/lib/providers/providers";

// 🧩 Components / Containers
import BootstrapClient from "@/components/commons/bootstrap-client";
import Header from "@/components/header";

// 🎨 Styles
import "@interware/foundation/theme.css";
import "@interware/foundation/gradients.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--bs-body-font-family",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "IBM BAW DEMO",
  description: "Demo for IBM BAW Purpose",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={raleway.variable}>
        <Providers>
          <Header />
          {children}
          <BootstrapClient />
        </Providers>
      </body>
    </html>
  );
}
