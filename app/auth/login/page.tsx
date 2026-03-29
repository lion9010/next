import LoginForm from "@/app/ui/auth/login-form";
import { LoginFormSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginForm user={null}/>
    </Suspense>
  );
}
