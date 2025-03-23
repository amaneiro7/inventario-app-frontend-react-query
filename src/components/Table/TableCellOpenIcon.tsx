import { ArrowRightBadgeIcon } from '@/icon/ArrowRightBadge'

type Props = React.DetailedHTMLProps<
	React.TdHTMLAttributes<HTMLTableCellElement>,
	HTMLTableCellElement
> & {
	open: boolean
	index?: number
}
export function TableCellOpenIcon({ open, index, ...props }: React.PropsWithChildren<Props>) {
	return (
		<td
			aria-colindex={index}
			className="min-w-min max-w-min w-8 border-b-2 border-b-gray-300 content-center"
			{...props}
		>
			<ArrowRightBadgeIcon
				data-open={open}
				className="w-4 mx-0 my-auto text-center aspect-square transition-transform duration-500 data-[open=true]:rotate-90 data-[open=false]:-rotate-90 text-azul-600 hover:text-azul-700"
			/>
		</td>
	)
}
