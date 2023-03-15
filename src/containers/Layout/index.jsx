import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import React from 'react'

export const Layout = ({ children }) => {
    return (
        <>
            <Navbar />

            <main className="main">{children}</main>
            <Footer />
        </>
    )
}
