import { memo } from 'react'
import { TableCell } from '@/components/Table/TableCell'
import { TableRow } from '@/components/Table/TableRow'
import { type ModelData } from '../hooks/useInventoryBrandTable'

interface InventoryBrandRowProps {
	item: ModelData
	index: number
}

const getStatusColor = (status: string) => {
	switch (status) {
		case 'In Stock':
			return 'white'
		case 'Low Stock':
			return 'black'
		case 'Out of Stock':
			return 'white'
		default:
			return 'black'
	}
}
const getStatusBackGroundColor = (status: string) => {
	switch (status) {
		case 'In Stock':
			return 'verde'
		case 'Low Stock':
			return 'amarillo'
		case 'Out of Stock':
			return 'rojo'
		default:
			return 'gris'
	}
}

export const InventoryBrandRow = memo(({ item, index }: InventoryBrandRowProps) => {
	return (
		<TableRow key={index}>
			<TableCell value={item.name} size="xxLarge" />
			<TableCell value={item.brand} size="xLarge" />
			<TableCell value={item.category} size="medium" />
			<TableCell value={item.count} size="small" align="center" />
			<TableCell value={item.inUse} size="small" align="center" />
			<TableCell value={item.inAlmacen} size="small" align="center" />

			<TableCell
				size="medium"
				tag
				backgroundColor={getStatusBackGroundColor(item.status)}
				color={getStatusColor(item.status)}
				value={item.status}
			/>
		</TableRow>
	)
})

InventoryBrandRow.displayName = 'InventoryBrandRow'
