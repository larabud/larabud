"use client"
import { Button } from '@repo/ui/components/ui/button'
import React, { PropsWithChildren, MouseEventHandler } from 'react'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps extends PropsWithChildren {
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const SubmitButton = ({ children, onClick }: SubmitButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <Button
            type='submit'
            aria-disabled={pending}
            className='w-full mt-2'
            onClick={onClick}
        >
            {pending ? "Submitting..." : children}
        </Button>
    )
}

export default SubmitButton
