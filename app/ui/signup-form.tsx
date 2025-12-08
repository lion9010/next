"use client";

import { useActionState, useState, useRef } from "react";

import { lusitana } from "@/app/ui/fonts";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
  ServerStackIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

import { Button } from "@/app/ui/button";
import { signup } from "@/app/lib/actions/users/create";

import { SwitchToggle } from "./utils/switch-toggle";
import { PasswordVisibility } from "./utils/password-visibility";

export default function SignupForm() {
  const [state, action, isPending] = useActionState(signup, undefined);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState(false);

  const handleInput = () => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }


  return (
    <form action={action} ref={formRef}>
      <div className="flex-1 rounded-lg bg-[var(--card)] px-6 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please sign up to continue.
        </h1>
        <div className="w-full">
          <SwitchToggle
            checkedInitial={checked}
            onChange={setChecked}
            textLeft="Persona Natural"
            textRight="Persona Juridica"
            iconLeft={<UserIcon className="h-[18px] w-[18px]" />}
            iconRight={<BuildingOffice2Icon className="h-[18px] w-[18px]" />}
            name="personType"
            title="Yo soy una persona:"
          />
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--foreground)]"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block dark:bg-[var(--secondary-30)] w-full rounded-md border border-[var(--secondary)] py-[9px] pl-10 text-sm outline-2 placeholder:text-[var(--muted-foreground)] capitalize"
                id="name"
                type="text"
                name="name"
                autoCapitalize="words"
                placeholder="Enter your name"
                autoComplete="given-name"
                defaultValue={state?.formErrors?.name || ""}
                onInput={handleInput}
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--muted-foreground)] peer-focus:text-[var(--primary)]" />
            </div>
          </div>
          {state?.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name}</p>
          )}

          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--foreground)]"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer dark:bg-[var(--secondary-30)] block w-full rounded-md border border-[var(--secondary)] py-[9px] pl-10 text-sm outline-2 placeholder:text-[var(--muted-foreground)] lowercase"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
                defaultValue={state?.formErrors?.email || ""}
                onInput={handleInput}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--muted-foreground)] peer-focus:text-[var(--primary)]" />
            </div>
          </div>
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--foreground)]"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer dark:bg-[var(--secondary-30)] block w-full rounded-md border border-[var(--secondary)] py-[9px] pl-10 text-sm outline-2 placeholder:text-[var(--muted-foreground)]"
                id="password"
                name="password"
                placeholder="Enter password"
                minLength={6}
                defaultValue={state?.formErrors?.password || ""}
                type={visible ? "text" : "password"}
                onInput={handleInput}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--muted-foreground)] peer-focus:text-[var(--primary)]" />
              <PasswordVisibility visible={visible} toggleVisibility={() => setVisible(!visible)} />
            </div>
          </div>
          {state?.errors?.password && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--foreground)]"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer dark:bg-[var(--secondary-30)] block w-full rounded-md border border-[var(--secondary)] py-[9px] pl-10 text-sm outline-2 placeholder:text-[var(--muted-foreground)]"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                minLength={6}
                type={visibleConfirm ? "text" : "password"}
                defaultValue={state?.formErrors?.confirmPassword || ""}
                onInput={handleInput}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--muted-foreground)] peer-focus:text-[var(--primary)]" />
              <PasswordVisibility visible={visibleConfirm} toggleVisibility={() => setVisibleConfirm(!visibleConfirm)} />
            </div>
          </div>
          {state?.errors?.confirmPassword && (
            <p className="text-sm text-red-500">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>
        <input type="hidden" name="redirectTo" />
        <Button 
          disabled={isPending || isValid}
          className="mt-6 w-full" 
        >
          {isPending ? "Enviando..." : "Enviar"}
          <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
        <div
          className="mt-4 flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.message && (
            <div className="flex items-center gap-2 text-red-600">
              <ExclamationCircleIcon className="h-5 w-5" />
              <p className="text-sm">{state.message}</p>
            </div>
          )}

          {state?.errorDB && (
            <div className="flex items-center gap-2 text-red-600">
              <ServerStackIcon className="h-5 w-5" />
              <p className="text-sm">{state.errorDB}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
