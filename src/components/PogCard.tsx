import React from 'react'
import { PogsProps } from '@/helpers/pogsProps'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PogCardProps {
    pog: PogsProps
    onDelete: (pog: PogsProps) => void
    onEdit: (pog: PogsProps) => void
}

const PogCard: React.FC<PogCardProps> = ({ pog, onDelete, onEdit }) => {
    const router = useRouter()

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden text-black">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{pog.name}</div>
                <p className="text-gray-700 text-base">
                    <span className="font-semibold">Ticker Symbol:</span>{' '}
                    {pog.ticker_symbol}
                </p>
                <p className="text-gray-700 text-base">
                    <span className="font-semibold">Price:</span> ${pog.price}
                </p>
                <p className="text-gray-700 text-base">
                    <span className="font-semibold">Color:</span> {pog.color}
                </p>
            </div>
            <div className="px-6 py-4 bg-gray-100 flex justify-end">
                <button
                    className="text-blue-500 hover:text-blue-700 mr-4"
                    onClick={() => onEdit(pog)}
                >
                    <FaEdit className="text-xl" />
                </button>
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(pog)}
                >
                    <FaTrash className="text-xl" />
                </button>
            </div>
        </div>
    )
}

export default PogCard
