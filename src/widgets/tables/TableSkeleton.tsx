import { cn } from '@/shared/lib/utils'

export const TableSkeleton = ({ withTab = false }: { withTab?: boolean }) => {
	return (
		<div className="flex w-full flex-col justify-center">
			{/* Tab Skeleton */}
			<div
				className={cn(
					'flex min-h-7 w-full items-center',
					withTab ? 'justify-between' : 'justify-end'
				)}
			>
				{withTab && (
					<div className="flex items-center" role="tablist">
						<div className="flex h-7 w-28 animate-pulse items-center justify-center rounded-t-md border-t border-l border-slate-500 bg-slate-400 p-4 px-4 text-center last:border-r" />
						<div className="flex h-7 w-28 animate-pulse items-center justify-center rounded-t-md border-t border-l border-slate-500 bg-slate-300 p-4 px-4 text-center last:border-r" />
						<div className="flex h-7 w-28 animate-pulse items-center justify-center rounded-t-md border-t border-l border-slate-500 bg-slate-300 p-4 px-4 text-center last:border-r" />
						<div className="flex h-7 w-28 animate-pulse items-center justify-center rounded-t-md border-t border-l border-slate-500 bg-slate-300 p-4 px-4 text-center last:border-r" />
					</div>
				)}
				<div
					className="animate-pulse-medium mr-2 h-3 w-52 rounded-xl bg-slate-300"
					aria-label="Cargando resultados..."
				/>
			</div>
			{/* Table Header */}
			<div className="h-10 w-full animate-pulse rounded-e-lg bg-slate-400" />
			{/* Table Body */}
			{Array.from({ length: 20 }).map((_, index) => (
				<div
					key={index}
					className={
						'h-10 w-full animate-pulse border-b border-slate-200 odd:bg-slate-300/90 even:bg-slate-300/50'
					}
				/>
			))}
		</div>
	)
}
