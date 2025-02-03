import { lazy, memo } from 'react'

const Typography = lazy(async () => await import('@/components/Typography'))

export const PageTitle = memo(
	({ title, optionalText }: { title: string; optionalText?: string }) => {
		return (
			<Typography
				weight="bold"
				color="azul"
				variant="h3"
				className="flex align-middle items-end min-h-fit mb-5 leading-tight tracking-tight"
			>
				<>
					{title}
					{optionalText ? (
						<Typography variant="p" weight="light" className="ml-4 text-azul-900">
							{optionalText}
						</Typography>
					) : null}
				</>
			</Typography>
		)
	}
)
