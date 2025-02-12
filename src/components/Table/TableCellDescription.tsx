import { lazy } from 'react'
import { type LinkProps } from 'react-router-dom'
// import { type TableCellDescInfo } from './TableCellDescInfo'
import './TableCellDescription.css'

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
			<td className="bg-slate-200 border-b-gray-300" colSpan={colspan} {...props}>
				<div className="tableCellDescContainer">
					<div
						aria-description="Informacion"
						className="w-full flex flex-wrap gap-y-6 gap-x-6"
					>
						{children}
					</div>
					<TableCellDescEdit state={state} url={url} stateId={stateId} />
				</div>
			</td>
		</tr>
	)
}
