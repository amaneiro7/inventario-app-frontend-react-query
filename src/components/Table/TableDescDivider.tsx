import { lazy } from 'react'

const Typography = lazy(async () => import('@/components/Typography'))

interface Props
	extends React.DetailedHTMLProps<
		React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
		HTMLFieldSetElement
	> {
	label: string
}

export function TableDescDivider({ label, className, children }: React.PropsWithChildren<Props>) {
	return (
		<fieldset className={`flex border-azul border rounded p-2 gap-6 flex-wrap ${className}`}>
			<legend>
				<Typography className="p-1" variant="p" option="tiny" color="azul" weight="bold">
					{label}
				</Typography>
			</legend>
			{children}
		</fieldset>
	)
}
