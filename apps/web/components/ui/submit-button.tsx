"use client"
import { Button } from '@repo/ui/components/ui/button'
import { cn } from '@repo/ui/lib/utils'
import React, { PropsWithChildren, MouseEventHandler } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react' // Importing the Loader2 icon

interface SubmitButtonProps extends PropsWithChildren {
    onClick?: MouseEventHandler<HTMLButtonElement>
    fullWidth?: boolean
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
}

const SubmitButton = ({ children, onClick, fullWidth = true, variant, size }: SubmitButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <Button
            variant={variant || "default"}
            size={size || "default"}
            type="submit"
            aria-disabled={pending}
            className={cn(fullWidth ? 'w-full' : '')}
            onClick={onClick}
        >
            {pending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                children
            )}
        </Button>
    )
}

export default SubmitButton
