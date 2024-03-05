import React from 'react'
import { GetStaticProps } from 'next'
import { PogsProps } from '@/helpers/pogsProps'
import prisma from '../../lib/prisma'

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.pogs.findMany()
    return {
        props: { feed },
        revalidate: 10,
    }
}

type Props = {
    feed: PogsProps[]
}

const Home = ({ feed }: Props) => {
    return (
        <main>
            <div>
                <h1>Pogs List</h1>
                <ul>
                    {feed.map((pog) => (
                        <li key={pog.id}>
                            <div>Name: {pog.name}</div>
                            <div>Ticker Symbol: {pog.ticker_symbol}</div>
                            <div>Price: {pog.price}</div>
                            <div>Color: {pog.color}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default Home
