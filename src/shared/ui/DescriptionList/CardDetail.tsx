import { Card, CardContent, CardHeader, CardTitle } from '../Card'

export const CardDetail = ({
	children,
	icon,
	title
}: React.PropsWithChildren<{ title: string; icon?: React.ReactNode }>) => (
	<Card className="p-4">
		<CardHeader className="p-0">
			<CardTitle className="flex flex-wrap items-center gap-2 text-lg">
				{icon} {title}
			</CardTitle>
		</CardHeader>
		<CardContent className="p-0">{children}</CardContent>
	</Card>
)