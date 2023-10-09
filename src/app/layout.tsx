
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import SessionProvider from "./components/SessionProvider";
import NavMenu from "./components/NavMenu";
import StyledJsxRegistry from "./registry";
import StyledComponentsRegistry from "./registry";
import { createGlobalStyle } from "styled-components";
import Globals from "./components/Globals";
import RunGlobals from "./components/Globals";

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  


  return (
    <html lang="en">
      <body className={inter.className}>
        <RunGlobals />
        <SessionProvider session={session}>
          <main style={{display: "flex", position: "relative", width: "100vw"}}>
            <NavMenu />
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}

//191D88
//1450A3
//337CCF
// FFC436