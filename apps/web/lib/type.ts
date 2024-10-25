import { z } from "zod";

export type FormState = {
    error?: {
        name?: string[];
        email?: string[];
        password?: string[];
    },
    message?: string;
} | undefined;

export type WorkspaceFormState = {
    error?: {
        name?: string[];
    },
    message?: string;
} | undefined;

export const WorkspaceFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .trim(),
})

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .trim(),
    email: z
        .string()
        .email({ message: "Please enter a valid email." })
        .trim(),
    password: z
        .string()
        .min(8, { message: "be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "contain at least one letter." })
        .regex(/[0-9]/, { message: "contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, { message: "contain at least one special character." })
        .trim()
})


export const SigninFormSchema = z.object({
    email: z
        .string()
        .email({ message: "Please enter a valid email." })
        .trim(),
    password: z
        .string()
        .min(1, { message: "Password field must not be empty" })
        .trim()
})

export type Session = {
    user: {
        id: string,
        name: string
    },
    accessToken: string,
    refreshToken: string
}
