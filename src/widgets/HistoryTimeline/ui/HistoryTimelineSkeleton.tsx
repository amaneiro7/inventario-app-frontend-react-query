import { memo } from 'react'

// Definimos una constante simple para evitar la recreación en cada render
const SKELETON_ITEMS = ['1', '2', '3']

export const HistoryTimelineSkeleton = memo(() => {
	return (
		<div className="space-y-4">
			<div className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
			<div className="space-y-2">
				{SKELETON_ITEMS.map(item => (
					<div key={item} className="h-16 w-full animate-pulse rounded-md bg-gray-100" />
				))}
			</div>
		</div>
	)
})
HistoryTimelineSkeleton.displayName = 'HistoryTimelineSkeleton'
