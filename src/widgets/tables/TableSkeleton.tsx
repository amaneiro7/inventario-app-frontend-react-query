import { cn } from '@/shared/lib/utils'

export const TableSkeleton = ({
	withTab = false,
	howManyTabs = 4
}: {
	withTab?: boolean
	howManyTabs?: number
}) => {
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
						<div className="bg-azul flex h-7 animate-pulse items-center justify-center rounded-t-md border-t border-l border-slate-500 p-4 px-4 text-center text-transparent last:border-r">
							Todos
						</div>
						{howManyTabs > 0 &&
							Array.from({ length: howManyTabs - 1 }).map((_, index) => (
								<div
									key={index}
									className="flex h-7 w-28 animate-pulse items-center justify-center rounded-t-md border-slate-500 p-4 px-4 text-center text-transparent odd:bg-slate-300 even:bg-slate-300/70"
									role="tab"
									aria-selected="false"
									tabIndex={-1}
								></div>
							))}
						{
							// Fallback for when there are no tabs
							howManyTabs === 0 && (
								<div className="flex h-7 w-28 animate-pulse items-center justify-center rounded-t-md border-t border-l border-slate-500 bg-slate-300 p-4 px-4 text-center last:border-r" />
							)
						}
					</div>
				)}
				<div
					className="animate-pulse-medium mr-2 h-3 w-52 rounded-xl bg-slate-300"
					aria-label="Cargando resultados..."
				/>
			</div>
			{/* Table Header */}
			<div className="bg-azul h-10 w-full animate-pulse rounded-e-lg" />
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
