import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { cn } from '@/lib/utils'
import Typography from './Typography'

interface BasicStatCardProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string
	icon: React.ReactNode
	value: string
	desc: string
	loading: boolean
}

export const BasicStatCard = memo(
	({ title, icon, desc, value, loading, className, ...props }: BasicStatCardProps) => {
		const cardTitleId = `stat-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`
		const cardDescriptionId = `stat-card-description-${title.replace(/\s+/g, '-').toLowerCase()}`

		return (
			<Card
				className={cn(
					'flex w-full flex-col rounded-lg bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md',
					className
				)}
				role="region"
				aria-labelledby={cardTitleId}
				aria-describedby={cardDescriptionId}
				{...props}
			>
				<CardHeader className="flex flex-row items-center justify-between space-y-2 p-0">
					<CardTitle className="text-sm font-semibold">{title}</CardTitle>
					{icon}
				</CardHeader>
				<CardContent className="flex-grow p-0">
					{loading ? (
						<SkeletonText className="my-1 h-8 w-1/2" />
					) : (
						<Typography variant="h3" weight="bold">
							{value}
						</Typography>
					)}
					{loading ? (
						<SkeletonText className="h-5 w-3/4" />
					) : (
						<Typography
							variant="p"
							option="tiny"
							color="gray-600"
							id={cardDescriptionId}
						>
							{desc}
						</Typography>
					)}
				</CardContent>
			</Card>
		)
	}
)

BasicStatCard.displayName = 'BasicStatCard'

const SkeletonText = ({ className }: { className?: string }) => (
	<div className={cn('h-4 animate-pulse rounded-md bg-gray-200', className)} />
)
