import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'

const SKELETON_ITEMS = [1, 2, 3]

export const AsignDevicesSkeleton = () => (
	<DetailsBoxWrapper>
		<div className="space-y-4">
			<div className="h-6 w-1/2 animate-pulse rounded bg-gray-200"></div>
			<div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
			<div className="flex flex-row flex-wrap gap-8 pt-4">
				{SKELETON_ITEMS.map(id => (
					<div key={id} className="h-48 w-64 animate-pulse rounded-lg bg-gray-200"></div>
				))}
			</div>
		</div>
	</DetailsBoxWrapper>
)
