import { User as SupabaseUser } from "@supabase/supabase-js";

export type EmailPasswordSignupData = {
    user : SupabaseUser | null;
};

export type SignupFormState =
| { success?: boolean
    // id?: string
}
    | {
        errors?: {
            name?: string[]
            email?: string[]
            password?: string[]
            confirmPassword?: string[]
        }
        message?: string
    }
    | undefined;

export type User = {
  id: string;
  type: "natural" | "juridical";
  name: string;
  email: string;
  password: string;
};