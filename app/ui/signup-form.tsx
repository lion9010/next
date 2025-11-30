"use client";

import { useActionState, useState } from "react";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
  ServerStackIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import { Button } from "@/app/ui/button";
import { signup } from "@/app/lib/actions/users/create";

import { SwitchToggle } from "./utils/switch-toggle";

export default function SignupForm() {
  const [state, action, isPending] = useActionState(signup, undefined);
  let [checked, setChecked] = useState(false);

  return (
    <form action={action} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
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
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                autoCapitalize="words"
                placeholder="Enter your name"
                autoComplete="given-name"
                defaultValue={state?.formErrors?.name || ""}
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state?.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name}</p>
          )}

          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
                defaultValue={state?.formErrors?.email || ""}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                defaultValue={state?.formErrors?.password || ""}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                defaultValue={state?.formErrors?.confirmPassword || ""}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state?.errors?.confirmPassword && (
            <p className="text-sm text-red-500">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>
        <input type="hidden" name="redirectTo" />
        <Button className="mt-4 w-full" disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar"}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
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
