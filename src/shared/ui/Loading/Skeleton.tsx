import cn from 'classnames'

interface SkeletonProps {
	className?: string
	width?: number | string
	height?: number | string
}

export const Skeleton = ({ className, width, height }: SkeletonProps) => {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-gray-300', className)}
			style={{ width, height }}
		/>
	)
}
