"use server"

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, SigninFormSchema, SignupFormSchema } from "./type";
import { createSession } from "./session";

export async function register(state: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    })

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    }

    const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(validatedFields.data)
    })

    if (response.ok) {
        redirect('/login')
    }
    else
        return {
            message: response.status === 409
                ? "The user is already exists"
                : response.statusText
        }
}


export async function login(state: FormState, formData: FormData): Promise<FormState> {
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })
    if (!validatedFields.success) return {
        error: validatedFields.error.flatten().fieldErrors,
    }

    const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(validatedFields.data)
    })

    if (response.ok) {
        const result = await response.json();
        await createSession({
            user: {
                id: result.id,
                name: result.name
            },
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        })
        redirect("/")
    }
    else {
        return {
            message: response.status === 401 ? "Invalid credentials!" : response.statusText
        }
    }

}

export const refreshToken = async (oldRefreshToken: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${oldRefreshToken}`,
            },
        })

        if (!response.ok) {
            throw new Error("Failed to refresh token!")
        }

        const { accessToken, refreshToken } = await response.json()

        const update = await fetch("http://localhost:3000/api/auth/update", {
            method: "POST",
            body: JSON.stringify({
                accessToken,
                refreshToken
            })
        })

        if (!update.ok) throw new Error("Failed to update the tokens")

        return accessToken

    } catch (err) {
        console.error("Refresh token failed:", err)
        return null
    }
} 