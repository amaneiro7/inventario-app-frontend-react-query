import { lazy, memo } from 'react'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { Tag } from '@/shared/ui/Tag'
import { type ModelData } from '../model/useInventoryBrandTable'
import {
	getStatusTagBackGroundColor,
	getStatusTagColor
} from '../model/getInventaroyBrandStatusTag'

const TableCellError = lazy(() =>
	import('@/shared/ui/Table/TableCellError').then(m => ({ default: m.TableCellError }))
)
const TableCellEmpty = lazy(() =>
	import('@/shared/ui/Table/TableCellEmpty').then(m => ({ default: m.TableCellEmpty }))
)

interface InventoryBrandRowProps {
	data?: ModelData[]
	isError: boolean
}

export const InventoryBrandRow = memo(({ data, isError }: InventoryBrandRowProps) => {
	if (isError) {
		return <TableCellError />
	}
	if (data && data?.length === 0) {
		return <TableCellEmpty />
	}
	return (
		<>
			{data?.map(item => (
				<TableRow>
					<TableCell value={item.name} size="xxLarge">
						{item.name}
					</TableCell>
					<TableCell value={item.brand} size="xLarge">
						{item.brand}
					</TableCell>
					<TableCell value={item.category} size="medium">
						{item.category}
					</TableCell>
					<TableCell value={item.count} size="small" align="center">
						{item.count}
					</TableCell>
					<TableCell value={item.inUse} size="small" align="center">
						{item.inUse}
					</TableCell>
					<TableCell value={item.inAlmacen} size="small" align="center">
						{item.inAlmacen}
					</TableCell>

					<TableCell size="medium">
						<Tag
							backgroundColor={getStatusTagBackGroundColor(item.status)}
							color={getStatusTagColor(item.status)}
							iconText={item.status}
							option="tiny"
						/>
					</TableCell>
				</TableRow>
			))}
		</>
	)
})

InventoryBrandRow.displayName = 'InventoryBrandRow'
