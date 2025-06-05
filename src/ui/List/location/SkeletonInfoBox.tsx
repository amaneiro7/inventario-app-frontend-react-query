import { InfoBox } from '@/components/InfoBox/InfoBox'
import { InfoBoxText } from '@/components/InfoBox/InfoBoxText'
import { InfoBoxTitle } from '@/components/InfoBox/InfoBoxTitle'
import { cn } from '@/lib/utils'

// Simple skeleton text component
export const SkeletonText = ({
	className,
	...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
	<div className={cn('h-5 animate-pulse rounded-md bg-gray-200', className)} {...props} />
)

// Skeleton for a single InfoBox
export const LocationInfoBoxSkeleton = () => (
	<InfoBox className="w-full animate-pulse border border-gray-200 bg-gray-50">
		<InfoBoxTitle title={<SkeletonText className="h-10 w-3/4" />} url="#" />
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" aria-label="skeleton desc" />}
			text={<SkeletonText className="w-1/2" aria-label="skeleton text" />}
		/>
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" aria-label="skeleton desc" />}
			text={<SkeletonText className="w-1/3" aria-label="skeleton text" />}
		/>
		<InfoBoxText text={<SkeletonText className="h-24 w-full" aria-label="skeleton text" />} />
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" aria-label="skeleton desc" />}
			text={<SkeletonText className="w-1/2" aria-label="skeleton text" />}
		/>
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" aria-label="skeleton desc" />}
			text={<SkeletonText className="w-1/3" aria-label="skeleton text" />}
		/>
		<InfoBoxText
			desc={<SkeletonText className="w-1/4" aria-label="skeleton desc" />}
			text={<SkeletonText className="w-1/4" aria-label="skeleton text" />}
		/>
	</InfoBox>
)
