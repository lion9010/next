import ForgotPasswordForm from "@/app/ui/auth/forgot-password-form";
import { ForgotPasswordSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordSkeleton />}>
      <ForgotPasswordForm user={null}/>
    </Suspense>
  );
}
