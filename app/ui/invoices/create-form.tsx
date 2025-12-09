'use client';

import { CustomerField } from '@/app/lib/types';
import Link from 'next/link';
import { useActionState, useRef, useState } from 'react';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions/invoices';
import { InvoiceFormState } from '@/app/lib/types/invoices';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: InvoiceFormState = {message: null, errors: {}};
  const [state, formAction] = useActionState(createInvoice, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const [isValid, setIsValid] = useState(false);
  
    const handleInput = () => {
      if (formRef.current) {
        setIsValid(formRef.current.checkValidity())
      }
    }
  
  
  return (
    <form action={formAction} ref={formRef}>
      <div className="rounded-md bg-[var(--card)] p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-[var(--card)] py-2 pl-10 text-sm outline-2 placeholder:text-[var(--primary-30)] bg-[var(--background)] text-[var(--foreground)]"
              defaultValue=""
              required
              aria-describedby="customer-error"
              onInput={handleInput}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--primary-30)]" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.customerId &&
          state.errors.customerId.map((error: string) => (
            <p className="mt-2 text-sm text-[var(--destructive)]" key={error}>
              {error}
              
            </p>
          ))}
      </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                required
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                onInput={handleInput}
                placeholder="Enter COP amount"
                className="peer block w-full rounded-md border border-[var(--border)] py-2 pl-10 text-sm outline-2 placeholder:text-[var(--primary-30)] bg-[var(--background)]"
              />
              <CurrencyDollarIcon aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--primary-30)] peer-focus:text-[var(--primary)]" />
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.amount &&
          state.errors.amount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
              
            </p>
          ))}
      </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-[var(--border)] bg-[var(--background)] px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  onInput={handleInput}
                  required
                  className="h-4 w-4 cursor-pointer border-[var(--border)] bg-[var(--muted)] text-[var(--primary)] focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-[var(--muted)] px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)]"
                >
                  Pending <ClockIcon aria-hidden="true" className="h-4 w-4" />
                </label>
                
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  onInput={handleInput}
                  className="h-4 w-4 cursor-pointer border-[var(--border)] bg-[var(--muted)] text-[var(--primary)] focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon aria-hidden="true" className="h-4 w-4" />
                </label>
              </div>
            </div>
            
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state.errors?.status &&
          state.errors.status.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
              
            </p>
          ))}
      </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-[var(--muted)] px-4 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:bg-[var(--primary-30)]"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isValid} className={isValid? "text-white":""}>Create Invoice</Button>
      </div>
    </form>
  );
}
