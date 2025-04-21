import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { memo } from 'react'

interface StatCardProps {
	title: string
	value: string | number
	description?: string
	icon: LucideIcon
	color?: 'blue' | 'green' | 'amber' | 'rose'
	trend?: 'up' | 'down' | 'neutral'
	trendValue?: string
	className?: string
}

export const StatCard = memo(
	({
		title,
		value,
		description,
		icon: Icon,
		color = 'blue',
		trend,
		trendValue,
		className
	}: StatCardProps) => {
		const colorVariants = {
			blue: 'from-blue-500/20 to-blue-500/5 text-blue-700 dark:from-blue-500/30 dark:to-blue-500/10 dark:text-blue-400',
			green: 'from-emerald-500/20 to-emerald-500/5 text-emerald-700 dark:from-emerald-500/30 dark:to-emerald-500/10 dark:text-emerald-400',
			amber: 'from-amber-500/20 to-amber-500/5 text-amber-700 dark:from-amber-500/30 dark:to-amber-500/10 dark:text-amber-400',
			rose: 'from-rose-500/20 to-rose-500/5 text-rose-700 dark:from-rose-500/30 dark:to-rose-500/10 dark:text-rose-400'
		}

		const iconColorVariants = {
			blue: 'text-blue-500',
			green: 'text-emerald-500',
			amber: 'text-amber-500',
			rose: 'text-rose-500'
		}

		const trendVariants = {
			up: 'text-emerald-600 dark:text-emerald-400',
			down: 'text-rose-600 dark:text-rose-400',
			neutral: 'text-slate-600 dark:text-slate-400'
		}

		return (
			<div
				className={cn(
					'hover-scale h-full rounded-xl border border-slate-100/50 bg-gradient-to-br p-4 shadow-sm',
					colorVariants[color],
					className
				)}
			>
				<div className="mb-3 flex items-start justify-between">
					<div
						className={cn(
							'rounded-lg bg-white/80 p-2 dark:bg-slate-800/80',
							iconColorVariants[color]
						)}
					>
						<Icon className="h-5 w-5" />
					</div>
					{trend && (
						<div
							className={cn(
								'flex items-center text-xs font-medium',
								trendVariants[trend]
							)}
						>
							<span>{trendValue}</span>
							{trend === 'up' && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="ml-1 h-4 w-4"
								>
									<path
										fillRule="evenodd"
										d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
										clipRule="evenodd"
									/>
								</svg>
							)}
							{trend === 'down' && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="ml-1 h-4 w-4"
								>
									<path
										fillRule="evenodd"
										d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z"
										clipRule="evenodd"
									/>
								</svg>
							)}
							{trend === 'neutral' && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="ml-1 h-4 w-4"
								>
									<path d="M4 5h12v2H4zM4 9h12v2H4zM4 13h12v2H4z" />
								</svg>
							)}
						</div>
					)}
				</div>
				<h3 className="mb-1 text-sm font-medium opacity-80">{title}</h3>
				<div className="mb-1 text-2xl font-bold">{value}</div>
				{description && <p className="text-xs opacity-70">{description}</p>}
			</div>
		)
	}
)
