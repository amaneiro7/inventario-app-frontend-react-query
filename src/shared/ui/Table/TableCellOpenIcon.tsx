import { ArrowRightBadgeIcon } from '@/shared/ui/icon/ArrowRightBadge'

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
			className="w-8 max-w-min min-w-min content-center border-b-2 border-b-gray-300"
			{...props}
		>
			<ArrowRightBadgeIcon
				data-open={open}
				className="text-azul-600 hover:text-azul-700 mx-0 my-auto aspect-square w-4 text-center transition-transform duration-500 data-[open=false]:-rotate-90 data-[open=true]:rotate-90"
			/>
		</td>
	)
}
