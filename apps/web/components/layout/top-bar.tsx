import React from 'react'
import Link from 'next/link'
import { Icons } from '../icons'
import { MainNav } from './main-nav'
import AuthNav from './auth-nav'

const TopBar = () => {
    return (
        <div className="border-b">
            <div className="flex h-14 items-center px-4">
                <Link href={'/'}>
                    <div className="relative mx-1 flex items-center text-lg font-medium">
                        <Icons.logo />
                        Larabud
                    </div>
                </Link>
                <Icons.separator className="h-4 w-4" />
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <MainNav position='right' />
                    <AuthNav />
                </div>
            </div>
        </div>
    )
}

export default TopBar