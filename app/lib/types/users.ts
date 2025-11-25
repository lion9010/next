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
  name: string;
  email: string;
  password: string;
};