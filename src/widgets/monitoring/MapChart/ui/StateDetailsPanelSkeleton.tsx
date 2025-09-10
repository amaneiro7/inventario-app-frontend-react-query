import { memo } from 'react'
import { NetworkLinkListSkeleton } from '@/shared/ui/skeletons/NetworkLinkListSkeleton'
import { Skeleton } from '@/shared/ui/skeletons/Skeleton'

export const StateDetailsPanelSkeleton = memo(() => (
	<div className="flex h-full flex-col p-1">
		<div className="space-y-2 p-4">
			<Skeleton className="h-6 w-3/4" />
			<Skeleton className="h-4 w-full" />
		</div>
		<div className="p-4 pt-2">
			<NetworkLinkListSkeleton />
		</div>
	</div>
))
StateDetailsPanelSkeleton.displayName = 'StateDetailsPanelSkeleton'
