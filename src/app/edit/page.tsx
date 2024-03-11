'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const EditPog = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        ticker_symbol: '',
        price: 0,
        color: '',
    })

    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await fetch(`/api/pogs/${id}`)
                    const data = await response.json()
                    setFormData(data)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/pogs`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                console.log('Pog updated successfully')
                router.push('/')
            } else {
                console.error('Error updating pog')
            }
        } catch (error) {
            console.error('Error updating pog:', error)
        }
    }

    if (!formData.name) {
        return (
            <div className="flex justify-center items-center h-screen ">
                Loading...
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center h-screen text-black">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-black">
                    Edit Pog
                </h1>
                <h1>ID: {id}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block font-semibold text-black mb-1"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="ticker_symbol"
                            className="block font-semibold text-black mb-1"
                        >
                            Ticker Symbol
                        </label>
                        <input
                            type="text"
                            id="ticker_symbol"
                            name="ticker_symbol"
                            placeholder="Enter ticker symbol"
                            value={formData.ticker_symbol}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block font-semibold text-black mb-1"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="color"
                            className="block font-semibold text-black mb-1"
                        >
                            Color
                        </label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            placeholder="Enter color"
                            value={formData.color}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}

const EditPogWithSuspense = () => (
    <Suspense
        fallback={
            <div className="flex justify-center items-center h-screen ">
                Loading...
            </div>
        }
    >
        <EditPog />
    </Suspense>
)

export default EditPogWithSuspense
