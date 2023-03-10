import '@/styles/globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
    return (
        <>
            <div className={montserrat.className}>
                <Component {...pageProps} />
            </div>
        </>
    )
}
