import { memo } from 'react'
import { type TabNav } from './TabNav'
import Typography from '@/components/Typography'
interface Props<T>
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: React.ReactElement<T> | React.ReactElement<T>[]
	start?: number
	end?: number
	total?: number
}
export const TabsNav = memo(function <T extends typeof TabNav>({
	children,
	start,
	end,
	total,
	...props
}: Props<T>) {
	return (
		<div className="min-h-7 flex items-center justify-between" {...props}>
			<div className="flex items-center">{children}</div>
			{total !== undefined && (
				<Typography variant="p" option="small" color="gris" className="mr-2">
					{start !== undefined &&
						end !== undefined &&
						`Mostrando ${start}-${end} de ${total}`}
				</Typography>
			)}
		</div>
	)
})
