import type React from 'react'

interface Item {
	id: string
	name: string
}

interface SearchResultProps {
	item: Item
	onSelect: (item: Item) => void
}

export const SearchResult: React.FC<SearchResultProps> = ({
	item,
	onSelect
}) => {
	return (
		<li
			className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
			onClick={() => onSelect(item)}
		>
			{item.name}
		</li>
	)
}
