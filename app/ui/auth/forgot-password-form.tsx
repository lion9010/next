"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { lusitana } from "../fonts";
import { ArrowPathIcon, ArrowRightIcon, AtSymbolIcon, ExclamationCircleIcon, ServerStackIcon } from "@heroicons/react/24/outline";
import { changePassword } from "@/app/lib/actions/users/change-password";
import { EmailPasswordSignupData, ForgotPasswordFormState } from "@/app/lib/types";
import { Button } from "../button";
import Link from "next/link";
import SuccessPopover from "../utils/popover";

export default function ForgotPasswordForm({ user }: EmailPasswordSignupData) {

  const [state, action, isPending] = useActionState<
    ForgotPasswordFormState,
    FormData
  >(changePassword, { status: "idle" });

  const formRef = useRef<HTMLFormElement>(null)
  const [isValid, setIsValid] = useState(false);
  const [showPopover, setShowPopover] = useState(false)

  const handleInput = () => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  };

  useEffect (() =>{
    if (state?.status === 'success') {
      setShowPopover(true)
    }
  }, [state])

  return (
    <form action={action} ref={formRef}>
      <div className="flex-1 rounded-lg bg-(--card) px-6 pt-8 pb-1">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Recupera tu contraseña.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-(--foreground)"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer bg-(--background) block w-full rounded-md border border-(--border) py-2.25 pl-10 text-sm placeholder:text-(--muted-foreground) lowercase"
                id="email"
                type="email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                autoComplete="email"
                defaultValue={state?.formErrors?.email || ""}
                onInput={handleInput}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-(--muted-foreground) peer-focus:text-(--primary)" />
            </div>
          </div>
          {state?.fieldErrors?.email && (
            <p className="text-sm text-red-500">{state.fieldErrors.email}</p>
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
        ¿Recordaste tu contraseña? Inicia sesión.
      </Link>
      <SuccessPopover
              open={showPopover}
              email={state?.email}
              timeoutAuto={false}
              onClose={() => setShowPopover(false)}
            />
    </form>
  );
}
