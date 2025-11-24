import { memo } from 'react'
import { Link } from 'react-router-dom'
import { StatCard } from '@/widgets/StatCard'
import { type IconName } from '../icon/Icon'

export const LinkCard = memo(
	({
		title,
		description,
		iconName,
		to
	}: {
		title: string
		description: string
		iconName: IconName
		to: string
	}) => (
		<Link to={to} className="block">
			<StatCard
				iconName={iconName}
				value={title}
				description={description}
				color="darkGreen"
				className="text-white"
			/>
		</Link>
	)
)

LinkCard.displayName = 'LinkCard'
