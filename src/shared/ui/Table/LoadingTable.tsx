import { TableCell } from './TableCell'
import { TableCellOpenIcon } from './TableCellOpenIcon'

export function LoadingTable({
	registerPerPage,
	colspan,
	openIcon = true
}: {
	registerPerPage?: number
	colspan: number
	openIcon?: boolean
}) {
	const rows = Array.from({ length: registerPerPage ?? 25 })
	const animationClasses = ['animate-pulse-fast', 'animate-pulse-medium', 'animate-pulse-slow']
	return rows.map((_, index) => (
		<tr
			key={index}
			className={`animate-pulse ${index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-300'} ${
				animationClasses[index % 3]
			}`}
		>
			<TableCell colSpan={colspan - 1} value="" size={'xxSmall'} />
			{openIcon && <TableCellOpenIcon open={false} />}
		</tr>
	))
}
