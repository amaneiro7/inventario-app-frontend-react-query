import { memo } from 'react'
import { cn } from '@/lib/utils'
import { ColorType } from '@/components/Typography/types'
import Typography from '@/components/Typography'

interface DetailsPanelCardProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	value: string
	color: ColorType
}
export const DetailsPanelCard = memo(
	({ value, color, className, id, title, ...props }: DetailsPanelCardProps) => {
		return (
			<div
				role="status"
				aria-labelledby={id}
				aria-atomic="true"
				className={cn(
					'flex min-h-min flex-col rounded-lg border bg-white p-3 shadow-sm',
					className
				)}
				{...props}
			>
				<p id={id} className="sr-only">
					{title}
				</p>
				<Typography variant="p" option="medium" weight="bold" color={color}>
					{value}
				</Typography>
				<Typography variant="p" option="tiny" color="gray-600">
					{title}
				</Typography>
			</div>
		)
	}
)

DetailsPanelCard.displayName = 'DetailsPanelCard'
