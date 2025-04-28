import Typography from '@/components/Typography'
import { memo } from 'react'
export const PageTitle = memo(
	({ title, optionalText }: { title: string; optionalText?: string }) => {
		return (
			<Typography
				weight="bold"
				color="azul"
				variant="h1"
				className="mb-5 flex min-h-fit items-end align-middle leading-tight tracking-tight"
			>
				<>
					{title}
					{optionalText ? (
						<Typography variant="p" weight="light" className="text-azul-900 ml-4">
							{optionalText}
						</Typography>
					) : null}
				</>
			</Typography>
		)
	}
)
