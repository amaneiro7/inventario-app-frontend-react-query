import { InfoBox } from '@/components/InfoBox/InfoBox'
import { InfoBoxText } from '@/components/InfoBox/InfoBoxText'
import { InfoBoxTitle } from '@/components/InfoBox/InfoBoxTitle'
import { cn } from '@/lib/utils'

// Simple skeleton text component
export const SkeletonText = ({ className }: { className?: string }) => (
	<div className={cn('h-4 animate-pulse rounded-md bg-gray-200', className)} />
)

// Skeleton for a single InfoBox
export const LocationInfoBoxSkeleton = () => (
	<InfoBox className="w-full animate-pulse border border-gray-200 bg-gray-50">
		<InfoBoxTitle title={<SkeletonText className="h-6 w-3/4" />} url="#" />
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" />}
			text={<SkeletonText className="w-1/2" />}
		/>
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" />}
			text={<SkeletonText className="w-1/3" />}
		/>
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" />}
			text={<SkeletonText className="h-8 w-full" />}
		/>
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" />}
			text={<SkeletonText className="w-1/2" />}
		/>
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" />}
			text={<SkeletonText className="w-1/3" />}
		/>
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" />}
			text={<SkeletonText className="w-1/4" />}
		/>
	</InfoBox>
)
