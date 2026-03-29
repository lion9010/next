import UpdatePasswordForm from "@/app/ui/auth/update-password-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <UpdatePasswordForm />
    </Suspense>
  );
}
