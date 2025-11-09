import { Card, CardContent, CardHeader } from '@/shared/ui/Card'
import { Skeleton } from '@/shared/ui/skeletons/Skeleton'

export const AppSettingsSkeleton = () => {
	return (
		<div className="space-y-6">
			<div className="grid w-full grid-cols-3 gap-2">
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
			</div>
			<Card>
				<CardHeader>
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-4 w-72" />
				</CardHeader>
				<CardContent className="space-y-8 pt-4">
					{[...Array(4)].map((_, i) => (
						<div key={i} className="flex items-start justify-between">
							<div className="flex-1 space-y-2">
								<Skeleton className="h-6 w-1/3" />
								<Skeleton className="h-4 w-2/3" />
							</div>
							<Skeleton className="h-10 w-24" />
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	)
}
