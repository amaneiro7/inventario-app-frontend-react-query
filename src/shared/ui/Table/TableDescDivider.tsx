import { lazy } from 'react'

const Typography = lazy(async () => import('@/shared/ui/Typography'))

interface Props
	extends React.DetailedHTMLProps<
		React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
		HTMLFieldSetElement
	> {
	label: string
}

export function TableDescDivider({ label, className, children }: React.PropsWithChildren<Props>) {
	return (
		<fieldset className={`border-azul flex flex-wrap gap-6 rounded border p-2 ${className}`}>
			<legend>
				<Typography className="p-1" variant="p" option="tiny" color="azul" weight="bold">
					{label}
				</Typography>
			</legend>
			{children}
		</fieldset>
	)
}
