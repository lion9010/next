import SideNav from "@/app/ui/dashboard/sidenav";
import { ThemeSwitch } from "../ui/utils/theme-switch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth/auth-options";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)


  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden dark:bg-gradient-to-br from-[var(--background)] to-black">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow px-6 md:overflow-y-auto md:px-12 md:py-6">
        <div className="hidden md:flex md:justify-end md:text-[var(--ring)]">
          <ThemeSwitch />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
