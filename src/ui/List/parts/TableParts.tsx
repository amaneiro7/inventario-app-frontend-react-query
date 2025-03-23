import React from 'react'
import { type DeviceDto } from '@/core/devices/devices/domain/dto/Device.dto'
import { useExpendedRows } from '@/hooks/utils/useExpendedRows'
import { TableCellError } from '@/components/Table/TableCellError'
import { TableCellEmpty } from '@/components/Table/TableCellEmpty'
import { TableRow } from '@/components/Table/TableRow'
import { TableCell } from '@/components/Table/TableCell'
import { PartsDescription } from './PartsDescription'
import { TableCellOpenIcon } from '@/components/Table/TableCellOpenIcon'

interface TablePartsProps {
	devices?: DeviceDto[]
	isError: boolean
	colSpan: number
}

export function TableParts({ devices, colSpan, isError }: TablePartsProps) {
	const { expandedRows, handleRowClick } = useExpendedRows()
	if (isError) {
		return <TableCellError colSpan={colSpan} />
	}
	if (devices && devices.length === 0) {
		return <TableCellEmpty colSpan={colSpan} />
	}
	return (
		<>
			{devices?.map(device => (
				<React.Fragment key={device.id}>
					<TableRow
						className={`[&>td]:cursor-pointer ${
							expandedRows.includes(device.id) &&
							'[&>td]:bg-slate-200 [&>td]:border-b-slate-200'
						}`}
						onClick={() => handleRowClick(device.id)}
					>
						<TableCell size="small" value={device.employee?.userName} />
						<TableCell size="large" value={device.location?.name} />
						<TableCell size="small" value={device.serial ?? ''} />
						<TableCell size="small" value={device.category?.name} />
						<TableCell size="small" value={device.brand?.name} />
						<TableCell size="xLarge" value={device.model?.name} />
						<TableCell size="small" value={device.observation ?? ''} />
						<TableCellOpenIcon open={expandedRows.includes(device.id)} />
					</TableRow>

					<PartsDescription open={expandedRows.includes(device.id)} device={device} />
				</React.Fragment>
			))}
		</>
	)
}
