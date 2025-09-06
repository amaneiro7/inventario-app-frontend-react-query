import { forwardRef, memo, type ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

// El objeto Size se mantiene igual
const Size = {
	auto: 'w-auto',
	xxSmall: 'max-w-8 min-w-8 w-8',
	xSmall: 'max-w-20 min-w-20 w-20',
	small: 'max-w-28 min-w-28 w-28',
	medium: 'max-w-36 min-w-36 w-36',
	large: 'max-w-44 min-w-44 w-44',
	xLarge: 'max-w-52 min-w-52 w-52',
	xxLarge: 'max-w-60 min-w-60 w-60'
} as const

// Las props ahora son mucho más simples
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
	children?: ReactNode
	size: keyof typeof Size
	// Mantenemos `value` opcional para accesibilidad (title, aria-label) si es necesario,
	// pero el contenido principal es `children`.
	value?: string | number
}

export const TableCell = memo(
	forwardRef<HTMLTableCellElement, TableCellProps>(
		({ className, children, size, align = 'left', value, ...props }, ref) => {
			return (
				<td
					ref={ref}
					role="cell"
					align={align}
					className={cn(
						'h-8 min-h-8 overflow-hidden border-b-2 border-b-gray-300 py-0 ps-2 text-ellipsis whitespace-nowrap text-gray-800',
						// 'h-10 overflow-hidden border-b p-2 text-ellipsis whitespace-nowrap',
						// 'text-foreground text-sm',
						{
							[`${Size[size]}`]: size
						},
						className
					)}
					// El title puede venir del `value` o del prop `title` directamente
					title={props.title ?? (typeof value === 'string' ? value : undefined)}
					{...props}
				>
					{children}
				</td>
			)
		}
	)
)

TableCell.displayName = 'TableCell'
