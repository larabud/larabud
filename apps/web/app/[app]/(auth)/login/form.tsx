"use client"
import { useActionState } from "react";
import { useFormState } from "react-dom";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import Link from "next/link";
import SubmitButton from "@/components/ui/submit-button";
import { login } from "../actions";
import { BACKEND_URL } from "@/lib/constants";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { Icons } from "@/components/icons";
import { GitlabIcon } from "lucide-react";

const initialState = {
    message: "",
};
export function LoginForm() {
    const [state, action, pending] = useFormState(login, initialState)
    return (
        <form action={action}>
            <div className='flex flex-col gap-2'>
                {state?.message &&
                    <p className='text-sm text-red-500'>
                        {state.message}
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
                    <p className='text-sm text-red-500'>
                        {state.errors.password}
                    </p>
                }

                <div className="flex flex-col gap-2 w-full mt-2">
                    <SubmitButton>Sign In</SubmitButton>
                    <div className="flex items-center justify-center">
                        <div className="border-t border-secondary flex-grow"></div>
                        <span className="mx-4 text-gray-500">or</span>
                        <div className="border-t border-secondary flex-grow"></div>
                    </div>
                    <a href={`${BACKEND_URL}/auth/github/login`} className={buttonVariants({ variant: "outline" })} >
                        <Icons.gitHub className="mr-2 h-4 w-4" /> Sign in with GitHub
                    </a>
                    <a href={`${BACKEND_URL}/auth/gitlab/login`} className={buttonVariants({ variant: "outline" })} >
                        <GitlabIcon className="mr-2 h-4 w-4" /> Sign in with GitLab
                    </a>
                    <div className="flex justify-between">
                        <Link className='text-sm underline' href="/register">Register</Link>
                        <Link className='text-sm underline' href="#">Forgot your password?</Link>
                    </div>
                </div>
            </div>
        </form>
    )
}