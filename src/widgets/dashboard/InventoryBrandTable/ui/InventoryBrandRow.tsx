import { memo } from 'react'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { Tag } from '@/shared/ui/Tag'
import { type ModelData } from '../model/useInventoryBrandTable'
import {
	getStatusTagBackGroundColor,
	getStatusTagColor
} from '../model/getInventaroyBrandStatusTag'

interface InventoryBrandRowProps {
	item: ModelData
}

export const InventoryBrandRow = memo(({ item }: InventoryBrandRowProps) => {
	return (
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
	)
})

InventoryBrandRow.displayName = 'InventoryBrandRow'
