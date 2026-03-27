"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  email: string | undefined;
  timeoutAuto: boolean;
  onClose: () => void;
};

export default function SuccessPopover({ open, email, timeoutAuto, onClose }: Props) {
  useEffect(() => {
    if (open && timeoutAuto) {
      const timer = setTimeout(() => onClose(), 5000); // auto close
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* POPOVER */}
      <div className="relative mt-10 w-full max-w-md bg-(--popover) border border-(--color-2) shadow-xl rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
        <div className="flex items-start gap-3">
          <div className="bg-green-100 text-(--color-2) rounded-full p-2">✓</div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-(--color-2)">
              Cuenta creada correctamente
            </p>
            <p className="text-sm text-(--popover-foreground) mt-1">
              Revisa tu correo <span className="font-medium text-(--accent)">{email}</span> y activa tu cuenta para comenzar en VyND
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
  );
}
