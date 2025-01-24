import type React from 'react'
import { useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SelectedItem } from './SelectedItem'
import { SearchResult } from './SearchResult'

interface Item {
	id: string
	name: string
}

// Simular una función de búsqueda asíncrona
const searchItems = async (query: string): Promise<Item[]> => {
	// Simular un retraso de red
	await new Promise(resolve => setTimeout(resolve, 300))
	return [
		{ id: '1', name: `${query} result 1` },
		{ id: '2', name: `${query} result 2` },
		{ id: '3', name: `${query} result 3` }
	]
}

export const AsyncCombobox: React.FC = () => {
	const [query, setQuery] = useState('')
	const [selectedItems, setSelectedItems] = useState<Item[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const { data: results, isLoading } = useQuery({
		queryKey: ['search', query],
		queryFn: () => searchItems(query),
		enabled: query.length > 0
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
		setIsOpen(true)
	}

	const handleSelectItem = (item: Item) => {
		if (!selectedItems.some(selectedItem => selectedItem.id === item.id)) {
			setSelectedItems([...selectedItems, item])
		}
		setQuery('')
		setIsOpen(false)
		inputRef.current?.focus()
	}

	const handleRemoveItem = (item: Item) => {
		setSelectedItems(
			selectedItems.filter(selectedItem => selectedItem.id !== item.id)
		)
	}

	return (
		<div className="relative w-full max-w-md">
			<div className="flex flex-wrap gap-2 mb-2">
				{selectedItems.map(item => (
					<SelectedItem
						key={item.id}
						item={item}
						onRemove={handleRemoveItem}
					/>
				))}
			</div>
			<input
				ref={inputRef}
				type="text"
				value={query}
				onChange={handleInputChange}
				placeholder="Buscar..."
				className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			{isOpen && (
				<ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
					{isLoading ? (
						<li className="px-4 py-2 text-gray-500">Cargando...</li>
					) : results && results.length > 0 ? (
						results.map(item => (
							<SearchResult
								key={item.id}
								item={item}
								onSelect={handleSelectItem}
							/>
						))
					) : (
						<li className="px-4 py-2 text-gray-500">
							No se encontraron resultados
						</li>
					)}
				</ul>
			)}
		</div>
	)
}
