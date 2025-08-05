import { memo } from 'react'
import { Link } from 'react-router-dom'
import { StatCard } from '@/widgets/StatCard'

export const LinkCard = memo(
	({
		title,
		description,
		icon: Icon,
		to
	}: {
		title: string
		description: string
		icon: React.ElementType
		to: string
	}) => (
		<Link to={to} className="block">
			<StatCard
				icon={Icon}
				value={title}
				description={description}
				color="darkGreen"
				className="text-white"
			/>
		</Link>
	)
)

LinkCard.displayName = 'LinkCard'
