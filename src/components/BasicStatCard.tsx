import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { cn } from '@/lib/utils'

interface BasicStatCardProps {
	title: string
	icon: React.ReactNode
	value: string
	desc: string
	loading: boolean
}

export const BasicStatCard = memo(({ title, icon, desc, value, loading }: BasicStatCardProps) => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				{loading ? (
					<SkeletonText className="my-0.5 h-7 w-1/2" />
				) : (
					<div className="text-2xl font-bold">{value}</div>
				)}
				{loading ? (
					<SkeletonText className="h-4 w-3/4" />
				) : (
					<p className="text-muted-foreground text-xs">{desc}</p>
				)}
			</CardContent>
		</Card>
	)
})

// Componente simple para un skeleton de texto
const SkeletonText = ({ className }: { className?: string }) => (
	<div className={cn('h-4 animate-pulse rounded-md bg-gray-200', className)} />
)

BasicStatCard.displayName = 'BasicStatCard'
