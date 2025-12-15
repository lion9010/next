'use client';

import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { ThemeSwitch } from "../utils/theme-switch";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 h-20 text-white flex flex-row justify-between bg-(--primary) rounded-md p-4 md:h-40 md:flex-col-reverse">
        <div className="flex h:full md:h-fit">
          <AcmeLogo className="md:h-16" />
        </div>
        <div className="md:hidden">
          <ThemeSwitch />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-(--background) md:block"></div>
        
          <button onClick={() => signOut({ callbackUrl: "/" })} className="flex h-12 w-full grow items-center justify-center gap-2 rounded-md bg-(--background) p-3 text-sm font-medium hover:bg-(--destructive-background) hover:text-(--destructive) md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        
      </div>
    </div>
  );
}
