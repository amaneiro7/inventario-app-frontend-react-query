import { memo } from 'react'
import { Eye } from 'lucide-react'
import { TableCell } from './TableCell'
import Button from '../Button'

type TableCellOpenIconProps = React.DetailedHTMLProps<
	React.TdHTMLAttributes<HTMLTableCellElement>,
	HTMLTableCellElement
> & {
	index?: number
	onClick?: React.DOMAttributes<HTMLButtonElement>['onClick']
}
export const TableCellOpenIcon = memo(
	({
		index,
		align = 'center',
		onClick,
		...props
	}: React.PropsWithChildren<TableCellOpenIconProps>) => {
		return (
			<TableCell aria-colindex={index} size="xSmall" align={align} className="p-0" {...props}>
				<Button
					buttonSize="small"
					size="content"
					color="blue"
					text="Ver Detalles"
					srOnly
					onClick={onClick}
					icon={<Eye className="h-5 w-5" />}
				/>
			</TableCell>
		)
	}
)

TableCellOpenIcon.displayName = 'TableCellOpenIcon'
