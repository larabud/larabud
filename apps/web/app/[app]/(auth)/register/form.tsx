"use client"
import { useActionState } from "react";
import { register } from "../actions";
import { useFormState } from "react-dom";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import Link from "next/link";
import SubmitButton from "@/components/ui/submit-button";

const initialState = {
    message: "",
};
export function RegisterForm() {
    const [state, action, pending] = useFormState(register, initialState)
    return (
        <form action={action}>
            <div className='flex flex-col gap-2'>
                {state?.message &&
                    <p className='text-sm text-red-500'>
                        {state.message}
                    </p>
                }
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input id="name" name='name' placeholder='John Doe' />
                </div>
                {
                    state?.errors?.name &&
                    <p className='text-sm text-red-500'>
                        {state.errors.name}
                    </p>
                }
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input id="email" name='email' type='email' placeholder='john@example.com' />
                </div>
                {
                    state?.errors?.email &&
                    <p className='text-sm text-red-500'>
                        {state.errors.email}
                    </p>
                }
                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input id="password" name='password' type='password' />
                </div>
                {
                    state?.errors?.password &&
                    <div className='text-sm text-red-500'>
                        <p>Password must:</p>
                        <ul className='pl-4'>
                            {state.errors.password.map((error) => (
                                <li className='list-disc' key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                }
                <SubmitButton>Sign In</SubmitButton>
                <div className="flex justify-between">
                    <Link className='text-sm underline' href="/login">Login</Link>
                    <Link className='text-sm underline' href="#">Forgot your password?</Link>
                </div>

            </div>
        </form>
    )
}