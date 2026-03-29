import { User as SupabaseUser } from "@supabase/supabase-js";

export type EmailPasswordSignupData = {
    user: SupabaseUser | null;
};

type BaseFormState = {
    status: "idle" | "error" | "success";
    message?: string;
    serverErrors?: string;
    formErrors?: Record<string, string | null>;
};

export type SignupFormState = BaseFormState & {
    email?: string;

    fieldErrors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
};

export type ForgotPasswordFormState = BaseFormState & {
    email?: string;

    fieldErrors?: {
        email?: string[];
    };
};

export type UpdatePasswordFormState = BaseFormState & {
    fieldErrors?: {
        newPassword?: string[];
        confirmPassword?: string[];
    };
};

export type User = {
    id: string;
    type: "natural" | "juridical";
    name: string;
    email: string;
    password: string;
};
