import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '../Card'

export const CardDetail = ({
	children,
	icon,
	title,
	className,
	classNameContent
}: React.PropsWithChildren<{
	title: string
	className?: HTMLElement['className']
	classNameContent?: HTMLElement['className']
	icon?: React.ReactNode
}>) => (
	<Card className={cn('p-4', className)}>
		<CardHeader className="p-0">
			<CardTitle className="flex flex-wrap items-center gap-2 text-lg">
				{icon} {title}
			</CardTitle>
		</CardHeader>
		<CardContent className={cn('p-4', classNameContent)}>{children}</CardContent>
	</Card>
)
