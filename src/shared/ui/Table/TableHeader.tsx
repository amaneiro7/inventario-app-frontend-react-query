import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'
import { type TableHeadSize } from './TableHead'

export interface Headers {
	key: string
	label: string
	hasOrder: boolean
	size: keyof typeof TableHeadSize
	isTab: boolean
	visible: boolean
}

export const TableHeader = forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead
		ref={ref}
		className={cn(
			'border-l-azul bg-azul sticky top-0 z-10 w-max min-w-max border-l-3 text-white drop-shadow-lg',
			className
		)}
		role="rowgroup"
		{...props}
	/>
))

TableHeader.displayName = 'TableHeader'
