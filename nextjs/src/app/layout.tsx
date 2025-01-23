

import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Providers } from "./providers";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Itsuki SPA Skeleton",
    description: "SPA Skeleton backed by Lambda and Dynamo",
  };

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
