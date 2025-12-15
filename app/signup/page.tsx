import AcmeLogo from '@/app/ui/acme-logo';
import Signup from '@/app/ui/signup-form';
import { Suspense } from 'react';
 
export default function SignupPage() {
  return (
    <main className="min-h-screen py-10 dark:bg-linear-to-tr from-(--background) to-black flex items-center justify-center">
      <div className="relative w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-(--primary) p-6 md:h-36">
          <div className="flex h-full md:h-16">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <Signup/>
        </Suspense>
      </div>
    </main>
  );
}