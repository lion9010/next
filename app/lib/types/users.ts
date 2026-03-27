import { User as SupabaseUser } from "@supabase/supabase-js";

export type EmailPasswordSignupData = {
    user: SupabaseUser | null;
};

export type SignupFormState =
    {
        status: "idle" | "error" | "success";
        message?: string;
        email?: string;

        fieldErrors?: {
            name?: string[];
            email?: string[];
            password?: string[];
            confirmPassword?: string[];
        };

        formErrors?: Record<string, string | null>;
        serverErrors?: string;
    };

export type User = {
    id: string;
    type: "natural" | "juridical";
    name: string;
    email: string;
    password: string;
};