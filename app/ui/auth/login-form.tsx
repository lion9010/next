"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { EmailPasswordSignupData } from "@/app/lib/types";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import { Button } from "@/app/ui/button";
import { PasswordVisibility } from "../utils/password-visibility";
import { createClient } from "../../lib/supabase/client";
import Link from "next/link";

export default function LoginForm({ user }: EmailPasswordSignupData) {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [visible, setVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState(false);

  const handleInput = () => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  };

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      // Usamos el status code o mensajes clave para decidir qué mostrar
      switch (true) {
        // Caso 1: Error de red o conexión
        case error.message.includes("fetch"):
          setError("No hay conexión con el servidor. Revisa tu internet.");
          break;

        // Caso 2: El usuario no ha confirmado el correo (Error común en Supabase)
        case error.message.includes("Email not confirmed"):
          setError(
            "Por favor, verifica tu correo electrónico antes de entrar.",
          );
          break;

        // Caso 3: Error de servidor (500)
        case error.status && error.status >= 500:
          setError(
            "Nuestra base de datos está en mantenimiento. Intenta más tarde.",
          );
          break;

        // Caso 4: Credenciales inválidas (400, 401)
        case error.status === 400 || error.status === 401:
          setError("El correo o la contraseña son incorrectos.");
          break;

        // Caso por defecto: Cualquier otro error desconocido
        default:
          setError("Ocurrió un error inesperado. Código: " + error.status);
      }
      return;
    }

    // Redirección
    window.location.href = callbackUrl;
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="flex-1 rounded-lg bg-(--card) px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
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
                className="peer bg-(--background) block w-full rounded-md border border-(--border) py-2.25 pl-10 text-sm placeholder:text-(--muted-foreground)"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
                onInput={handleInput}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-(--muted-foreground) peer-focus:text-(--primary)" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-(--foreground)"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer bg-(--background) block w-full rounded-md border border-(--border) py-2.25 pl-10 text-sm placeholder:text-(--muted-foreground)"
                id="password"
                name="password"
                placeholder="Enter password"
                minLength={6}
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
          <Link
            href="/auth/forgot-password"
            className="text-xs text-(--muted-foreground) hover:underline hover:text-(--accent) text-right block mt-1"
          >
            ¿Olvidaste tu contraseña? Cambiala
          </Link>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button
          className={`mt-6 w-full ${isValid || loading ? "text-white" : ""}`}
          disabled={isValid || loading}
        >
          Log in
          {loading ? (
            <ArrowPathIcon className="ml-auto h-5 w-5 animate-spin" />
          ) : (
            <ArrowRightIcon className="ml-auto h-5 w-5" />
          )}
        </Button>
        <div
          className="flex min-h-8 items-start space-x-2 mt-2"
          aria-live="polite"
          aria-atomic="true"
        >
          {error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-500">{error}</p>
            </>
          )}
        </div>
      </div>
      <Link
        href="/auth/signup"
        className="text-sm text-blue-500 hover:underline text-center block mt-4"
      >
        ¿No tienes una cuenta? Registrate
      </Link>
    </form>
  );
}
