import SideNav from "@/app/ui/dashboard/sidenav";
import { ThemeSwitch } from "../ui/utils/theme-switch";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden dark:bg-gradient-to-br from-[var(--background)] to-black">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow px-6 md:overflow-y-auto md:px-12 md:py-6">
        <ThemeSwitch className="hidden md:flex md:justify-end md:text-[var(--ring)]" />
        <div>{children}</div>
      </div>
    </div>
  );
}
