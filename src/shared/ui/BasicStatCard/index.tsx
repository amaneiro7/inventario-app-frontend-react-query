import { memo, type ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../Card'
import { cn } from '@/shared/lib/utils'
import Typography from '../Typography'

// 1. Se actualiza la interfaz de las props
interface BasicStatCardProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string
	icon?: ReactNode
	value?: ReactNode // Se cambia de 'string' a 'ReactNode' para aceptar componentes
	desc?: ReactNode // Se cambia también para mayor flexibilidad
	loading?: boolean
	error?: boolean // Se añade la nueva prop 'error'
}

export const BasicStatCard = memo(
	({
		title,
		icon,
		desc,
		value,
		loading = false,
		error = false,
		className,
		...props
	}: BasicStatCardProps) => {
		const cardTitleId = `stat-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`
		const cardDescriptionId = `stat-card-description-${title.replace(/\s+/g, '-').toLowerCase()}`

		return (
			<Card
				// 2. Se aplican clases condicionales si 'error' es true
				className={cn(
					'flex w-full flex-col rounded-lg bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md',
					{ 'border-red-500/50 bg-red-500/5': error },
					className
				)}
				role="region"
				aria-labelledby={cardTitleId}
				aria-describedby={cardDescriptionId}
				{...props}
			>
				<CardHeader className="flex flex-row items-center justify-between space-y-2 p-0">
					<CardTitle className={cn('text-sm font-semibold', { 'text-red-700': error })}>
						{title}
					</CardTitle>
					{icon}
				</CardHeader>
				<CardContent className="flex-grow p-0">
					{loading ? (
						<SkeletonText className="my-1 h-8 w-1/2" />
					) : (
						<Typography
							variant="h3"
							weight="bold"
							// El color del valor principal también cambia en caso de error
							className={cn({ 'text-red-700': error })}
						>
							{value}
						</Typography>
					)}
					{loading ? (
						<SkeletonText className="h-5 w-3/4" />
					) : (
						<Typography
							variant="p"
							option="tiny"
							className={cn('text-gray-600', { 'text-red-700/80': error })}
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
