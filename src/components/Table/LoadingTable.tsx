import { TableCell } from './TableCell'
import { TableCellOpenIcon } from './TableCellOpenIcon'

export function LoadingTable({
	registerPerPage,
	colspan
}: {
	registerPerPage?: number
	colspan: number
}) {
	const rows = Array.from({ length: registerPerPage ?? 0 })
	return (
		<>
			{rows.map((_, index) => (
				<tr
					key={index}
					className={`animate-pulse ${
						index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-300'
					} ${
						index % 3 === 0
							? 'animate-pulse-fast'
							: index % 3 === 1
							? 'animate-pulse-medium'
							: 'animate-pulse-slow'
					}`}
				>
					<TableCell colSpan={colspan} value="" size={'xxSmall'} />
					<TableCellOpenIcon open={false} />
				</tr>
			))}
		</>
	)
}
