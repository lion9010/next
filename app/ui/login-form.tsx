'use client';
 
import { useActionState, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { authenticate } from '@/app/lib/auth';

import { Button } from '@/app/ui/button';
import { PasswordVisibility } from './utils/password-visibility';

 
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const [visible, setVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState(false);

  const handleInput = () => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity())
    }
  }
 
  return (
    <form action={formAction} ref={formRef}>
      <div className="flex-1 rounded-lg bg-[var(--card)] px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-[var(--foreground)]"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer dark:bg-[var(--secondary-30)] block w-full rounded-md border border-[var(--secondary)] py-[9px] pl-10 text-sm outline-2 placeholder:text-[var(--muted-foreground)]"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete='email'
                onInput={handleInput}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--muted-foreground)] peer-focus:text-[var(--primary)]" />
            </div>
          </div>
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
                type= {visible ? "text" : "password"}
                onInput={handleInput}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--muted-foreground)] peer-focus:text-[var(--primary)]" />
              <PasswordVisibility visible={visible} toggleVisibility={() => setVisible(!visible)} />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className={`mt-6 w-full ${isValid? "text-white":""}`} disabled={isPending || isValid}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}