import React, { memo, useMemo } from 'react'
import Typography from '@/components/Typography'
import { type TabNav } from './TabNav'
interface Props<T>
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: React.ReactElement<T> | React.ReactElement<T>[]
	pageSize?: number
	pageNumber?: number
	defaultPageSize?: number
	total?: number
}
export const TabsNav = memo(function <T extends typeof TabNav>({
	children,
	pageSize,
	pageNumber,
	total,
	defaultPageSize,
	...props
}: Props<T>) {
	const getPaginationRange = useMemo(() => {
		const start = pageSize && pageNumber ? pageSize * (pageNumber - 1) + 1 : 1
		const calculatedEnd = pageSize && pageNumber ? pageSize * pageNumber : defaultPageSize ?? 25
		const end = total !== undefined ? Math.min(total, calculatedEnd) : calculatedEnd

		return { start, end }
	}, [pageSize, pageNumber, defaultPageSize, total])

	return (
		<div className="min-h-7 flex items-center justify-between" {...props}>
			<div className="flex items-center">{children}</div>
			{total !== undefined && (
				<Typography variant="p" option="small" color="gris" className="mr-2">
					{`Mostrando ${getPaginationRange.start}-${getPaginationRange.end} de ${total} resultados`}
				</Typography>
			)}
		</div>
	)
})
