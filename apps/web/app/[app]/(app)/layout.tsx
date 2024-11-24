import TopBar from '@/components/layout/top-bar'
import React, { PropsWithChildren } from 'react'

const MainLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <TopBar />
            {children}
        </>
    )
}

export default MainLayout