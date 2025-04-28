import { memo } from 'react'
import { Link } from 'react-router-dom'

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
			<div className="rounded-lg border border-slate-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
				<div className="mb-4 flex items-center gap-4">
					<div className="bg-primary/10 rounded-lg p-3">
						<Icon className="text-primary h-6 w-6" />
					</div>
					<h3 className="text-lg font-semibold text-slate-900">{title}</h3>
				</div>
				<p className="text-slate-600">{description}</p>
			</div>
		</Link>
	)
)

LinkCard.displayName = 'LinkCard'
