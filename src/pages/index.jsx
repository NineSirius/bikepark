import Head from 'next/head'
import Button from '@/components/UI/Button'
import { Tooltip } from '@/components/UI/Tooltip'

export default function Home() {
    return (
        <>
            <div className="container">
                <h2>Content will be here</h2>
                <center>
                    <Tooltip title="hello">Hello World</Tooltip>
                </center>
            </div>
        </>
    )
}
