import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '../Card'

export const CardDetail = ({
	children,
	icon,
	title,
	className,
	classNameContent,
	headerAction
}: React.PropsWithChildren<{
	title: string
	className?: HTMLElement['className']
	classNameContent?: HTMLElement['className']
	icon?: React.ReactNode
	headerAction?: React.ReactNode
}>) => (
	<Card className={cn('p-4', className)}>
		<CardHeader className="p-0">
			<CardTitle className="flex flex-wrap items-center justify-between gap-2 text-lg">
				<div className="flex items-center gap-2">
					{icon} {title}
				</div>
				{headerAction}
			</CardTitle>
		</CardHeader>
		<CardContent className={cn('p-4', classNameContent)}>{children}</CardContent>
	</Card>
)
