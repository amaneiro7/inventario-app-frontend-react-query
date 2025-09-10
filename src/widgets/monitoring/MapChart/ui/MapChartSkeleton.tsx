import { memo } from 'react'

export const MapChartSkeleton = memo(() => (
	<div className="bg-gris-200 h-full w-full animate-pulse rounded-lg" />
))
MapChartSkeleton.displayName = 'MapChartSkeleton'
