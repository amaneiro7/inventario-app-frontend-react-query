import { lazy, memo } from 'react'

const Typography = lazy(async () => await import('@/components/Typography'))

export const PageTitle = memo(
	({ title, optionalText }: { title: string; optionalText?: string }) => {
		return (
			<Typography
				weight="bold"
				color="azul"
				variant="h3"
				className="min-h-fit mb-5 leading-tight tracking-tight"
			>
				<>
					{title}
					{optionalText ? (
						<Typography variant="p" color="azul" className="ml-4">
							{optionalText}
						</Typography>
					) : null}
				</>
			</Typography>
		)
	}
)
