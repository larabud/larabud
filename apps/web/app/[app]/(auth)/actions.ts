"use server"

import { BACKEND_URL } from "@/lib/constants"
import { FormState, LoginFormSchema, RegisterFormSchema } from "@/lib/definitions"
import { createSession, removeSession } from "@/lib/session"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function register(state: FormState, formData: FormData): Promise<FormState> {
    const validationResult = RegisterFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })
    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(validationResult.data)
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
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })
    if (!validatedFields.success) return {
        errors: validatedFields.error.flatten().fieldErrors,
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

        redirect('/')

    }
    else {
        return {
            message: response.status === 401 ? "Invalid credentials!" : response.statusText
        }
    }

}

export async function logout() {
    await removeSession()
    redirect('/login')
}