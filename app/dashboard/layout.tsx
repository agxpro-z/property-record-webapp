"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      onClick: () => logoutHandler(),
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const logoutHandler = async () => {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        console.log("Logged out");
        router.push("/login");
      } else {
        console.error("Failed to logout");
      }
    });
  };

  return (
    <div className="pl-12 h-full w-full">
      <div
        className={cn(
          "flex flex-col md:flex-row bg-gray-100 dark:bg-zinc-900 flex-1 mx-auto border border-zinc-800 dark:border-zinc-900 overflow-hidden",
          "h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="mt-0 pt-20 justify-between gap-10 border-none">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-1 flex flex-col gap-2 h-full">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} onClick={link?.onClick} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <DashboardComponent>
          {children}
        </DashboardComponent>
      </div>
    </div>
  );
}

const DashboardComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-1">
        <div className="flex flex-1 pt-0 pb-2 pl-[1px]">
          <div className="pr-12 pt-2 pl-2 overflow-x-auto border-none border-neutral-200 dark:border-neutral-700 bg-white dark:bg-zinc-950 flex flex-col gap-2 flex-1 w-full h-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
