"use client"
import { Button } from '@repo/ui/components/ui/button'
import { cn } from '@repo/ui/lib/utils'
import React, { PropsWithChildren, MouseEventHandler } from 'react'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps extends PropsWithChildren {
    onClick?: MouseEventHandler<HTMLButtonElement>
    fullWidth?: boolean
}

const SubmitButton = ({ children, onClick, fullWidth = true }: SubmitButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <Button
            type='submit'
            aria-disabled={pending}
            className={cn(fullWidth ? 'w-full' : '')}
            onClick={onClick}
        >
            {pending ? "Submitting..." : children}
        </Button>
    )
}

export default SubmitButton
