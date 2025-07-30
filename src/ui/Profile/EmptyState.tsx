import Typography from '@/components/Typography'
import { BanIcon } from 'lucide-react'

interface EmptyStateProps {
	icon?: React.ReactElement
	title: string
	description: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
	return (
		<div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center shadow-sm">
			{<BanIcon className="mb-6 h-12 w-12 text-red-500" />}
			<Typography variant="h5" color="gray-600" className="mb-2">
				{title}
			</Typography>
			<Typography variant="p" color="gray-600">
				{description}
			</Typography>
		</div>
	)
}

EmptyState.displayName = 'EmptyState'
