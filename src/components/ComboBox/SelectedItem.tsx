import type React from 'react'

interface Item {
	id: string
	name: string
}

interface SelectedItemProps {
	item: Item
	onRemove: (item: Item) => void
}

export const SelectedItem: React.FC<SelectedItemProps> = ({
	item,
	onRemove
}) => {
	return (
		<span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
			{item.name}
			<button
				type="button"
				className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
				onClick={() => onRemove(item)}
			>
				<span className="sr-only">Eliminar</span>
				<svg
					className="h-2 w-2"
					stroke="currentColor"
					fill="none"
					viewBox="0 0 8 8"
				>
					<path
						strokeLinecap="round"
						strokeWidth="1.5"
						d="M1 1l6 6m0-6L1 7"
					/>
				</svg>
			</button>
		</span>
	)
}
