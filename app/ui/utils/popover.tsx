"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  email: string | undefined;
  timeoutAuto: boolean;
  onClose: () => void;
};

export default function SuccessPopover({
  open,
  email,
  timeoutAuto,
  onClose,
}: Props) {
  useEffect(() => {
    if (open && timeoutAuto) {
      const timer = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(timer);
    }
  }, [open, timeoutAuto, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* CONTAINER */}
      <div className="relative w-full max-w-md px-4">

        {/* 📱 MOBILE VERSION */}
        <div className="block sm:hidden">
          <div className="relative bg-(--popover) border border-(--color-2) rounded-xl shadow-2xl p-6 text-center animate-in fade-in zoom-in-95">
            
            {/* ICON */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg">
              ✓
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-(--color-2)">
                ¡Cuenta creada!
              </h2>

              <p className="text-sm text-(--popover-foreground) mt-2 leading-relaxed">
                Revisa tu correo{" "}
                <span className="font-medium text-(--accent)">
                  {email}
                </span>{" "}
                y activa tu cuenta para comenzar en VyND
              </p>
            </div>

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-(--muted-foreground) hover:text-(--accent)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 💻 DESKTOP VERSION */}
        <div className="hidden sm:block">
          <div className="relative mt-10 bg-(--popover) border border-(--color-2) shadow-xl rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
            
            <div className="flex items-start gap-3">
              
              <div className="bg-green-100 text-(--color-2) rounded-full p-2">
                ✓
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-(--color-2)">
                  Cuenta creada correctamente
                </p>

                <p className="text-sm text-(--popover-foreground) mt-1">
                  Revisa tu correo{" "}
                  <span className="font-medium text-(--accent)">
                    {email}
                  </span>{" "}
                  y activa tu cuenta para comenzar en VyND
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-(--muted-foreground) hover:text-(--accent)"
              >
                ✕
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}