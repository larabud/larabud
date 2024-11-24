import { Button, buttonVariants } from '@repo/ui/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '@repo/ui/components/ui/mode-toggle'
import { getSession } from '@/lib/session'
import { UserNav } from './user-nav'

const AuthNav = async () => {
    const session = await getSession()
    return (
        !session || !session.user
            ? (<>
                {JSON.stringify(session)}
                <ModeToggle hasSession={false} />
                <Link href="/login" className={buttonVariants({ variant: "outline", size: "sm" })}>Login</Link>
                <Button variant={"outline"} size={"sm"} >Register</Button>
            </>)
            : (<UserNav session={session} />)
    )
}

export default AuthNav