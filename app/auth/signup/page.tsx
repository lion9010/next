import Signup from "@/app/ui/auth/signup-form";
import { SignupFormSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFormSkeleton />}>
      <Signup user={null} />
    </Suspense>
  );
}
