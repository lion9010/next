"use client";

import { useState, useRef } from "react";
import { updateInvoice } from "@/app/lib/actions/invoices/index";
import { CustomerField, InvoiceForm } from "@/app/lib/types";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState(false);

  const handleInput = () => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  };

  return (
    <form action={updateInvoiceWithId} ref={formRef}>
      <div className="rounded-md bg-(--card) p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label
            htmlFor="customer"
            className="mb-2 block text-sm font-medium text-(--foreground)"
          >
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="bg-(--background) peer block w-full cursor-pointer rounded-md border border-(--border) py-2 pl-10 text-sm placeholder:text-(--primary-30)"
              defaultValue={invoice.customer_id}
              onInput={handleInput}
              required
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
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-(--primary-30)" />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-(--foreground)"
          >
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                onInput={handleInput}
                required
                defaultValue={invoice.amount}
                placeholder="Enter USD amount"
                className="bg-(--background) peer block w-full rounded-md border border-(--border) py-2 pl-10 text-sm placeholder:text-(--muted-foreground)"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-(--primary-30) peer-focus:text-(--primary)" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-(--foreground)">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-(--border) bg-(--background) px-3.5 py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  onInput={handleInput}
                  required
                  defaultChecked={invoice.status === "pending"}
                  className="
                    appearance-none 
                    h-4 w-4 
                    rounded-full 
                    border border-(--border) 
                    cursor-pointer 
                    bg-(--muted) 
                    checked:shadow-[inset_0_0_0_2px_var(--muted)]
                    checked:bg-(--primary)"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-(--muted) px-3 py-1.5 text-xs font-medium text-(--muted-foreground)"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  onInput={handleInput}
                  required
                  defaultChecked={invoice.status === "paid"}
                  className="
                    appearance-none 
                    h-4 w-4 
                    rounded-full 
                    border border-(--border) 
                    cursor-pointer 
                    bg-(--muted) 
                    checked:shadow-[inset_0_0_0_2px_var(--muted)]
                    checked:bg-(--primary)"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-(--muted) px-4 text-sm font-medium text-(--muted-foreground) transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          disabled={isValid}
          className={isValid ? "text-white" : ""}
        >
          Edit Invoice
        </Button>
      </div>
    </form>
  );
}
