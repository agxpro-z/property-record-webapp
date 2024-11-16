"use client";
import { useState } from "react";
import { HoveredLink, MenuItem, ProductItem } from "./ui/navbar-menu";
import Link from "next/link";
import { Poppins, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["300"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={`${inter.className} text-sm h-16 w-full backdrop-blur-md bg-transparent z-50 flex flex-row items-center justify-between mx-auto px-16 border-b-[1px] border-zinc-800`}
    >
      <div className="flex flex-row items-center h-full gap-12" onMouseLeave={() => setActive(null)}>
        <Link className="flex flex-row items-center gap-2" href="/">
          <h1 className={`text-4xl font-bold ${poppins.className}`}>pR</h1>
          <h2 className="text-base font-medium">Property Record</h2>
        </Link>
        <div className="flex flex-row items-center justify-evenly gap-6 font-medium">
          <Link href="/dashboard">Dashboard</Link>
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">Interface Design</HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Products">
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Algochurn"
                href=""
                src=""
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Tailwind Master Kit"
                href=""
                src=""
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Moonbeam"
                href=""
                src=""
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Rogue"
                href=""
                src=""
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Pricing">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/hobby">Hobby</HoveredLink>
              <HoveredLink href="/individual">Individual</HoveredLink>
              <HoveredLink href="/team">Team</HoveredLink>
              <HoveredLink href="/enterprise">Enterprise</HoveredLink>
            </div>
          </MenuItem>
        </div>
      </div>
      <Link
        className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
        href="/login"
      >
        Login
      </Link>
    </div>
  );
}
