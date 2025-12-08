"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { SwitchToggleProps } from "@/app/lib/types";
import { useTheme } from "next-themes";

export function ThemeSwitch({ className, colorRight, colorLeft }: SwitchToggleProps) {

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Necesario para evitar errores de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // No renderiza íconos hasta que el tema esté listo en cliente
    return <span className="w-6 h-6" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`${className}`}
      >
      <span className="cursor-pointer flex items-center">
        {isDark 
          ? <MoonIcon className={`w-6 h-6 ${colorLeft}`} /> 
          : <SunIcon className={`w-6 h-6 ${colorRight}`} />
        }
      </span>
    </div>
  );
}
