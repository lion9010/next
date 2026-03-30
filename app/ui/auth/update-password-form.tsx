"use client";

import Link from "next/link";
import SuccessPopover from "../utils/popover";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
  KeyIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../button";
import { PasswordVisibility } from "../utils/password-visibility";
import { lusitana } from "../fonts";
import { useActionState, useEffect, useRef, useState } from "react";
import { UpdatePasswordFormState } from "@/app/lib/types";
import { updatePassword } from "@/app/lib/actions/users/update-password";
import { createClient } from "@/app/lib/supabase/client";

export default function UpdatePasswordForm() {
  const [state, action, isPending] = useActionState<
    UpdatePasswordFormState,
    FormData
  >(updatePassword, { status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(()=>{
    const supabase = createClient()
    supabase.auth.getSession()
  }, [])

  const handleInput = () => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  };

  useEffect(() => {
      if (state?.status === "success") {
        setShowPopover(true);
      }
    }, [state]);

  return (
    <form action={action} ref={formRef}>
      <div className="flex-1 rounded-lg bg-(--card) px-6 pt-8 pb-1">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Por favor actualiza tu contraseña.
        </h1>
        <div className="w-full">
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-(--foreground)"
              htmlFor="newPassword"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer bg-(--background) block w-full rounded-md border border-(--border) py-2.25 pl-10 text-sm placeholder:text-(--muted-foreground)"
                id="newPassword"
                name="newPassword"
                placeholder="Ingresa el nuevo password"
                minLength={6}
                defaultValue={state?.formErrors?.newPassword || ""}
                type={visible ? "text" : "password"}
                onInput={handleInput}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-(--muted-foreground) peer-focus:text-(--primary)" />
              <PasswordVisibility
                visible={visible}
                toggleVisibility={() => setVisible(!visible)}
              />
            </div>
          </div>
          {state?.fieldErrors?.newPassword && (
            <div className="text-sm text-red-500">
              <p>El nuevo password debe ser:</p>
              <ul>
                {state.fieldErrors.newPassword.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-(--foreground)"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer bg-(--background) block w-full rounded-md border border-(--border) py-2.25 pl-10 text-sm placeholder:text-(--muted-foreground)"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                minLength={6}
                type={visibleConfirm ? "text" : "password"}
                defaultValue={state?.formErrors?.confirmPassword || ""}
                onInput={handleInput}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-(--muted-foreground) peer-focus:text-(--primary)" />
              <PasswordVisibility
                visible={visibleConfirm}
                toggleVisibility={() => setVisibleConfirm(!visibleConfirm)}
              />
            </div>
          </div>
          {state?.fieldErrors?.confirmPassword && (
            <p className="text-sm text-red-500">
              {state.fieldErrors.confirmPassword}
            </p>
          )}
        </div>
        <input type="hidden" name="redirectTo" />
        <Button
          disabled={isPending || isValid}
          className={`mt-6 w-full ${isValid ? "text-white" : ""}`}
        >
          {isPending ? (
            <>
              Enviando...
              <ArrowPathIcon className="ml-auto h-5 w-5 animate-spin" />
            </>
          ) : (
            <>
              Enviar
              <ArrowRightIcon className="ml-auto h-5 w-5" />
            </>
          )}
        </Button>
        <div
          className="my-4 flex-col items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.message && (
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <ExclamationCircleIcon className="h-5 w-5" />
              <p className="text-sm">{state.message}</p>
            </div>
          )}
          {state?.serverErrors && (
            <div className="flex items-center gap-2 text-red-600">
              <ServerStackIcon className="h-5 w-5" />
              <p className="text-sm">{state.serverErrors}</p>
            </div>
          )}
        </div>
      </div>
      <Link
        href="/auth/login"
        className="text-sm text-blue-500 hover:underline text-center block mt-4"
      >
        ¿Ya tienes una cuenta? Inicia sesión.
      </Link>
      <SuccessPopover
        open={showPopover}
        email={state?.message}
        timeoutAuto={false}
        onClose={() => setShowPopover(false)}
      />
    </form>
  );
}
