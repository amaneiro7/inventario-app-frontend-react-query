import React, { memo } from 'react'
import Typography from '@/shared/ui/Typography'
import { useTabNav } from '../../lib/hooks/useTabNav'
import { cn } from '@/shared/lib/utils'
import { type TabNav } from './TabNav'
interface TabsNavProps<T>
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: React.ReactElement<T> | React.ReactElement<T>[]
	pageSize?: number
	pageNumber?: number
	defaultPageSize?: number
	isLoading?: boolean
	total?: number
	className?: string
	tabsClassName?: string
}
export const TabsNav = memo(function <T extends typeof TabNav>({
	children,
	pageSize,
	pageNumber,
	total,
	isLoading,
	defaultPageSize,
	className,
	tabsClassName,
	...props
}: TabsNavProps<T>) {
	const { getPaginationRange } = useTabNav({ defaultPageSize, pageNumber, pageSize, total })

	return (
		<div className={cn('flex min-h-7 items-center justify-between', className)} {...props}>
			<div className={cn('flex items-center', tabsClassName)} role="tablist">
				{children}
			</div>
			{isLoading && (
				<div
					className="animate-pulse-medium mr-2 h-3 w-52 rounded-xl bg-gray-300"
					aria-label="Cargando resultados..."
				/>
			)}
			{total !== undefined && (
				<Typography variant="span" color="azul" className="mr-2 text-shadow-xs">
					{`Mostrando ${getPaginationRange.start}-${getPaginationRange.end} de ${total} resultados`}
				</Typography>
			)}
		</div>
	)
})

TabsNav.displayName = 'TabsNav'
