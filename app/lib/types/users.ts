export type SignupFormState =
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