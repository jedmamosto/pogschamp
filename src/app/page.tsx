'use client'

import React, { useEffect, useState } from 'react'
import { PogsProps } from '@/helpers/pogsProps'
import PogCard from '@/components/PogCard'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const Home = () => {
    const router = useRouter()

    const [feed, setFeed] = useState<PogsProps[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/pogs')
                const data = await response.json()
                setFeed(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const handleEdit = (pog: PogsProps) => {
        router.push(`/edit?id=${pog.id}`)
    }

    const handleDelete = async (pog: PogsProps) => {
        try {
            const response = await fetch('/api/pogs', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: pog.id }),
            })

            if (response.ok) {
                const deletedPog = await response.json()
                console.log('Pog deleted:', deletedPog)
                router.refresh()
            } else {
                console.error('Error deleting pog')
            }
        } catch (error) {
            console.error('Error deleting pog:', error)
        }
    }

    return (
        <main className="m-4">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Pogs List</h1>
                    <Link
                        href="/create"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition-colors duration-300"
                    >
                        <FaPlus className="mr-2" />
                        Create Pog
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {feed.map((pog) => (
                        <PogCard
                            key={pog.id}
                            pog={pog}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Home
