import { lazy } from 'react'
import { type LinkProps } from 'react-router-dom'

const TableCellDescEdit = lazy(async () =>
	import('./TableCellDescEdit').then(m => ({ default: m.TableCellDescEdit }))
)
type Props = React.DetailedHTMLProps<
	React.TdHTMLAttributes<HTMLTableCellElement>,
	HTMLTableCellElement
> & {
	colspan: number
	open: boolean
	state: LinkProps['state']
	url: string
	stateId?: string
}

// export function TableCellDescription<T extends typeof TableCellDescInfo>({
export function TableCellDescription({
	colspan,
	open,
	state,
	url,
	stateId,
	children,
	...props
}: React.PropsWithChildren<Props>) {
	return (
		<tr className={`tableCellDesc ${open ? 'open' : ''}`}>
			<td className="border-b-gray-300 bg-slate-200" colSpan={colspan} {...props}>
				<div className="tableCellDescContainer">
					<div
						aria-description="Informacion"
						className="flex w-full flex-wrap gap-x-6 gap-y-6"
					>
						{children}
					</div>
					<TableCellDescEdit state={state} url={url} stateId={stateId} />
				</div>
			</td>
		</tr>
	)
}
