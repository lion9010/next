'use client';

import { PasswordVisibilityProps } from "@/app/lib/types/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function PasswordVisibility({ visible, toggleVisibility }: PasswordVisibilityProps) {
  return (
    <button 
        onClick={toggleVisibility} 
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2"
        aria-label={visible ? "Hide password" : "Show password"}
    >
        {visible ? (<EyeSlashIcon className="h-5 w-5 text-gray-500" />) : (<EyeIcon className="h-5 w-5 text-gray-500" />)}
    </button>
  );
}